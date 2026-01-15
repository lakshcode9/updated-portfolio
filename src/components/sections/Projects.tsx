"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "AutoIkigai Systems",
    subtitle: "An AI automation agency for small businesses.",
    description: "Built lead capture, WhatsApp bots, CRM flows, and AI automations for real clients.",
    tech: ["n8n", "OpenAI", "Meta Cloud API", "Airtable"],
    learning: "Learned how to manage multi-step logic flows and handle real-time customer data securely."
  },
  {
    title: "SignalScope.dev",
    subtitle: "A competitive-intelligence tool for indie founders.",
    description: "Tracks market signals, trends, and traction to stay ahead of the competition.",
    tech: ["Next.js", "Python", "Supabase", "Apify"],
    learning: "Mastered data orchestration and how to present high-signal insights in a clean UI."
  },
  {
    title: "Web4.sbs",
    subtitle: "A no-code platform that turns natural language into software.",
    description: "Users describe what they want and the app generates usable code in real-time.",
    tech: ["LLMs", "React", "Node.js", "Web Containers"],
    learning: "Explored the limits of prompt engineering and structured code generation."
  },
  {
    title: "WhatsApp AI Concierge",
    subtitle: "AI assistant for customer support and lead qualification.",
    description: "Built with Meta Cloud API, n8n, JWT, and a local LLM for full privacy and control.",
    tech: ["Meta API", "n8n", "JWT", "Local LLM"],
    learning: "Deep dive into authentication, webhooks, and self-hosted AI deployments."
  },
  {
    title: "Outbound & Lead Gen Engine",
    subtitle: "Multi-domain, multi-inbox scraping and outreach system.",
    description: "A scale-ready cold-outreach system built with Apify, Make, Zoho, and custom automations.",
    tech: ["Apify", "Make.com", "Zoho CRM", "Automation"],
    learning: "Learned the nuances of deliverability, scraping ethics, and infrastructure scaling."
  }
]

export function Projects() {
  return (
    <section id="work" className="py-24 px-6 md:py-32 bg-card/10">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center items-center"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Portoflio</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Real Projects. Real Results.</h2>
          <p className="text-muted-foreground max-w-xl text-sm italic">
            No fake revenue. No fake testimonials. Just systems that work.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-card border border-border/40 hover:border-primary/20 transition-all flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/80 font-medium text-sm">
                  {project.subtitle}
                </p>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="px-3 py-1 bg-primary/5 text-[10px] font-bold border-none uppercase tracking-wider">
                    {t}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-6 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  <span className="text-foreground font-bold mr-2 uppercase tracking-tighter">The Outcome:</span>
                  {project.learning}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
