'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  MessageCircle,
  Phone,
  X,
  Check,
} from 'lucide-react';
import PropertyImage from '@/components/PropertyImage';
import {
  CONSULTANT,
  PORTFOLIO_PROPERTIES,
  getWhatsAppHref,
  type PortfolioProperty,
  type PropertySegment,
} from '@/lib/consultant-data';

const SEGMENTS: Array<'All' | PropertySegment> = [
  'All',
  'Luxury Villas',
  'Skyscrapers & Apartments',
  'Open Plots',
  'Commercial & Office',
  'Global Opportunities',
];

const CORRIDORS: Array<'All Corridors' | PortfolioProperty['corridor']> = [
  'All Corridors',
  'West Hyderabad',
  'Central Heritage',
  'South Corridor',
  'International',
];

interface PortfolioShowcaseProps {
  mode?: 'featured' | 'catalog';
}

export default function PortfolioShowcase({
  mode = 'featured',
}: PortfolioShowcaseProps) {
  const [activeSegment, setActiveSegment] = useState<'All' | PropertySegment>('All');
  const [activeCorridor, setActiveCorridor] = useState<
    'All Corridors' | PortfolioProperty['corridor']
  >('All Corridors');
  const [selectedProperty, setSelectedProperty] = useState<PortfolioProperty | null>(
    null
  );

  useEffect(() => {
    if (!selectedProperty) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProperty(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProperty]);

  const filteredProperties = useMemo(() => {
    const base =
      mode === 'featured' && activeSegment === 'All'
        ? PORTFOLIO_PROPERTIES.slice(0, 5)
        : PORTFOLIO_PROPERTIES;

    return base.filter((item) => {
      const matchesSegment =
        activeSegment === 'All' || item.segment === activeSegment;
      const matchesCorridor =
        mode !== 'catalog' ||
        activeCorridor === 'All Corridors' ||
        item.corridor === activeCorridor;
      return matchesSegment && matchesCorridor;
    });
  }, [activeSegment, activeCorridor, mode]);

  return (
    <div>
      {/* Interactive Filter Controls */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter properties by segment"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
        >
          {SEGMENTS.map((segment) => {
            const isActive = activeSegment === segment;
            return (
              <button
                key={segment}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSegment(segment)}
                className={`min-h-10 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] ${
                  isActive
                    ? 'bg-[#0F4C3A] text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                {segment}
              </button>
            );
          })}
        </div>

        {mode === 'catalog' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <label htmlFor="corridor-select" className="sr-only">
              Filter by corridor
            </label>
            <select
              id="corridor-select"
              value={activeCorridor}
              onChange={(e) =>
                setActiveCorridor(
                  e.target.value as 'All Corridors' | PortfolioProperty['corridor']
                )
              }
              className="min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
            >
              {CORRIDORS.map((corridor) => (
                <option key={corridor} value={corridor}>
                  {corridor}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <p className="tabular-nums">
          Showing {filteredProperties.length}{' '}
          {filteredProperties.length === 1 ? 'curated mandate' : 'curated mandates'}
          {activeSegment !== 'All' ? ` in ${activeSegment}` : ''}
        </p>
        {(activeSegment !== 'All' || activeCorridor !== 'All Corridors') && (
          <button
            type="button"
            onClick={() => {
              setActiveSegment('All');
              setActiveCorridor('All Corridors');
            }}
            className="text-xs font-medium text-[#0F4C3A] hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white px-6 py-14 text-center">
          <p className="font-display text-2xl font-medium text-zinc-900">
            No mandates match this filter combination
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
            Many off-market villas, plots, and commercial floors in Hyderabad are shared privately.
            Reset filters or message Radha Kishan directly for bespoke sourcing.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveSegment('All');
                setActiveCorridor('All Corridors');
              }}
              className="min-h-10 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              View All Listings
            </button>
            <a
              href={getWhatsAppHref(
                `Hello Radha Kishan, I am looking for ${activeSegment} in ${activeCorridor}. Please share private options.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#0F4C3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#0B3B2D]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Request Off-Market Options</span>
            </a>
          </div>
        </div>
      ) : (
        /* Architectural Bento / Editorial Grid */
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-12">
          {filteredProperties.map((property, index) => {
            const isHeroBento =
              mode === 'featured' && activeSegment === 'All' && index === 0;
            const colClasses = isHeroBento
              ? 'md:col-span-2 lg:col-span-7'
              : mode === 'featured' && activeSegment === 'All' && index === 1
                ? 'md:col-span-2 lg:col-span-5'
                : 'md:col-span-1 lg:col-span-4';

            return (
              <article
                key={property.id}
                className={`group flex flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white transition-colors duration-200 hover:border-zinc-400 ${colClasses}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProperty(property)}
                  className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F4C3A]"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-zinc-900 ${
                      isHeroBento ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                  >
                    <PropertyImage
                      src={property.image}
                      alt={property.imageAlt}
                      title={property.title}
                      sizes={
                        isHeroBento
                          ? '(max-width: 1024px) 100vw, 58vw'
                          : '(max-width: 768px) 100vw, 33vw'
                      }
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    />
                    <div className="absolute right-4 bottom-3.5 left-4 flex items-end justify-between gap-3 text-white">
                      <span className="text-xs font-medium tracking-wide text-zinc-100">
                        {property.location}
                      </span>
                      <span className="font-mono text-xs font-medium text-white tabular-nums whitespace-nowrap shrink-0">
                        {property.priceGuidance}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                        <span className="font-medium text-[#0F4C3A]">
                          {property.segment}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{property.possession}</span>
                      </div>

                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-[#0F4C3A]">
                        {property.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                        {property.summary}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                      <span className="font-mono text-xs text-zinc-700 tabular-nums truncate">
                        {property.areaSpec}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 whitespace-nowrap shrink-0 group-hover:text-[#0F4C3A]">
                        <span>View Dossier</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      )}

      {/* Fullscreen Property Dossier Lightbox Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-dossier-title"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/75 p-4 sm:p-6 backdrop-blur-xs"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-zinc-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                aria-label="Close property dossier"
                className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/95 text-zinc-900 shadow-sm transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="relative aspect-[16/10] w-full bg-zinc-900 lg:col-span-6 lg:aspect-auto lg:min-h-[480px]">
                  <PropertyImage
                    src={selectedProperty.image}
                    alt={selectedProperty.imageAlt}
                    title={selectedProperty.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                  />
                  <div className="absolute right-5 bottom-5 left-5 text-white">
                    <p className="text-xs text-zinc-200">
                      {selectedProperty.corridor} · {selectedProperty.location}
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium tabular-nums">
                      {selectedProperty.priceGuidance}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                      <span className="font-medium text-[#0F4C3A]">
                        {selectedProperty.segment}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{selectedProperty.possession}</span>
                    </div>

                    <h3
                      id="property-dossier-title"
                      className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950"
                    >
                      {selectedProperty.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {selectedProperty.summary}
                    </p>

                    <dl className="mt-6 grid grid-cols-1 gap-3.5 border-y border-zinc-200 py-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-zinc-500">Configuration</dt>
                        <dd className="mt-0.5 font-medium text-zinc-900">
                          {selectedProperty.configuration}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-zinc-500">Area Specification</dt>
                        <dd className="mt-0.5 font-mono text-xs font-medium text-zinc-900 tabular-nums">
                          {selectedProperty.areaSpec}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-zinc-500">Approvals & Compliance</dt>
                        <dd className="mt-0.5 font-medium text-zinc-900">
                          {selectedProperty.approvalStatus}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5">
                      <h4 className="text-xs font-semibold text-zinc-900">
                        Key Advisory Highlights
                      </h4>
                      <ul className="mt-2.5 space-y-2 text-sm text-zinc-700">
                        {selectedProperty.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C3A]"
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={getWhatsAppHref(
                        `Hello Radha Kishan, I would like the brochure, floor plans, and site visit schedule for "${selectedProperty.title}" (${selectedProperty.location}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#0F4C3A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2D]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Request Brochure on WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${CONSULTANT.phoneRaw}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 transition-colors hover:bg-zinc-50"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
