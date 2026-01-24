"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase, SprintLog } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function LiveEngineeringLogs() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("sprint_logs")
          .select("*")
          .eq("is_public", true)
          .order("date", { ascending: false })
          .limit(20);

        if (error) throw error;
        setLogs(data || []);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || logs.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-muted-foreground italic">
          {error || "No public logs yet. The journey is just beginning."}
        </span>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] border border-border/40 rounded-3xl p-8 bg-card/20">
      <div className="flex flex-col gap-12">
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8 border-l border-border/40 flex flex-col gap-4"
          >
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium tracking-tight text-muted-foreground">
                  {new Date(log.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Phase {log.phase}
                </span>
              </div>
              <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold">
                LOGGED
              </Badge>
            </div>
            <h3 className="text-xl font-medium uppercase">{log.title}</h3>
            <p className="text-muted-foreground leading-relaxed italic text-sm">
              {log.content}
            </p>
            {log.status && (
              <div className="bg-background/50 p-4 rounded-xl border border-border/40">
                <p className="text-xs font-mono text-foreground/80">{log.status}</p>
              </div>
            )}
          </motion.div>
        ))}
        <div className="text-center py-8">
          <span className="text-xs text-muted-foreground uppercase tracking-widest italic">
            Live from Supabase • Updated in real-time
          </span>
        </div>
      </div>
    </ScrollArea>
  );
}
