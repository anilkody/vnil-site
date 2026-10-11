import { Metadata } from 'next';
import Header from '@/components/Header';
import HeroCTA from '@/components/HeroCTA';

export const metadata: Metadata = {
  title: 'About',
  description: "I'm Anil Kody — Vnil is the name I go by online. I run Futured Studio, a Framer design studio for early-stage startups.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-black flex flex-col items-center select-text w-full">
      <Header />

      <main className="w-full flex-grow flex flex-col items-center px-[32px] md:px-[50px] pt-[140px] md:pt-[200px] pb-[100px]">
        <div className="w-full max-w-[600px]">

          {/* Profile: avatar + handle, kept from rewamp design */}
          <div className="flex items-center gap-[9px]">
            <img
              src="https://unavatar.io/x/itsvnil"
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover block shrink-0"
              draggable="false"
            />
            <a
              href="https://x.com/itsvnil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-black no-underline cursor-pointer text-[16px] font-medium tracking-[-0.2px]"
            >
              @itsvnil
            </a>
          </div>

          {/* Body copy — same justified text-wrapper treatment as rewamp */}
          <div className="mt-[48px] md:mt-[60px] space-y-[22px] text-[16px] font-medium leading-[22px] tracking-[-0.2px] text-brand-black text-left">
            <p>
              I'm Anil Kody — Vnil is just the name I go by online, same person, same work. I run{' '}
              <a
                href="https://futured.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Futured Studio
              </a>
              , a Framer design studio that's currently just me, though I'm building it to grow past that.
            </p>
            <p>
              I started freelancing in mid-2023 and I've barely stopped touching Framer since — I'm a{' '}
              <a
                href="https://framer.com/@anilkody"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Framer Expert
              </a>
              , ranked top 1% on the platform, and I know it in and out. Lately I've been moving into code too. I'm not precious about the tool. I care about whether the site actually makes sense to whoever's looking at it, not just whether it looks good in a screenshot.
            </p>
            <p>
              I've worked with people like Kelechi Onyeama, an indie hacker building some genuinely popular AI apps, and Phil Santoro, co-founder of Wilbur Labs — plus a few NDA projects for a fintech startup and a health-tech startup. I also design premium Framer templates and help a couple of agencies land better leads. More of that's on my{' '}
              <a
                href="https://contra.com/anilkody"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Contra
              </a>
              .
            </p>
            <p>
              Most of the founders I end up working with are pre-seed to seed, usually YC or VC-backed, with a real product and enough self-awareness to care how it's perceived. I take on landing pages and full marketing sites both — no fixed niche, but I keep drifting toward fintech, healthcare, and hardware, where there's actually something worth explaining instead of a template with the logo swapped.
            </p>
            <p>
              Usually it starts with a call. I want to understand what you're building before I touch anything. Then I dig into the product and the current site if there is one, and figure out what the site actually needs to do — more credible, better positioned, or just converting better — and that decides the direction, not the other way around. Projects start around $2k for a landing page, scoped up from there depending on what you actually need.
            </p>
          </div>

          {/* CTA — same HeroCTA component as the hero */}
          <div className="mt-[48px] md:mt-[54px]">
            <HeroCTA label="Schedule a call" bookingLocation="about_page" />
          </div>

        </div>
      </main>
    </div>
  );
}
