'use client';

import ClientReveal from '@/components/ClientReveal';
import { MediaAsset } from './types';

interface CaseStudyGalleryProps {
  gallery: (string | MediaAsset)[];
  className?: string;
}

export default function CaseStudyGallery({
  gallery,
  className = ''
}: CaseStudyGalleryProps) {
  // Normalize items to asset objects
  const getAsset = (item: string | MediaAsset | undefined, defaultPlaceholder: string): MediaAsset => {
    if (!item) {
      return { type: 'image', asset: defaultPlaceholder };
    }
    if (typeof item === 'string') {
      return { type: 'image', asset: item };
    }
    return item;
  };

  const item0 = getAsset(gallery[0], '/images/mock_matchbox.jpg');
  const item1 = getAsset(gallery[1], '/images/mock_tube.jpg');
  const item2 = getAsset(gallery[2], '/images/mock_laptop.jpg');
  const item3 = getAsset(gallery[3], '/images/mock_yellow.jpg');
  const item4 = getAsset(gallery[4], '/images/mock_door.jpg');

  const renderFullWidthCard = (media: MediaAsset) => {
    return (
      <div className="w-full overflow-hidden rounded-[8px] border border-black/10 bg-[#E5E5E5] flex items-start justify-center">
        {media.type === 'video' && (media.asset || media.externalVideoUrl) ? (
          <video
            src={media.asset || media.externalVideoUrl}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto object-cover object-top block"
          />
        ) : media.asset ? (
          <img
            src={media.asset}
            alt={media.alt || 'Gallery item'}
            className="w-full h-auto object-cover object-top block"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-[#E2E2E2] flex items-center justify-center min-h-[300px]">
            <span className="text-[#888888] font-mono text-sm tracking-wider uppercase">
              [ Placeholder ]
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderCard = (media: MediaAsset, aspectClass: string) => {
    return (
      <div className={`w-full overflow-hidden rounded-[8px] border border-black/10 bg-[#E5E5E5] flex items-center justify-center ${aspectClass}`}>
        {media.type === 'video' && (media.asset || media.externalVideoUrl) ? (
          <video
            src={media.asset || media.externalVideoUrl}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-top"
          />
        ) : media.asset ? (
          <img
            src={media.asset}
            alt={media.alt || 'Gallery item'}
            className="w-full h-full object-cover object-top"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-[#E2E2E2] flex items-center justify-center min-h-[300px]">
            <span className="text-[#888888] font-mono text-sm tracking-wider uppercase">
              [ Placeholder ]
            </span>
          </div>
        )}
      </div>
    );
  };

  const hasItem3 = Boolean(gallery[3]);
  const hasItem4 = Boolean(gallery[4]);

  return (
    <section className={`w-full bg-brand-bg pb-[32px] md:pb-[48px] ${className}`}>
      <div className="main-layout space-y-4 md:space-y-6">
        
        {/* Row 1: 1 Full-Width Image (Fits natural height, position at top/start, 100% visible) */}
        <ClientReveal delay={0.1}>
          <div className="w-full">
            {renderFullWidthCard(item0)}
          </div>
        </ClientReveal>

        {/* Row 2: 2 Images Side-by-Side (img 2 + img 3) */}
        <ClientReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {renderCard(item1, 'aspect-[4/3] md:aspect-[16/11]')}
            {renderCard(item2, 'aspect-[4/3] md:aspect-[16/11]')}
          </div>
        </ClientReveal>

        {/* Row 3: 2 Images Side-by-Side if 5 items; 1 Full-Width Image if 4 items */}
        {hasItem4 ? (
          <ClientReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {renderCard(item3, 'aspect-[4/3] md:aspect-[16/11]')}
              {renderCard(item4, 'aspect-[4/3] md:aspect-[16/11]')}
            </div>
          </ClientReveal>
        ) : hasItem3 ? (
          <ClientReveal delay={0.1}>
            <div className="w-full">
              {renderFullWidthCard(item3)}
            </div>
          </ClientReveal>
        ) : null}

      </div>
    </section>
  );
}

