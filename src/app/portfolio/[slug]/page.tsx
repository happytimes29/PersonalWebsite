import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Github, Tag, Calendar, Layers } from "lucide-react";
import { createServerClient } from "@/lib/supabase-server";
import type { Project, ChallengeEntry } from "@/types";

/* ── Mock fallback data ── */
const MOCK_PROJECT: Project = {
  id: "flagship-1",
  title: "自動化 BOM 表比對系統",
  slug: "bom-comparison",
  summary: "消除硬體工程師 80% 的手動元件選型時間",
  description: `## 背景與痛點

在硬體量產開發流程中，電子元件清單（BOM）的比對與審查是一項耗時且容易出錯的工作。
每次設計迭代或版本更新，工程師往往需要花費 3~5 小時手動比對多份 Excel 文件，
確認料號、規格、供應商差異，才能進入採購流程。

## 系統架構

本系統採用三層架構設計：

1. **解析層**：透過 Python + pandas 自動解析多種格式的 BOM Excel 文件
2. **比對引擎**：AI 輔助的模糊比對演算法，能識別同料號的不同書寫格式
3. **報告層**：結構化差異報告生成，支援 Excel / PDF 輸出

## 技術亮點

- 支援 Altium Designer、KiCad、自定義格式的 BOM 解析
- Claude API 輔助的智能料號正規化
- Supabase 元件資料庫，支援替代料建議
- 一鍵生成審查報告，含差異摘要與風險提示

## 量化效益

- 人工審查時間：5 小時 → 8 分鐘（降低 97%）
- 漏查率：從 ~15% 降至接近 0%
- 採用量：已在 3 個量產專案中驗證`,
  category: "saas",
  tech_stack: ["Next.js 15", "Supabase", "Claude API", "Python", "pandas", "Tailwind CSS"],
  metrics_benefit: "節省 80% 人工比對時間，降低 15% BOM 成本",
  live_url: "https://example.com",
  github_url: "https://github.com",
  is_featured: true,
  created_at: "2026-01-01",
};

const MOCK_CHALLENGES: ChallengeEntry[] = [
  {
    id: "1", day_number: 1, slug: "day-01-n8n-webhook-bot",
    title: "n8n Webhook 自動轉發機器人", tool_name: "n8n",
    pain_point: "手動轉發 Slack 通知耗費大量時間",
    tech_stack: ["n8n", "Webhook", "Slack API"],
    category: "automation", live_url: null, github_url: "https://github.com",
    log_content: `## 應用場景

工程師每天需要手動將多個系統的警報通知轉發到不同的 Slack 頻道，耗時且容易遺漏。

## 解決方案

透過 n8n 建立 Webhook 監聽節點，根據來源與嚴重程度自動路由到對應頻道。

## 技術實作

- n8n Webhook 節點接收 POST 請求
- Switch 節點依來源分類
- Slack API 節點推送格式化訊息

## 成效

每日節省約 30 分鐘手動轉發時間，零漏報。`,
    created_at: "2026-01-01",
  },
  {
    id: "2", day_number: 2, slug: "day-02-dify-doc-summary",
    title: "Dify 文件摘要 Agent", tool_name: "Dify",
    pain_point: "PDF 技術文件難以快速提取關鍵資訊",
    tech_stack: ["Dify", "Claude 3", "RAG"],
    category: "automation", live_url: "https://example.com", github_url: null,
    log_content: `## 應用場景

硬體工程師每週需閱讀大量 IC 規格書（Datasheet），找到關鍵參數耗時費力。

## 解決方案

使用 Dify 搭建 RAG 文件問答 Agent，上傳 PDF 後即可自然語言查詢。

## 技術實作

- Dify Knowledge Base 解析 PDF
- Claude 3 Haiku 作為推理模型
- 向量檢索 + Reranker 提升精確度

## 成效

查找關鍵規格時間從 15 分鐘降至 30 秒。`,
    created_at: "2026-01-02",
  },
  {
    id: "3", day_number: 3, slug: "day-03-bom-comparison-mvp",
    title: "BOM 元件自動比對系統 MVP", tool_name: "Python + Supabase",
    pain_point: "硬體工程師每次手動比對 BOM 需要 3+ 小時",
    tech_stack: ["Python", "Supabase", "Next.js"],
    category: "saas", live_url: "https://example.com", github_url: "https://github.com",
    log_content: `## Day 3 實作記錄

第一個 SaaS MVP。核心功能：上傳兩份 BOM，自動列出差異。

## 技術棧選擇

- 後端：Python + FastAPI
- 資料庫：Supabase
- 前端：Next.js + Tailwind

## 今日學習

Supabase 的 Row Level Security 設計，避免多租戶資料洩漏。`,
    created_at: "2026-01-03",
  },
  {
    id: "4", day_number: 4, slug: "day-04-rf-test-report",
    title: "RF 測試報告自動生成器", tool_name: "n8n + Keysight API",
    pain_point: "量測完成後手動整理報告需 2 小時",
    tech_stack: ["n8n", "Keysight API", "Google Docs API"],
    category: "hardware_automation", live_url: null, github_url: "https://github.com",
    log_content: `## 背景

RF 工程師完成頻譜量測後需手動整理大量數據進報告，重複性高。

## 架構

Keysight 儀器 → SCPI 指令讀取 → n8n 整理 → Google Docs 模板填入。

## 核心技術

- SCPI over TCP/IP 讀取量測數據
- n8n Function 節點做數據轉換
- Google Docs API 填充模板

## 成效

報告生成時間：2 小時 → 3 分鐘。`,
    created_at: "2026-01-04",
  },
  {
    id: "5", day_number: 5, slug: "day-05-claude-code-review-bot",
    title: "Claude Code 程式碼審查 Bot", tool_name: "Claude Code",
    pain_point: "Code Review 時間佔據 30% 開發週期",
    tech_stack: ["Claude Code", "GitHub Actions", "TypeScript"],
    category: "automation", live_url: null, github_url: "https://github.com",
    log_content: `## 動機

PR Code Review 品質不穩定，且耗費資深工程師大量時間。

## 實作方式

GitHub Actions 觸發 Claude API，針對 diff 提供結構化審查建議。

## 輸出格式

- 安全性問題（Critical / Warning）
- 效能優化建議
- 可讀性改善點

## 成效

人工 Review 時間縮短 50%，問題漏查率下降。`,
    created_at: "2026-01-05",
  },
  {
    id: "6", day_number: 6, slug: "day-06-bms-dashboard",
    title: "BMS 電量預測 SaaS Dashboard", tool_name: "Next.js + Supabase",
    pain_point: "電池數據分散，無法即時監控 SOC/SOH",
    tech_stack: ["Next.js", "Supabase", "Recharts"],
    category: "saas", live_url: "https://example.com", github_url: null,
    log_content: `## 問題

電池管理系統的 SOC/SOH 數據散落在多個設備，工程師難以統一監控。

## 解決方案

建立 Supabase Realtime 驅動的中央儀表板，所有設備數據即時推送。

## 技術亮點

- Supabase Realtime Subscription
- Recharts 繪製電量趨勢圖
- 低電量 / 異常告警自動通知

## 成效

設備故障提前預測率提升 60%。`,
    created_at: "2026-01-06",
  },
];

/* ── Data fetching ── */
type ContentResult =
  | { type: "project"; data: Project }
  | { type: "challenge"; data: ChallengeEntry };

async function getContent(slug: string): Promise<ContentResult | null> {
  const supabase = createServerClient();

  if (supabase) {
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();
    if (project) return { type: "project", data: project as Project };

    const { data: challenge } = await supabase
      .from("challenge_entries")
      .select("*")
      .eq("slug", slug)
      .single();
    if (challenge) return { type: "challenge", data: challenge as ChallengeEntry };
  } else {
    if (slug === MOCK_PROJECT.slug) return { type: "project", data: MOCK_PROJECT };
    const challenge = MOCK_CHALLENGES.find((c) => c.slug === slug);
    if (challenge) return { type: "challenge", data: challenge };
  }

  return null;
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);
  if (!content) return { title: "找不到專案 | JK Space" };

  const title =
    content.type === "project"
      ? content.data.title
      : content.data.title;
  return {
    title: `${title} | JK Space`,
    description:
      content.type === "project"
        ? (content.data.summary ?? undefined)
        : content.data.pain_point,
  };
}

/* ── Tag chip ── */
function Chip({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-lg text-xs font-mono"
      style={{
        backgroundColor: "rgba(59,130,246,0.1)",
        color: "var(--color-brand-indigo)",
        border: "1px solid rgba(59,130,246,0.2)",
      }}
    >
      {label}
    </span>
  );
}

/* ── Prose content renderer ── */
function ProseContent({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-lg font-bold mt-8 mb-3 first:mt-0"
          style={{ color: "var(--color-text-primary)" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li
          key={key++}
          className="text-sm leading-relaxed ml-4 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="mb-2" />);
    } else {
      elements.push(
        <p
          key={key++}
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {line}
        </p>
      );
    }
  }

  return <div className="space-y-1">{elements}</div>;
}

/* ── Category label ── */
const CATEGORY_LABELS: Record<string, string> = {
  hardware: "硬體研發",
  ai_automation: "AI 自動化",
  saas: "SaaS 產品",
  automation: "自動化工具",
  hardware_automation: "硬體自動化",
};

/* ── Page ── */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) notFound();

  const isProject = content.type === "project";
  const data = content.data;

  const title = data.title;
  const techStack = data.tech_stack;
  const liveUrl = data.live_url;
  const githubUrl = data.github_url;
  const category = data.category;

  const summary =
    isProject
      ? (content.data as Project).summary
      : `Day ${String((content.data as ChallengeEntry).day_number).padStart(2, "0")} — ${(content.data as ChallengeEntry).tool_name}`;

  const bodyContent =
    isProject
      ? (content.data as Project).description
      : (content.data as ChallengeEntry).log_content;

  const metricsText = isProject
    ? (content.data as Project).metrics_benefit
    : null;

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-[var(--color-brand-blue)]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ArrowLeft size={15} /> 返回作品集
        </Link>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">

          {/* ── Left: specs ── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Category */}
            {!isProject && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit font-mono text-xs font-bold"
                style={{
                  color: "var(--color-brand-blue)",
                  backgroundColor: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.2)",
                }}
              >
                DAY {String((content.data as ChallengeEntry).day_number).padStart(2, "0")}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold leading-snug mb-2">{title}</h1>
              {summary && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {summary}
                </p>
              )}
            </div>

            {/* Category badge */}
            <div className="flex items-center gap-2">
              <Layers size={14} style={{ color: "var(--color-text-muted)" }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {CATEGORY_LABELS[category] ?? category}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: "var(--color-text-muted)" }} />
              <span
                className="font-mono text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {new Date(data.created_at).toLocaleDateString("zh-TW")}
              </span>
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Tag size={13} style={{ color: "var(--color-text-muted)" }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t) => <Chip key={t} label={t} />)}
              </div>
            </div>

            {/* Metrics benefit */}
            {metricsText && (
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(0,229,255,0.04)",
                  border: "1px solid rgba(0,229,255,0.15)",
                }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-brand-blue)" }}>
                  📊 量化效益
                </p>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {metricsText}
                </p>
              </div>
            )}

            {/* Action links */}
            <div className="flex flex-col gap-2">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-brand-blue)",
                    color: "#030712",
                    boxShadow: "0 0 18px rgba(0,229,255,0.3)",
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-text-muted)" }}
                >
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </aside>

          {/* ── Right: content ── */}
          <article
            className="glass rounded-3xl p-8 md:p-10"
            style={{ minHeight: "400px" }}
          >
            {bodyContent ? (
              <ProseContent markdown={bodyContent} />
            ) : (
              <div className="flex flex-col items-center justify-center h-48 gap-3">
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  詳細架構報告撰寫中…
                </p>
                <span
                  className="font-mono text-xs px-3 py-1 rounded-full"
                  style={{
                    color: "var(--color-brand-blue)",
                    backgroundColor: "rgba(0,229,255,0.08)",
                    border: "1px solid rgba(0,229,255,0.2)",
                  }}
                >
                  Coming Soon
                </span>
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
