'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  name: string;
  img: string;
}

export default function WorkGrid({ limit }: { limit?: number }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [baseDelay, setBaseDelay] = useState(1.6);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBaseDelay(0);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // Column definitions corresponding to Figma layout
  let col1: Project[] = [
    { id: 1, name: 'Marketing Guys', img: '/images/mock_matchbox.jpg' },
    { id: 2, name: 'Concept Studio', img: '/images/mock_tube.jpg' },
    { id: 3, name: 'Tenacity', img: '/images/mock_hand.jpg' }
  ];

  let col2: Project[] = [
    { id: 4, name: 'Osei - Skin care brand', img: '/images/mock_laptop.jpg' },
    { id: 5, name: 'XtremeGeeks', img: '/images/mock_macbook.jpg' },
    { id: 6, name: 'Weechats', img: '/images/mock_purple.jpg' }
  ];

  let col3: Project[] = [
    { id: 7, name: 'Personal Framer Portfolio', img: '/images/mock_yellow.jpg' },
    { id: 8, name: 'Futured Studio', img: '/images/mock_door.jpg' },
    { id: 9, name: 'Hikari Studio', img: '/images/mock_black_cards.jpg' }
  ];

  if (limit !== undefined) {
    const all = [...col1, ...col2, ...col3].slice(0, limit);
    col1 = all.filter((_, i) => i % 3 === 0);
    col2 = all.filter((_, i) => i % 3 === 1);
    col3 = all.filter((_, i) => i % 3 === 2);
  }

  // Flat list in order of columns (1 then 2 then 3) for mobile rendering
  const mobileProjects = [...col1, ...col2, ...col3];

  // Esc key closes lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="work"
      className="w-full bg-brand-bg pb-[120px]"
    >
      <div className="w-full">
        
        {/* Desktop and Tablet: Always 3 columns (gap-x-4 = 16px, gap-y-8 = 32px) */}
        <div className="hidden md:grid grid-cols-3 gap-[16px] items-start w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-[32px]">
            {col1.map((p, idx) => (
              <ProjectCard key={p.id} project={p} delay={baseDelay + idx * 0.45} onClick={() => setSelectedImg(p.img)} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-[32px]">
            {col2.map((p, idx) => (
              <ProjectCard key={p.id} project={p} delay={baseDelay + 0.15 + idx * 0.45} onClick={() => setSelectedImg(p.img)} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-[32px]">
            {col3.map((p, idx) => (
              <ProjectCard key={p.id} project={p} delay={baseDelay + 0.3 + idx * 0.45} onClick={() => setSelectedImg(p.img)} />
            ))}
          </div>
        </div>

        {/* Mobile: 1 column */}
        <div className="flex md:hidden flex-col gap-[32px] w-full">
          {mobileProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} delay={baseDelay + idx * 0.15} onClick={() => setSelectedImg(p.img)} />
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="max-w-6xl max-h-[85vh] overflow-hidden"
            >
              <img 
                src={selectedImg} 
                alt="Enlarged startup design asset" 
                className="max-w-full max-h-[85vh] object-contain rounded-[12px]"
                draggable="false"
              />
            </motion.div>
            
            {/* Esc trigger label */}
            <div className="absolute bottom-8 font-mono text-[9px] text-[#8A857D] uppercase tracking-widest">
              [Click outside or press ESC to close]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Subcomponent representing each project card item
function ProjectCard({ project, delay, onClick }: { project: Project; delay: number; onClick: () => void }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay }}
      onClick={onClick}
      className="group flex flex-col items-start cursor-pointer w-full text-left"
    >
      {/* 8px border radius on image cards, 1px border with 12% opacity of black color */}
      <div className="w-full overflow-hidden rounded-[8px] border border-black/12 bg-neutral-100 relative">
        <motion.img 
          src={project.img} 
          alt={project.name}
          className="w-full h-auto object-cover transform transition-transform duration-[220ms] ease-out group-hover:scale-[1.015]"
          draggable="false"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* 16px gap between image + title. pl-[4px] adds exactly 4px left padding globally. */}
      <div className="mt-4 w-full pl-[4px]">
        {/* Title text: Mobile is 16px medium, Desktop is 20px medium, tracking normal */}
        <h3 className="text-[16px] md:text-[20px] font-medium tracking-normal text-brand-black">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
}
