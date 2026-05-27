import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WritingList from "@/components/WritingList";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("writing");
  return {
    title: "Writing | JK Space",
    description: t("subtitle"),
  };
}

export default function WritingPage() {
  return <WritingList />;
}
