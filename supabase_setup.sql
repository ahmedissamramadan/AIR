-- 1. Create Profiles table (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'عضو',
  bio TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Reactions table
CREATE TABLE reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(post_slug, user_id)
);

-- 4. Create function for reaction counts
CREATE OR REPLACE FUNCTION get_reaction_counts(post_slug_param TEXT)
RETURNS TABLE (reaction_type TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT r.reaction_type, COUNT(*)
  FROM reactions r
  WHERE r.post_slug = post_slug_param
  GROUP BY r.reaction_type;
END;
$$ LANGUAGE plpgsql;

-- 5. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, only user can update
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Comments: Anyone can view, authenticated can insert
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can post comments" ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Reactions: Anyone can view, authenticated can upsert
CREATE POLICY "Reactions are viewable by everyone" ON reactions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can react" ON reactions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update/delete own reaction" ON reactions FOR ALL USING (auth.uid() = user_id);

-- 6. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
