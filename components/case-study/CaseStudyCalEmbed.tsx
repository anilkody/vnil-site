'use client';

import { useEffect } from 'react';
import ClientReveal from '@/components/ClientReveal';
import { trackEvent } from '@/lib/analytics';

export default function CaseStudyCalEmbed() {
  useEffect(() => {
    const C = window as any;

    if (!C.Cal) {
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    }

    C.Cal("init", "case-study-cal", { origin: "https://app.cal.com" });
    C.Cal.config = C.Cal.config || {};
    C.Cal.config.forwardQueryParams = true;

    C.Cal.ns["case-study-cal"]("inline", {
      elementOrSelector: "#my-cal-inline-case-study",
      config: { "layout": "month_view", "theme": "dark", "useSlotsViewOnSmallScreen": "true" },
      calLink: "itsvnil/15min",
    });

    C.Cal.ns["case-study-cal"]("on", {
      action: "bookingSuccessful",
      callback: () => trackEvent('booking_complete', { booking_location: 'case_study_embed' }),
    });

    C.Cal.ns["case-study-cal"]("ui", {
      "styles": { "branding": { "brandColor": "#000000" } },
      "hideEventTypeDetails": false,
      "layout": "month_view",
      "theme": "dark"
    });
  }, []);

  return (
    <section className="w-full bg-brand-bg pt-[40px] pb-[100px] md:pb-[140px]">
      <div className="main-layout">
        <ClientReveal delay={0.1}>
          <div className="w-full rounded-[8px] overflow-hidden bg-[#131313] p-3 md:p-6 border border-white/10 shadow-2xl">
            <div
              id="my-cal-inline-case-study"
              className="w-full min-h-[620px] rounded-[8px] overflow-hidden"
            />
          </div>
        </ClientReveal>
      </div>
    </section>
  );
}
