import type { Metadata } from 'next';

// /talk is a client page, so its metadata (incl. its own OG image) lives in this layout.
// Swap public/og-talk.png to change the /talk share image; the rest of the site keeps /og-image.png.
const TALK_OG = 'https://vnil.site/og-talk.png';
// Same title/description as the rest of the site; only the OG image differs.
const TITLE = 'Vnil — Startup Landing Page Designer';
const DESCRIPTION = "I design landing pages for pre-seed and seed startups. Clear messaging, strong visual design, built in Framer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://vnil.site/talk',
    siteName: 'Vnil',
    locale: 'en_US',
    type: 'website',
    images: [{ url: TALK_OG, width: 1024, height: 537, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@itsvnil',
    title: TITLE,
    description: DESCRIPTION,
    images: [TALK_OG],
  },
};

export default function TalkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
