import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI 工作流模板库",
    template: "%s | AI 工作流模板库",
  },
  description: "来自真实创作的 AI Prompt 与 Skill 工作流，支持在线复制和免费下载。",
  openGraph: {
    title: "AI 工作流模板库",
    description: "26 个来自真实创作的 Prompt 与 Skill，在线复制，免费下载。",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "AI 工作流模板库" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 工作流模板库",
    description: "26 个来自真实创作的 Prompt 与 Skill，在线复制，免费下载。",
    images: ["/social-preview.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
