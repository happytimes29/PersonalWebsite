import Link from 'next/link';

interface SocialLink {
  name: string;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', label: 'GH', href: '#' },
  { name: 'Facebook', label: 'FB', href: '#' },
  { name: 'X', label: 'X', href: '#' },
  { name: 'Instagram', label: 'IG', href: '#' },
  { name: 'Threads', label: 'TH', href: '#' },
  { name: 'TikTok', label: 'TK', href: '#' },
  { name: '抖音', label: '抖', href: '#' },
  { name: '小紅書', label: '小', href: '#' },
];

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

          {/* Social Links - Minimal Grid Design */}
          <div className="space-y-6 flex-1 md:max-w-md">
            <h3 className="text-black font-semibold text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group aspect-square border border-black/10 flex items-center justify-center hover:border-black hover:bg-black transition-all duration-300"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="text-black/60 group-hover:text-white font-medium text-xs sm:text-sm tracking-tight transition-colors duration-300">
                    {social.label}
                  </span>
                </Link>
              ))}
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
