import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "作品集 | JK Space",
  description: "AI 100 Apps 挑戰進度與旗艦 SaaS 產品展示——可量化的成果，可驗證的技術深度。",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      <Portfolio />
    </main>
  );
}
