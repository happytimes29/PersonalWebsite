import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            {post.metadata.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
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
        </header>

        <div className="prose prose-lg prose-slate max-w-none
          prose-headings:font-bold prose-headings:text-black
          prose-h1:text-4xl prose-h1:mb-6
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
          prose-strong:text-black prose-strong:font-bold
          prose-a:text-black prose-a:underline hover:prose-a:opacity-70
          prose-img:rounded-lg prose-img:my-8
          prose-ul:my-6 prose-li:my-2
          prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
