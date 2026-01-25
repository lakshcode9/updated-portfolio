"use server"

import { getDailyInsight, queryArchive, generateSocialBrief } from "@/lib/gemini";
import { supabase, SprintLog } from "@/lib/supabase";

export async function generateAISprintInsight() {
  try {
    const { data: logs, error } = await supabase
      .from("sprint_logs")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    if (!logs || logs.length === 0) {
      return "No logs found to analyze. Start shipping and I'll give you insights.";
    }

    const insight = await getDailyInsight(logs as SprintLog[]);
    return insight;
  } catch (error) {
    console.error("Action Error:", error);
    return `Error generating insight: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

export async function queryArchiveVault(userQuery: string) {
  try {
    const { data: logs, error } = await supabase
      .from("sprint_logs")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    if (!logs || logs.length === 0) return "Vault is empty.";

    return await queryArchive(logs as SprintLog[], userQuery);
  } catch (error) {
    console.error("Archive Query Error:", error);
    return `Error querying vault: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

export async function generateSocialBriefAction(log: SprintLog) {
  try {
    return await generateSocialBrief(log);
  } catch (error) {
    console.error("Social Brief Error:", error);
    return `Error generating brief: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}
