-- Sprint Logs Table
-- Run this in Supabase SQL Editor: https://sqceymyxqkfpzjhrokoz.supabase.co/project/sqceymyxqkfpzjhrokoz/sql

-- Create the sprint_logs table
CREATE TABLE IF NOT EXISTS sprint_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'logged',
  phase INTEGER DEFAULT 1 CHECK (phase >= 1 AND phase <= 6),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_sprint_logs_date ON sprint_logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_sprint_logs_public ON sprint_logs(is_public);

-- Enable Row Level Security
ALTER TABLE sprint_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read public logs
CREATE POLICY "Public logs are viewable by everyone" 
ON sprint_logs FOR SELECT 
USING (is_public = true);

-- Policy: Authenticated users can do everything
CREATE POLICY "Authenticated users can do everything" 
ON sprint_logs FOR ALL 
USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_sprint_logs_updated_at
  BEFORE UPDATE ON sprint_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional, remove if not needed)
INSERT INTO sprint_logs (date, title, content, status, phase, is_public) VALUES
  ('2026-01-24', 'Sprint Start & Setup', 'Initialized the portfolio and defined the 6-month curriculum. Focused on setting up a high-signal environment for tracking engineering progress.', 'Fixed: Initial environment boilerplate issues.', 1, true),
  ('2026-01-23', 'Deep Dive: Supabase Integration', 'Connected Supabase to the portfolio for real-time sprint logging. Built the learn dashboard.', 'Learned: Supabase RLS policies and auth setup.', 1, true);
