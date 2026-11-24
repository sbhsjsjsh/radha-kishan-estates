'use client';

import { useState, type FormEvent } from 'react';
import { Check, MessageCircle, AlertCircle } from 'lucide-react';
import { CONSULTANT, getWhatsAppHref } from '@/lib/consultant-data';

const SEGMENT_OPTIONS = [
  'Luxury Villas',
  'Skyscrapers & High-Rise Apartments',
  'Open Residential Plots (HMDA / DTCP)',
  'Commercial Properties & Office Spaces',
  'Residential Gated Communities',
  'Global Real Estate Opportunities',
];

const BUDGET_OPTIONS = [
  'Under ₹1.5 Cr',
  '₹1.5 Cr – ₹3.5 Cr',
  '₹3.5 Cr – ₹7 Cr',
  '₹7 Cr+ / Institutional',
  'Commercial Leasing / Yield',
  'Global / NRI Portfolio',
];

interface FormState {
  fullName: string;
  phone: string;
  segment: string;
  budget: string;
  notes: string;
}

export default function ConsultationForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    segment: SEGMENT_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const cleanDigits = form.phone.replace(/[^\d]/g, '');
    if (cleanDigits.length < 10 || cleanDigits.length > 15) {
      nextErrors.phone = 'Please enter a valid 10-digit phone or WhatsApp number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const whatsappBriefMessage = `Hello Radha Kishan,\nName: ${form.fullName}\nPhone: ${form.phone}\nInterest: ${form.segment}\nBudget / Scope: ${form.budget}${form.notes.trim() ? `\nPreferred Corridors / Notes: ${form.notes.trim()}` : ''}\nPlease let me know a convenient time to discuss.`;

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0F4C3A] text-white">
            <Check className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-zinc-950">
              Consultation Brief Ready
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
              Thank you, {form.fullName}. Your requirement for{' '}
              <span className="font-medium text-zinc-900">{form.segment}</span> ({form.budget})
              has been prepared. Tap below to send this brief directly to{' '}
              {CONSULTANT.fullName} on WhatsApp for immediate shortlisting.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={getWhatsAppHref(whatsappBriefMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0F4C3A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0B3B2D]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Send Brief via WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({
                fullName: '',
                phone: '',
                segment: SEGMENT_OPTIONS[0],
                budget: BUDGET_OPTIONS[1],
                notes: '',
              });
            }}
            className="min-h-11 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="inquiry-name"
            className="block text-xs font-medium text-zinc-700"
          >
            Full Name
          </label>
          <input
            id="inquiry-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, fullName: e.target.value }));
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="e.g. Arvind Reddy"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'inquiry-name-error' : undefined}
            className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
          />
          {errors.fullName && (
            <p
              id="inquiry-name-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry-phone"
            className="block text-xs font-medium text-zinc-700"
          >
            Phone or WhatsApp Number
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, phone: e.target.value }));
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="+91 98XXX XXXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
            className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2 font-mono text-sm text-zinc-950 tabular-nums placeholder:font-sans placeholder:text-zinc-400 focus:border-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
          />
          {errors.phone && (
            <p
              id="inquiry-phone-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry-segment"
            className="block text-xs font-medium text-zinc-700"
          >
            Property Segment
          </label>
          <select
            id="inquiry-segment"
            name="segment"
            value={form.segment}
            onChange={(e) => setForm((prev) => ({ ...prev, segment: e.target.value }))}
            className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-950 focus:border-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
          >
            {SEGMENT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="inquiry-budget"
            className="block text-xs font-medium text-zinc-700"
          >
            Indicative Budget / Scope
          </label>
          <select
            id="inquiry-budget"
            name="budget"
            value={form.budget}
            onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
            className="mt-1.5 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-950 focus:border-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="inquiry-notes"
            className="block text-xs font-medium text-zinc-700"
          >
            Preferred Corridors or Specific Requirements (Optional)
          </label>
          <textarea
            id="inquiry-notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="e.g. East-facing 4 BHK villa in Mokila or Neopolis skyscraper with immediate site visit this weekend."
            className="mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500">
          Direct private desk · {CONSULTANT.operatingHours}
        </p>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0F4C3A] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0B3B2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] focus-visible:ring-offset-2"
        >
          Request Private Consultation
        </button>
      </div>
    </form>
  );
}
