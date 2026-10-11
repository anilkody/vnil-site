'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import Intro from '../components/Intro';
import HomeWorkGrid from '../components/HomeWorkGrid';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Respect user's preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // subtle inertia, not floaty
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-black font-sans selection:bg-brand-black selection:text-brand-bg flex flex-col items-center w-full">
      {/* 100% / Fluid Navigation Header */}
      <Header />

      {/* Core Content Area: min(1440px, 100% - 80px) */}
      <main className="main-layout flex-grow w-full">
        {/* Hero Section */}
        <Intro />

        {/* Homepage 2-Item Centered Project Grid */}
        <HomeWorkGrid />

        {/* About / Bio segment */}
        <About />
      </main>

      {/* 100% / Fluid Footer */}
      <Footer />
    </div>
  );
}
