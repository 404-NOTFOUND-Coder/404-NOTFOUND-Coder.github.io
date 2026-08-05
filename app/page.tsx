import type { Metadata } from "next";
import catalog from "./catalog.generated.json";
import { TemplateLibrary } from "./template-library";

export const metadata: Metadata = {
  title: { absolute: "AI 工作流模板库" },
  description: "26 个来自真实创作的 AI Prompt 与 Skill 工作流，支持在线复制和免费下载。",
  other: {
    "codex-preview": "development",
  },
};

export default function Home() {
  return <TemplateLibrary templates={catalog} />;
}
