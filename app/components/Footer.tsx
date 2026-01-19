import Link from 'next/link';
import { Github, AtSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100/60 mt-32 md:mt-48">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-black font-semibold text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/writing"
                className="text-black/70 hover:text-black transition-colors duration-300 text-base"
              >
                Writing
              </Link>
              <Link
                href="/projects"
                className="text-black/70 hover:text-black transition-colors duration-300 text-base"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-black/70 hover:text-black transition-colors duration-300 text-base"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-black font-semibold text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-6">
              <Link
                href="https://threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-60 transition-opacity duration-300"
                aria-label="Threads"
              >
                <AtSign size={24} strokeWidth={1.5} />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-60 transition-opacity duration-300"
                aria-label="GitHub"
              >
                <Github size={24} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100/60">
          <p className="text-black/50 text-sm font-light">
            © {new Date().getFullYear()} JK space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
