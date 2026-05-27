export interface ChallengeEntry {
  id: string;
  day_number: number;
  title: string;
  tool_name: string;
  pain_point: string;
  tech_stack: string[];
  category: "automation" | "saas" | "hardware_automation";
  live_url: string | null;
  github_url: string | null;
  slug: string;
  log_content: string | null;
  created_at: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  category: "ai-100" | "hardware" | "growth";
  date: string;
  readingTime: number;
  excerpt: string;
  tags: string[];
  content: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  category: "hardware" | "ai_automation" | "saas";
  tech_stack: string[];
  metrics_benefit: string | null;
  live_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  created_at: string;
}
