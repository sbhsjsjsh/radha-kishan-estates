'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Building2 } from 'lucide-react';

interface PropertyImageProps {
  src: StaticImageData;
  alt: string;
  title?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function PropertyImage({
  src,
  alt,
  title,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
}: PropertyImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-[#0F4C3A] p-6 text-center text-zinc-100"
      >
        <Building2 className="mb-3 h-7 w-7 text-zinc-300" aria-hidden="true" />
        <span className="font-display text-lg font-medium tracking-tight text-white">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
