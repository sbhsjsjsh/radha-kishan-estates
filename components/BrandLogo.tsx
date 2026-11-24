'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CONSULTANT } from '@/lib/consultant-data';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  surface?: 'light' | 'dark';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-8 w-8 rounded-md',
  md: 'h-10 w-10 rounded-md',
  lg: 'h-14 w-14 rounded-lg',
};

const PIXEL_SIZES = {
  sm: '32px',
  md: '40px',
  lg: '56px',
};

export default function BrandLogo({
  size = 'sm',
  surface = 'light',
  className = '',
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  const ringClass =
    surface === 'dark'
      ? 'border border-[#C9A96E]/45 bg-[#0F4C3A]'
      : 'border border-[#0F4C3A]/15 bg-[#0F4C3A]';

  if (hasError) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center font-display font-semibold tracking-tight text-[#DFC48F] ${SIZE_CLASSES[size]} ${ringClass} ${className}`}
      >
        {CONSULTANT.monogram}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${SIZE_CLASSES[size]} ${ringClass} ${className}`}
    >
      <Image
        src={CONSULTANT.logoImage}
        alt={`${CONSULTANT.fullName} Architectural Monogram`}
        fill
        priority
        sizes={PIXEL_SIZES[size]}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="scale-[1.18] object-cover"
      />
    </span>
  );
}
