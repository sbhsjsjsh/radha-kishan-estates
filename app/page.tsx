import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import PropertyImage from '@/components/PropertyImage';
import BusinessCardActions from '@/components/BusinessCardActions';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import ConsultationForm from '@/components/ConsultationForm';
import { SubtleReveal } from '@/components/MotionWrapper';
import {
  ADVISORY_METRICS,
  ADVISORY_SERVICES,
  CONSULTANT,
  HYDERABAD_CORRIDORS,
  getWhatsAppHref,
} from '@/lib/consultant-data';

export default function HomePage() {
  return (
    <div className="bg-[#FAFAFA]">
      {/* Split-Screen Architectural Hero & Executive Digital Card */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-12 sm:px-8 lg:pt-14 lg:pb-16">
          <SubtleReveal className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Typographic Identity & Instant Digital Card Actions */}
            <div className="flex flex-col justify-between lg:col-span-6 lg:py-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-zinc-500">
                  Property Consultant · Hyderabad, India · Global Real Estate
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.35rem,4.3vw,3.75rem)] leading-[1.06] font-semibold tracking-tight text-zinc-950">
                  {CONSULTANT.headline}
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
                  {CONSULTANT.subheadline}
                </p>

                <div className="mt-6 border-t border-zinc-200 pt-5">
                  <p className="text-xs font-medium text-zinc-500">
                    Advisory Scope
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-800">
                    Luxury Villas · Skyscrapers & Apartments · Open Residential Plots · Commercial
                    & Office Spaces · Gated Residential · Global Opportunities
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-zinc-200 pt-6">
                <BusinessCardActions variant="hero" />
              </div>
            </div>

            {/* Right Column: Full-Height Architectural Photography Focal Anchor */}
            <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 sm:min-h-[400px] lg:col-span-6 lg:min-h-full">
              <PropertyImage
                src={CONSULTANT.heroImage}
                alt={CONSULTANT.heroImageAlt}
                title="Hyderabad Financial District Skyline"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              />
              <div className="absolute right-6 bottom-6 left-6 flex flex-col gap-1 text-white sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    Hyderabad, Telangana · India
                  </p>
                  <p className="font-display text-2xl font-medium tracking-tight text-white">
                    Financial District, Jubilee Hills & ORR Corridors
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-zinc-200 underline underline-offset-4 whitespace-nowrap shrink-0 transition-colors hover:text-white sm:mt-0"
                >
                  <span>Advisor Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </SubtleReveal>

          {/* Full-Width 4-Column Advisory Footprint Row Below Hero Split */}
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORY_METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="font-display text-3xl font-semibold tracking-tight text-zinc-950 tabular-nums">
                  {metric.value}
                </span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  {metric.label}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Numbered Real Estate Segments / Services */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#0F4C3A]">
              Full-Spectrum Property Consultancy
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Dedicated representation across every Hyderabad & global real estate segment
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 transition-colors hover:text-[#0F4C3A]"
          >
            <span>Explore Advisory Services</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {ADVISORY_SERVICES.map((service) => (
            <div
              key={service.index}
              className="flex flex-col justify-between border-t border-zinc-200 pt-6"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-medium text-[#0F4C3A] tabular-nums">
                    {service.index}.
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-950">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {service.description}
                </p>
              </div>
              <p className="mt-5 text-xs text-zinc-500">{service.corridors}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Curated Hyderabad & Global Portfolio Bento Showcase */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#0F4C3A]">
                Curated Mandates & Opportunities
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Featured Hyderabad & international portfolio
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                Select any segment below to filter representative villas, high-rise skyscrapers,
                plotted estates, Grade-A offices, and global waterfront launches. Click any listing
                to open its specification dossier.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 transition-colors hover:text-[#0F4C3A]"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <PortfolioShowcase mode="featured" />
        </div>
      </section>

      {/* Section 4: Hyderabad Market Corridors Overview */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#0F4C3A]">
            Local Market Intelligence
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Key Hyderabad growth corridors covered
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
            Every transaction is backed by micro-market price comparisons, infrastructure timelines,
            and HMDA, DTCP, or TS-RERA title screening across Hyderabad’s fastest-appreciating belts.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="divide-y divide-zinc-200">
            {HYDERABAD_CORRIDORS.map((item, idx) => (
              <div
                key={item.corridor}
                className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-6"
              >
                <div className="lg:col-span-3">
                  <span className="font-mono text-xs text-zinc-400 tabular-nums">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-zinc-950">
                    {item.corridor}
                  </h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs text-zinc-500">Micro-Markets</p>
                  <p className="mt-1 text-sm font-medium text-zinc-800">
                    {item.microMarkets}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs text-zinc-500">Primary Segments</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    {item.primaryAssetClasses}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs text-zinc-500">Value Driver</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {item.growthDriver}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Private Consultation & Site Visit Booking */}
      <section
        id="inquiry"
        className="scroll-mt-20 border-t border-zinc-200 bg-zinc-100/70"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-xs font-medium text-[#0F4C3A]">
                  Direct Advisory Desk
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                  Discuss your property requirement in Hyderabad or overseas
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                  Share your preferred segment, budget range, and timeline to receive a tailored
                  shortlist of verified villas, high-rise residences, open plots, commercial floors,
                  or global investments directly from {CONSULTANT.fullName}.
                </p>
              </div>

              <div className="mt-8 space-y-4 border-t border-zinc-200 pt-6 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Direct Phone & WhatsApp</p>
                  <a
                    href={`tel:${CONSULTANT.phoneRaw}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-base font-medium text-zinc-950 tabular-nums hover:text-[#0F4C3A]"
                  >
                    <Phone className="h-4 w-4 text-[#0F4C3A]" aria-hidden="true" />
                    <span>{CONSULTANT.phoneDisplay}</span>
                  </a>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Instant Chat</p>
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 font-medium text-[#0F4C3A] hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Open WhatsApp Conversation</span>
                  </a>
                </div>
                <p className="text-xs text-zinc-500">
                  Hyderabad, Telangana, India · Available for in-person site visits & NRI video tours
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
