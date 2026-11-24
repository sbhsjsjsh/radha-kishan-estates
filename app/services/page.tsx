import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import ConsultationForm from '@/components/ConsultationForm';
import { SubtleReveal } from '@/components/MotionWrapper';
import {
  ADVISORY_PROCESS,
  ADVISORY_SERVICES,
  CONSULTANT,
  getWhatsAppHref,
} from '@/lib/consultant-data';

export const metadata: Metadata = {
  title: 'Advisory & Services — Radha Kishan Bhavani Prasad | Hyderabad',
  description:
    'Real estate consultancy services in Hyderabad covering luxury villas, skyscrapers, apartments, open plots, commercial office spaces, residential communities, and global opportunities.',
};

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
          <SubtleReveal className="max-w-3xl">
            <p className="text-xs font-medium text-[#0F4C3A]">
              Real Estate Advisory Practice · Hyderabad & Global
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              End-to-end representation across residential, commercial, land & global assets
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Whether acquiring a family luxury villa in Jubilee Hills, investing in a West
              Hyderabad skyscraper, securing clear-title open plots along the ORR, leasing Grade-A
              office space, or diversifying globally, {CONSULTANT.fullName} provides transparent,
              research-backed guidance from shortlisting through registration.
            </p>
          </SubtleReveal>
        </div>
      </section>

      {/* Detailed 6 Segments */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {ADVISORY_SERVICES.map((service) => (
            <article
              key={service.index}
              className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                  <span className="font-mono text-xs font-medium text-[#0F4C3A] tabular-nums">
                    Segment {service.index}
                  </span>
                  <span className="text-xs text-zinc-500 truncate">
                    {service.corridors}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-zinc-800">
                  {service.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-zinc-100 pt-5 text-sm text-zinc-700">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C3A]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-2">
                <a
                  href={getWhatsAppHref(
                    `Hello Radha Kishan, I would like to discuss ${service.title} requirements.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#0F4C3A] transition-colors hover:text-[#0B3B2D] hover:underline"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Inquire About {service.segment}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4-Step Transaction Process */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#0F4C3A]">
                How We Work
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Structured acquisition & leasing workflow
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 hover:text-[#0F4C3A]"
            >
              <span>Browse Current Portfolio</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORY_PROCESS.map((item) => (
              <div
                key={item.step}
                className="border-t border-zinc-200 pt-5"
              >
                <span className="font-mono text-xs font-medium text-[#0F4C3A] tabular-nums">
                  Step {item.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-zinc-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#0F4C3A]">
              Begin a Conversation
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950">
              Schedule a private advisory call
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Tell us whether you are buying, selling, leasing, or building an NRI portfolio. Every
              consultation is confidential and handled directly by {CONSULTANT.fullName}.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
