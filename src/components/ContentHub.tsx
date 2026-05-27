"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Wrench, TrendingUp, ArrowUpRight } from "lucide-react";

const articles = [
  {
    icon: BookOpen,
    category: "開發心得",
    title: "n8n vs Dify：哪個更適合打造企業級 AI 代理？",
    desc: "深入對比兩套 Agentic Workflow 框架的架構設計、擴展性與學習曲線。",
    tag: "AI Automation",
    accent: "var(--color-brand-blue)",
    href: "#",
    isNew: true,
  },
  {
    icon: Wrench,
    category: "工具推薦",
    title: "硬體工程師必備的 10 款 AI 生產力工具",
    desc: "從電路設計自動化到文件生成，這些工具讓 R&D 效率提升 3 倍。",
    tag: "Productivity",
    accent: "var(--color-brand-indigo)",
    href: "#",
    isNew: false,
  },
  {
    icon: TrendingUp,
    category: "Growth Mindset",
    title: "AI 100 Apps 挑戰：30 天的心態轉變與商業洞察",
    desc: "從「做產品」到「做生意」——中途發現的最重要的 3 個認知轉換。",
    tag: "Personal Growth",
    accent: "#a78bfa",
    href: "#",
    isNew: true,
  },
];

const affiliateTools = [
  { name: "Cursor", desc: "AI-first 程式碼編輯器，開發效率提升 40%", href: "#", badge: "推薦" },
  { name: "Supabase", desc: "最快速的 PostgreSQL + Auth + Storage 全端方案", href: "#", badge: "使用中" },
  { name: "Vercel", desc: "零配置部署 Next.js 的最佳平台", href: "#", badge: "使用中" },
  { name: "n8n Cloud", desc: "無需自架的工作流自動化 SaaS 版", href: "#", badge: "推薦" },
];

export default function ContentHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="content" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="font-mono text-xs font-medium tracking-widest uppercase mb-3 block"
            style={{ color: "var(--color-brand-blue)" }}
          >
            Content & Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">數位創作與變現</h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "var(--color-text-muted)" }}>
            技術洞察、工具推薦與成長心法——分享從工程師到創業者的思維演進。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles - 2/3 width */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {articles.map((article, i) => {
              const Icon = article.icon;
              return (
                <motion.a
                  key={article.title}
                  href={article.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 flex gap-4 group transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(0,229,255,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 12px rgba(0,229,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${article.accent} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${article.accent} 25%, transparent)`,
                    }}
                  >
                    <Icon size={16} style={{ color: article.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {article.category}
                      </span>
                      {article.isNew && (
                        <span
                          className="px-1.5 py-0.5 rounded text-xs font-mono font-bold"
                          style={{
                            backgroundColor: "rgba(0,229,255,0.1)",
                            color: "var(--color-brand-blue)",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-semibold text-sm leading-snug mb-1 group-hover:text-[var(--color-brand-blue)] transition-colors duration-200"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      {article.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Affiliate tools - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6 flex flex-col gap-5 h-fit"
          >
            <div>
              <h3 className="font-semibold text-sm mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                推薦工具
              </h3>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                我實際使用並驗證過的生產力工具
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {affiliateTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-start justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium group-hover:text-[var(--color-brand-blue)] transition-colors"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {tool.name}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: "rgba(59,130,246,0.1)",
                          color: "var(--color-brand-indigo)",
                        }}
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {tool.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
