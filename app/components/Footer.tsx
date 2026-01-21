import Link from 'next/link';
import { Github, Facebook, Twitter, Instagram, Video } from 'lucide-react';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: '#',
    icon: <Github className="w-5 h-5" strokeWidth={1.5} />
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <Facebook className="w-5 h-5" strokeWidth={1.5} />
  },
  {
    name: 'X',
    href: '#',
    icon: <Twitter className="w-5 h-5" strokeWidth={1.5} />
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <Instagram className="w-5 h-5" strokeWidth={1.5} />
  },
  {
    name: 'Threads',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.11 0 2.11-.45 2.83-1.17"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    href: '#',
    icon: <Video className="w-5 h-5" strokeWidth={1.5} />
  },
  {
    name: '抖音',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 7v8a4 4 0 1 0 4-4V3h4a5 5 0 0 0 5 5"/>
      </svg>
    )
  },
  {
    name: '小紅書',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M8 8h8M8 12h8M8 16h4"/>
      </svg>
    )
  },
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
                  <span className="text-black/60 group-hover:text-white transition-colors duration-300">
                    {social.icon}
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
