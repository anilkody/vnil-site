'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookCallLink from './BookCallLink';

// Global variable to track if this is the very first site load
let isInitialLoad = true;

interface HeaderNavLinkProps {
  href: string;
  label: string;
  isExternal?: boolean;
}

const HeaderNavLink = ({ href, label, isExternal = false }: HeaderNavLinkProps) => {
  const isMailto = href.startsWith('mailto:');
  const isHttp = href.startsWith('http');
  const isAnchor = href.startsWith('/#') || href.startsWith('#');

  const content = <span className="btn-roll">{label}</span>;

  const className = "inline-flex items-center text-[15px] md:text-[16px] font-medium text-brand-black hover:text-brand-black/70 transition-colors focus:outline-none cursor-pointer";

  if (isAnchor) {
    const handleAnchorClick = (e: React.MouseEvent) => {
      if (window.location.pathname === '/') {
        e.preventDefault();
        const targetId = href.replace('/', '').replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -120;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.location.hash = targetId;
        }
      }
    };

    return (
      <a href={href} onClick={handleAnchorClick} className={className}>
        {content}
      </a>
    );
  }

  if (isExternal || isHttp || isMailto) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

const HeaderButton = ({ label }: { label: string }) => {
  return (
    <BookCallLink
      location="header"
      label={label}
      className="h-[38px] md:h-[42px] bg-[#EBEBEF] hover:bg-[#D8D8DF] text-brand-black font-medium py-[8px] md:py-[10px] px-[20px] md:px-[28px] rounded-full transition-colors cursor-pointer text-[14px] md:text-[16px] inline-flex items-center justify-center focus:outline-none shrink-0"
    >
      <span className="btn-roll">{label}</span>
    </BookCallLink>
  );
};

export default function Header({ isHelloPage }: { isHelloPage?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const isFirstMount = useRef(isInitialLoad);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only trigger hide after passing a small threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 bg-brand-bg/85 backdrop-blur-sm transition-transform duration-300 w-full ${
        hidden ? 'translate-y-[-100%]' : 'translate-y-0'
      }`}
    >
      {/* Height: 70px (h-[70px]) */}
      <div className="main-layout h-[70px] flex items-center justify-between">
        
        {/* Left Logo button: 18px semibold on mobile, 32px medium on desktop, -6% letter-spacing */}
        <button
          onClick={handleLogoClick}
          className="text-[18px] font-semibold md:text-[32px] md:font-medium tracking-[-0.06em] text-brand-black hover:opacity-75 transition-opacity cursor-pointer focus:outline-none"
        >
          vnil.
        </button>

        {/* Right Navigation Bar: works, say hello */}
        {isHelloPage ? (
          <div className="flex items-center gap-2 text-[14px] font-semibold md:text-[16px] md:font-medium tracking-[-0.02em] text-brand-black py-0.5 select-none">
            {/* Subtle live pulse indicator green dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available</span>
          </div>
        ) : (
          <nav className="flex items-center gap-[20px] md:gap-[32px]">
            <HeaderNavLink href="/#work" label="Works" />
            <HeaderButton label="Say hello!" />
          </nav>
        )}

      </div>
    </motion.header>
  );
}
