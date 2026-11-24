'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { CONSULTANT } from '@/lib/consultant-data';

const NAV_LINKS = [
  { href: '/', label: 'Overview' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/profile', label: 'My Profile' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const mobileOpen = openPath === pathname;

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPath(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-[#FAFAFA]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-15 max-w-[1200px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-element brand lockup */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
        >
          <BrandLogo size="sm" surface="light" />
          <span>{CONSULTANT.shortName}</span>
        </Link>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'text-zinc-950 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#0F4C3A]'
                    : 'hover:text-zinc-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (desktop) + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/#inquiry"
            className="hidden md:inline-flex min-h-10 items-center justify-center rounded-md bg-[#0F4C3A] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0B3B2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
          >
            Schedule Consultation
          </Link>

          <button
            type="button"
            onClick={() => setOpenPath((prev) => (prev === pathname ? null : pathname))}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-900 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-panel"
          className="border-t border-zinc-200 bg-white px-5 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpenPath(null)}
                  className={`flex min-h-11 items-center rounded-md px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-[#0F4C3A]'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-zinc-200 pt-3">
              <Link
                href="/#inquiry"
                onClick={() => setOpenPath(null)}
                className="flex min-h-11 w-full items-center justify-center rounded-md bg-[#0F4C3A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2D]"
              >
                Schedule Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
