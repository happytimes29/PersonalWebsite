import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { getArticleBySlug, getAdjacentArticles, ARTICLES } from "@/lib/writing-data";
import ArticleContent from "@/components/ArticleContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "文章不存在 | JK Space" };
  return {
    title: `${article.title} | JK Space`,
    description: article.excerpt,
  };
}

const CATEGORY_META = {
  "ai-100":   { label: "AI 100 日誌", color: "#00e5ff" },
  "hardware": { label: "硬體技術",    color: "#a78bfa" },
  "growth":   { label: "成長心得",    color: "#34d399" },
} as const;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);
  const meta = CATEGORY_META[article.category];

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200 hover:text-[var(--color-brand-blue)]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ArrowLeft size={15} />
          返回文章列表
        </Link>

        {/* Article header */}
        <header className="mb-10">
          {/* Category badge */}
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium mb-5"
            style={{
              color: meta.color,
              backgroundColor: `color-mix(in srgb, ${meta.color} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${meta.color} 25%, transparent)`,
            }}
          >
            {meta.label}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg mb-5" style={{ color: "var(--color-text-muted)" }}>
              {article.subtitle}
            </p>
          )}

          {/* Metadata row */}
          <div
            className="flex flex-wrap items-center gap-5 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Calendar size={12} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={12} />
              {article.readingTime} 分鐘閱讀
            </span>
          </div>
        </header>

        {/* Divider */}
        <div className="mb-10" style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* Markdown content */}
        <ArticleContent content={article.content} />

        {/* Divider */}
        <div className="mt-12 mb-8" style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Tag size={13} style={{ color: "var(--color-text-muted)" }} />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono"
                style={{
                  color: "var(--color-text-muted)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/writing/${prev.slug}`}
                className="group glass rounded-xl p-5 transition-all duration-300 hover:border-[rgba(0,229,255,0.2)]"
              >
                <p className="text-xs font-mono mb-2 flex items-center gap-1.5" style={{ color: "var(--color-text-muted)" }}>
                  <ArrowLeft size={11} /> 上一篇
                </p>
                <p
                  className="text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/writing/${next.slug}`}
                className="group glass rounded-xl p-5 text-right transition-all duration-300 hover:border-[rgba(0,229,255,0.2)]"
              >
                <p className="text-xs font-mono mb-2 flex items-center gap-1.5 justify-end" style={{ color: "var(--color-text-muted)" }}>
                  下一篇 <ArrowRight size={11} />
                </p>
                <p
                  className="text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
