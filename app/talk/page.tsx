'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

export default function TalkPage() {
  // Inject and initialize Cal.com inline widget dynamically on mount
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

    C.Cal("init", "15min", { origin: "https://app.cal.com" });
    C.Cal.config = C.Cal.config || {};
    C.Cal.config.forwardQueryParams = true;

    C.Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
      calLink: "itsvnil/15min",
    });

    C.Cal.ns["15min"]("on", {
      action: "bookingSuccessful",
      callback: () => trackEvent('booking_complete', { booking_location: 'talk_page' }),
    });

    C.Cal.ns["15min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);

  return (
    // Standalone page (no header), dark bg matching rewamp.site/talk
    <div className="h-screen w-full overflow-hidden bg-[#171717] flex items-center justify-center select-text">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        className="w-screen h-[100dvh] sm:w-[min(900px,calc(100vw-48px))] sm:h-[700px] flex items-center justify-center"
      >
        <div
          id="my-cal-inline-15min"
          className="w-full h-full overflow-scroll"
        ></div>
      </motion.div>
    </div>
  );
}
