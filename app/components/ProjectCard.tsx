'use client';

import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-bike 系統研究',
    description: '馬達耐用性測試與 6 軸感測器應用。',
    link: '/projects/ebike-system',
  },
  {
    id: '2',
    title: 'AI 自動化實踐',
    description: '基於 Dify 與 n8n 的個人工作流建立。',
    link: '/projects/ai-automation',
  },
];

export default function ProjectCard() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={project.link || '#'}
            className="group bg-white border border-black/10 transition-all duration-500 hover:border-black/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:translate-y-[-4px]"
          >
            {/* Project Image Placeholder */}
            <div className="aspect-[16/10] bg-white relative overflow-hidden border-b border-black/10">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-50 transition-all duration-500" />

              {/* Subtle decorative element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/[0.02] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Project Info */}
            <div className="p-8 md:p-10">
              <h3
                className="font-bold text-black mb-4 group-hover:opacity-70 transition-opacity duration-300 leading-[1.3] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.625rem)' }}
              >
                {project.title}
              </h3>

              <p
                className="text-black/60 leading-[1.7] font-light group-hover:text-black/80 transition-colors duration-300"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}
              >
                {project.description}
              </p>

              {/* Subtle arrow indicator */}
              <div className="mt-6 flex items-center gap-2 text-black/40 group-hover:text-black/70 transition-colors duration-300">
                <span className="text-sm font-medium tracking-wider uppercase">View Project</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
