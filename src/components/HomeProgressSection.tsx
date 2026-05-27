"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const TOTAL_DAYS = 100;
const COMPLETED_DAYS = 6; // update as challenge progresses

export default function HomeProgressSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const progress = Math.round((COMPLETED_DAYS / TOTAL_DAYS) * 100);

  return (
    <section id="ai-progress" className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.8) 0%, rgba(0,229,255,0.04) 100%)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(0,229,255,0.25)";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 30px rgba(0,229,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: "var(--color-brand-blue)",
                boxShadow: "0 0 8px rgba(0,229,255,0.8)",
              }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-brand-blue)" }}
            >
              Live Challenge · AI 100 Apps
            </span>
          </div>

          {/* Progress display */}
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span
              className="font-mono text-5xl sm:text-6xl font-bold"
              style={{ color: "var(--color-brand-blue)" }}
            >
              {String(COMPLETED_DAYS).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-2xl font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              / {TOTAL_DAYS}
            </span>
          </div>

          <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
            已完成 {COMPLETED_DAYS} 個 AI 應用，目標 100 天打造 100 款實戰工具
          </p>

          {/* Progress bar */}
          <div className="relative h-2 rounded-full overflow-hidden mb-8" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${progress}%` } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-indigo))",
                boxShadow: "0 0 12px rgba(0,229,255,0.6)",
              }}
            />
          </div>

          {/* Recent apps preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "n8n Webhook Bot",
              "Dify 文件摘要",
              "BOM 比對系統",
              "RF 測試報告",
              "Code Review Bot",
              "BMS Dashboard",
            ].map((app, i) => (
              <span
                key={app}
                className="px-2.5 py-1 rounded-lg text-xs font-mono"
                style={{
                  backgroundColor:
                    i === COMPLETED_DAYS - 1
                      ? "rgba(0,229,255,0.12)"
                      : "rgba(255,255,255,0.04)",
                  color:
                    i === COMPLETED_DAYS - 1
                      ? "var(--color-brand-blue)"
                      : "var(--color-text-muted)",
                  border:
                    i === COMPLETED_DAYS - 1
                      ? "1px solid rgba(0,229,255,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {i === COMPLETED_DAYS - 1 ? (
                  <span className="flex items-center gap-1">
                    <Zap size={10} />
                    {app}
                  </span>
                ) : (
                  app
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 group"
            style={{
              backgroundColor: "var(--color-brand-blue)",
              color: "#030712",
              boxShadow: "0 0 24px rgba(0,229,255,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 40px rgba(0,229,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px rgba(0,229,255,0.4)";
            }}
          >
            進入 AI 實驗室面板
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
