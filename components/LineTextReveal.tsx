'use client';

import { motion } from 'framer-motion';

interface LineTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function LineTextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.8
}: LineTextRevealProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {text}
    </motion.p>
  );
}



