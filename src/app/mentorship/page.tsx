"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, Shield, Brain, TrendingUp, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyStory } from "@/components/sections/Story";
import { PixelStory } from "@/components/sections/PixelStory";
import { FocusContainer } from "@/components/ui/focus-container";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER / NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest">Back to Gateway</span>
        </Link>
        <div className="hidden sm:block pointer-events-auto px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
           <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Limited Spots</span>
        </div>
      </nav>

      {/* HERO SECTION WITH VSL */}
      <div className="relative pt-32 pb-20 px-6 flex flex-col items-center">
         <div className="absolute top-0 inset-x-0 h-[500px] bg-green-500/5 blur-[120px] pointer-events-none" />
         
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
             
             {/* LEFT: Copy */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8 text-left"
             >
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
                    1-on-1 AI Mentorship
                </span>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.9]">
                    Learn AI.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Don't Get Left Behind.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
                    AI is changing everything. You can either watch from the sidelines or become the person everyone turns to.
                    <span className="block mt-4 text-white font-medium italic">No fluff. No hype. Just practical, hands-on AI skills you can use today.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Button className="rounded-full h-14 px-8 bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        Apply for Mentorship
                    </Button>
                    <Button variant="outline" className="rounded-full h-14 px-8 border-white/10 hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        Learn More
                    </Button>
                </div>
             </motion.div>

             {/* RIGHT: VSL Phone Frame */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mx-auto lg:mr-0 group"
            >
                {/* 1. The Glow Effect (Behind) */}
                <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                {/* 2. The Phone Chassis (Outer Container) */}
                <div 
                    className="relative w-[300px] md:w-[365px] h-[580px] md:h-[623px] bg-[#0a0a0a] rounded-[40px] p-[12px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/5 transition-transform duration-500 hover:scale-[1.01] hover:rotate-[1deg]"
                    style={{
                        boxShadow: `
                            0px 0px 0px 1px rgba(255, 255, 255, 0.05),
                            0px 1px 1px -0.5px rgba(0, 0, 0, 0.03),
                            0px 3px 3px -1.5px rgba(0, 0, 0, 0.03),
                            0px 6px 6px -3px rgba(0, 0, 0, 0.03),
                            0px 12px 12px -6px rgba(0, 0, 0, 0.03),
                            0px 24px 24px -12px rgba(0, 0, 0, 0.03),
                            0px 20px 60px -10px rgba(0, 0, 0, 0.5)
                        `
                    }}
                >
                    {/* 3. The "Screen" (Inner Container) */}
                    <div className="w-full h-full bg-zinc-900 rounded-[28px] overflow-hidden relative border border-white/5">
                        
                        {/* Video Mockup Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-zinc-800 to-black">
                             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cursor-pointer border border-white/10">
                                <Play className="w-6 h-6 text-green-400 ml-1" />
                             </div>
                             <span className="text-xs font-mono text-green-400 tracking-widest uppercase mb-2">Watch First</span>
                             <h3 className="text-xl font-medium text-white max-w-[200px] leading-tight mb-4">
                                 Why Most People Fail at Learning AI
                             </h3>
                             <p className="text-xs text-white/40 max-w-[200px]">
                                 [ VSL Coming Soon ]
                             </p>
                        </div>
                    </div>
                </div>
            </motion.div>

         </div>
      </div>

      {/* THE PROBLEM */}
      <div className="py-20 px-6 border-t border-white/5 bg-red-500/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-6">
            The Reality
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-8">
            AI Is Moving Fast.<br/>
            <span className="text-white/40">Are You Keeping Up?</span>
          </h2>
          <div className="space-y-6 text-left max-w-2xl mx-auto">
            {[
              'Your company is talking about "AI transformation" but nobody knows what that actually means',
              "You've watched 50 YouTube tutorials but still don't know how to actually USE AI at work",
              'Junior employees who "get AI" are getting promoted over experienced people',
              "You're overwhelmed by ChatGPT, Claude, Gemini, Copilot... where do you even start?",
              "You're scared that in 2 years, your skills won't matter anymore"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-red-500/[0.03] border border-red-500/10 rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-sm">✕</span>
                </div>
                <p className="text-white/60">{item}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-xl text-white/40 italic">
            Sound familiar? You're not alone. And it's not your fault.
          </p>
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-mono uppercase tracking-[0.3em] text-green-400 mb-6">
              What You'll Learn
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-4">
              Practical AI Skills<br/>
              <span className="text-white/40">That Actually Matter</span>
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Forget theory. This is hands-on, real-world AI training for working professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Master AI Fundamentals",
                description: "Understand how AI actually works—no PhD required. Get the mental models that let you learn any new AI tool in minutes."
              },
              {
                icon: Sparkles,
                title: "Prompt Engineering",
                description: "Learn how to talk to AI. Get 10x better outputs by understanding how to structure your prompts and think like the AI."
              },
              {
                icon: Zap,
                title: "AI for Your Job",
                description: "Custom workflows for YOUR role. Whether you're in sales, marketing, ops, or management—I'll show you exactly how to use AI."
              },
              {
                icon: TrendingUp,
                title: "10x Your Productivity",
                description: "Automate the boring stuff. Learn to use AI to write, research, analyze data, and make decisions faster than ever."
              },
              {
                icon: Target,
                title: "Build AI Projects",
                description: "Don't just learn—build. Create real AI-powered tools and automations you can show off at work (or on LinkedIn)."
              },
              {
                icon: Shield,
                title: "Future-Proof Your Career",
                description: 'Become the "AI person" at your company. The one everyone asks for help. The one who\'s indispensable.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-green-500/20 hover:bg-green-500/[0.02] transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="py-12 bg-black/50">
        <div className="w-full flex items-center justify-center">
            <FocusContainer>
                <MyStory />
            </FocusContainer>
        </div>
        <div className="w-full flex items-center justify-center -mt-12 md:mt-0">
             <PixelStory />
        </div>
      </div>

      {/* WHO IS THIS FOR */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-mono uppercase tracking-[0.3em] text-green-400 mb-6">
            Is This For You?
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-8">
            This Mentorship is For You If...
          </h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            {[
              "You're a working professional who wants to actually understand and use AI",
              "You're tired of feeling left behind while everyone talks about ChatGPT",
              "You want personalized guidance, not another generic online course",
              "You're ready to become the go-to AI person at your company",
              "You want to future-proof your career before it's too late"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <p className="text-white/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="py-32 px-6 bg-green-500/5 border-t border-green-500/10 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
             <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">Ready to Level Up?</h2>
             <p className="text-lg text-white/50">
                I only work with a handful of people at a time. If you're serious about mastering AI and future-proofing your career, let's chat.
             </p>
             <Button className="rounded-full h-16 px-12 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                Apply for Mentorship
             </Button>
         </div>
      </div>

    </div>
  );
}
