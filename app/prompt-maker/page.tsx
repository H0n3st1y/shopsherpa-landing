import type { Metadata } from "next";
import { PromptMakerApp } from "@/components/PromptMakerApp";

export const metadata: Metadata = {
  title: "Prompt Maker Workspace | ShopSherpa",
  description:
    "A ShopSherpa-inspired prompt operations workspace for managing projects, prompt versions, runs, evaluations, and improvements.",
};

export default function PromptMakerPage() {
  return <PromptMakerApp />;
}
