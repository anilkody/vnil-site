import type { Metadata, Viewport } from 'next';
import './globals.css';
import BtnRollInitializer from '../components/BtnRollInitializer';
import PageTransitionProvider from '../components/PageTransitionProvider';
import Cursor from '../components/Cursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://vnil.site'),
  title: 'Vnil — Startup Landing Page Designer',
  description: "I design landing pages for pre-seed and seed startups. Clear messaging, strong visual design, built in Framer.",
  authors: [{ name: 'Vnil' }],
  alternates: {
    canonical: 'https://vnil.site/',
  },
  openGraph: {
    title: 'Vnil — Startup Landing Page Designer',
    description: "I design landing pages for pre-seed and seed startups. Clear messaging, strong visual design, built in Framer.",
    url: 'https://vnil.site/',
    siteName: 'Vnil',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://vnil.site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vnil — Startup Landing Page Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@itsvnil',
    title: 'Vnil — Startup Landing Page Designer',
    description: "I design landing pages for pre-seed and seed startups. Clear messaging, strong visual design, built in Framer.",
    images: ['https://vnil.site/og-image.png'],
  },
  other: {
    'theme-color': '#ffffff',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anil Kody',
    alternateName: 'Vnil',
    url: 'https://vnil.site/',
    image: 'https://vnil.site/vnil.jpg',
    sameAs: [
      'https://x.com/itsvnil',
      'https://x.com/anilkody',
      'https://www.framer.com/@anilkody',
      'https://contra.com/anilkody',
      'https://futured.studio'
    ],
    jobTitle: 'Web Designer',
    description: "I design clear, focused websites for YC and VC-backed startups — so visitors instantly understand what you do and what to do next."
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Enables hide-until-revealed text; a CSS failsafe un-hides if JS never runs */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal');",
          }}
        />
        {/* Google Analytics / GTM */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1K39B4GLWB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1K39B4GLWB');
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Cursor />
        <BtnRollInitializer />
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}

