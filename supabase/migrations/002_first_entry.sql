-- Run this in Supabase SQL Editor to clean up and add the first real entry

-- First, delete all existing dummy entries
DELETE FROM sprint_logs;

-- Insert the first meaningful entry
INSERT INTO sprint_logs (date, title, content, status, phase, is_public) VALUES
(
  '2026-01-24',
  'Day 0: The Beginning of the 180-Day Sprint',
  'Today marks the official start of my 180-day AI Engineer sprint. I''m Laksh Pujari, a builder and founder transitioning from someone who USES AI tools to someone who truly UNDERSTANDS and BUILDS them.

This dashboard was built with the help of Antigravity (an AI coding assistant), and it''s fitting that the first entry is about the tools that will help me on this journey.

What''s the plan?
• 6 months of deep, focused learning
• Daily logs to track progress and learnings
• Public accountability through my portfolio
• Building real projects, not just tutorials

The goal isn''t to become a researcher. It''s to become dangerous enough to architect and ship AI products that actually solve problems.

Let''s begin.',
  'Started: The 180-day journey officially begins.',
  1,
  true
);
