'use client';

import { useState, useSyncExternalStore } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Phone,
  MessageCircle,
  Download,
  Copy,
  Check,
  Share2,
  MapPin,
  Printer,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import {
  ADVISORY_SERVICES,
  CONSULTANT,
  buildVCardString,
  getWhatsAppHref,
} from '@/lib/consultant-data';

const emptySubscribe = () => () => {};

export default function DigitalCardStudio() {
  const [selectedTopic, setSelectedTopic] = useState<string>('Luxury Villas');
  const [copiedState, setCopiedState] = useState<'phone' | 'url' | null>(null);
  const [vcardSaved, setVcardSaved] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const cardUrl = isClient ? window.location.href : '';

  const handleSaveVCard = () => {
    const vcf = buildVCardString(cardUrl || undefined);
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Radha-Kishan-Bhavani-Prasad.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setVcardSaved(true);
    setTimeout(() => setVcardSaved(false), 2600);
  };

  const handleCopy = async (kind: 'phone' | 'url') => {
    const value = kind === 'phone' ? CONSULTANT.phoneDisplay : cardUrl;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedState(kind);
      setTimeout(() => setCopiedState(null), 2200);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleNativeShare = async () => {
    if (!cardUrl) return;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${CONSULTANT.fullName} — Property Consultant, Hyderabad`,
          text: `Connect with ${CONSULTANT.fullName} (${CONSULTANT.phoneDisplay}) for Luxury Villas, Skyscrapers, Apartments, Open Plots, Commercial Spaces & Global Real Estate.`,
          url: cardUrl,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }
    handleCopy('url');
  };

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
      {/* Executive Profile Panel */}
      <section
        aria-label="Advisor executive profile"
        className="flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950 p-7 text-zinc-100 sm:p-10 lg:col-span-7"
      >
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-zinc-400">
                Real Estate Advisory · Hyderabad, India
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {CONSULTANT.fullName}
              </h1>
              <p className="mt-1.5 text-sm text-zinc-300">
                {CONSULTANT.role}
              </p>
            </div>
            <BrandLogo size="lg" surface="dark" />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400">Direct Mobile & WhatsApp</p>
              <a
                href={`tel:${CONSULTANT.phoneRaw}`}
                className="mt-1 inline-block font-mono text-lg font-medium text-white tabular-nums transition-colors hover:text-zinc-300"
              >
                {CONSULTANT.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Primary Jurisdiction</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-100">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Hyderabad, Telangana · Global Desk</span>
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-zinc-800 pt-6">
            <p className="text-xs text-zinc-400">Core Real Estate Practice</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              Luxury Villas · Skyscrapers & High-Rise Apartments · Residential Homes · HMDA / DTCP
              Open Plots · Commercial Properties & Grade-A Office Spaces · Global Real Estate
              Opportunities
            </p>
          </div>
        </div>

        {/* Instant Tap Actions */}
        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleSaveVCard}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {vcardSaved ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span>Saved to Contacts (.vcf)</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Save Contact (.vcf)</span>
              </>
            )}
          </button>

          <a
            href={`tel:${CONSULTANT.phoneRaw}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={() => handleCopy('phone')}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors hover:border-zinc-500 hover:text-white"
          >
            {copiedState === 'phone' ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Copy Number</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* QR Code & Tailored WhatsApp Launcher */}
      <section
        aria-label="Share profile and instant WhatsApp inquiry"
        className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-7 sm:p-8 lg:col-span-5"
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-950">
              Scan or Share Profile
            </h2>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>
          </div>

          <div className="mt-5 flex flex-col items-center rounded-lg border border-zinc-200 bg-[#FAFAFA] p-5 sm:flex-row sm:gap-6">
            <div className="shrink-0 rounded-md bg-white p-2.5">
              <QRCodeSVG
                value={cardUrl || `tel:${CONSULTANT.phoneRaw}`}
                size={132}
                bgColor="#FFFFFF"
                fgColor="#18181B"
                level="M"
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <p className="text-sm font-semibold text-zinc-900">
                In-Person QR Exchange
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                Point any phone camera at this code to open Radha Kishan’s portfolio and save his
                number immediately.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copiedState === 'url' ? 'Link Copied' : 'Share Link'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold text-zinc-900">
              Start a Topic-Specific WhatsApp Message
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ADVISORY_SERVICES.map((service) => {
                const label = service.segment;
                const active = selectedTopic === label;
                return (
                  <button
                    key={service.index}
                    type="button"
                    onClick={() => setSelectedTopic(label)}
                    className={`min-h-9 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-[#0F4C3A] text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-zinc-200 pt-5">
          <a
            href={getWhatsAppHref(
              `Hello Radha Kishan, I visited your profile page and would like to discuss ${selectedTopic} opportunities.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0F4C3A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2D]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Message About {selectedTopic}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
