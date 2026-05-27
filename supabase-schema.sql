-- JK Space — Supabase Schema
-- Run this in the Supabase SQL Editor

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('hardware', 'ai_automation', 'saas')),
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    metrics_benefit TEXT,
    live_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.challenge_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_number INTEGER UNIQUE NOT NULL CHECK (day_number BETWEEN 1 AND 100),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tool_name TEXT NOT NULL,
    pain_point TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL CHECK (category IN ('automation', 'saas', 'hardware_automation')),
    live_url TEXT,
    github_url TEXT,
    log_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX idx_projects_category ON public.projects (category);
CREATE INDEX idx_projects_featured ON public.projects (is_featured) WHERE is_featured = true;
CREATE INDEX idx_challenge_day ON public.challenge_entries (day_number);
CREATE INDEX idx_challenge_category ON public.challenge_entries (category);
CREATE INDEX idx_challenge_slug ON public.challenge_entries (slug);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.challenge_entries FOR SELECT USING (true);
