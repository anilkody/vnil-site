import { CaseStudyData } from '@/components/case-study/types';

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  'axal': {
    slug: 'axal',
    title: 'Axal',
    cardDescription: 'A clearer site for a YC hardware company, built around its end-to-end engineering process and the value of having one team handle it all.',
    contextParagraph1: 'Axal is a YC-backed W25 engineering partner that helps hardware teams go from PCB design to a tested, working board. I rebuilt the site around their strongest differentiator: one team handling design, sourcing, assembly, and testing instead of coordinating it all across multiple vendors.',
    contextParagraph2: '',
    liveProjectUrl: 'https://axal.framer.ai/',
    thumbnail: {
      type: 'image',
      asset: '/assets/axal/axal-hero.webp',
      alt: 'Axal'
    },
    section1: {
      title: 'Context',
      body: 'This was an independent concept redesign based on Axal’s YC profile, launch video, existing site, and other publicly available information. The goal was to explore how a technically strong engineering company could communicate its value more clearly through positioning, narrative, and visual design.',
      metaFields: [
        { label: 'Industry', value: 'Hardware / PCB Engineering' },
        { label: 'Funding Stage', value: 'YC-backed, W25' },
        { label: 'Engagement', value: 'Independent concept, unsolicited' }
      ]
    },
    gallery: [
      {
        type: 'video',
        asset: '/assets/axal/axal-hero.mp4',
        poster: '/assets/axal/axal-hero.webp',
        alt: 'Axal Hardware Partner Video'
      },
      '/assets/axal/axal-hero-mobile.webp',
      '/assets/axal/axal-lead-page-mobile.webp',
      '/assets/axal/axal-process-section.webp',
      '/assets/axal/axal-flexibility-section.webp'
    ],
    section2: {
      title: 'Results',
      body: 'A clearer first impression, stronger positioning, and a site that makes Axal feel like the serious engineering partner it is.',
      metaFields: [
        { label: 'ICP clarity', value: 'Founders see exactly where they fit in the process' },
        { label: 'Perceived authority', value: 'Feels like a serious engineering partner' },
        { label: 'One team ownership', value: 'Accountability is clear and consolidated' }
      ]
    }
  },
  'arixo': {
    slug: 'arixo',
    title: 'Arixo AI',
    cardDescription: 'A Framer template built around a simple framework for credible AI and SaaS startup sites, designed to help founders launch with a stronger foundation.',
    contextParagraph1: 'YC startups launching AI products often have placeholder websites that don’t inspire much confidence. I built Arixo AI as a Framer template based on a simple framework for making startup sites clearer, more credible, and better at explaining the product.',
    contextParagraph2: '60+ people are already using it.',
    liveProjectUrl: 'https://ario.framer.ai/',
    thumbnail: {
      type: 'image',
      asset: '/assets/arixo/arixo-hero.webp',
      alt: 'Arixo AI'
    },
    section1: {
      title: 'Context',
      body: 'While working on a client project, I noticed how many YC startups were shipping strong products with websites that still felt like placeholders. A founder shouldn’t have to choose between shipping fast and looking credible, so I built Arixo around a simple idea: give AI and SaaS startups a strong structure from day one, instead of starting with a blank page.',
      metaFields: [
        { label: 'Customer trust signal', value: 'Looks real and credible' },
        { label: 'Competitive parity', value: 'Stands next to competitor sites' },
        { label: 'Launch Speed', value: 'One afternoon to ship' }
      ]
    },
    gallery: [
      {
        type: 'video',
        asset: '/assets/arixo/arixo-hero.mp4',
        poster: '/assets/arixo/arixo-hero.webp',
        alt: 'Arixo AI Framer Template Video'
      },
      '/assets/arixo/arixo-mobile-mockup.webp',
      '/assets/arixo/arixo-features-section.webp',
      '/assets/arixo/arixo-pricing-section.webp',
      '/assets/arixo/arixo-usp-section.webp'
    ],
    section2: {
      title: 'Results',
      body: 'Arixo gives founders a credible starting point that puts the product first, explains why it matters, and removes the “does this look real?” question before someone even evaluates the product.',
      metaFields: [
        { label: 'Credibility Boost', value: 'Removes placeholder feel' },
        { label: 'Product clarity', value: 'USP lands immediately' },
        { label: 'Framework Reusability', value: 'Copy, customize, publish' }
      ]
    }
  }
};

export const DEFAULT_CASE_STUDY = CASE_STUDIES['axal'];
