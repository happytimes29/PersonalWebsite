import type { Metadata } from "next";
import WritingList from "@/components/WritingList";

export const metadata: Metadata = {
  title: "寫作與心得 | JK Space",
  description:
    "AI 100 應用挑戰開發日誌、硬體研發技術專題、個人成長心得——用文字提煉實戰經驗。",
};

export default function WritingPage() {
  return <WritingList />;
}
