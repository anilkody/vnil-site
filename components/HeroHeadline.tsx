'use client';

import { motion } from 'framer-motion';

interface HeroHeadlineProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function HeroHeadline({ text, className, style, delay = 0.2 }: HeroHeadlineProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay }}
      className={className}
      style={style}
    >
      {text}
    </motion.h1>
  );
}
