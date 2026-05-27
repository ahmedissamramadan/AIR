import { IMAGE_CATEGORIES, IMAGE_DIMENSIONS, IMAGE_QUALITY } from './image-config';

export interface ImageConfig {
  src: string;
  alt: string;
  category: keyof typeof IMAGE_CATEGORIES;
  type?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  placeholder?: boolean;
}

/**
 * Get full image path with validation
 * Usage: getImagePath('guides', 'ai-roadmap', 'hero')
 * Returns: /images/guides/ai-roadmap-hero.png
 */
export function getImagePath(
  category: keyof typeof IMAGE_CATEGORIES,
  fileName: string,
  type?: string
): string {
  const categoryPath = IMAGE_CATEGORIES[category];
  const fullFileName = type ? `${fileName}-${type}` : fileName;
  return `/images/${categoryPath}/${fullFileName}.png`;
}

/**
 * Get image config with dimensions and quality
 */
export function getImageConfig(
  category: keyof typeof IMAGE_CATEGORIES,
  fileName: string,
  type?: string,
  override?: Partial<ImageConfig>
): ImageConfig {
  const src = getImagePath(category, fileName, type);
  
  const baseConfig: ImageConfig = {
    src,
    category,
    alt: `${fileName} - صورة من ذكاء عملي`,
    width: IMAGE_DIMENSIONS.card.width,
    height: IMAGE_DIMENSIONS.card.height,
    quality: IMAGE_QUALITY.card,
    priority: false,
    placeholder: true
  };

  return { ...baseConfig, ...override };
}

/**
 * Get responsive image sizes
 */
export function getImageSizes(context: 'hero' | 'card' | 'feature' | 'full'): string {
  const sizes: Record<string, string> = {
    hero: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1440px',
    card: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
    feature: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    full: '100vw'
  };
  return sizes[context];
}
