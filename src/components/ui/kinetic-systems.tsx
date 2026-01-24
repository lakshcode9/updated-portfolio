'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

interface SystemItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

const SYSTEMS: SystemItem[] = [
  {
    id: '01',
    name: 'AutoIkigai',
    description: 'AI automation systems for real businesses',
    image: '/projects/autoikigai.png',
  },
  {
    id: '02',
    name: 'SignalScope',
    description: 'Market intelligence for indie founders',
    image: '/projects/signalscope.png',
  },
  {
    id: '03',
    name: 'Web4',
    description: 'Natural language to software engine',
    image: '/projects/web4.png',
  },
  {
    id: '04',
    name: 'WhatsApp AI',
    description: 'Meta-integrated AI concierge',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284',
  },
  {
    id: '05',
    name: 'Outbound Engine',
    description: 'Scraping, filtering and outreach pipelines',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
];

export default function KineticSystems() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set(e.clientX + 20);
      mouseY.set(e.clientY + 20);
    }
  };

  return (
    <div onMouseMove={onMove} className="min-h-screen bg-neutral-950 px-4 md:px-8 py-16 md:py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 md:mb-16 text-3xl md:text-6xl font-light tracking-tight">
          Active <span className="text-neutral-500">Systems</span>
        </h1>

        <div className="flex flex-col">
          {SYSTEMS.map((s, i) => (
            <motion.div
              key={s.id}
              onMouseEnter={() => setActiveId(s.id)}
              onMouseLeave={() => setActiveId(null)}
              className="border-t border-neutral-800 py-8 md:py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0"
            >
              <div className="flex gap-4 md:gap-6 items-baseline">
                <span className="text-neutral-600 font-mono text-sm">0{i + 1}</span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{s.name}</h2>
              </div>
              <span className="text-[10px] md:text-sm uppercase tracking-widest text-neutral-500 font-medium">
                {s.description}
              </span>
              
              {/* Mobile Image Preview */}
              {isMobile && (
                <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-xl border border-white/5">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover opacity-60"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {!isMobile && activeId && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="fixed top-0 left-0 pointer-events-none z-50 w-80 h-64 rounded-xl overflow-hidden border border-white/10"
        >
          <Image
            src={SYSTEMS.find(s => s.id === activeId)!.image}
            alt="Preview"
            fill
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
