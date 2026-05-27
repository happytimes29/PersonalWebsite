"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { ARTICLES } from "@/lib/writing-data";
import type { Article } from "@/types";

type CategoryId = "all" | "ai-100" | "hardware" | "growth";

const CATEGORY_META: Record<Exclude<CategoryId, "all">, { label: string; color: string }> = {
  "ai-100":   { label: "AI 100 日誌", color: "#00e5ff" },
  "hardware": { label: "硬體技術",    color: "#a78bfa" },
  "growth":   { label: "成長心得",    color: "#34d399" },
};

const FILTERS: { id: CategoryId; label: string }[] = [
  { id: "all",      label: "全部" },
  { id: "ai-100",   label: "AI 100 日誌" },
  { id: "hardware", label: "硬體技術" },
  { id: "growth",   label: "成長心得" },
];

function CategoryBadge({ category }: { category: Article["category"] }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
      style={{
        color: meta.color,
        backgroundColor: `color-mix(in srgb, ${meta.color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${meta.color} 25%, transparent)`,
      }}
    >
      {meta.label}
    </span>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  const meta = CATEGORY_META[article.category];
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group block glass rounded-3xl p-8 md:p-10 transition-all duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = `color-mix(in srgb, ${meta.color} 30%, transparent)`;
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px color-mix(in srgb, ${meta.color} 12%, transparent)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={article.category} />
            <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              FEATURED
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold leading-snug mb-3 transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]"
            style={{ color: "var(--color-text-primary)" }}
          >
            {article.title}
          </h2>

          {article.subtitle && (
            <p className="text-base font-medium mb-4" style={{ color: "var(--color-text-muted)" }}>
              {article.subtitle}
            </p>
          )}

          <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
            {article.excerpt}
          </p>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Calendar size={12} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={12} />
              {article.readingTime} 分鐘閱讀
            </span>
          </div>
        </div>

        <div
          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:translate-x-1"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <ArrowRight size={18} style={{ color: "var(--color-text-muted)" }} />
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article, delay }: { article: Article; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const meta = CATEGORY_META[article.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <Link
        href={`/writing/${article.slug}`}
        className="group flex flex-col h-full glass rounded-2xl p-6 transition-all duration-300"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = `color-mix(in srgb, ${meta.color} 25%, transparent)`;
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 15px color-mix(in srgb, ${meta.color} 10%, transparent)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
        }}
      >
        <CategoryBadge category={article.category} />

        <h3
          className="mt-4 mb-2 text-base font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]"
          style={{ color: "var(--color-text-primary)" }}
        >
          {article.title}
        </h3>

        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--color-text-muted)" }}>
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Calendar size={10} />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={10} />
              {article.readingTime} min
            </span>
          </div>
          <ArrowRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
            style={{ color: "var(--color-brand-blue)" }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function WritingList() {
  const [activeFilter, setActiveFilter] = useState<CategoryId>("all");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered =
    activeFilter === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeFilter);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page hero */}
        <div ref={heroRef} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ color: "var(--color-brand-blue)" }}
          >
            /writing — 寫作與心得
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            深度記錄
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            AI 100 開發日誌 × 硬體研發技術專題 × 個人成長心得——用文字提煉實戰經驗。
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={
                activeFilter === f.id
                  ? {
                      backgroundColor: "rgba(0,229,255,0.12)",
                      color: "var(--color-brand-blue)",
                      border: "1px solid rgba(0,229,255,0.35)",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "var(--color-text-muted)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {filtered.length === 0 ? (
          <p className="text-center py-16" style={{ color: "var(--color-text-muted)" }}>
            此分類暫無文章。
          </p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="mb-8"
              >
                <FeaturedCard article={featured} />
              </motion.div>
            )}

            {/* Remaining articles grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {rest.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} delay={i * 0.06} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
