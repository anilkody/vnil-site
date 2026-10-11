'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ClientRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export default function ClientReveal({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = '',
  yOffset = 16
}: ClientRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
