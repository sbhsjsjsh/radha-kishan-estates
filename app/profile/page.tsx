import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DigitalCardStudio from '@/components/DigitalCardStudio';
import { SubtleReveal } from '@/components/MotionWrapper';
import { HYDERABAD_CORRIDORS } from '@/lib/consultant-data';

export const metadata: Metadata = {
  title: 'My Profile — Radha Kishan Bhavani Prasad | Hyderabad Real Estate',
  description:
    'Advisor profile of Radha Kishan Bhavani Prasad (+91 75698 91812), Property Consultant in Hyderabad. Save contact (.vcf), scan QR code, call, or message on WhatsApp.',
};

export default function AdvisorProfilePage() {
  return (
    <div className="bg-[#FAFAFA]">
      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:py-16">
        <SubtleReveal>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#0F4C3A]">
                Executive Advisor Profile
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Save contact directly to your phone, scan the QR code in meetings, or start a
                topic-specific WhatsApp message.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 hover:text-[#0F4C3A]"
            >
              <span>View Curated Portfolio</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <DigitalCardStudio />
        </SubtleReveal>

        {/* Quick Corridor Reference Below Card */}
        <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-semibold text-zinc-950">
              Active Hyderabad Corridors & Global Markets
            </h2>
            <Link
              href="/services"
              className="text-xs font-medium text-[#0F4C3A] hover:underline whitespace-nowrap"
            >
              Full Advisory Scope
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HYDERABAD_CORRIDORS.map((corridor) => (
              <div key={corridor.corridor}>
                <h3 className="text-sm font-semibold text-zinc-950">
                  {corridor.corridor}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                  {corridor.microMarkets}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
