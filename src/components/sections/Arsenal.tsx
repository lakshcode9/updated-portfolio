"use client"

import { motion } from "framer-motion"

const techStack = [
  "Python", "PyTorch", "Hugging Face", "LangChain", "FastAPI", 
  "Pinecone", "ChromaDB", "Supabase", "React", "Next.js", 
  "TypeScript", "Docker", "AWS", "Git", "OpenAI", "Anthropic", 
  "Pandas", "NumPy", "TailwindCSS", "Node.js", "Vercel"
]

export function Arsenal() {
  // Triple the list to ensure smooth infinite loop
  const duplicatedStack = [...techStack, ...techStack, ...techStack]

  return (
    <section className="py-20 overflow-hidden bg-background relative border-y border-border/20">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Technical Leverage</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight italic uppercase">The Arsenal</h2>
        </div>
      </div>

      <div className="flex gap-8 items-center overflow-hidden">
        <motion.div 
          className="flex flex-nowrap gap-12 py-4"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedStack.map((tech, i) => (
            <div 
              key={`${tech}-${i}`}
              className="group flex flex-col items-center justify-center"
            >
              <span className="text-3xl md:text-5xl font-normal text-muted-foreground/30 group-hover:text-primary transition-colors duration-500 whitespace-nowrap cursor-default uppercase font-sans tracking-tighter">
                {tech}
              </span>
              <div className="w-0 h-px bg-primary group-hover:w-full transition-all duration-500 mt-1" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
