"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const roadmap = [
  { month: "Month 1", focus: "AI Fundamentals", tracks: ["Calculus/Linear Algebra for AI", "Neural Networks from scratch", "Python performance"] },
  { month: "Month 2", focus: "Agents & Orchestration", tracks: ["LangChain/LlamaIndex depth", "Multi-agent systems", "State management in AI"] },
  { month: "Month 3", focus: "RAG & Vector DBs", tracks: ["Pinecone/Weaviate", "Embedding strategies", "Hybrid search"] },
  { month: "Month 4", focus: "Backend for AI", tracks: ["FastAPI depth", "Redis/Queueing", "Serverless deployment"] },
  { month: "Month 5", focus: "Products & MVPs", tracks: ["System architecture", "User feedback loops", "Product design"] },
  { month: "Month 6", focus: "Deployment & Scale", tracks: ["Docker/K8s", "Monitoring & Logging", "GPU optimization"] },
]

const logs = [
  { 
    date: "Jan 14, 2026", 
    title: "Sprint Start & Setup", 
    content: "Initialized the portfolio and defined the 6-month curriculum. Focused on setting up a high-signal environment for tracking engineering progress.",
    status: "Fixed: Initial environment boilerplate issues."
  },
  { 
    date: "Jan 13, 2026", 
    title: "Deep Dive: OpenAI Meta API Integration", 
    content: "Refined the WhatsApp Concierge logic. Managed to reduce latency by 40% using local caching.",
    status: "Learned: Meta Cloud API rate limits and JWT expiration handling."
  }
]

export default function SprintPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 text-center items-center"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold">The Core Asset</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">THE 6-MONTH AI ENGINEER SPRINT</h1>
        <p className="text-muted-foreground max-w-2xl text-lg italic">
          Becoming a deeply skilled AI engineer by shipping real systems in public.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Roadmap Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tighter">The Roadmap</h2>
          <div className="flex flex-col gap-6">
            {roadmap.map((item, i) => (
              <motion.div 
                key={item.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary">{item.month}</span>
                  <Badge variant="outline" className="text-[10px] uppercase">{item.focus}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tracks.map(track => (
                    <span key={track} className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded">
                      {track}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Log Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tighter">Daily Engineering Log</h2>
          <ScrollArea className="h-[800px] border border-border/40 rounded-3xl p-8 bg-card/20">
            <div className="flex flex-col gap-12">
              {logs.map((log, i) => (
                <motion.div 
                  key={log.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-border/40 flex flex-col gap-4"
                >
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tighter text-muted-foreground">{log.date}</span>
                    <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-black uppercase">LOGGED</Badge>
                  </div>
                  <h3 className="text-xl font-bold uppercase">{log.title}</h3>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">
                    {log.content}
                  </p>
                  <div className="bg-background/50 p-4 rounded-xl border border-border/40">
                    <p className="text-xs font-mono text-foreground/80">
                      {log.status}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="text-center py-8">
                <span className="text-xs text-muted-foreground uppercase tracking-widest italic">The journey is just beginning.</span>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
