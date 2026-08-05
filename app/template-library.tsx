"use client";

import {
  ArrowDownToLine,
  BookOpen,
  Check,
  ChevronRight,
  Clipboard,
  Copy,
  Download,
  FileCode2,
  FileText,
  GitFork,
  Layers3,
  PackageOpen,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type TemplateItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  prompt: string;
  cover: string | null;
  sourceDate: string;
  promptUrl: string;
  skillUrl: string;
  bundleUrl: string;
};

const categoryColors: Record<string, string> = {
  全部: "#1d1d1f",
  科研学习: "#2457d6",
  自我管理: "#16825d",
  信息判断: "#b14f2d",
  Agent协作: "#7054c8",
  汇报表达: "#c23b54",
  生活场景: "#a16812",
  Prompt方法: "#086f83",
  信息整理: "#4e6375",
};

function matches(template: TemplateItem, query: string) {
  if (!query.trim()) return true;
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  return [template.title, template.description, template.category, ...template.tags]
    .join(" ")
    .toLocaleLowerCase("zh-CN")
    .includes(normalized);
}

export function TemplateLibrary({ templates }: { templates: TemplateItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState<TemplateItem | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = useMemo(
    () => ["全部", ...Array.from(new Set(templates.map((item) => item.category)))],
    [templates],
  );

  const filtered = useMemo(
    () =>
      templates.filter(
        (item) => (category === "全部" || item.category === category) && matches(item, query),
      ),
    [category, query, templates],
  );

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.classList.add("drawer-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  async function copyPrompt() {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回模板库顶部">
          <span className="brand-mark" aria-hidden="true">
            <Layers3 size={21} strokeWidth={2.2} />
          </span>
          <span>
            <strong>AI 工作流模板库</strong>
            <small>Prompt + Skill</small>
          </span>
        </a>
        <div className="header-actions">
          <span className="library-count">26 个真实工作流</span>
          <a className="button button-dark" href="/ai-workflow-library-all.zip" download>
            <PackageOpen size={17} />
            下载全部
          </a>
        </div>
      </header>

      <section className="workspace" id="top">
        <div className="intro-row">
          <div>
            <p className="eyebrow"><Sparkles size={15} /> Peter 的 AI 实用方法</p>
            <h1>把看过的方法，变成能直接运行的工作流</h1>
            <p className="intro-copy">
              每个主题同时提供可复制 Prompt 和可安装 Skill。
            </p>
          </div>
          <div className="principle-strip" aria-label="模板特点">
            <span><Clipboard size={16} /> 真实任务</span>
            <span><FileCode2 size={16} /> 规范 Skill</span>
            <span><ShieldCheck size={16} /> 带复核规则</span>
          </div>
        </div>

        <div className="tool-row" aria-label="模板筛选工具">
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">搜索模板</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 PDF、论文、Agent、汇报..."
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} title="清空搜索" aria-label="清空搜索">
                <X size={16} />
              </button>
            ) : null}
          </label>
          <div className="result-count" aria-live="polite">
            显示 <strong>{filtered.length}</strong> 个模板
          </div>
        </div>

        <nav className="category-tabs" aria-label="模板分类">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
              style={{ "--tab-color": categoryColors[item] } as React.CSSProperties}
            >
              {item}
              <span>{item === "全部" ? templates.length : templates.filter((t) => t.category === item).length}</span>
            </button>
          ))}
        </nav>

        {filtered.length ? (
          <section className="template-grid" aria-label="工作流模板列表">
            {filtered.map((template, index) => (
              <article className="template-card" key={template.slug}>
                <button className="card-main" type="button" onClick={() => setSelected(template)}>
                  <div className="cover-frame">
                    {template.cover ? (
                      <Image
                        src={template.cover}
                        alt=""
                        width={210}
                        height={280}
                        unoptimized
                        loading={index > 7 ? "lazy" : "eager"}
                      />
                    ) : (
                      <div className="fallback-cover" style={{ "--accent": categoryColors[template.category] } as React.CSSProperties}>
                        <span>{template.category}</span>
                        <strong>{template.title}</strong>
                        <small>AI WORKFLOW</small>
                      </div>
                    )}
                  </div>
                  <div className="card-copy">
                    <div className="card-meta">
                      <span style={{ color: categoryColors[template.category] }}>{template.category}</span>
                      <span>{template.sourceDate}</span>
                    </div>
                    <h2>{template.title}</h2>
                    <p>{template.description}</p>
                    <div className="tag-row" aria-label="标签">
                      {template.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <ChevronRight className="card-arrow" size={19} aria-hidden="true" />
                </button>
              </article>
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <Search size={24} />
            <h2>没有找到匹配模板</h2>
            <p>换一个关键词，或切回“全部”分类。</p>
            <button type="button" className="button button-light" onClick={() => { setQuery(""); setCategory("全部"); }}>
              清除筛选
            </button>
          </div>
        )}
      </section>

      <footer>
        <span>AI 工作流模板库</span>
        <div className="footer-right">
          <p>模板用于整理与辅助思考，重要结论、引用和外部操作请人工复核。</p>
          <div className="footer-links">
            <a href="https://www.xiaohongshu.com/user/profile/5fce0771000000000100574e" target="_blank" rel="noreferrer">
              <BookOpen size={15} /> 小红书主页
            </a>
            <a href="https://github.com/404-NOTFOUND-Coder" target="_blank" rel="noreferrer">
              <GitFork size={15} /> @404-NOTFOUND-Coder
            </a>
            <a href="https://github.com/404-NOTFOUND-Coder/404-NOTFOUND-Coder.github.io" target="_blank" rel="noreferrer">
              <Star size={15} /> Star 模板库
            </a>
          </div>
        </div>
      </footer>

      {selected ? (
        <div className="drawer-layer" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}>
          <aside className="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <div className="drawer-header">
              <div>
                <span className="detail-category" style={{ color: categoryColors[selected.category] }}>{selected.category}</span>
                <h2 id="drawer-title">{selected.title}</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setSelected(null)} title="关闭" aria-label="关闭模板详情">
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              <p className="detail-description">{selected.description}</p>
              <div className="format-guide">
                <span><FileText size={16} /> Prompt：直接粘贴到常用 AI</span>
                <span><FileCode2 size={16} /> Skill：安装到支持 Skills 的 AI Agent</span>
              </div>

              <section className="prompt-section">
                <div className="section-heading">
                  <div>
                    <span>可直接使用</span>
                    <h3>Prompt 模板</h3>
                  </div>
                  <button className="button button-copy" type="button" onClick={copyPrompt}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "已复制" : "复制 Prompt"}
                  </button>
                </div>
                <pre><code>{selected.prompt}</code></pre>
              </section>

              <section className="download-section">
                <div className="section-heading compact">
                  <div>
                    <span>下载文件</span>
                    <h3>选择需要的版本</h3>
                  </div>
                </div>
                <div className="download-list">
                  <a href={selected.promptUrl} download>
                    <span className="download-icon prompt"><FileText size={19} /></span>
                    <span><strong>Prompt 模板</strong><small>Markdown，可直接修改</small></span>
                    <Download size={18} />
                  </a>
                  <a href={selected.skillUrl} download>
                    <span className="download-icon skill"><FileCode2 size={19} /></span>
                    <span><strong>SKILL.md</strong><small>已通过 Skill 结构校验</small></span>
                    <Download size={18} />
                  </a>
                  <a href={selected.bundleUrl} download>
                    <span className="download-icon bundle"><PackageOpen size={19} /></span>
                    <span><strong>完整下载包</strong><small>Prompt 与完整 Skill 目录</small></span>
                    <ArrowDownToLine size={18} />
                  </a>
                </div>
              </section>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
