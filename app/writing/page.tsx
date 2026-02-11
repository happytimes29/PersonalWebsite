import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 text-center">
          Writing
        </h1>
        <p className="text-xl text-black text-center mb-16 font-light">
          深度思考、系統框架與實踐經驗。
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 font-light">
              內容準備中，敬請期待
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="block group"
              >
                <article className="border-b border-gray-200 pb-8 transition-all hover:border-black">
                  <div className="flex items-baseline justify-between mb-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-black group-hover:opacity-70 transition-opacity">
                      {post.metadata.title}
                    </h2>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {new Date(post.metadata.date).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {post.metadata.category}
                  </p>
                  <p className="text-gray-700 line-clamp-2">
                    {post.content.slice(0, 150)}...
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
