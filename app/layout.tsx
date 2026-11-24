import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  IBM_Plex_Mono,
} from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { AppMotionProvider } from '@/components/MotionWrapper';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Radha Kishan Bhavani Prasad — Hyderabad Real Estate Advisory',
  description:
    'Personal real estate advisory website and portfolio of Radha Kishan Bhavani Prasad, property consultant in Hyderabad specializing in luxury villas, skyscrapers, apartments, open plots, commercial office spaces, and global real estate opportunities.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'Radha Kishan Bhavani Prasad — Hyderabad Real Estate Advisory',
    description:
      'Property consultant in Hyderabad dealing in luxury villas, skyscrapers, apartments, open residential plots, commercial office spaces, and global real estate opportunities.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radha Kishan Bhavani Prasad — Hyderabad Real Estate Advisory',
    description:
      'Property consultant in Hyderabad dealing in luxury villas, skyscrapers, apartments, open plots, commercial office spaces, and global real estate.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAFA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${ibmPlexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#FAFAFA] text-zinc-900 antialiased"
      >
        <AppMotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AppMotionProvider>
      </body>
    </html>
  );
}
