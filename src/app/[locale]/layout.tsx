import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "JK Space — Hardware R&D × AI Automation",
  description: "15+ 年高頻電路與系統架構淬鍊，聚焦 n8n / Dify 智慧代理網絡，探索獨立商業化與技術變現的數位空間。",
  keywords: ["硬體工程師", "AI自動化", "n8n", "Dify", "RF工程", "BMS", "SaaS", "portfolio"],
  openGraph: {
    title: "JK Space — Hardware R&D × AI Automation",
    description: "解構硬體邊界，賦能 AI 自動化未來",
    type: "website",
  },
};

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
