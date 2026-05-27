"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";

const MAX_SUBMISSIONS_PER_WINDOW = 3;
const WINDOW_MS = 60_000;

let submissionTimestamps: number[] = [];

function checkRateLimit(): boolean {
  const now = Date.now();
  submissionTimestamps = submissionTimestamps.filter((t) => now - t < WINDOW_MS);
  if (submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) return false;
  submissionTimestamps.push(now);
  return true;
}

type FormState = "idle" | "loading" | "success" | "error" | "rate_limited";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit()) {
      setFormState("rate_limited");
      setTimeout(() => setFormState("idle"), 5000);
      return;
    }
    setFormState("loading");
    /* Swap with real API endpoint (e.g. Resend / Formspree) when ready */
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[rgba(0,229,255,0.4)] focus:shadow-[0_0_0_1px_rgba(0,229,255,0.25)]";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "var(--color-text-primary)",
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="font-mono text-xs font-medium tracking-widest uppercase mb-3 block"
            style={{ color: "var(--color-brand-blue)" }}
          >
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">聯絡我</h2>
          <p className="mt-4 text-base max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
            合作提案、技術討論或單純打聲招呼——我很樂意回覆。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "hello@jkspace.dev",
                href: "mailto:hello@jkspace.dev",
              },
              {
                icon: MessageSquare,
                label: "回覆時間",
                value: "通常 24 小時內",
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(0,229,255,0.08)",
                    border: "1px solid rgba(0,229,255,0.2)",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--color-brand-blue)" }} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium hover:text-[var(--color-brand-blue)] transition-colors"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Decorative card */}
            <div
              className="mt-4 p-5 rounded-2xl"
              style={{
                backgroundColor: "rgba(0,229,255,0.04)",
                border: "1px solid rgba(0,229,255,0.12)",
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: "var(--color-brand-blue)" }}>
                開放合作中
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                AI 自動化顧問、硬體系統評估、技術白皮書撰寫與 SaaS 產品共創。
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              name="name"
              type="text"
              placeholder="您的姓名"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email 地址"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="告訴我您的想法…"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />

            {/* Status messages */}
            {formState === "success" && (
              <p className="text-sm text-center" style={{ color: "#34d399" }}>
                ✓ 訊息已送出，我會盡快回覆！
              </p>
            )}
            {formState === "rate_limited" && (
              <p className="text-sm text-center" style={{ color: "#f87171" }}>
                請稍後再試（每分鐘最多送出 3 次）。
              </p>
            )}
            {formState === "error" && (
              <p className="text-sm text-center" style={{ color: "#f87171" }}>
                送出失敗，請直接 Email 聯絡我。
              </p>
            )}

            <button
              type="submit"
              disabled={formState === "loading" || formState === "success"}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-brand-blue)",
                color: "#030712",
                boxShadow:
                  formState === "loading" || formState === "success"
                    ? "none"
                    : "0 0 20px rgba(0,229,255,0.3)",
              }}
            >
              <Send size={15} />
              {formState === "loading" ? "送出中…" : "送出訊息"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
