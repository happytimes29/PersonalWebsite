"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";

const links = [
  { label: "寫作", href: "/writing" },
  { label: "專業領域", href: "/skills" },
  { label: "作品集", href: "/portfolio" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark border-b border-white/5 shadow-lg" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1">
            <span className="font-mono text-lg font-semibold text-white group-hover:text-glow-blue transition-all duration-300">
              JK
            </span>
            <span
              className="font-mono text-lg font-semibold transition-all duration-300"
              style={{ color: "var(--color-brand-blue)" }}
            >
              Space
            </span>
            <span
              className="ml-1 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: "var(--color-brand-blue)",
                boxShadow: "0 0 6px rgba(0,229,255,0.8)",
              }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium transition-colors duration-200 hover:text-[var(--color-brand-blue)] py-1"
                  style={{
                    color: isActive
                      ? "var(--color-brand-blue)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                      style={{
                        background: "var(--color-brand-blue)",
                        boxShadow: "0 0 8px rgba(0,229,255,0.9)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Social icons + hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:text-[var(--color-brand-blue)] hover:bg-white/5"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:text-[var(--color-brand-blue)] hover:bg-white/5"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <button
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/5"
              style={{ color: "var(--color-text-muted)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <Link
                href="/"
                className="text-2xl font-semibold transition-colors duration-200 hover:text-[var(--color-brand-blue)]"
                style={{
                  color:
                    pathname === "/"
                      ? "var(--color-brand-blue)"
                      : "var(--color-text-primary)",
                }}
              >
                首頁
              </Link>
            </motion.div>

            {links.map((link, i) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold transition-colors duration-200 hover:text-[var(--color-brand-blue)]"
                    style={{
                      color: isActive
                        ? "var(--color-brand-blue)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            <div className="flex items-center gap-6 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
