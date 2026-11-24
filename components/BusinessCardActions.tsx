'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Phone,
  MessageCircle,
  Download,
  QrCode,
  Copy,
  Check,
  X,
  Share2,
  Send,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import {
  CONSULTANT,
  buildVCardString,
  formatDisplayUrl,
  getProfileShareUrl,
  getProfileWhatsAppForwardHref,
  getWhatsAppHref,
} from '@/lib/consultant-data';

const emptySubscribe = () => () => {};

interface BusinessCardActionsProps {
  variant?: 'hero' | 'card';
}

export default function BusinessCardActions({
  variant = 'hero',
}: BusinessCardActionsProps) {
  const [copiedType, setCopiedType] = useState<'phone' | 'link' | null>(null);
  const [savedVCard, setSavedVCard] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const profileUrl = getProfileShareUrl(isClient ? window.location.origin : undefined);

  useEffect(() => {
    if (!qrOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQrOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [qrOpen]);

  const handleDownloadVCard = () => {
    const vcf = buildVCardString(profileUrl.startsWith('http') ? profileUrl : undefined);
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Radha-Kishan-Bhavani-Prasad.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setSavedVCard(true);
    setTimeout(() => setSavedVCard(false), 2600);
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONSULTANT.phoneDisplay);
      setCopiedType('phone');
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Ignore clipboard denial
    }
  };

  const handleCopyProfileLink = async () => {
    if (!profileUrl) return;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopiedType('link');
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Ignore clipboard denial
    }
  };

  const handleOneClickShare = async () => {
    if (!profileUrl) return;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${CONSULTANT.fullName} — Hyderabad Real Estate Advisor`,
          text: `${CONSULTANT.fullName} (${CONSULTANT.phoneDisplay}) — Luxury Villas, Skyscrapers, Apartments, Open Plots, Commercial & Global Real Estate.`,
          url: profileUrl,
        });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }
    await handleCopyProfileLink();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Primary Row: Dominant CTA + Save Contact + 1-Click Share */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0F4C3A] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0B3B2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp Consultation</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadVCard}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
          >
            {savedVCard ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span>Contact Saved (.vcf)</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0 text-zinc-700" aria-hidden="true" />
                <span>Save Contact</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleOneClickShare}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
          >
            {copiedType === 'link' ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span className="text-[#0F4C3A]">Profile Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 shrink-0 text-zinc-700" aria-hidden="true" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Utility Row: Direct Call, Copy Number, 1-Click WhatsApp Forward, Profile QR */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-zinc-700">
          <a
            href={`tel:${CONSULTANT.phoneRaw}`}
            className="inline-flex min-h-10 items-center gap-2 font-mono text-[13px] font-medium text-zinc-900 tabular-nums whitespace-nowrap shrink-0 transition-colors hover:text-[#0F4C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
            <span>{CONSULTANT.phoneDisplay}</span>
          </a>

          <span className="hidden text-zinc-300 sm:inline" aria-hidden="true">
            ·
          </span>

          <button
            type="button"
            onClick={handleCopyPhone}
            className="inline-flex min-h-10 items-center gap-1.5 text-sm text-zinc-600 whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
          >
            {copiedType === 'phone' ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-[#0F4C3A]" aria-hidden="true" />
                <span className="text-[#0F4C3A]">Number Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Copy Number</span>
              </>
            )}
          </button>

          <span className="hidden text-zinc-300 sm:inline" aria-hidden="true">
            ·
          </span>

          <a
            href={getProfileWhatsAppForwardHref(profileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 text-sm text-zinc-600 whitespace-nowrap shrink-0 transition-colors hover:text-[#0F4C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
          >
            <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Forward on WhatsApp</span>
          </a>

          {variant === 'hero' && (
            <>
              <span className="hidden text-zinc-300 sm:inline" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                className="inline-flex min-h-10 items-center gap-1.5 text-sm text-zinc-600 whitespace-nowrap shrink-0 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A]"
              >
                <QrCode className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Profile QR</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-xs"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <BrandLogo size="md" surface="light" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Advisor Profile</p>
                  <h3
                    id="qr-modal-title"
                    className="mt-0.5 font-display text-xl font-semibold tracking-tight text-zinc-950"
                  >
                    {CONSULTANT.fullName}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close QR code dialog"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center rounded-lg border border-zinc-200 bg-[#FAFAFA] p-6">
              <div className="rounded-md bg-white p-3">
                <QRCodeSVG
                  value={profileUrl.startsWith('http') ? profileUrl : `tel:${CONSULTANT.phoneRaw}`}
                  size={184}
                  bgColor="#FFFFFF"
                  fgColor="#18181B"
                  level="M"
                />
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-zinc-600">
                Scan to open the profile directly or share the direct domain link below.
              </p>
              <p className="mt-2 max-w-full truncate font-mono text-[11px] font-medium text-[#0F4C3A]">
                {formatDisplayUrl(profileUrl)}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={getProfileWhatsAppForwardHref(profileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0F4C3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2D]"
              >
                <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Forward Profile on WhatsApp</span>
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyProfileLink}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  {copiedType === 'link' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#0F4C3A]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Save vCard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
