import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our sprint logs
export interface SprintLog {
  id: string;
  date: string;
  title: string;
  content: string;
  status: string;
  phase: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
