"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { supabase, SprintLog } from "@/lib/supabase";
import { Loader2, ChevronRight, Calendar, Flame } from "lucide-react";
import Link from "next/link";

export function LiveEngineeringLogs() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        // Fetch only the 3 most recent logs
        const { data, error, count } = await supabase
          .from("sprint_logs")
          .select("*", { count: "exact" })
          .eq("is_public", true)
          .order("date", { ascending: false })
          .limit(3);

        if (error) throw error;
        setLogs(data || []);
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

  // Calculate streak from logs
  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split("T")[0];
    
    // Simple check: if most recent log is today or yesterday, show at least 1
    const mostRecentDate = logs[0]?.date;
    if (mostRecentDate === todayStr || mostRecentDate === yesterdayStr) {
      return Math.min(logs.length, 7); // Cap display at 7 for visual purposes
    }
    return 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || logs.length === 0) {
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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div>
            <p className="text-2xl font-bold">{totalCount}</p>
            <p className="text-xs text-muted-foreground">Total Logs</p>
          </div>
        </div>
        <Link
          href="/learn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          View All Logs
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recent Logs - Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-colors flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(log.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
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
      </div>

      {/* Footer */}
      {totalCount > 3 && (
        <div className="text-center">
          <Link
            href="/learn"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            + {totalCount - 3} more logs →
          </Link>
        </div>
      )}
    </div>
  );
}
