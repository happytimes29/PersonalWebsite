"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, Bot, Car, BarChart2 } from "lucide-react";

const domains = [
  {
    icon: Radio,
    title: "無線通訊與高頻硬體研發",
    subtitle: "RF & EE Infrastructure",
    description:
      "15 年以上從射頻電路、無線收發架構到量產測試儀器（Keysight 系列）的資深硬實力。涵蓋 5G / LTE / BT / Wi-Fi 全頻段系統整合與可靠性驗證。",
    tags: ["RF Circuit", "Keysight", "5G/LTE", "Wireless Architecture"],
    accent: "var(--color-brand-blue)",
  },
  {
    icon: Bot,
    title: "AI 自動化與 Agentic Workflow",
    subtitle: "AI Automation & Agents",
    description:
      "聚焦於利用 n8n、Dify、Claude Code 開發的自動化工程流程、API 自動化代理與研發效能優化，打造可量產的 AI 工作流解決方案。",
    tags: ["n8n", "Dify", "Claude Code", "API Automation"],
    accent: "var(--color-brand-indigo)",
  },
  {
    icon: Car,
    title: "智慧移動與系統整合",
    subtitle: "Smart Mobility & BMS",
    description:
      "整合微型交通、馬達驅動控制與電池管理系統（BMS）的跨領域研發成果，從系統規格制定到量產驗證全程掌控。",
    tags: ["BMS", "Motor Drive", "Smart Mobility", "System Integration"],
    accent: "#a78bfa",
  },
  {
    icon: BarChart2,
    title: "產品架構與成本管理",
    subtitle: "BOM Lifecycle Optimization",
    description:
      "展現從產品規格定義到自動化成本管理的端到端完整生命週期掌控力，透過程式化 BOM 比對系統大幅提升選料效率。",
    tags: ["BOM Automation", "Cost Engineering", "Product Architecture"],
    accent: "#34d399",
  },
];

export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="font-mono text-xs font-medium tracking-widest uppercase mb-3 block"
            style={{ color: "var(--color-brand-blue)" }}
          >
            Core Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">跨界核心領域</h2>
          <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: "var(--color-text-muted)" }}>
            硬體架構實力與 AI 工作流自動化的交叉點——每個領域都是可落地的商業價值。
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group glass rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300 hover:glow-blue"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(0,229,255,0.25)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 15px rgba(0,229,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${domain.accent} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${domain.accent} 30%, transparent)`,
                  }}
                >
                  <Icon size={18} style={{ color: domain.accent }} />
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-semibold text-base leading-snug" style={{ color: "var(--color-text-primary)" }}>
                    {domain.title}
                  </h3>
                  <p className="font-mono text-xs mt-0.5" style={{ color: domain.accent }}>
                    {domain.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
                  {domain.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {domain.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs font-mono"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "var(--color-text-muted)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
