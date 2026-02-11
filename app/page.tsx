import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import ProjectCard from './components/ProjectCard';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // 取最新的 3 篇文章

  return (
    <>
      {/* Hero Section - Dramatic spacing and fluid typography */}
      <section className="bg-white py-32 md:py-48 lg:py-64 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16">
          <h1
            className="font-bold text-black leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            專注是唯一生產力
          </h1>

          <p
            className="text-black font-normal leading-[1.5]"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
          >
            我透過寫作與實作，終生學習
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

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-gray-600 font-light"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
              >
                內容即將推出，敬請期待
              </p>
            </div>
          ) : (
            <div className="space-y-16 md:space-y-20">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="block group"
                >
                  <article className="border-b border-gray-200 pb-12 transition-all hover:border-black">
                    <div className="mb-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-black mb-3 group-hover:opacity-70 transition-opacity">
                        {post.metadata.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <time dateTime={post.metadata.date}>
                          {new Date(post.metadata.date).toLocaleDateString('zh-TW', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span>·</span>
                        <span>{post.metadata.category}</span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed line-clamp-3">
                      {post.content.slice(0, 200)}...
                    </p>
                  </article>
                </Link>
              ))}
              <div className="text-center pt-8">
                <Link
                  href="/writing"
                  className="inline-block text-xl font-medium text-black border-b-2 border-black hover:opacity-70 transition-opacity"
                >
                  查看所有文章 →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section - Matching minimal aesthetic */}
      <section className="bg-white py-24 md:py-36 lg:py-48 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-bold text-black mb-16 md:mb-24 lg:mb-32 text-center leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            精選專案
          </h2>
          <ProjectCard />
        </div>
      </section>
    </>
  );
}
