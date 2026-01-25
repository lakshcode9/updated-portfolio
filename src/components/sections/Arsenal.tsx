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
        { name: "Pinecone", slug: "pinecone" },
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
          <h2 className="text-3xl md:text-6xl font-medium tracking-tight italic uppercase">Agentic <span className="text-white/20">Arsenal</span></h2>
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
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                <p className="text-xs text-white/40 font-light leading-relaxed">{cat.description}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {cat.tools.map((tool) => (
                  <div 
                    key={tool.slug}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all group/tool"
                  >
                    <img 
                      src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                      alt={tool.name}
                      className="w-3.5 h-3.5 opacity-40 group-hover/tool:opacity-100 transition-opacity"
                    />
                    <span className="text-[10px] font-medium text-white/30 group-hover/tool:text-white transition-colors uppercase tracking-widest">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
