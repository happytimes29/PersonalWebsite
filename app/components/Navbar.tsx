import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-black hover:opacity-70 transition-opacity duration-200"
          >
            JK
          </Link>

          <div className="flex gap-8">
            <Link
              href="/writing"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
            >
              Writing
            </Link>
            <Link
              href="/projects"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
