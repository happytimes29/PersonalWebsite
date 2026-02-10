import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import ProjectCard from './components/ProjectCard';

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

          <div className="text-center py-20">
            <p
              className="text-gray-600 font-light"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
            >
              內容即將推出，敬請期待
            </p>
          </div>
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
