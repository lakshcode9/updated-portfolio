"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle2, Terminal, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const { error: submitError } = await supabase
        .from('contact_requests')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ])

      if (submitError) throw submitError

      setIsSent(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err: any) {
      console.error("Submission error:", err)
      setError(err.message || "Failed to establish connection. System offline.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 text-center items-center"
        >
          <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
            <Terminal className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Inbound // Contact_Request</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-medium tracking-tight italic uppercase">Establish <span className="text-white/20 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Connection</span></h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl">
            Currently open for high-signal AI automations, engineering collaborations, or strategic system architecture. 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Electronic Mail</span>
                <a href="mailto:lakshpoojary64@gmail.com" className="text-xl md:text-2xl font-bold hover:text-blue-400 transition-colors">
                  lakshpoojary64@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Social Uplinks</span>
                <div className="flex gap-6">
                   <a href="https://github.com/lakshcode9" target="_blank" className="text-sm font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">Github</a>
                   <a href="https://instagram.com/lakshbuilds" target="_blank" className="text-sm font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">Instagram</a>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Send className="w-20 h-20 -rotate-12" />
              </div>
              <p className="text-xs md:text-sm text-white/40 leading-relaxed italic">
                "I prioritize depth over volume. If you have a complex problem that requires raw engineering and zero bullshit, we should talk."
              </p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {!isSent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold px-1">Source Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Identify yourself..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10 text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold px-1">Response Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10 text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold px-1">The Mission</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="What are we building?"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10 resize-none text-white"
                  />
                </div>
                <Button 
                  disabled={isSubmitting}
                  className="rounded-xl h-12 bg-white text-black font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all overflow-hidden relative"
                >
                  <span className={cn("transition-all duration-300 flex items-center gap-2", isSubmitting && "opacity-0")}>
                    Synchronize
                    <Send className="w-4 h-4" />
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold uppercase italic">Connection Established</h3>
                  <p className="text-sm text-blue-400/60 font-medium">Your request has been synchronized with the vault. Standby for response.</p>
                </div>
                <button 
                  onClick={() => setIsSent(false)}
                  className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 hover:text-white transition-colors"
                >
                  Send another request
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
