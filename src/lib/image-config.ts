export const IMAGE_DIMENSIONS = {
  // Hero Images
  hero: {
    width: 1440,
    height: 800,
    mobile: { width: 768, height: 600 }
  },
  // Product/Guide Cards
  card: {
    width: 600,
    height: 400,
    mobile: { width: 300, height: 200 }
  },
  // Feature Images
  feature: {
    width: 600,
    height: 400
  },
  // Avatar/Profile
  avatar: {
    width: 400,
    height: 400
  },
  // OG Images (Social Sharing)
  og: {
    width: 1200,
    height: 630
  },
  // Thumbnails
  thumbnail: {
    width: 300,
    height: 200
  }
} as const;

export const IMAGE_QUALITY = {
  hero: 85,
  card: 80,
  feature: 80,
  thumbnail: 70,
  avatar: 90,
  og: 85,
  logo: 100
} as const;

export const IMAGE_CATEGORIES = {
  brand: 'brand',
  features: 'features',
  hero: 'hero',
  guides: 'guides',
  tips: 'tips',
  testimonials: 'testimonials',
  tools: 'tools',
  blog: 'blog',
  og: 'og-images'
} as const;
