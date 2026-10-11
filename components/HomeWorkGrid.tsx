'use client';

import HomeProjectCard, { HomeProject } from './HomeProjectCard';
import ClientReveal from './ClientReveal';
import { CASE_STUDIES } from '@/data/case-studies';
import { trackEvent } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

const HOMEPAGE_PROJECTS: HomeProject[] = [
  {
    id: 1,
    name: 'Axal',
    description: CASE_STUDIES['axal'].cardDescription,
    img: '/assets/axal/axal-hero.webp',
    videoUrl: '/assets/axal/axal-hero.mp4',
    slug: 'axal',
    caseStudyUrl: '/work/axal',
    tags: [
      { label: 'Hardware Partner', color: 'text-[#626268] border-[#CFCFD6]' },
      { label: 'Positioning', color: 'text-[#6B655B] border-[#D6CFBF]' },
      { label: 'Concept', color: 'text-[#5A676B] border-[#BECCD0]' }
    ]
  },
  {
    id: 2,
    name: 'Arixo AI',
    description: CASE_STUDIES['arixo'].cardDescription,
    img: '/assets/arixo/arixo-hero.webp',
    videoUrl: '/assets/arixo/arixo-hero.mp4',
    slug: 'arixo',
    caseStudyUrl: '/work/arixo',
    tags: [
      { label: 'AI Product', color: 'text-[#626268] border-[#CFCFD6]' },
      { label: 'Framework', color: 'text-[#6B655B] border-[#D6CFBF]' },
      { label: 'Template', color: 'text-[#5A676B] border-[#BECCD0]' }
    ]
  }
];

export default function HomeWorkGrid() {
  const pathname = usePathname();

  return (
    <section id="work" className="w-full bg-brand-bg pb-[100px] md:pb-[140px] scroll-mt-[120px]">
      {/* Cards touch parent main-layout left and right edges directly */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
        {HOMEPAGE_PROJECTS.map((project, idx) => (
          <ClientReveal key={project.id} delay={0.3 + idx * 0.1} className="w-full">
            <HomeProjectCard
              project={project}
              onClick={() =>
                trackEvent('case_study_open', {
                  case_study_name: project.name,
                  case_study_slug: project.slug,
                  click_location: pathname === '/' ? 'home' : 'work_page',
                })
              }
            />
          </ClientReveal>
        ))}
      </div>
    </section>
  );
}
