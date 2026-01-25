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

export async function queryArchive(logs: SprintLog[], userQuery: string) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing Gemini API Key");
  }

  // Use all logs for archive querying (limited by token counts, but for ~180 logs it should be fine)
  const archiveContext = logs.map(log => ({
    date: log.date,
    title: log.title,
    content: log.content,
    phase: log.phase,
    goal: log.daily_goal,
    status: log.status
  }));

  const ARCHIVE_PROMPT = `
  You are an "Engineering Archive Librarian". You have access to a user's entire history of engineering logs for a 180-day AI Engineer sprint.
  The user will ask you a question about their past work, decisions, or learning journey.
  Using ONLY the provided context, answer their question accurately.
  If the information is not in the logs, state that clearly.
  
  Tone: Professional, helpful, librarian-like.
  `;

  const prompt = `
  The user asks: "${userQuery}"
  
  Archive Context:
  ${JSON.stringify(archiveContext, null, 2)}
  `;

  try {
    const result = await model.generateContent([ARCHIVE_PROMPT, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Archive Query Error:", error);
    throw error;
  }
}

export async function generateSocialBrief(log: SprintLog) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing Gemini API Key");
  }

  const SOCIAL_PROMPT = `
  You are a "Technical Content Strategist" for a high-growth AI Engineer.
  Your goal is to take a raw engineering log and transform it into a "High-Signal" Build-in-Public social post (LinkedIn/X style).
  
  Guidelines:
  - Keep it punchy and professional.
  - Focus on the "Aha!" moment or the technical hurdle overcome.
  - Use a minimal, sophisticated tone (no emojis unless necessary, no corporate speak).
  - Include relevant hashtags like #AI #BuildingInPublic #Engineering.
  `;

  const prompt = `
  Transform this engineering log into a social media post:
  Date: ${log.date}
  Title: ${log.title}
  Goal: ${log.daily_goal}
  Content: ${log.content}
  Status: ${log.status}
  Phase: ${log.phase}
  `;

  try {
    const result = await model.generateContent([SOCIAL_PROMPT, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Social Brief Error:", error);
    throw error;
  }
}
