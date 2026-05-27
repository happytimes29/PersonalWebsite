import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio | JK Space",
  description: "AI 100 Apps challenge progress and flagship SaaS product showcase.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      <Portfolio />
    </main>
  );
}
