'use client';

import { useEffect } from 'react';

const WHATSAPP_URL =
  'https://wa.me/919951045597?text=Hey%20Anil,%20just%20saw%20your%20website!%20Would%20love%20to%20chat%20about%20my%20project';

export default function WhatsAppRedirect() {
  useEffect(() => {
    window.location.replace(WHATSAPP_URL);
  }, []);

  return (
    <noscript>
      <a href={WHATSAPP_URL}>Continue to WhatsApp</a>
    </noscript>
  );
}
