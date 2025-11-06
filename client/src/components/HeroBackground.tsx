import { ReactNode } from 'react';

interface HeroBackgroundProps {
  imageSrc: string;
  children: ReactNode;
  priority?: boolean;
}

export default function HeroBackground({ imageSrc, children, priority = false }: HeroBackgroundProps) {
  return (
    <div className="relative py-16 px-4 min-h-[400px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          width={1920}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>
      <div className="container mx-auto max-w-4xl relative z-10">
        {children}
      </div>
    </div>
  );
}
