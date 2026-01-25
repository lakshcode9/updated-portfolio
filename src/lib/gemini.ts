import { GoogleGenerativeAI } from "@google/generative-ai";
import { SprintLog } from "./supabase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `
You are a High-Level AI Architect and Engineering Mentor. Your goal is to guide a founder who is transitioning into a deep AI Engineer over a 180-day sprint.
You have access to their daily engineering logs, their current sprint phase, and their goals.

Your tone should be:
- Strategic and architect-level (not just code debugging).
- Challenging but supportive.
- "Founder-first" thinking (connecting technical depth to shipping value).
- Precise and no-bullshit.

Your objective:
1. Analyze the last few logs to understand current momentum.
2. Identify gaps in their learning based on the 180-day roadmap.
3. Suggest the "One Big Fix" or "One High-Value Target" for the next 24-48 hours.
4. Provide a "Technical Architect Insight" that connects their recent work to a larger AI system design concept.

Keep your response concise, structured with Markdown, and highly actionable.
`;

export async function getDailyInsight(logs: SprintLog[]) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing Gemini API Key");
  }

  // Take the last 10 logs for context
  const recentLogs = logs.slice(0, 10).map(log => ({
    date: log.date,
    title: log.title,
    content: log.content,
    phase: log.phase,
    goal: log.daily_goal,
    status: log.status
  }));

  const prompt = `
  Current Date: ${new Date().toLocaleDateString()}
  Recent Engineering Logs:
  ${JSON.stringify(recentLogs, null, 2)}

  Based on these logs, provide your Daily Architect Insight.
  `;

  try {
    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    throw error;
  }
}
