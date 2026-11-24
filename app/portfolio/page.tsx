import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import { SubtleReveal } from '@/components/MotionWrapper';
import { CONSULTANT, getWhatsAppHref } from '@/lib/consultant-data';

export const metadata: Metadata = {
  title: 'Portfolio — Radha Kishan Bhavani Prasad | Hyderabad Real Estate',
  description:
    'Browse curated luxury villas, high-rise skyscrapers, apartments, HMDA/DTCP open plots, Grade-A commercial offices, and global real estate mandates in Hyderabad.',
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
          <SubtleReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#0F4C3A]">
                Curated Real Estate Portfolio · Hyderabad & Global
              </p>
              <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Representative properties & off-market mandates
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Filter across luxury villas, skyscrapers, open residential plots, commercial office
                spaces, and global waterfront launches. Click any property to inspect specifications
                or request brochures and site visits directly on WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={getWhatsAppHref(
                  'Hello Radha Kishan, I am browsing your portfolio and would like to discuss private off-market options.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#0F4C3A] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-[#0B3B2D]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Request Private Mandates</span>
              </a>
              <Link
                href="/profile"
                className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 whitespace-nowrap transition-colors hover:bg-zinc-50"
              >
                My Profile
              </Link>
            </div>
          </SubtleReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
        <PortfolioShowcase mode="catalog" />
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-zinc-950 sm:text-3xl">
              Looking for a specific builder, floor plate, or land parcel?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-600">
              {CONSULTANT.fullName} sources bespoke developer inventory and confidential resale
              mandates across all Hyderabad micro-markets and select global destinations.
            </p>
          </div>
          <Link
            href="/#inquiry"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0F4C3A] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#0B3B2D]"
          >
            Share Your Brief
          </Link>
        </div>
      </section>
    </div>
  );
}
