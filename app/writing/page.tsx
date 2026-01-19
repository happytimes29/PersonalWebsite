import Link from 'next/link';

// 測試用文章數據
const articles = [
  {
    slug: 'build-one-person-business',
    title: '如何用系統化思維建立你的 JK space',
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

export default function WritingPage() {
  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 text-center">
          Writing
        </h1>
        <p className="text-xl text-black text-center mb-16 font-light">
          深度思考、系統框架與實踐經驗。
        </p>

        <div className="space-y-12">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-gray-100 pb-12 last:border-0">
              <Link href={`/writing/${article.slug}`} className="group">
                <time className="text-sm text-gray-600 mb-2 block">
                  {article.date}
                </time>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 group-hover:opacity-70 transition-opacity duration-200">
                  {article.title}
                </h2>
                <p className="text-lg text-black leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
