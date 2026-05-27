"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-8 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.3) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
          <span className="font-mono text-8xl sm:text-9xl font-bold bg-clip-text text-transparent block" style={{ backgroundImage: "linear-gradient(135deg, var(--color-brand-blue) 0%, var(--color-brand-indigo) 100%)" }}>
            404
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <p className="font-mono text-sm mb-2" style={{ color: "var(--color-brand-blue)" }}>{t("hint")}</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{t("title")}</h1>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--color-text-muted)" }}>{t("desc")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300" style={{ backgroundColor: "var(--color-brand-blue)", color: "#030712", boxShadow: "0 0 20px rgba(0,229,255,0.35)" }}>
            <Home size={15} /> {t("home")}
          </Link>
          <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--color-text-primary)" }}>
            <LayoutGrid size={15} /> {t("portfolio")}
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-white/5" style={{ color: "var(--color-text-muted)" }}>
            <ArrowLeft size={15} /> {t("back")}
          </button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 font-mono text-xs" style={{ color: "rgba(156,163,175,0.4)" }}>
          jkspace.dev/404
        </motion.p>
      </div>
    </main>
  );
}
