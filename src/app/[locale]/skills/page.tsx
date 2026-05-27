"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Radio, Bot, Car, BarChart2, ArrowUpRight } from "lucide-react";

function Tag({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-lg text-xs font-mono"
      style={{
        backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
        color: accent,
        border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

function AIWorkflowDiagram({ label }: { label: string }) {
  const nodes = [
    { id: "trigger", x: 50, y: 10, label: "Trigger", sublabel: "Email / Webhook / Cron", color: "var(--color-brand-blue)" },
    { id: "n8n", x: 50, y: 35, label: "n8n Orchestrator", sublabel: "Flow Controller", color: "var(--color-brand-indigo)" },
    { id: "claude", x: 22, y: 62, label: "Claude Agent", sublabel: "Reasoning & Code", color: "var(--color-brand-blue)" },
    { id: "dify", x: 78, y: 62, label: "Dify RAG", sublabel: "Document QA", color: "#a78bfa" },
    { id: "output", x: 50, y: 88, label: "Output / Action", sublabel: "Slack · Report · DB", color: "#34d399" },
  ];
  const edges = [
    { x1: 50, y1: 15, x2: 50, y2: 28 },
    { x1: 50, y1: 42, x2: 24, y2: 55 },
    { x1: 50, y1: 42, x2: 76, y2: 55 },
    { x1: 25, y1: 69, x2: 42, y2: 82 },
    { x1: 75, y1: 69, x2: 58, y2: 82 },
  ];
  return (
    <div className="rounded-2xl p-6 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.25)", border: "1px solid rgba(0,229,255,0.08)" }}>
      <div className="w-full max-w-sm">
        <p className="text-xs font-mono mb-3 text-center" style={{ color: "var(--color-text-muted)" }}>{label}</p>
        <svg viewBox="0 0 100 100" className="w-full" preserveAspectRatio="xMidYMid meet">
          {edges.map((e, i) => <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="rgba(0,229,255,0.25)" strokeWidth="0.6" strokeDasharray="2 1.5" />)}
          {nodes.map((n) => (
            <g key={n.id}>
              <ellipse cx={n.x} cy={n.y} rx="16" ry="6" fill={n.color} fillOpacity="0.08" stroke={n.color} strokeWidth="0.5" />
              <text x={n.x} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize="3.2" fontWeight="600" fill={n.color} fontFamily="JetBrains Mono, monospace">{n.label}</text>
              <text x={n.x} y={n.y + 4.5} textAnchor="middle" dominantBaseline="middle" fontSize="2.4" fill="rgba(156,163,175,0.75)" fontFamily="sans-serif">{n.sublabel}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const t = useTranslations("skills");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const hoverBlue = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
  };
  const hoverOff = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page hero */}
        <div ref={heroRef} className="text-center mb-20">
          <motion.span initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="font-mono text-xs font-medium tracking-widest uppercase mb-4 block" style={{ color: "var(--color-brand-blue)" }}>
            {t("label")}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold mb-5">
            {t("title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {t("subtitle")}
          </motion.p>
        </div>

        {/* RF Section */}
        <RevealSection>
          <div className="glass rounded-3xl p-8 md:p-10 mb-8 transition-all duration-300" onMouseEnter={hoverBlue} onMouseLeave={hoverOff}>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)" }}>
                <Radio size={22} style={{ color: "var(--color-brand-blue)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{t("rfTitle")}</h2>
                <p className="font-mono text-xs" style={{ color: "var(--color-brand-blue)" }}>{t("rfSubtitle")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{t("rfDesc1")}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t("rfDesc2")}</p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "15+", label: t("rfStat1") },
                    { value: "5G/4G", label: t("rfStat2") },
                    { value: "FCC/CE", label: t("rfStat3") },
                  ].map((m) => (
                    <div key={m.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.1)" }}>
                      <div className="font-mono text-base font-bold" style={{ color: "var(--color-brand-blue)" }}>{m.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["RF Circuit", "Keysight / R&S", "5G NR", "LTE / BT5", "Wi-Fi 6E", "PCB Layout", "Signal Integrity", "DFM", "EMI/EMS", "Antenna Tuning"].map((t) => <Tag key={t} label={t} accent="var(--color-brand-blue)" />)}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* AI Workflow Section */}
        <RevealSection delay={0.05}>
          <div className="glass rounded-3xl p-8 md:p-10 mb-8 transition-all duration-300" onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.1)"; }} onMouseLeave={hoverOff}>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}>
                <Bot size={22} style={{ color: "var(--color-brand-indigo)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{t("aiTitle")}</h2>
                <p className="font-mono text-xs" style={{ color: "var(--color-brand-indigo)" }}>{t("aiSubtitle")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{t("aiDesc1")}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{t("aiDesc2")}</p>
                <div className="flex flex-wrap gap-2">
                  {["n8n", "Dify", "Claude Code", "LangChain", "RAG", "OpenAI API", "Webhook", "Python", "TypeScript", "Supabase"].map((tk) => <Tag key={tk} label={tk} accent="var(--color-brand-indigo)" />)}
                </div>
              </div>
              <AIWorkflowDiagram label={t("aiDiagram")} />
            </div>
          </div>
        </RevealSection>

        {/* BMS + BOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealSection delay={0.05}>
            <div className="glass rounded-3xl p-7 h-full transition-all duration-300" onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(167,139,250,0.1)"; }} onMouseLeave={hoverOff}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)" }}>
                  <Car size={20} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-0.5">{t("bmsTitle")}</h2>
                  <p className="font-mono text-xs" style={{ color: "#a78bfa" }}>{t("bmsSubtitle")}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{t("bmsDesc")}</p>
              <div className="flex flex-wrap gap-2">
                {["BMS", "SOC/SOH", "CAN Bus", "Motor Drive", "STM32", "RTOS", "Smart Mobility", "System Integration"].map((tk) => <Tag key={tk} label={tk} accent="#a78bfa" />)}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="glass rounded-3xl p-7 h-full transition-all duration-300" onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.25)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(52,211,153,0.1)"; }} onMouseLeave={hoverOff}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>
                  <BarChart2 size={20} style={{ color: "#34d399" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-0.5">{t("bomTitle")}</h2>
                  <p className="font-mono text-xs" style={{ color: "#34d399" }}>{t("bomSubtitle")}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{t("bomDesc")}</p>
              <div className="flex flex-wrap gap-2">
                {["BOM Automation", "Cost Engineering", "DFM", "Product Architecture", "Python", "pandas", "Supplier Analysis"].map((tk) => <Tag key={tk} label={tk} accent="#34d399" />)}
              </div>
              <Link href="/portfolio/bom-comparison" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--color-brand-blue)]" style={{ color: "#34d399" }}>
                {t("bomCta")} <ArrowUpRight size={13} />
              </Link>
            </div>
          </RevealSection>
        </div>

      </div>
    </main>
  );
}
