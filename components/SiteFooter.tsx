import Link from 'next/link';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { CONSULTANT, getWhatsAppHref } from '@/lib/consultant-data';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-zinc-950"
            >
              <BrandLogo size="md" surface="light" />
              <span>{CONSULTANT.fullName}</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
              {CONSULTANT.role} based in {CONSULTANT.city}, {CONSULTANT.country}. Advising across
              luxury villas, skyscrapers, apartments, open plots, commercial office spaces, and
              global real estate opportunities.
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              {CONSULTANT.city}, Telangana, India · {CONSULTANT.operatingHours}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold text-zinc-950">Navigation</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link href="/" className="transition-colors hover:text-zinc-950">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-zinc-950">
                  Hyderabad & Global Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-zinc-950">
                  Advisory & Segments
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition-colors hover:text-zinc-950">
                  Advisor Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-zinc-950">Direct Desk</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href={`tel:${CONSULTANT.phoneRaw}`}
                className="inline-flex items-center gap-2.5 font-mono text-zinc-800 tabular-nums transition-colors hover:text-[#0F4C3A]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span>{CONSULTANT.phoneDisplay}</span>
              </a>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-zinc-700 transition-colors hover:text-[#0F4C3A]"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span>Message on WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {CONSULTANT.fullName}. All rights reserved.</p>
          <p>Hyderabad Real Estate Advisory · Residential · Commercial · Global</p>
        </div>
      </div>
    </footer>
  );
}
