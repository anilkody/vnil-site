'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Reusable motion configuration matching premium YC minimalism
export const MOTION_THEME = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const, // premium custom cubic-bezier easeOut
  staggerDelay: 0.08,
  
  // Transition templates
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  },
  
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },

  scaleHover: {
    scale: 1.015,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: MOTION_THEME.duration,
            ease: MOTION_THEME.ease,
            delay: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = '' }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: MOTION_THEME.staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
