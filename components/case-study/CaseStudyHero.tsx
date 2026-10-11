'use client';

import HeroHeadline from '@/components/HeroHeadline';
import ClientReveal from '@/components/ClientReveal';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface CaseStudyHeroProps {
  title: string;
  paragraph1: string;
  paragraph2?: string;
  liveProjectUrl: string;
  buttonText?: string;
}

export default function CaseStudyHero({
  title,
  paragraph1,
  paragraph2,
  liveProjectUrl,
  buttonText = 'View live project'
}: CaseStudyHeroProps) {
  return (
    <section className="w-full bg-brand-bg pt-[180px] md:pt-[240px] pb-[32px] md:pb-[48px]">
      <div className="main-layout">
        <div className="max-w-[680px] w-full">
          {/* H1 Title: 34px Medium weight (500), -0.8px letter spacing, 42px line height */}
          <HeroHeadline
            text={title}
            className="case-study-h1 text-[34px] !text-[34px] font-medium !font-medium tracking-[-0.8px] !tracking-[-0.8px] leading-[42px] !leading-[42px] text-brand-black"
            style={{ fontSize: '34px', fontWeight: 500, letterSpacing: '-0.8px', lineHeight: '42px', color: '#000000' }}
            delay={0.1}
          />

          {/* Paragraph 1: 16px font size, 22px line-height for optimal reading flow */}
          <ClientReveal delay={0.2}>
            <p className="mt-[14px] text-[16px] font-normal tracking-[-0.01em] text-brand-black/80 leading-[22px]">
              {paragraph1}
            </p>
          </ClientReveal>

          {/* Paragraph 2: 16px font size, 22px line-height */}
          {paragraph2 && (
            <ClientReveal delay={0.3}>
              <p className="mt-[10px] text-[16px] font-normal tracking-[-0.01em] text-brand-black/80 leading-[22px]">
                {paragraph2}
              </p>
            </ClientReveal>
          )}

          {/* Live Project Link (Footer Nav Link Component Style) */}
          <ClientReveal delay={0.3}>
            <div className="mt-[20px] md:mt-[24px]">
              <a
                href={liveProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('case_study_live_click', { case_study_name: title, link_url: liveProjectUrl })}
                className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-brand-black hover:text-brand-black/80 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="btn-roll">{buttonText}</span>
                <ArrowRight className="w-[20px] h-[20px] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0 text-brand-black" />
              </a>
            </div>
          </ClientReveal>
        </div>
      </div>
    </section>
  );
}
