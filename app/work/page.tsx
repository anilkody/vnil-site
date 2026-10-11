import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeWorkGrid from '@/components/HomeWorkGrid';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected landing page design and web projects for YC and VC-backed startups.'
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-black flex flex-col justify-between select-text">
      <Header />
      
      <main className="flex-grow w-full pt-[250px] md:pt-[290px]">
        <div className="main-layout mb-[40px] md:mb-[60px]">
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-medium tracking-[-0.04em] leading-[1.1em] text-brand-black">
            Selected Work
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] text-brand-black/70 max-w-[560px] tracking-[0.01em] leading-[1.5em]">
            Strategic landing pages built for YC and VC-backed startups to position clearly for their next raise.
          </p>
        </div>

        <div className="main-layout">
          <HomeWorkGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
