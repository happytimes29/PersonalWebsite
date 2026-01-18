import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import ProductList from './components/ProductList';

// 測試用文章數據
const recentArticles = [
  {
    slug: 'build-one-person-business',
    title: '如何用系統化思維建立你的一人公司',
    date: '2024-01-15',
    excerpt: '多數人創業失敗的原因不是缺乏技能，而是缺乏系統。本文將帶你建立可持續的創業框架。',
  },
  {
    slug: 'focus-deep-work',
    title: '專注力是新時代的超能力：深度工作法實踐指南',
    date: '2024-01-08',
    excerpt: '在注意力經濟時代，能夠持續專注的人將獲得巨大優勢。分享我的深度工作實踐經驗。',
  },
  {
    slug: 'digital-freedom',
    title: '數位自由不是退休，而是選擇權',
    date: '2024-01-01',
    excerpt: '真正的自由來自於建立不被單一收入來源綁架的能力。讓我們重新定義數位自由。',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section - Dramatic spacing and fluid typography */}
      <section className="bg-white py-32 md:py-48 lg:py-64 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16">
          <h1
            className="font-bold text-black leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            專注、系統、與數位自由
          </h1>

          <p
            className="text-black font-normal leading-[1.5]"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
          >
            我透過寫作與課程，幫助你建立一人公司。
          </p>
        </div>
      </section>

      {/* Newsletter Section - Generous spacing */}
      <section className="py-16 md:py-24 lg:py-32">
        <NewsletterSignup />
      </section>

      {/* Recent Articles Section - Enhanced hierarchy and spacing */}
      <section className="bg-white py-24 md:py-36 lg:py-48 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bold text-black mb-16 md:mb-24 lg:mb-32 text-center leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            最新文章
          </h2>

          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {recentArticles.map((article) => (
              <article
                key={article.slug}
                className="border-b border-gray-200/60 pb-16 md:pb-24 lg:pb-32 last:border-0 last:pb-0"
              >
                <Link href={`/writing/${article.slug}`} className="group block">
                  <time
                    className="text-gray-500 mb-4 md:mb-6 block font-medium tracking-wide uppercase"
                    style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', letterSpacing: '0.1em' }}
                  >
                    {article.date}
                  </time>
                  <h3
                    className="font-bold text-black mb-6 md:mb-8 group-hover:opacity-60 transition-opacity duration-300 leading-[1.3] tracking-[-0.01em]"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="text-black/80 leading-[1.7] font-normal"
                    style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)' }}
                  >
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-20 md:mt-28 lg:mt-36 text-center">
            <Link
              href="/writing"
              className="inline-block bg-black text-white px-10 md:px-12 py-5 md:py-6 font-semibold hover:opacity-85 transition-all duration-300 hover:scale-[1.02]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
            >
              查看所有文章
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section - Matching minimal aesthetic */}
      <section className="bg-white py-24 md:py-36 lg:py-48 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-bold text-black mb-16 md:mb-24 lg:mb-32 text-center leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            精選課程
          </h2>
          <ProductList />
        </div>
      </section>
    </>
  );
}
