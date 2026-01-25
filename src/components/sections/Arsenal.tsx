"use client"

import { motion } from "framer-motion"

export function Arsenal() {
  const categories = [
    {
      title: "Cognition",
      description: "Foundational LLMs, Fine-tuning, and Neural Architecture.",
      tools: [
        { name: "PyTorch", slug: "pytorch" },
        { name: "Hugging Face", slug: "huggingface" },
        { name: "Gemini", slug: "google" },
        { name: "OpenAI", slug: "openai" },
        { name: "Python", slug: "python" }
      ]
    },
    {
      title: "Memory",
      description: "Vector Databases, RAG Pipelines, and Semantic Retrieval.",
      tools: [
        { name: "Weaviate", slug: "weaviate" },
        { name: "PostgreSQL", slug: "postgresql" },
        { name: "Redis", slug: "redis" },
        { name: "Supabase", slug: "supabase" }
      ]
    },
    {
      title: "Action",
      description: "Agentic Orchestration, API Bridging, and Deployment.",
      tools: [
        { name: "LangChain", slug: "langchain" },
        { name: "FastAPI", slug: "fastapi" },
        { name: "Docker", slug: "docker" },
        { name: "Next.js", slug: "nextdotjs" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Vercel", slug: "vercel" }
      ]
    }
  ]

  return (
    <section className="py-24 bg-background relative border-y border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black">Strategic Infrastructure</span>
          <h2 className="text-3xl md:text-6xl font-medium tracking-tight italic uppercase">Agentic <span className="text-white/40">Arsenal</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-8 group"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">{cat.description}</p>
              </div>

              <div className="relative overflow-hidden w-full h-12">
                <motion.div 
                  className="flex gap-4 absolute whitespace-nowrap"
                  animate={{
                    x: [0, -1000]
                  }}
                  transition={{
                    duration: 20 + (i * 5),
                    ease: "linear",
                    repeat: Infinity
                  }}
                >
                  {[...cat.tools, ...cat.tools, ...cat.tools, ...cat.tools, ...cat.tools].map((tool, idx) => (
                    <div 
                      key={`${tool.slug}-${idx}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all group/tool shadow-xl"
                    >
                      <img 
                        src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                        alt={tool.name}
                        className="w-4 h-4 opacity-70 group-hover/tool:opacity-100 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/speedtest/white`;
                        }}
                      />
                      <span className="text-[11px] font-bold text-white/80 group-hover/tool:text-white transition-colors uppercase tracking-widest">{tool.name}</span>
                    </div>
                  ))}
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
