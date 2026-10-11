import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyMedia from '@/components/case-study/CaseStudyMedia';
import CaseStudySectionRow from '@/components/case-study/CaseStudySectionRow';
import CaseStudyGallery from '@/components/case-study/CaseStudyGallery';
import CaseStudyCalEmbed from '@/components/case-study/CaseStudyCalEmbed';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/case-studies';

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const data = CASE_STUDIES[resolvedParams.slug];
  if (!data) return {};
  return {
    title: `${data.title} — Work`,
    description: data.contextParagraph1
  };
}

export default async function WorkDynamicPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const data = CASE_STUDIES[resolvedParams.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-black flex flex-col justify-between select-text">
      {/* Fixed Global Navigation Bar */}
      <Header />

      <main className="flex-grow w-full">
        {/* Step 1: Above the Fold (Title, Paragraphs, Live Project Button) */}
        <CaseStudyHero
          title={data.title}
          paragraph1={data.contextParagraph1}
          paragraph2={data.contextParagraph2}
          liveProjectUrl={data.liveProjectUrl}
        />

        {/* Step 2: Context Section - Main Media Thumbnail */}
        <CaseStudyMedia media={data.thumbnail} delay={0.2} />

        {/* Step 2 (Continued): Context Section - Title, Body, and Meta Fields */}
        <CaseStudySectionRow data={data.section1} />

        {/* Step 3: Gallery Section */}
        <CaseStudyGallery gallery={data.gallery} />

        {/* Step 3 (Continued): Results Section */}
        <CaseStudySectionRow data={data.section2} />

        {/* Step 4: Booking Widget Embed */}
        <CaseStudyCalEmbed />
      </main>

      {/* Fixed Global Footer */}
      <Footer />
    </div>
  );
}
