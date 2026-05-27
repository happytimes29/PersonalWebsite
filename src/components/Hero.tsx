"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const scrollToProgress = () => {
  const el = document.getElementById("ai-progress");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,229,255,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 mb-8">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-mono font-medium border"
            style={{
              color: "var(--color-brand-blue)",
              borderColor: "rgba(0,229,255,0.3)",
              backgroundColor: "rgba(0,229,255,0.05)",
            }}
          >
            ⚡ Hardware R&D × AI Automation
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          解構硬體邊界，
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-brand-blue) 0%, var(--color-brand-indigo) 100%)",
            }}
          >
            賦能 AI 自動化未來
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          15+ 年高頻電路與系統架構淬鍊，聚焦 n8n / Dify 智慧代理網絡，
          <br className="hidden sm:block" />
          探索獨立商業化與技術變現的數位空間。
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
            style={{
              backgroundColor: "var(--color-brand-blue)",
              color: "#030712",
              boxShadow: "0 0 20px rgba(0,229,255,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 35px rgba(0,229,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 20px rgba(0,229,255,0.4)";
            }}
          >
            進入 AI 100 實驗室
          </Link>

          <Link
            href="/skills"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:bg-white/5 inline-flex items-center justify-center"
            style={{
              color: "var(--color-text-primary)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            探索技術領域
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "15+", label: "年硬體研發" },
            { value: "100", label: "AI Apps 挑戰" },
            { value: "4+", label: "跨域核心技術" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--color-brand-blue)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ color: "var(--color-text-muted)" }}
        onClick={scrollToProgress}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
