'use client';

import Image from 'next/image';
import { CSSProperties, useState } from 'react';
import { ImageConfig, getImageSizes } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
  config: ImageConfig;
  alt?: string;
  context?: 'hero' | 'card' | 'feature' | 'full';
  showBlur?: boolean;
  className?: string;
}

export function OptimizedImage({
  config,
  alt,
  context = 'card',
  showBlur = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={config.src}
        alt={alt || config.alt}
        width={config.width || 600}
        height={config.height || 400}
        quality={config.quality || 80}
        priority={config.priority || false}
        sizes={getImageSizes(context)}
        placeholder={showBlur && config.placeholder ? 'blur' : undefined}
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E"
        onLoad={() => setIsLoading(false)}
        className="object-cover w-full h-auto transition-opacity duration-300"
        style={{
          opacity: isLoading ? 0.8 : 1
        } as CSSProperties}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
      )}
    </div>
  );
}
