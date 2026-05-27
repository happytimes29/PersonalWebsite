"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-12 mb-4 text-white tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-8 mb-3 text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 pl-5 space-y-1.5 list-disc" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 pl-5 space-y-1.5 list-decimal" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-[3px] pl-5 py-1 my-6 italic"
      style={{
        borderColor: "var(--color-brand-blue)",
        color: "var(--color-text-muted)",
        background: "rgba(0,229,255,0.03)",
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <code className={`${className ?? ""} text-sm font-mono`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded text-xs font-mono"
        style={{
          color: "var(--color-brand-blue)",
          backgroundColor: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.18)",
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre
      className="rounded-xl px-5 py-4 my-6 overflow-x-auto text-sm font-mono leading-relaxed"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "var(--color-text-muted)" }}>{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
      style={{ color: "var(--color-brand-blue)" }}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="px-4 py-2.5 text-left text-xs font-mono font-semibold uppercase tracking-wider"
      style={{
        color: "var(--color-brand-blue)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(0,229,255,0.04)",
      }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="px-4 py-2.5 text-sm"
      style={{
        color: "var(--color-text-muted)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-10" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
  ),
};

export default function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
