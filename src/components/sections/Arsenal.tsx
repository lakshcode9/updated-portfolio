"use client"

import { motion } from "framer-motion"

const techStack = [
  { name: "Python", slug: "python" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "LangChain", slug: "langchain" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "AWS", slug: "amazonaws" },
  { name: "OpenAI", slug: "openai", custom: true },
  { name: "Pinecone", slug: "pinecone", custom: true },
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
    <section className="py-24 overflow-hidden bg-background relative border-y border-border/20">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Technical Leverage</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight italic uppercase">The Arsenal</h2>
        </div>
      </div>

      <div className="flex gap-12 items-center overflow-hidden">
        <motion.div 
          className="flex flex-nowrap gap-16 py-8"
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
              className="group flex flex-col items-center justify-center gap-4 min-w-[120px]"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                {tech.slug === "openai" ? (
                  <svg role="img" viewBox="0 0 24 24" fill="white" className="w-full h-full">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9066 6.0462 6.0462 0 0 0-4.7471-3.124A6.0296 6.0296 0 0 0 11.5651.9688a6.0856 6.0856 0 0 0-5.1383 3.5161A6.042 6.042 0 0 0 1.865 6.4714a6.0555 6.0555 0 0 0 1.315 6.3379 5.9847 5.9847 0 0 0 .5153 4.9066 6.0462 6.0462 0 0 0 4.7471 3.124 6.0296 6.0296 0 0 0 5.4545.8217 6.0856 6.0856 0 0 0 5.1383-3.5161 6.042 6.042 0 0 0 4.5618-1.9865 6.0555 6.0555 0 0 0-1.3151-6.3379zM12.0958 19.8584a4.4406 4.4406 0 0 1-2.185-.582l3.8824-2.2412V11.516l1.625.9383V16.634l3.3224 1.9184a4.4601 4.4601 0 0 1-5.1118.0664-4.4445 4.4445 0 0 1-1.533-1.037zM5.3057 15.2721a4.4406 4.4406 0 0 1-.1833-2.243l3.8824 2.2413v4.5173l-1.625-.9383v-3.7797l-3.3224-1.9184a4.4601 4.4601 0 0 1 .5364-5.1102 4.4445 4.4445 0 0 1 1.7117-.777zM4.7576 7.6744a4.4406 4.4406 0 0 1 2.0017-1.661l2.2574 3.8443L5.1334 12.1v1.8767l-3.3224 1.9184a4.4601 4.4601 0 0 1-.5754-5.0438c.328-.6163.815-1.1274 1.4053-1.478l.1167-.069zM18.7143 8.7279a4.4406 4.4406 0 0 1 .1833 2.243l-3.8824-2.2413V4.2124l1.625.9383v3.7797l3.3224 1.9184a4.4601 4.4601 0 0 1-.5364 5.1102 4.4445 4.4445 0 0 1-1.7117.777zm-6.027 1.5126l-1.625.9383-1.625-.9383V8.3494l1.625-.9383 1.625.9383zm7.045-2.5661a4.4406 4.4406 0 0 1-2.0017 1.661l-2.2574-3.8443 3.8833-2.2413v-1.8767l3.3224-1.9184a4.4601 4.4601 0 0 1 .5754 5.0438 4.4445 4.4445 0 0 1-1.4053 1.478l-.1167.069zM6.4526 7.1423V3.366l3.3224-1.9184a4.4601 4.4601 0 0 1 5.1118-.0664c.6001.3564 1.0858.8778 1.4018 1.5034v.0416l-3.8182 2.2039-3.8824 2.2412-1.625-.9383-4.4445-1.037z"/>
                  </svg>
                ) : tech.slug === "pinecone" ? (
                  <svg role="img" viewBox="0 0 24 24" fill="white" className="w-full h-full">
                    <path d="M12 0L2.5 5.5v11L12 22l9.5-5.5v-11L12 0zm0 4.5l5.5 3.2v6.4l-5.5 3.2L6.5 14V7.7l5.5-3.2z"/>
                  </svg>
                ) : (
                  <img 
                    src={`https://cdn.simpleicons.org/${tech.slug}/white`} 
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Second attempt with fallback slug for AWS
                      if (tech.slug === "amazonaws") {
                        (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/amazonwebservices/white';
                      }
                    }}
                  />
                )}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-widest whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
