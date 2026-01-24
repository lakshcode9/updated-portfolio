'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  url?: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    name: 'AutoIkigai',
    role: 'AI Automation Agency',
    image: '/projects/autoikigai.png',
    description: 'Reactivating old leads with smart AI outreach and automated CRM flows.',
    url: 'https://autoikigai.systems'
  },
  {
    id: '02',
    name: 'SignalScope.dev',
    role: 'Indie Market Intelligence',
    image: '/projects/signalscope.png',
    description: 'Scoring user actions and surfacing hot leads automatically for founders.',
    url: 'https://signalscope.dev'
  },
  {
    id: '03',
    name: 'Web4.sbs',
    role: 'Natural Language Software',
    image: '/projects/web4.png',
    description: 'A platform that turns natural language descriptions into working code.',
    url: 'https://web4.sbs'
  },
  {
    id: '04',
    name: 'WhatsApp Concierge',
    role: 'AI Customer Bot',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1000&auto=format&fit=crop',
    description: 'Enterprise WhatsApp automation with custom LLMs and Meta Cloud API.'
  },
  {
    id: '05',
    name: 'Lead Gen Engine',
    role: 'Outbound Automation',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    description: 'High-scale scraping and outreach pipelines for rapid B2B growth.'
  },
];

export function LiveProjects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20); 
    mouseY.set(e.clientY + 20);
  };

  return (
    <section id="work" className="relative w-full cursor-default bg-background px-6 py-8 text-neutral-200 md:px-12 md:py-12">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="mx-auto max-w-6xl"
      >
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">Portfolio</span>
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
              Selected <span className="text-neutral-600">Works</span>
            </h2>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 max-w-xs md:text-right">
            Shipped systems that convert. &apos;24 Edition.
          </p>
        </motion.header>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.id}
              data={project}
              index={index}
              isActive={activeId === project.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-64 w-96 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl"
              >
                <Image
                  src={PROJECTS.find((p) => p.id === activeId)?.image || ''}
                  alt="Preview"
                  fill
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute bottom-0 w-full bg-linear-to-t from-black to-transparent p-6">
                  <p className="text-xs text-white/70 italic leading-tight">
                    {PROJECTS.find((p) => p.id === activeId)?.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

function ProjectRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: Project;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  const handleClick = () => {
    if (isMobile) {
      setActiveId(isActive ? null : data.id);
    } else if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: isDimmed ? 0.2 : 1, 
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={handleClick}
      className={`group relative border-t border-white/10 transition-colors duration-500 last:border-b ${
        isMobile || data.url ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-16">
        
        <div className="flex items-baseline gap-6 md:gap-12 pl-4 md:pl-0 transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-mono text-xs text-neutral-600">
            0{index + 1}
          </span>
          <h3 className="text-3xl font-black tracking-tighter text-neutral-400 transition-colors duration-300 group-hover:text-white md:text-7xl uppercase">
            {data.name}
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between pl-12 pr-4 md:mt-0 md:justify-end md:gap-12 md:pl-0 md:pr-0">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-primary">
            {data.role}
          </span>
          
          <div className="block md:hidden text-neutral-500">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          <motion.div
             animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
             className="hidden md:block text-white"
          >
             <ArrowUpRight size={32} strokeWidth={2} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-neutral-900/50"
          >
            <div className="p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image 
                  src={data.image} 
                  alt={data.name} 
                  className="h-full w-full object-cover" 
                  fill
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                   <p className="text-sm italic text-white/80 mb-4">{data.description}</p>
                   {data.url && (
                     <a 
                       href={data.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-xs uppercase tracking-widest text-primary font-bold hover:underline flex items-center gap-2"
                     >
                       Visit Site <ArrowUpRight size={14} />
                     </a>
                   )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
