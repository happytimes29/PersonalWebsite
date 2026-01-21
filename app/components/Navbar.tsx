'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-black hover:opacity-70 transition-opacity duration-200 z-10"
          >
            JK space
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black hover:opacity-70 transition-opacity duration-200 z-10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
            <Link
              href="/writing"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Writing
            </Link>
            <Link
              href="/projects"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-black text-lg hover:opacity-70 transition-opacity duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
