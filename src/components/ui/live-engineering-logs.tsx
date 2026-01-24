"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { supabase, SprintLog } from "@/lib/supabase";
import { Loader2, ChevronDown, ChevronUp, Calendar, Flame, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveEngineeringLogs() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [allLogs, setAllLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        // Fetch all public logs
        const { data, error, count } = await supabase
          .from("sprint_logs")
          .select("*", { count: "exact" })
          .eq("is_public", true)
          .order("date", { ascending: false });

        if (error) throw error;
        setAllLogs(data || []);
        setLogs((data || []).slice(0, 3)); // Show only first 3 initially
        setTotalCount(count || 0);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Calculate streak from all logs
  const calculateStreak = () => {
    if (allLogs.length === 0) return 0;
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split("T")[0];
    
    const sortedDates = [...new Set(allLogs.map(l => l.date))].sort().reverse();
    
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      return 0;
    }
    
    let streak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const toggleExpand = () => {
    if (isExpanded) {
      setLogs(allLogs.slice(0, 3));
    } else {
      setLogs(allLogs);
    }
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || allLogs.length === 0) {
    return (
      <div className="text-center py-12 border border-border/40 rounded-3xl bg-card/20">
        <div className="flex flex-col items-center gap-4">
          <Calendar className="w-12 h-12 text-muted-foreground/30" />
          <span className="text-muted-foreground italic">
            {error || "No public logs yet. The journey is just beginning."}
          </span>
        </div>
      </div>
    );
  }

  const streak = calculateStreak();

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-card/30 border border-border/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Total Logs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.05 }}
              layout
              className="p-5 rounded-2xl bg-card border border-border/40 flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(log.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Badge className="bg-primary/10 text-primary border-none text-[10px]">
                  Phase {log.phase}
                </Badge>
              </div>
              
              {/* Title */}
              <h3 className="font-medium line-clamp-2 leading-snug">{log.title}</h3>
              
              {/* Content Preview */}
              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                {log.content}
              </p>
              
              {/* Status */}
              {log.status && (
                <div className="px-3 py-2 rounded-lg bg-background/50 border border-border/20">
                  <p className="text-[11px] font-mono text-foreground/70 line-clamp-1">
                    {log.status}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse Button */}
      {totalCount > 3 && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={toggleExpand}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show {totalCount - 3} More Logs
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
