// Cache for tracking images to deduplicate them
const imageCache: Map<string, string> = new Map();

// Normalize image source to prevent duplicates
export function normalizeImageSrc(src: string): string {
  if (!src) return src;
  
  // Check if already in cache
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }
  
  // Normalize the URL
  let normalized = src;
  
  // Remove query parameters for comparison
  const baseUrl = src.split('?')[0];
  
  // Remove trailing slashes
  normalized = baseUrl.replace(/\/$/, '');
  
  // Store in cache
  imageCache.set(src, normalized);
  
  return normalized;
}

// Clear the image cache
export function clearImageCache(): void {
  imageCache.clear();
}

// Get cache size
export function getImageCacheSize(): number {
  return imageCache.size;
}
