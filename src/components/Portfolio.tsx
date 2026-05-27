"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Zap, Package, Cpu, ArrowRight } from "lucide-react";
import type { ChallengeEntry, Project } from "@/types";

/* ── Mock data ── */
const MOCK_CHALLENGES: ChallengeEntry[] = [
  {
    id: "1",
    day_number: 1,
    title: "n8n Webhook 自動轉發機器人",
    slug: "day-01-n8n-webhook-bot",
    tool_name: "n8n",
    pain_point: "手動轉發 Slack 通知耗費大量時間",
    tech_stack: ["n8n", "Webhook", "Slack API"],
    category: "automation",
    live_url: null,
    github_url: "https://github.com",
    log_content: null,
    created_at: "2026-01-01",
  },
  {
    id: "2",
    day_number: 2,
    title: "Dify 文件摘要 Agent",
    slug: "day-02-dify-doc-summary",
    tool_name: "Dify",
    pain_point: "PDF 技術文件難以快速提取關鍵資訊",
    tech_stack: ["Dify", "Claude 3", "RAG"],
    category: "automation",
    live_url: "https://example.com",
    github_url: null,
    log_content: null,
    created_at: "2026-01-02",
  },
  {
    id: "3",
    day_number: 3,
    title: "BOM 元件自動比對系統 MVP",
    slug: "day-03-bom-comparison-mvp",
    tool_name: "Python + Supabase",
    pain_point: "硬體工程師每次手動比對 BOM 需要 3+ 小時",
    tech_stack: ["Python", "Supabase", "Next.js"],
    category: "saas",
    live_url: "https://example.com",
    github_url: "https://github.com",
    log_content: null,
    created_at: "2026-01-03",
  },
  {
    id: "4",
    day_number: 4,
    title: "RF 測試報告自動生成器",
    slug: "day-04-rf-test-report",
    tool_name: "n8n + Keysight API",
    pain_point: "量測完成後手動整理報告需 2 小時",
    tech_stack: ["n8n", "Keysight API", "Google Docs API"],
    category: "hardware_automation",
    live_url: null,
    github_url: "https://github.com",
    log_content: null,
    created_at: "2026-01-04",
  },
  {
    id: "5",
    day_number: 5,
    title: "Claude Code 程式碼審查 Bot",
    slug: "day-05-claude-code-review-bot",
    tool_name: "Claude Code",
    pain_point: "Code Review 時間佔據 30% 開發週期",
    tech_stack: ["Claude Code", "GitHub Actions", "TypeScript"],
    category: "automation",
    live_url: null,
    github_url: "https://github.com",
    log_content: null,
    created_at: "2026-01-05",
  },
  {
    id: "6",
    day_number: 6,
    title: "BMS 電量預測 SaaS Dashboard",
    slug: "day-06-bms-dashboard",
    tool_name: "Next.js + Supabase",
    pain_point: "電池數據分散，無法即時監控 SOC/SOH",
    tech_stack: ["Next.js", "Supabase", "Recharts"],
    category: "saas",
    live_url: "https://example.com",
    github_url: null,
    log_content: null,
    created_at: "2026-01-06",
  },
];

const MOCK_PROJECT: Project = {
  id: "flagship-1",
  title: "自動化 BOM 表比對系統",
  slug: "bom-comparison",
  summary: "消除硬體工程師 80% 的手動元件選型時間",
  description:
    "透過 AI 輔助的元件資料庫比對引擎，自動化處理 PCB 設計階段的 BOM 元件篩選、替代料推薦與成本最佳化流程。",
  category: "saas",
  tech_stack: ["Next.js 15", "Supabase", "Claude API", "Python", "Tailwind"],
  metrics_benefit: "節省 80% 人工比對時間，降低 15% BOM 成本",
  live_url: "https://example.com",
  github_url: "https://github.com",
  is_featured: true,
  created_at: "2026-01-01",
};

const CATEGORY_FILTERS = [
  { id: "all", label: "全部", icon: null },
  { id: "automation", label: "自動化工具", icon: Zap },
  { id: "saas", label: "SaaS 產品", icon: Package },
  { id: "hardware_automation", label: "硬體自動化", icon: Cpu },
] as const;

type FilterId = "all" | "automation" | "saas" | "hardware_automation";

const TOTAL_DAYS = 100;

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<"challenge" | "saas">("challenge");
  const [filter, setFilter] = useState<FilterId>("all");
  const [challenges, setChallenges] = useState<ChallengeEntry[]>(MOCK_CHALLENGES);
  const [completedDays, setCompletedDays] = useState(MOCK_CHALLENGES.length);

  useEffect(() => {
    setCompletedDays(MOCK_CHALLENGES.length);
    setChallenges(MOCK_CHALLENGES);
  }, []);

  const filtered =
    filter === "all" ? challenges : challenges.filter((c) => c.category === filter);

  const progress = Math.round((completedDays / TOTAL_DAYS) * 100);

  return (
    <section id="portfolio" className="py-16 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="font-mono text-xs font-medium tracking-widest uppercase mb-3 block"
            style={{ color: "var(--color-brand-blue)" }}
          >
            /portfolio — Lab & Showcase
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">數據化作品集</h1>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "var(--color-text-muted)" }}>
            可量化的成果，可驗證的技術深度。
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 mb-10 glass rounded-xl p-1.5 w-fit mx-auto"
        >
          {[
            { id: "challenge" as const, label: "AI 100 實驗室" },
            { id: "saas" as const, label: "旗艦 SaaS 產品" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                activeTab === tab.id
                  ? { backgroundColor: "var(--color-brand-blue)", color: "#030712" }
                  : { color: "var(--color-text-muted)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "challenge" ? (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Progress bar */}
              <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono text-sm font-semibold" style={{ color: "var(--color-brand-blue)" }}>
                      Day {String(completedDays).padStart(2, "0")} / {TOTAL_DAYS}
                    </span>
                    <span className="text-xs ml-3" style={{ color: "var(--color-text-muted)" }}>
                      AI 100 Apps 挑戰進行中
                    </span>
                  </div>
                  <span className="font-mono text-xl font-bold" style={{ color: "var(--color-brand-blue)" }}>
                    {progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${progress}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-indigo))",
                      boxShadow: "0 0 10px rgba(0,229,255,0.5)",
                    }}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORY_FILTERS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200"
                    style={
                      filter === id
                        ? {
                            backgroundColor: "rgba(0,229,255,0.1)",
                            borderColor: "rgba(0,229,255,0.4)",
                            color: "var(--color-brand-blue)",
                          }
                        : {
                            backgroundColor: "transparent",
                            borderColor: "rgba(255,255,255,0.1)",
                            color: "var(--color-text-muted)",
                          }
                    }
                  >
                    {Icon && <Icon size={12} />}
                    {label}
                  </button>
                ))}
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <Link
                        href={`/portfolio/${entry.slug}`}
                        className="glass rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 block"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,229,255,0.25)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 15px rgba(0,229,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                        }}
                      >
                        {/* Day badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className="font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded-md"
                            style={{
                              color: "var(--color-brand-blue)",
                              backgroundColor: "rgba(0,229,255,0.08)",
                              border: "1px solid rgba(0,229,255,0.2)",
                            }}
                          >
                            DAY {String(entry.day_number).padStart(2, "0")}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {entry.tool_name}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-semibold text-sm leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors duration-200"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {entry.title}
                        </h3>

                        {/* Pain point */}
                        <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
                          💡 {entry.pain_point}
                        </p>

                        {/* Tech stack tags */}
                        <div className="flex flex-wrap gap-1">
                          {entry.tech_stack.map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded text-xs font-mono"
                              style={{
                                backgroundColor: "rgba(59,130,246,0.1)",
                                color: "var(--color-brand-indigo)",
                                border: "1px solid rgba(59,130,246,0.2)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Links row */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex gap-2">
                            {entry.live_url && (
                              <a
                                href={entry.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                                style={{ backgroundColor: "var(--color-brand-blue)", color: "#030712" }}
                              >
                                <ExternalLink size={10} /> Demo
                              </a>
                            )}
                            {entry.github_url && (
                              <a
                                href={entry.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-white/10"
                                style={{
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  color: "var(--color-text-muted)",
                                }}
                              >
                                <Github size={10} /> Code
                              </a>
                            )}
                          </div>
                          <ArrowRight
                            size={13}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ color: "var(--color-brand-blue)" }}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* ── SaaS Showcase ── */
            <motion.div
              key="saas"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <FlagshipCard project={MOCK_PROJECT} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FlagshipCard({ project }: { project: Project }) {
  return (
    <div
      className="glass rounded-3xl p-8 md:p-10 transition-all duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,229,255,0.3)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 30px rgba(0,229,255,0.2), 0 0 60px rgba(0,229,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Featured badge */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-mono font-medium"
          style={{
            backgroundColor: "rgba(0,229,255,0.1)",
            color: "var(--color-brand-blue)",
            border: "1px solid rgba(0,229,255,0.25)",
          }}
        >
          ★ Flagship Product
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: content */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{project.title}</h2>
            <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
              {project.description}
            </p>
          </div>

          {/* Metrics */}
          {project.metrics_benefit && (
            <div
              className="px-4 py-3 rounded-xl border"
              style={{
                backgroundColor: "rgba(0,229,255,0.04)",
                borderColor: "rgba(0,229,255,0.15)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--color-brand-blue)" }}>
                📊 量化效益
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                {project.metrics_benefit}
              </p>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono"
                  style={{
                    backgroundColor: "rgba(59,130,246,0.1)",
                    color: "var(--color-brand-indigo)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-brand-blue)",
                  color: "#030712",
                  boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                }}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-text-muted)" }}
              >
                <Github size={14} /> GitHub
              </a>
            )}

            {/* Whitepaper CTA */}
            <Link
              href={`/portfolio/${project.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:border-[rgba(0,229,255,0.4)] hover:text-[var(--color-brand-blue)] group"
              style={{ borderColor: "rgba(0,229,255,0.2)", color: "var(--color-brand-blue)" }}
            >
              閱讀完整技術白皮書與架構分析
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Right: architecture diagram */}
        <div
          className="rounded-2xl flex items-center justify-center min-h-48 lg:min-h-0 relative overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(0,229,255,0.1)",
          }}
        >
          <ArchDiagram />
        </div>
      </div>
    </div>
  );
}

function ArchDiagram() {
  const nodes = [
    { x: 50, y: 15, label: "BOM Input", color: "var(--color-brand-blue)" },
    { x: 50, y: 45, label: "AI Matcher", color: "var(--color-brand-indigo)" },
    { x: 20, y: 75, label: "Component DB", color: "#34d399" },
    { x: 80, y: 75, label: "BOM Report", color: "#a78bfa" },
  ];
  const edges = [
    { x1: 50, y1: 22, x2: 50, y2: 38 },
    { x1: 50, y1: 52, x2: 22, y2: 68 },
    { x1: 50, y1: 52, x2: 78, y2: 68 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-xs" preserveAspectRatio="xMidYMid meet">
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" strokeDasharray="2 1" />
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="7" fill={n.color} fillOpacity="0.15" stroke={n.color} strokeWidth="0.5" />
          <circle cx={n.x} cy={n.y} r="2.5" fill={n.color} />
          <text x={n.x} y={n.y + 12} textAnchor="middle" fontSize="4" fill="rgba(249,250,251,0.7)" fontFamily="monospace">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
