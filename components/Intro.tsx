'use client';

import { motion } from 'framer-motion';
import HeroHeadline from './HeroHeadline';
import HeroCTA from './HeroCTA';

export default function Intro() {
  return (
    <section 
      id="hero"
      className="w-full bg-brand-bg pt-[200px] md:pt-[220px] pb-[130px] flex flex-col justify-start items-start md:items-center text-left md:text-center"
    >
      <div className="max-w-[1020px] w-full space-y-[24px] md:space-y-[60px] flex flex-col items-start md:items-center justify-start md:justify-center">
        
        {/* H1 Tagline */}
        <HeroHeadline 
          text="I design landing pages that help startups explain their product clearly and look credible before they raise or launch."
          className="text-[28px] md:text-[50px] leading-[32px] md:leading-[54px] font-medium tracking-[-0.01em] text-brand-black w-full max-w-[980px] text-left md:text-center md:mx-auto"
          delay={0.1}
        />

        {/* CTA Row */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="md:mx-auto"
        >
          <HeroCTA label="Show me your startup" bookingLocation="hero">
            {/* Overlapping circular badges */}
            <div className="flex items-center">
              {/* vnil icon badge */}
              <div className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-2 border-white flex items-center justify-center shadow-sm select-none relative z-10">
                <img src="/images/vnil.webp" alt="vnil" className="w-full h-full object-cover" draggable="false" />
              </div>

              {/* Google Meet icon badge */}
              <div className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-2 border-white flex items-center justify-center shadow-sm select-none relative z-0 -ml-[10px] md:-ml-[14px]">
                <img src="/images/google-meet.webp" alt="Google Meet" className="w-full h-full object-cover" draggable="false" />
              </div>
            </div>
          </HeroCTA>

        </motion.div>

      </div>
    </section>
  );
}
