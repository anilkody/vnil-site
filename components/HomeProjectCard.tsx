'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export interface TagItem {
  label: string;
  color?: string;
}

export interface HomeProject {
  id: number;
  name: string;
  description?: string;
  img: string;
  videoUrl?: string;
  slug?: string;
  tags?: (string | TagItem)[];
  caseStudyUrl?: string;
}

interface HomeProjectCardProps {
  project: HomeProject;
  onClick?: () => void;
}

export default function HomeProjectCard({ project, onClick }: HomeProjectCardProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const href = project.caseStudyUrl || `/work/${project.slug || ''}`;

  // Lazy play/pause video based on viewport visibility
  useEffect(() => {
    const videoNode = videoRef.current;
    const cardNode = cardRef.current;

    if (!videoNode || videoError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoNode.muted = true;
            videoNode.play().catch((err) => {
              console.warn('Video play interrupted:', err);
            });
          } else {
            videoNode.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardNode) {
      observer.observe(cardNode);
    }

    return () => {
      if (cardNode) {
        observer.unobserve(cardNode);
      }
    };
  }, [videoError, project.videoUrl]);

  const isExternalEmbed = (url?: string) => {
    if (!url) return false;
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com')
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&controls=0&loop=1';
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=1&mute=1&controls=0&loop=1';
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/') + '?background=1&autoplay=1&loop=1';
    }
    return url;
  };

  const hasValidVideo = Boolean(project.videoUrl && !videoError);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <Link
      href={href}
      ref={cardRef}
      onClick={onClick}
      className="group flex flex-col items-start cursor-pointer w-full text-left"
    >
      {/* Outer Container: 3:2 Aspect Ratio, rounded-[8px] base smooth transition to rounded-[24px] on hover */}
      <div data-cursor-text="VIEW CASE STUDY" className="w-full aspect-[3/2] overflow-hidden rounded-[8px] group-hover:rounded-[24px] border-[0.5px] border-black/10 bg-[#E5E5EA] relative flex items-center justify-center transition-all duration-300 ease-in-out">
        {/* Base Thumbnail Image (renders first) */}
        <img
          src={project.img}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover rounded-[8px] group-hover:rounded-[24px] transition-all duration-300 ease-in-out"
          draggable="false"
        />

        {/* Video Overlay (smoothly fades in once loaded/ready) */}
        {hasValidVideo && (
          isExternalEmbed(project.videoUrl) ? (
            <iframe
              src={getEmbedUrl(project.videoUrl!)}
              className="absolute inset-0 w-full h-full border-0 pointer-events-none rounded-[8px] group-hover:rounded-[24px] transition-all duration-300 ease-in-out"
              allow="autoplay; encrypted-media"
              title={project.name}
            />
          ) : (
            <video
              ref={videoRef}
              src={project.videoUrl}
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              onPlaying={() => setVideoReady(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover rounded-[8px] group-hover:rounded-[24px] transition-all duration-500 ease-in-out ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        )}
      </div>

      {/* Title & Tag Pills Row Below Card */}
      <div className="mt-3 lg:mt-4 w-full pl-[2px] flex items-center justify-between gap-2 sm:gap-3">
        {/* Title: 22px size on desktop (text-[17px] sm:text-[19px] lg:text-[22px]), medium weight */}
        <h3 className="text-[17px] sm:text-[19px] lg:text-[22px] font-medium tracking-[-0.02em] text-brand-black leading-tight shrink-0">
          {project.name}
        </h3>

        {/* Categories: "(LABEL)" monospace bracket treatment */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex items-center justify-end gap-x-[14px] shrink-0 text-right">
            {project.tags.map((tag, idx) => {
              const label = typeof tag === 'string' ? tag : tag.label;
              return (
                <span
                  key={idx}
                  className={`t-label font-mono !text-[12px] whitespace-nowrap ${idx >= 2 ? 'hidden lg:inline' : idx >= 1 ? 'hidden sm:inline' : ''}`}
                >
                  ({label})
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Project context directly below the card */}
      {project.description && (
        <p className="mt-[6px] lg:mt-[8px] w-full max-w-[520px] pl-[2px] text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.4em] text-brand-black/60 tracking-[-0.01em]">
          {project.description}
        </p>
      )}
    </Link>
  );
}
