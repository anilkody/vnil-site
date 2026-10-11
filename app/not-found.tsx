import type { Metadata } from 'next';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import HeroCTA from '@/components/HeroCTA';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Vnil',
  description: "This page doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-black flex flex-col items-center select-text w-full">
      <Header />

      <main className="main-layout flex-grow w-full flex flex-col justify-center items-start md:items-center text-left md:text-center pt-[140px] md:pt-[160px] pb-[100px]">
        <h1 className="text-brand-black">
          404
        </h1>

        <Reveal type="fade" delay={0.1} className="mt-[12px] md:mt-[16px]">
          <p className="text-[18px] md:text-[22px] leading-[26px] md:leading-[30px] font-medium tracking-[-0.02em] text-brand-black/60">
            This page doesn&apos;t exist
          </p>
        </Reveal>

        <Reveal type="fade" delay={0.2} className="mt-[32px] md:mt-[40px]">
          <HeroCTA label="Return home" href="/" />
        </Reveal>
      </main>
    </div>
  );
}
