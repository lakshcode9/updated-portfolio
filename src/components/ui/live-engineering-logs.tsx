"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { supabase, SprintLog } from "@/lib/supabase";
import { Loader2, ChevronDown, ChevronUp, Calendar, Flame, BookOpen, Layers, Grid, Target, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper to render BlockNote content for the public
function RenderBlockNote({ content, full = false }: { content: string, full?: boolean }) {
  if (!content) return null;
  
  try {
    const blocks = JSON.parse(content);
    if (!Array.isArray(blocks)) return <p className="text-muted-foreground italic text-sm">{content}</p>;
    
    const displayedBlocks = full ? blocks : blocks.slice(0, 2);

    return (
      <div className={`flex flex-col gap-3 ${!full && "max-h-32 overflow-hidden relative"}`}>
        {displayedBlocks.map((block: any, i: number) => {
          switch (block.type) {
            case "heading":
              const Tag: any = `h${Math.min(block.props.level + 2, 6)}`;
              return <Tag key={i} className={`font-medium text-foreground ${full ? "text-xl mt-4" : "text-sm mt-1"}`}>{block.content[0]?.text}</Tag>;
            case "image":
              return (
                <div key={i} className="my-2 rounded-xl overflow-hidden border border-border/20">
                  <img src={block.props.url} alt="Log attachment" className="w-full object-cover max-h-96" />
                </div>
              );
            case "bulletListItem":
            case "numberedListItem":
              return (
                <li key={i} className={`${full ? "text-base" : "text-xs"} text-muted-foreground ml-4 list-disc`}>
                  {block.content[0]?.text}
                </li>
              );
            case "codeBlock":
              return (
                <pre key={i} className="p-3 rounded-lg bg-background/50 border border-border/20 text-[10px] font-mono overflow-x-auto text-foreground/70">
                  {block.content[0]?.text}
                </pre>
              );
            default:
              return (
                <p key={i} className={`${full ? "text-base" : "text-xs"} text-muted-foreground leading-relaxed`}>
                  {block.content?.map((c: any) => c.text).join("")}
                </p>
              );
          }
        })}
        {!full && blocks.length > 2 && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>
    );
  } catch {
    return <p className="text-muted-foreground italic text-sm line-clamp-3">{content}</p>;
  }
}

export function LiveEngineeringLogs() {
  const [allLogs, setAllLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"recent" | "weekly">("recent");
  const [selectedLog, setSelectedLog] = useState<SprintLog | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("sprint_logs")
          .select("*")
          .eq("is_public", true)
          .order("date", { ascending: false });

        if (error) throw error;
        setAllLogs(data || []);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const stats = useMemo(() => {
    if (allLogs.length === 0) return { streak: 0, total: 0 };
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split("T")[0];
    const sortedDates = [...new Set(allLogs.map(l => l.date))].sort().reverse();
    
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
    return { streak, total: allLogs.length };
  }, [allLogs]);

  const weeklyLogs = useMemo(() => {
    const groups: { [key: string]: SprintLog[] } = {};
    allLogs.forEach(log => {
      const date = new Date(log.date);
      const weekNumber = Math.ceil(date.getDate() / 7);
      const key = `Phase ${log.phase} - Week ${weekNumber}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(log);
    });
    return groups;
  }, [allLogs]);

  const displayedLogs = isExpanded ? allLogs : allLogs.slice(0, 3);

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats & View Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card/30 border border-border/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-xl font-bold">{stats.streak}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xl font-bold">{stats.total}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Logs</p>
            </div>
          </div>
        </div>

        <div className="flex bg-background/50 p-1 rounded-xl border border-border/20">
          <button 
            onClick={() => setViewMode("recent")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${viewMode === "recent" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Grid className="w-3 h-3" /> Recent
          </button>
          <button 
            onClick={() => setViewMode("weekly")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${viewMode === "weekly" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Layers className="w-3 h-3" /> Weekly Summary
          </button>
        </div>
      </div>

      {viewMode === "recent" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedLogs.map((log, i) => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedLog(log)}
                className="p-5 rounded-2xl bg-card border border-border/40 flex flex-col gap-4 group hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between h-6">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <Badge className="bg-primary/10 text-primary border-none text-[8px]">Phase {log.phase}</Badge>
                </div>
                
                <h3 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">{log.title}</h3>
                
                {log.daily_goal && (
                  <div className="flex items-center gap-2 py-1 px-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                    <Target className="w-3 h-3 text-purple-400" />
                    <p className="text-[10px] text-purple-200/80 italic line-clamp-1">{log.daily_goal}</p>
                  </div>
                )}

                <div className="flex-1">
                  <RenderBlockNote content={log.content} full={false} />
                </div>
                
                {log.status && (
                  <div className="px-3 py-2 rounded-lg bg-background/50 border border-border/20 group-hover:bg-primary/5 transition-colors">
                    <p className="text-[10px] font-mono text-foreground/60">{log.status}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(weeklyLogs).map(([week, logs]) => (
            <div key={week} className="p-6 rounded-2xl bg-card border border-border/40">
              <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">{week}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {logs.map(log => (
                  <div 
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className="text-[11px] text-muted-foreground flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="font-mono">{new Date(log.date).getDate()}/{(new Date(log.date).getMonth()+1)}</span>
                    <span className="truncate flex-1">{log.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border/40 rounded-3xl shadow-2xl p-6 md:p-10 hide-scrollbar"
            >
              <button 
                onClick={() => setSelectedLog(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/10 text-primary border-none text-xs px-3 py-1">Day {Math.ceil((new Date(selectedLog.date).getTime() - new Date(allLogs[allLogs.length-1].date).getTime()) / 86400000) + 1}</Badge>
                    <span className="text-sm text-muted-foreground font-mono">
                      {new Date(selectedLog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight h-auto leading-tight">{selectedLog.title}</h2>
                  
                  {selectedLog.daily_goal && (
                    <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                      <Target className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Today&apos;s Focus</p>
                        <p className="text-sm text-purple-200/90 italic">{selectedLog.daily_goal}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border/40 pt-8">
                  <RenderBlockNote content={selectedLog.content} full={true} />
                </div>

                {selectedLog.status && (
                  <div className="mt-4 p-4 rounded-2xl bg-background/50 border border-border/20">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Status Report</p>
                    <p className="text-sm font-mono text-foreground/70">{selectedLog.status}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {allLogs.length > 3 && viewMode === "recent" && (
        <div className="text-center">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-muted-foreground hover:text-foreground">
            {isExpanded ? <><ChevronUp className="w-3 h-3 mr-2" /> Show Less</> : <><ChevronDown className="w-3 h-3 mr-2" /> Show all {allLogs.length} logs</>}
          </Button>
        </div>
      )}
    </div>
  );
}
