"use server"

import { getDailyInsight } from "@/lib/gemini";
import { supabase, SprintLog } from "@/lib/supabase";

export async function generateAISprintInsight() {
  try {
    // 1. Fetch the logs on the server
    const { data: logs, error } = await supabase
      .from("sprint_logs")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    if (!logs || logs.length === 0) {
      return "No logs found to analyze. Start shipping and I'll give you insights.";
    }

    // 2. Pass them to Gemini
    const insight = await getDailyInsight(logs as SprintLog[]);
    
    return insight;
  } catch (error) {
    console.error("Action Error:", error);
    return `Error generating insight: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}
