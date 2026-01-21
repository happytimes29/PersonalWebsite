import AI100Challenge from '../components/AI100Challenge';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <>
      {/* AI 100 Apps Challenge Section */}
      <AI100Challenge />

      {/* Projects Section */}
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
