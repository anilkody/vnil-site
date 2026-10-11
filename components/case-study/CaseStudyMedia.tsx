'use client';

import { useRef } from 'react';
import ClientReveal from '@/components/ClientReveal';
import { MediaAsset } from './types';

interface CaseStudyMediaProps {
  media: MediaAsset;
  className?: string;
  delay?: number;
}

export default function CaseStudyMedia({
  media,
  className = '',
  delay = 0.2
}: CaseStudyMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = media.type === 'video';
  const videoSrc = media.asset || media.externalVideoUrl;
  const imageSrc = media.poster || media.asset;

  const isExternalEmbed = (url?: string) => {
    if (!url) return false;
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com') ||
      url.includes('loom.com')
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&controls=0&loop=1';
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=1&mute=1&controls=0&loop=1';
    }
    return url;
  };

  return (
    <section className={`w-full bg-brand-bg pb-[32px] md:pb-[48px] ${className}`}>
      <div className="main-layout">
        <ClientReveal delay={delay}>
          {/* Outer Container: Same 3:2 aspect ratio & sizing logic as project cards */}
          <div className="w-full aspect-[3/2] overflow-hidden rounded-[8px] border border-black/10 bg-[#E5E5EA] relative flex items-center justify-center">
            {isVideo && videoSrc ? (
              isExternalEmbed(videoSrc) ? (
                <iframe
                  src={getEmbedUrl(videoSrc)}
                  className="w-full h-full border-0 pointer-events-none"
                  allow="autoplay; encrypted-media"
                  title={media.alt || 'Case Study Video'}
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              )
            ) : media.asset ? (
              <img
                src={media.asset}
                alt={media.alt || 'Case study thumbnail'}
                className="w-full h-full object-cover"
                draggable="false"
              />
            ) : null}
          </div>
        </ClientReveal>
      </div>
    </section>
  );
}
