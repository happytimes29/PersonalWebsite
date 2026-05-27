import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-6"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-semibold text-white">JK</span>
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: "var(--color-brand-blue)" }}
          >
            Space
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center order-last sm:order-none" style={{ color: "var(--color-text-muted)" }}>
          © 2026 JK Space. All rights reserved.{" "}
          <span style={{ color: "rgba(156,163,175,0.6)" }}>
            Powered by Agentic AI.
          </span>
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-brand-blue)]"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-brand-blue)]"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
