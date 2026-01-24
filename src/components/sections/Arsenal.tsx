"use client"

import { motion } from "framer-motion"

const techStack = [
  { name: "Python", slug: "python" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "LangChain", slug: "langchain" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Supabase", slug: "supabase" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Docker", slug: "docker" },
  { name: "Vercel", slug: "vercel" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" },
  { name: "GitHub", slug: "github" },
]

export function Arsenal() {
  // Triple the list to ensure smooth infinite loop
  const duplicatedStack = [...techStack, ...techStack, ...techStack]

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background relative border-y border-border/20">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Technical Leverage</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight italic uppercase">The Arsenal</h2>
        </div>
      </div>

      <div className="flex gap-8 md:gap-12 items-center overflow-hidden">
        <motion.div 
          className="flex flex-nowrap gap-10 md:gap-16 py-8"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedStack.map((tech, i) => (
            <div 
              key={`${tech.slug}-${i}`}
              className="group flex flex-col items-center justify-center gap-4 min-w-[80px] md:min-w-[120px]"
            >
              <div className="relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <img 
                   src={`https://cdn.simpleicons.org/${tech.slug}/white`} 
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] md:text-xs font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-widest whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
