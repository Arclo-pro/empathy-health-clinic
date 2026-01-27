import { ImgHTMLAttributes, useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
  fallbackKeyword?: string;
  /** Enable responsive srcset for Unsplash images */
  responsive?: boolean;
  /** Custom sizes attribute for responsive images */
  sizes?: string;
}

const DEFAULT_ASPECT_RATIO = "16/9";
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 450;

/** Standard responsive breakpoints for srcset */
const RESPONSIVE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1600];

/**
 * Generate responsive srcset for Unsplash images
 * Unsplash supports dynamic resizing via URL parameters
 */
function generateUnsplashSrcset(src: string, widths: number[]): string {
  if (!src.includes('unsplash.com')) return '';

  return widths.map(w => {
    // Calculate height maintaining aspect ratio (16:9)
    const h = Math.round(w * 9 / 16);
    // Adjust quality based on width for optimal file size
    const q = w <= 640 ? 60 : w <= 1024 ? 70 : 80;

    // Replace or add width/height/quality params
    let optimizedUrl = src;
    if (src.includes('?')) {
      optimizedUrl = src.replace(/w=\d+/, `w=${w}`).replace(/h=\d+/, `h=${h}`).replace(/q=\d+/, `q=${q}`);
      // Add params if not present
      if (!optimizedUrl.includes('w=')) optimizedUrl += `&w=${w}`;
      if (!optimizedUrl.includes('h=')) optimizedUrl += `&h=${h}`;
      if (!optimizedUrl.includes('q=')) optimizedUrl += `&q=${q}`;
    } else {
      optimizedUrl += `?w=${w}&h=${h}&q=${q}&fit=crop&auto=format`;
    }

    return `${optimizedUrl} ${w}w`;
  }).join(', ');
}

/**
 * Default sizes attribute for responsive images
 * Mobile first approach with breakpoints
 */
const DEFAULT_SIZES = "(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px";

function generateAltText(src: string, fallbackKeyword?: string): string {
  if (fallbackKeyword) {
    return `${fallbackKeyword} - Empathy Health Clinic Orlando FL`;
  }
  
  const filename = src.split('/').pop()?.split('.')[0] || '';
  const cleanName = filename
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (cleanName.length > 3) {
    return `${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)} - Empathy Health Clinic Orlando FL`;
  }
  
  return "Mental Health Services - Empathy Health Clinic Orlando FL";
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  aspectRatio,
  fallbackKeyword,
  responsive = true,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const finalAlt = alt && alt.trim() !== '' ? alt : generateAltText(src, fallbackKeyword);
  const finalWidth = width || DEFAULT_WIDTH;
  const finalHeight = height || DEFAULT_HEIGHT;
  const finalAspectRatio = aspectRatio || DEFAULT_ASPECT_RATIO;

  // Generate responsive srcset for Unsplash images
  const srcset = responsive && src.includes('unsplash.com')
    ? generateUnsplashSrcset(src, RESPONSIVE_WIDTHS)
    : undefined;
  const finalSizes = srcset ? (sizes || DEFAULT_SIZES) : undefined;

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const testId = `img-${finalAlt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`;

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      srcSet={isInView ? srcset : undefined}
      sizes={finalSizes}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={{ aspectRatio: finalAspectRatio }}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      {...props}
      data-testid={testId}
    />
  );
}
