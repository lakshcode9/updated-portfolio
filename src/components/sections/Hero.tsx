"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption"
import { useEffect, useState, useMemo } from "react"
import { supabase, SprintLog } from "@/lib/supabase"
import { Flame, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [logs, setLogs] = useState<Partial<SprintLog>[]>([])
  const heroText = "I'M TAKING 180 DAYS TO MASTER AI ENGINEERING AFTER 4 YEARS OF BUILDING AS A FOUNDER. DROPPED OUT IN 3 MONTHS TO LEARN BY SHIPPING. NO BULLSH*T. JUST THE GRIND."
  const triggers = ["180 DAYS", "MASTER", "AI", "FOUNDER", "DROPPED OUT", "SHIPPING", "GRIND"]

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from("sprint_logs")
        .select("date, title, daily_goal")
        .eq("is_public", true)
        .order("date", { ascending: false });
      setLogs(data || []);
    };
    fetchLogs();
  }, []);

  const stats = useMemo(() => {
    if (logs.length === 0) return { streak: 0, day: 0, latestObjective: null, latestShipments: [] };
    
    // Calculate streak
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split("T")[0];
    const sortedDates = [...new Set(logs.map(l => l.date).filter(Boolean) as string[])].sort().reverse();
    
    let streak = 0;
    if (sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr) {
      streak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i-1]).getTime();
        const curr = new Date(sortedDates[i]).getTime();
        if (Math.floor((prev - curr) / 86400000) === 1) streak++;
        else break;
      }
    }

    const latestObjective = logs[0]?.daily_goal || null;
    const latestShipments = logs.slice(0, 3).map(l => l.title);

    return { streak, day: sortedDates.length, latestObjective, latestShipments };
  }, [logs]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-background font-sans py-8 md:py-0">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl w-full relative z-10 flex flex-col gap-8 md:gap-10 items-center justify-center min-h-[70vh] md:min-h-[80vh] px-2"
      >
        {/* Live Sprint Status Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-[450px] px-4"
        >
          <Link href="/sprint" className="group">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex flex-col gap-4 hover:bg-white/10 transition-all hover:border-blue-500/30 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Rocket className="w-12 h-12" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Flame className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live Sprint Status</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white leading-none">Day {stats.day}</span>
                    <div className="w-px h-3 bg-white/20" />
                    <span className="text-sm font-medium text-white/40">{stats.streak} Day Streak</span>
                  </div>
                </div>
              </div>

              {stats.latestObjective && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold block mb-1">Current Objective</span>
                  <p className="text-xs text-white/80 font-medium italic line-clamp-1">
                    {stats.latestObjective}
                  </p>
                </div>
              )}

              {stats.latestShipments.length > 0 && (
                <div className="pt-3 border-t border-white/5">
                   <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold block mb-2">Latest Shipments</span>
                   <div className="flex flex-col gap-1.5">
                     {stats.latestShipments.map((title, i) => (
                       <div key={i} className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                         <div className="w-1 h-1 rounded-full bg-blue-400/50" />
                         <span className="text-[10px] text-white/70 truncate">{title}</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </Link>
        </motion.div>

        <div className="flex items-center justify-center w-full px-2">
          <HyperTextParagraph
            text={heroText}
            highlightWords={triggers}
            className="text-xl sm:text-3xl md:text-6xl font-normal text-foreground leading-[1.3] md:leading-snug uppercase tracking-wide drop-shadow-2xl text-center max-w-4xl mx-auto"
          />
        </div>

        <p className="text-xs sm:text-base md:text-xl text-muted-foreground max-w-[85%] md:max-w-2xl font-medium italic mt-2 md:mt-4 text-center">
          Leaving school was the start. Building systems is the mission.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-4 w-full px-6">
          <Button size="lg" className="rounded-full w-full sm:w-auto px-10 h-12 md:h-14 text-sm md:text-base font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95" asChild>
            <a href="#work">SHIP_HISTORY</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto px-10 h-12 md:h-14 text-sm md:text-base font-bold border-white/10 transition-all hover:bg-white hover:text-black active:scale-95" asChild>
            <Link href="/sprint">DAILY_LOGS</Link>
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative mt-12 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent animate-bounce" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Hover trigger words to decrypt my story</span>
      </motion.div>
    </section>
  )
}
