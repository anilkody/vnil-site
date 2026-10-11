'use client';

import ClientReveal from '@/components/ClientReveal';
import { CaseStudySectionData } from './types';

interface CaseStudySectionRowProps {
  data: CaseStudySectionData;
  className?: string;
}

export default function CaseStudySectionRow({
  data,
  className = ''
}: CaseStudySectionRowProps) {
  return (
    <section className={`w-full bg-brand-bg pb-[48px] md:pb-[64px] ${className}`}>
      <div className="main-layout">
        <ClientReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start text-left">
            
            {/* Left Column: H2 Title (20px Medium, -0.8px tracking, 1.4em leading) + Body Paragraph (16px, 22px leading) */}
            <div className="md:col-span-6 lg:col-span-5 max-w-[580px]">
              <h2
                style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.8px', lineHeight: '1.4em', color: '#000000' }}
                className="case-study-h2 text-[20px] !text-[20px] font-medium !font-medium tracking-[-0.8px] !tracking-[-0.8px] leading-[1.4em] !leading-[1.4em] text-brand-black"
              >
                {data.title}
              </h2>
              <p className="mt-[10px] md:mt-[12px] text-[16px] font-normal tracking-[-0.01em] text-brand-black/80 leading-[22px]">
                {data.body}
              </p>
            </div>

            {/* Right Column: Stacked Meta Rows (Label: 16px Medium, Value: 16px Normal) */}
            <div className="md:col-span-6 lg:col-span-5 md:col-start-7 lg:col-start-8 w-full">
              <div className="flex flex-col w-full">
                {data.metaFields.map((field, idx) => (
                  <div
                    key={idx}
                    className="py-3 md:py-4 border-b border-brand-black/10 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    {/* Label (16px Medium, muted gray color) */}
                    <div className="text-[16px] font-medium text-brand-black/50 tracking-[-0.01em] mb-1">
                      {field.label}
                    </div>
                    {/* Value (16px Normal weight, dark color) */}
                    <div className="text-[16px] font-normal text-brand-black tracking-[-0.01em]">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </ClientReveal>
      </div>
    </section>
  );
}
