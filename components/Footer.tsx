'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { BOOKING_URL } from '@/lib/links';
import { trackEvent } from '@/lib/analytics';

interface FooterLinkProps {
  href: string;
  label: string;
  isExternal?: boolean;
}

const FooterLink = ({ href, label, isExternal = false }: FooterLinkProps) => {
  const isMailto = href.startsWith('mailto:');
  const isHttp = href.startsWith('http');
  const isWhatsapp = href === '/whatsapp';
  const content = (
    <>
      <span className="btn-roll">{label}</span>
      <ArrowRight className="w-[20px] h-[20px] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
    </>
  );

  const className = "group inline-flex items-center gap-1.5 text-[16px] font-medium text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer";

  const handleClick = () => {
    if (href === '/whatsapp') trackEvent('contact_click', { method: 'whatsapp', click_location: 'footer' });
    else if (isMailto) trackEvent('contact_click', { method: 'email', click_location: 'footer' });
  };

  if (isExternal || isHttp || isMailto || isWhatsapp) {
    return (
      <a
        href={href}
        target={isExternal || isWhatsapp ? '_blank' : undefined}
        rel={isExternal || isWhatsapp ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {content}
    </Link>
  );
};

export default function Footer() {
  const [time, setTime] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Live ticking IST clock formatted like "23:59"
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website.trim() || !email.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('https://formspree.io/f/xoejjjlz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Website: website.trim(),
          Email: email.trim()
        })
      });

      if (res.ok) {
        setStatus('submitted');
        trackEvent('generate_lead', { form_id: 'footer_hero_redesign', form_location: 'footer' });
        const win = window.open(BOOKING_URL, '_blank');
        if (win) win.opener = null;
        else window.location.href = BOOKING_URL;
      } else {
        const data = await res.json();
        setErrorMessage(data?.error || 'Submission failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <footer className="w-full bg-black text-white pt-[40px] md:pt-[50px] pb-[40px] h-auto flex flex-col justify-between mt-auto box-border overflow-hidden">
      <div className="main-layout flex flex-col justify-between h-full space-y-[60px] md:space-y-[64px] lg:space-y-[80px]">
        
        {/* ROW 1 — Single nav link + scroll-to-top */}
        <div className="flex flex-row justify-between items-start sm:items-center w-full shrink-0 min-h-[24px]">
          {/* Left: Link row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8">
            <FooterLink href="https://x.com/itsvnil" label="X.com" isExternal />
            <FooterLink href="https://contra.com/anilkody" label="Contra" isExternal />
            <FooterLink href="https://framer.com/@anilkody" label="Framer" isExternal />
          </div>

          {/* Right: Scroll-to-top button (24x24px white circle) */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-[24px] h-[24px] rounded-full bg-white text-black flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer focus:outline-none shrink-0 self-start sm:self-center"
          >
            <ArrowUp className="w-[16px] h-[16px] text-black stroke-[2.5]" />
          </button>
        </div>

        {/* ROW 2 — Form (top on mobile/tablet, left on desktop) + Nav links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] lg:gap-16 w-full items-start">
          
          {/* Form Container (Full width on tablet/mobile) */}
          <div className="lg:col-span-6 w-full max-w-full lg:max-w-[450px] flex flex-col justify-start">
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '-0.8px',
                lineHeight: '1.35em',
                color: '#FFFFFF'
              }}
              className="text-[24px] font-medium text-white tracking-[-0.8px] leading-[1.35em]"
            >
              Want me to redesign your hero, free?
            </h2>
            <p className="mt-[8px] mb-[28px] text-[15px] font-normal text-white/75 tracking-normal leading-[22px] w-full max-w-[340px]">
              Send me your website and I'll redesign your hero for free.
            </p>

            {status === 'submitted' ? (
              <div className="py-4">
                <p className="text-[15px] font-normal text-white/75 tracking-normal leading-[22px] w-full max-w-[340px]">
                  Got it, I'll take a look and send it over in a couple of days. Want to chat before then?{' '}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('cta_click', {
                        cta_location: 'footer_confirmation',
                        cta_text: 'Book a 15 min call',
                        link_url: BOOKING_URL,
                      })
                    }
                    className="underline underline-offset-2 text-white hover:text-white/80 transition-colors"
                  >
                    Book a 15 min call
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-full lg:max-w-[400px] flex flex-col space-y-[32px]">
                {/* Field: Website */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="footer-website"
                    className="sr-only"
                  >
                    Website
                  </label>
                  <input
                    id="footer-website"
                    type="text"
                    required
                    placeholder="Your Website*"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-white text-white py-[10px] w-full outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 text-[16px] font-medium tracking-[-0.02em] leading-[1.4em] placeholder:text-[15px] placeholder:font-normal placeholder:tracking-[-0.02em] placeholder:leading-[1.4em] placeholder:text-[#B8B8B8]"
                  />
                </div>

                {/* Field: Email */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="footer-email"
                    className="sr-only"
                  >
                    Email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Your Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-white text-white py-[10px] w-full outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 text-[16px] font-medium tracking-[-0.02em] leading-[1.4em] placeholder:text-[15px] placeholder:font-normal placeholder:tracking-[-0.02em] placeholder:leading-[1.4em] placeholder:text-[#B8B8B8]"
                  />
                </div>

                {errorMessage && (
                  <div className="text-rose-400 text-[13px] pt-1">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="h-[42px] bg-white text-black font-medium py-[10px] px-[28px] rounded-full hover:bg-[#EBEBEF] hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer text-[15px] md:text-[16px] inline-flex items-center justify-center disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Redesign my site'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Nav Links Container */}
          <div className="lg:col-span-6 lg:col-start-7 w-full flex flex-row flex-wrap justify-between sm:justify-end gap-x-[48px] gap-y-[40px] pt-2 lg:pt-0">
            
            {/* Column A: Let's Talk */}
            <div className="flex flex-col items-start text-left">
              <span className="text-[14px] font-medium text-[#B8B8B8] tracking-[-0.03em] leading-[1.2em] block mb-[18px]">
                Let&apos;s Talk
              </span>
              <div className="flex flex-col space-y-[18px]">
                <FooterLink href="/whatsapp" label="Whatsapp" />
                <FooterLink href="mailto:hello@vnil.site" label="Email me" />
              </div>
            </div>

            {/* Column B: Navigation */}
            <div className="flex flex-col items-start text-left">
              <span className="text-[14px] font-medium text-[#B8B8B8] tracking-[-0.03em] leading-[1.2em] block mb-[18px]">
                Navigation
              </span>
              <div className="flex flex-col space-y-[18px]">
                <FooterLink href="/work" label="Work" />
                <FooterLink href="/about" label="About" />
                <FooterLink href="/talk" label="Contact" />
              </div>
            </div>

          </div>

        </div>

        {/* ROW 3 — Credits bar */}
        <div className="w-full flex flex-row flex-wrap justify-between items-center gap-x-[12px] gap-y-[12px] text-[14px] font-medium text-white/75 tracking-[-0.04em] leading-[1.3em] shrink-0">
          <div>
            Local Time (IST) - {time || '23:59'}
          </div>
          <div>
            <button
              onClick={() => window.open('https://chatgpt.com/?q=Is%20Anil%20Kody%20a%20good%20pick%20to%20redesign%20our%20landing%20page%20before%20we%20raise%3F&hints=search', '_blank', 'noopener,noreferrer')}
              className="text-[14px] font-normal tracking-normal text-white/75 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0 text-left"
            >
              Ask ChatGPT about Anil
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
