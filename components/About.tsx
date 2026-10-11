'use client';

import Reveal from './Reveal';
import HeroCTA from './HeroCTA';

export default function About() {
  return (
    <section 
      id="about"
      className="w-full bg-brand-bg pt-[100px] pb-[200px] flex flex-col justify-start items-start text-left"
    >
      <div className="max-w-[1046px] w-full space-y-8">
        
        <Reveal
          as="p"
          type="lines"
          duration={1.4}
          delay={0.00}
          className="text-[20px] md:text-[34px] leading-[28px] md:leading-[42px] font-normal text-brand-black tracking-tight"
        >
          I take something complex and find the clearest, simplest way to present it, with strong visual design and messaging that makes you look credible. I build in Framer, so you get something fast that you actually own.
        </Reveal>

        <Reveal
          as="p"
          type="lines"
          duration={1.4}
          delay={0.15}
          className="text-[20px] md:text-[34px] leading-[28px] md:leading-[42px] font-normal text-brand-black tracking-tight"
        >
          Most of the founders I enjoy working with are pre-seed to seed, in AI, healthcare, fintech, and hardware, especially products that are hard to explain at a glance. I'll get your site ready before you raise or launch.
        </Reveal>

        <Reveal type="fade" delay={0.4} className="mt-8">
          <HeroCTA label="Schedule a 15min call" bookingLocation="home_about" />
        </Reveal>

      </div>
    </section>
  );
}
