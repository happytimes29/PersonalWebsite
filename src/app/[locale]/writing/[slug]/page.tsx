import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { getArticleBySlug, getAdjacentArticles, ARTICLES } from "@/lib/writing-data";
import ArticleContent from "@/components/ArticleContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const locales = ["zh-TW", "en", "ja"];
  return ARTICLES.flatMap((a) => locales.map((locale) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | JK Space" };
  const t = article.translations[locale as keyof typeof article.translations] ?? article.translations.en;
  return { title: `${t.title} | JK Space`, description: t.excerpt };
}

const CATEGORY_KEY_MAP = {
  "ai-100": "catAi100",
  hardware: "catHardware",
  growth: "catGrowth",
} as const;

const CATEGORY_COLOR = {
  "ai-100": "#00e5ff",
  hardware: "#a78bfa",
  growth: "#34d399",
} as const;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations("writing");
  const localizedContent =
    article.translations[locale as keyof typeof article.translations] ??
    article.translations.en;

  const { prev, next } = getAdjacentArticles(slug);
  const color = CATEGORY_COLOR[article.category];
  const catLabel = t(CATEGORY_KEY_MAP[article.category]);

  const getPrevNext = (a: typeof article) => {
    const loc =
      a.translations[locale as keyof typeof a.translations] ??
      a.translations.en;
    return loc.title;
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/writing" className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200 hover:text-[var(--color-brand-blue)]" style={{ color: "var(--color-text-muted)" }}>
          <ArrowLeft size={15} /> {t("back")}
        </Link>

        <header className="mb-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium mb-5" style={{ color, backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 25%, transparent)` }}>
            {catLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">{localizedContent.title}</h1>
          {localizedContent.subtitle && <p className="text-lg mb-5" style={{ color: "var(--color-text-muted)" }}>{localizedContent.subtitle}</p>}
          <div className="flex flex-wrap items-center gap-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}><Calendar size={12} />{article.date}</span>
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--color-text-muted)" }}><Clock size={12} />{t("minuteRead", { time: article.readingTime })}</span>
          </div>
        </header>

        <div className="mb-10" style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
        <ArticleContent content={localizedContent.content} />
        <div className="mt-12 mb-8" style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Tag size={13} style={{ color: "var(--color-text-muted)" }} />
            {article.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono" style={{ color: "var(--color-text-muted)", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>{tag}</span>
            ))}
          </div>
        )}

        {(prev || next) && (
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/writing/${prev.slug}`} className="group glass rounded-xl p-5 transition-all duration-300 hover:border-[rgba(0,229,255,0.2)]">
                <p className="text-xs font-mono mb-2 flex items-center gap-1.5" style={{ color: "var(--color-text-muted)" }}><ArrowLeft size={11} /> {t("prevArticle")}</p>
                <p className="text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]" style={{ color: "var(--color-text-primary)" }}>{getPrevNext(prev)}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/writing/${next.slug}`} className="group glass rounded-xl p-5 text-right transition-all duration-300 hover:border-[rgba(0,229,255,0.2)]">
                <p className="text-xs font-mono mb-2 flex items-center gap-1.5 justify-end" style={{ color: "var(--color-text-muted)" }}>{t("nextArticle")} <ArrowRight size={11} /></p>
                <p className="text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand-blue)]" style={{ color: "var(--color-text-primary)" }}>{getPrevNext(next)}</p>
              </Link>
            ) : <div />}
          </nav>
        )}
      </div>
    </main>
  );
}
