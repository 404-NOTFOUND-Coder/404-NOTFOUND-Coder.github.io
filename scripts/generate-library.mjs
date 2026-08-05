import { execFileSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const projectRoot = "/Users/peter/Desktop/研究生/ai agent/ai-workflow-library";
const sourceRoot = "/Users/peter/Desktop/研究生/ai agent/my-channel";
const downloadsRoot = join(projectRoot, "public", "downloads");
const coversRoot = join(projectRoot, "public", "covers");
const catalogPath = join(projectRoot, "app", "catalog.generated.json");
const initSkillPath = "/Users/peter/.codex/skills/.system/skill-creator/scripts/init_skill.py";

const works = [
  {
    slug: "pdf-to-report",
    source: "scripts/2026-06-15_pdf_to_report.md",
    category: "汇报表达",
    description: "把长 PDF 变成带出处、可复核的阅读框架和汇报提纲。",
    tags: ["PDF", "汇报", "资料整理"],
    inputs: ["PDF 或资料正文", "汇报对象与时长", "必须回答的问题"],
    steps: ["提取问题、方法、结论和待复核点", "按观点、原文依据、汇报表达制表", "生成背景到个人判断的五段式提纲"],
    outputs: ["四问阅读框架", "带出处的阅读表", "五段式汇报提纲", "高风险复核清单"],
    guardrails: ["不得补写原文不存在的信息", "关键结论必须附原文位置", "不确定内容明确标记待复核"],
  },
  {
    slug: "dragon-boat-greetings",
    source: "scripts/2026-06-18_dragon_boat_greetings.md",
    category: "生活场景",
    description: "根据真实关系与交集，写出没有群发感的节日祝福。",
    tags: ["节日祝福", "沟通", "写作"],
    inputs: ["祝福对象及关系", "最近一次真实交集", "平时说话语气", "期望长度"],
    steps: ["识别双方关系与合适边界", "只使用已提供的真实细节", "分别生成克制、自然两个版本"],
    outputs: ["简短版祝福", "自然版祝福", "发送前人工修改建议"],
    guardrails: ["不得编造共同经历", "避免空泛节日辞藻", "不同对象分别生成"],
  },
  {
    slug: "group-chat-to-itinerary",
    source: "scripts/2026-06-18_dragon_boat_itinerary.md",
    category: "生活场景",
    description: "把旅行群里的零散讨论整理成可执行、可核对的行程表。",
    tags: ["群聊", "旅行", "行程表"],
    inputs: ["已脱敏的旅行群聊", "出行日期", "已确认订单信息"],
    steps: ["按时间提取集合、交通、住宿与活动", "区分已确认、暂定和待确认", "列出成员分工与出发前核对项"],
    outputs: ["按时间排序的行程表", "待确认事项", "人员分工", "出发前检查清单"],
    guardrails: ["不得猜测缺失行程", "票务天气需提示官方复核", "不得保留隐私和完整订单号"],
  },
  {
    slug: "messages-to-todo",
    source: "scripts/2026-06-18_messages_to_todo.md",
    category: "信息整理",
    description: "从零散群消息中提取动作、负责人、时间和追问项。",
    tags: ["群消息", "待办", "项目管理"],
    inputs: ["已脱敏且与自己相关的消息", "当前日期", "已有任务清单"],
    steps: ["逐条识别明确动作与承诺", "提取负责人、截止时间和消息出处", "把模糊表述改为待追问问题"],
    outputs: ["可执行待办表", "待确认问题", "优先级建议", "遗漏风险"],
    guardrails: ["没有明确的信息标记待确认", "不上传敏感工作内容", "保留消息出处便于核对"],
  },
  {
    slug: "paper-comparison-table",
    source: "scripts/2026-06-22_papers_comparison.md",
    category: "科研学习",
    description: "用统一维度比较多篇论文，定位共识、分歧和研究空白。",
    tags: ["论文阅读", "对比表", "科研"],
    inputs: ["多篇论文全文或结构化摘录", "研究主题", "希望比较的维度"],
    steps: ["按问题、方法、数据、结论、局限统一提取", "横向比较共识和分歧", "标出可能的研究空白与复核位置"],
    outputs: ["文献对比表", "共识与分歧", "研究空白候选", "原文复核索引"],
    guardrails: ["未找到的信息写未找到", "结论与实验指标回原文确认", "研究空白只作为候选而非事实"],
  },
  {
    slug: "ai-use-boundaries",
    source: "scripts/2026-06-28_ai_boundaries.md",
    category: "信息判断",
    description: "为研究与学习任务划分 AI 可执行、需确认和不可外包的边界。",
    tags: ["AI边界", "科研规范", "复核"],
    inputs: ["计划交给 AI 的任务", "风险与责任要求", "可用资料与工具"],
    steps: ["判断任务属于整理、建议还是最终决策", "识别引用、证据和结论风险", "划分自动执行、人工确认和禁止外包"],
    outputs: ["任务边界表", "人工复核点", "允许 AI 执行的动作", "最终责任清单"],
    guardrails: ["引用与出处必须人工核验", "证据充分性不能由 AI 决定", "最终判断由使用者负责"],
  },
  {
    slug: "shorter-prompts",
    source: "assets/2026-07-01_shorter_prompts/publish.md",
    category: "Prompt方法",
    description: "把冗长 Prompt 压缩为目标、材料、输出三部分。",
    tags: ["Prompt", "提问", "效率"],
    inputs: ["当前长 Prompt", "唯一目标", "必须保留的限制"],
    steps: ["删除角色扮演和重复背景", "保留唯一目标与必要材料", "明确输出格式和验收条件"],
    outputs: ["三段式精简 Prompt", "删除项说明", "缺失信息问题"],
    guardrails: ["不删除影响正确性的限制", "一次只保留一个主要目标", "缺少关键材料时先提问"],
  },
  {
    slug: "one-table-notes",
    source: "assets/2026-07-03_one_table_notes/publish.md",
    category: "科研学习",
    description: "把资料压成原话、自己的理解、实际用途三列表。",
    tags: ["学习笔记", "知识管理", "表格"],
    inputs: ["资料正文或摘录", "当前研究或学习问题", "原文位置"],
    steps: ["保留关键原话与出处", "用自己的语言解释含义", "说明能支持哪个问题或判断"],
    outputs: ["三列学习表", "无法解释项", "无法落地项", "复读建议"],
    guardrails: ["理解列不得照抄原文", "用途不明确时标记暂不收录", "不编造出处"],
  },
  {
    slug: "summer-task-pool",
    source: "assets/2026-07-05_summer_task_pool/publish.md",
    category: "自我管理",
    description: "把过满计划删减为可执行任务池，并保留必要缓冲。",
    tags: ["计划", "任务池", "减法"],
    inputs: ["全部待办", "可用时间", "硬性截止日期", "近期主目标"],
    steps: ["按影响与紧迫度判断价值", "删除重复、模糊和短期无法推进项", "安排核心、可选和恢复任务"],
    outputs: ["精简任务池", "暂缓清单", "每周上限", "缓冲时间建议"],
    guardrails: ["不把每天排满", "优先保留影响近期结果的任务", "说明被删除任务的原因"],
  },
  {
    slug: "low-energy-study",
    source: "assets/2026-07-07_low_energy_study/publish.md",
    category: "自我管理",
    description: "根据精力而不是意志力，安排高、中、低负荷学习任务。",
    tags: ["学习计划", "精力管理", "低状态"],
    inputs: ["今日精力水平", "可用时间段", "任务列表", "必须完成项"],
    steps: ["估计每项任务的认知负荷", "匹配高、中、低精力时段", "把大任务拆成最小可启动动作"],
    outputs: ["精力匹配日程", "最低完成线", "恢复性任务", "明日接续点"],
    guardrails: ["不把低精力解释为懒惰", "保留休息和恢复", "避免过度承诺"],
  },
  {
    slug: "find-stuck-points",
    source: "assets/2026-07-09_find_stuck_points/publish.md",
    category: "科研学习",
    description: "不直接总结难资料，而是先定位术语、逻辑和前置知识卡点。",
    tags: ["难文献", "卡点", "阅读"],
    inputs: ["读不懂的原文段落", "自己的理解", "已掌握的背景知识"],
    steps: ["逐句标出术语与指代", "还原论证链条", "识别缺失的前置知识", "给出最短补课路径"],
    outputs: ["卡点清单", "逻辑链", "前置知识地图", "回读顺序"],
    guardrails: ["不跳过原文直接给结论", "区分原文含义与解释", "不确定解释需显式标注"],
  },
  {
    slug: "procrastination-log",
    source: "assets/2026-07-11_procrastination_log/publish.md",
    category: "自我管理",
    description: "分析一天的行为记录，找到拖延发生的具体触发点。",
    tags: ["拖延", "行为记录", "复盘"],
    inputs: ["按时间记录的一天行为", "原计划", "当时精力与情绪"],
    steps: ["对齐计划与实际行为", "寻找任务切换和逃避触发点", "区分任务模糊、阻力过高和环境干扰"],
    outputs: ["拖延触发点", "证据片段", "下一次替代动作", "一项环境调整"],
    guardrails: ["不做心理或医学诊断", "不使用懒惰等人格标签", "建议必须小且可执行"],
  },
  {
    slug: "not-to-do-list",
    source: "assets/2026-07-14_not_to_do_list/publish.md",
    category: "自我管理",
    description: "把待办分成必须做、可以晚点做和暂时不做。",
    tags: ["不做清单", "优先级", "注意力"],
    inputs: ["当前全部待办", "本周唯一目标", "截止日期与依赖"],
    steps: ["识别真正影响进度的任务", "找出只缓解焦虑但不产出结果的任务", "判断一周内能否真实推进"],
    outputs: ["必须做", "可以晚点做", "暂时不做", "重新评估日期"],
    guardrails: ["解释每个分类的依据", "不把长期重要任务永久删除", "保留硬截止日期任务"],
  },
  {
    slug: "waic-filter",
    source: "assets/2026-07-16_waic_filter/publish.md",
    category: "信息判断",
    description: "用三个落地问题过滤 AI 大会、新模型和产品热点。",
    tags: ["AI热点", "信息过滤", "WAIC"],
    inputs: ["热点新闻或发布内容", "自己的真实任务", "当前工具栈"],
    steps: ["判断是否减少重复整理", "判断是否提高结果复核能力", "判断能否沉淀为可重复流程"],
    outputs: ["三问评分表", "立即试用项", "继续观察项", "忽略理由"],
    guardrails: ["区分宣传演示与可验证能力", "不因新颖直接替换现有工具", "结论注明证据来源"],
  },
  {
    slug: "hot-day-three-tasks",
    source: "assets/2026-07-20_hot_day_three_tasks/publish.md",
    category: "自我管理",
    description: "低状态时把一天压缩成推进、维护、恢复三件事。",
    tags: ["三件事", "低状态", "任务压缩"],
    inputs: ["今日待办", "当前状态", "不可推迟事项", "可用时间"],
    steps: ["选一件真正推进结果的任务", "选一件维持系统运转的任务", "选一件帮助恢复的任务"],
    outputs: ["今日三件事", "每项最低完成线", "建议执行顺序", "其余任务安置"],
    guardrails: ["总任务不超过三项", "恢复任务不能被删除", "不要伪装成更长的子任务列表"],
  },
  {
    slug: "prompt-three-lines",
    source: "assets/2026-07-22_prompt_three_lines/publish.md",
    category: "Prompt方法",
    description: "用目标、依据、格式三句话写出清楚且可验收的 Prompt。",
    tags: ["Prompt", "三句话", "输出格式"],
    inputs: ["要解决的唯一问题", "AI 可使用的材料", "期望输出格式"],
    steps: ["把目标改写成一个动作", "限定只能依据给定材料", "写清字段、长度和不确定项处理"],
    outputs: ["三句话 Prompt", "变量占位符", "验收检查项"],
    guardrails: ["目标不得包含多个并列任务", "材料范围必须清楚", "输出格式应可检查"],
  },
  {
    slug: "waic-after-filter",
    source: "assets/2026-07-24_waic_after_filter/publish.md",
    category: "信息判断",
    description: "把大会热点归入整理、复核和流程三类可用方向。",
    tags: ["AI大会", "落地", "工作流"],
    inputs: ["会后笔记或产品清单", "自己的高频任务", "验证所需成本"],
    steps: ["逐项映射到整理、复核或固定流程", "设计一个最小验证任务", "比较迁移成本和实际收益"],
    outputs: ["可用方向清单", "最小实验", "观察指标", "暂不采用项"],
    guardrails: ["不把演示效果当稳定能力", "一次只验证一个变量", "没有任务匹配时不强行采用"],
  },
  {
    slug: "ride-debrief",
    source: "assets/2026-07-26_ride_debrief/publish.md",
    category: "生活场景",
    description: "把骑行数据和主观感受整理成下一次可执行的调整。",
    tags: ["骑行", "复盘", "成都生活"],
    inputs: ["路线与运动数据", "途中感受", "补给和装备记录", "异常情况"],
    steps: ["对齐时间、路段与主观感受", "识别配速、补给和装备问题", "提出下一次只改一到三项的方案"],
    outputs: ["骑行复盘表", "关键问题", "保留做法", "下次调整"],
    guardrails: ["不提供医疗诊断", "数据缺失时不得猜测", "身体不适需建议停止并寻求专业意见"],
  },
  {
    slug: "report-checklist",
    source: "assets/2026-07-28_report_checklist/publish.md",
    category: "汇报表达",
    description: "写 PPT 前先检查对象、目标、证据、结论和下一步。",
    tags: ["汇报", "检查表", "PPT"],
    inputs: ["汇报主题", "听众", "现有材料", "希望推动的决定"],
    steps: ["明确听众最关心的问题", "核对每个结论的证据", "删除与目标无关的材料", "补上下一步与待决策项"],
    outputs: ["汇报前检查表", "证据缺口", "建议结构", "可删除内容"],
    guardrails: ["不先生成华丽措辞", "结论必须有证据支撑", "未知项不得包装成确定事实"],
  },
  {
    slug: "progress-three-sentences",
    source: "assets/2026-07-30_progress_three_sentences/publish.md",
    category: "汇报表达",
    description: "用完成了什么、卡在哪里、下一步做什么讲清进展。",
    tags: ["进展汇报", "三句话", "项目管理"],
    inputs: ["本阶段完成事项", "当前卡点", "下一步计划", "时间范围"],
    steps: ["从活动中筛出可验证结果", "用事实描述卡点与影响", "给出下一步动作和预计时间"],
    outputs: ["三句话进展", "详细备查版", "需要协助项"],
    guardrails: ["不把忙碌当进展", "不隐去影响交付的卡点", "时间估计需说明不确定性"],
  },
  {
    slug: "agent-permissions",
    source: "assets/2026-08-06_agent_permissions/publish.md",
    category: "Agent协作",
    description: "为 AI Agent 设计最小权限、确认点和不可逆操作边界。",
    tags: ["AI Agent", "权限", "安全"],
    inputs: ["Agent 要完成的任务", "可调用工具", "文件与账号范围", "不可逆操作"],
    steps: ["列出完成任务所需的最小权限", "区分浏览、写入和外部提交", "为登录、下载、发送、删除设置确认点"],
    outputs: ["权限矩阵", "自动执行项", "人工确认项", "禁止操作项"],
    guardrails: ["默认最小权限", "不可逆操作必须确认", "不得访问任务无关目录和账号"],
  },
  {
    slug: "video-understanding-test",
    source: "assets/2026-08-08_video_understanding_test/publish.md",
    category: "科研学习",
    description: "用时间顺序、状态变化和证据时间点测试视频理解能力。",
    tags: ["视频理解", "多模态", "评测"],
    inputs: ["视频或带时间戳转写", "希望验证的结论", "关键事件列表"],
    steps: ["复述关键事件的时间顺序", "标出对象状态变化", "为每个结论定位证据时间点", "列出不确定项"],
    outputs: ["时间轴", "状态变化表", "结论证据索引", "失败样例"],
    guardrails: ["摘要不能代替证据定位", "看不到的内容不得猜测", "最终判断回到原视频"],
  },
  {
    slug: "coding-agent-steering",
    source: "assets/2026-08-11_coding_agent_steering/publish.md",
    category: "Agent协作",
    description: "Coding Agent 跑偏时，用停止、重申目标、限制下一步完成纠偏。",
    tags: ["AI编程", "Coding Agent", "纠偏"],
    inputs: ["当前唯一目标", "已经发生的错误", "允许的下一步", "禁止动作"],
    steps: ["立即停止当前修改", "用一句话重申唯一目标", "提供失败证据", "限定下一步只做诊断或方案"],
    outputs: ["三句纠偏指令", "下一步验收条件", "恢复执行前检查"],
    guardrails: ["停止后不得继续改文件", "未确认原因前不扩大修改范围", "保留已有项目上下文"],
  },
  {
    slug: "multi-agent-less",
    source: "assets/2026-08-13_multi_agent_less/publish.md",
    category: "Agent协作",
    description: "判断任务是否适合多 Agent 并行，并降低合并成本。",
    tags: ["多智能体", "并行", "任务拆分"],
    inputs: ["总目标", "候选子任务", "共享依赖", "最终输出格式"],
    steps: ["检查子任务是否彼此独立", "统一输入边界与输出格式", "指定总负责人和冲突处理规则", "不满足条件时改为串行"],
    outputs: ["并行可行性判断", "Agent 分工表", "统一验收标准", "合并流程"],
    guardrails: ["不能独立验收的任务不要并行", "避免多个 Agent 重复解决同一问题", "最终决定必须有唯一负责人"],
  },
  {
    slug: "ai-image-check",
    source: "assets/2026-08-15_ai_image_check/publish.md",
    category: "信息判断",
    description: "从来源、画面一致性和外部证据核验疑似 AI 图片。",
    tags: ["AI图片", "事实核查", "信息辨别"],
    inputs: ["图片及原始链接", "发布账号信息", "相关事件线索"],
    steps: ["追溯最早来源和生成说明", "检查文字、反射、遮挡与物体关系", "寻找其他角度、原视频和可信报道"],
    outputs: ["证据核验表", "支持与反对线索", "无法确认项", "谨慎结论"],
    guardrails: ["不得仅凭手指等单一细节判断", "检测器结果只能作为线索", "证据不足时结论必须保留不确定性"],
  },
  {
    slug: "ai-research-checker",
    source: "assets/2026-08-18_ai_research_three_steps/publish.md",
    category: "科研学习",
    description: "让 AI 在问题、证据和结果三个阶段主动挑错。",
    tags: ["AI科研", "挑错", "研究方法"],
    inputs: ["研究问题或草稿", "已有证据", "当前结论", "适用范围"],
    steps: ["寻找隐藏假设和不可验证说法", "分开支持、反对与缺失证据", "寻找矛盾、边界条件和替代解释"],
    outputs: ["问题阶段检查", "证据矩阵", "结果反例", "优先修正项"],
    guardrails: ["没找到不等于不存在", "不得替研究者决定问题价值", "最终结论由人负责"],
  },
];

function readTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "未命名工作流";
}

function readSourceDate(source) {
  const match = source.match(/\d{4}-\d{2}-\d{2}/);
  if (!match) throw new Error(`Source path is missing a publish date: ${source}`);
  return match[0];
}

function promptText(work) {
  const inputLines = work.inputs.map((item) => `- ${item}：{{请填写}}`).join("\n");
  const stepLines = work.steps.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const outputLines = work.outputs.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const guardrailLines = work.guardrails.map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `你是一个严谨的工作流助手。请根据我提供的材料完成「${work.title}」任务。\n\n【输入】\n${inputLines}\n\n【执行步骤】\n${stepLines}\n\n【输出内容】\n${outputLines}\n\n【规则】\n${guardrailLines}\n如果输入不足，先列出缺失信息，不要自行补全。输出使用简洁中文，优先使用表格或清单。`;
}

function promptMarkdown(work, prompt) {
  return `# ${work.title}：Prompt 模板\n\n> ${work.description}\n\n## 使用方法\n\n1. 替换 Prompt 中的 \`{{请填写}}\`。\n2. 粘贴必要材料，删除隐私和敏感信息。\n3. 检查输出中的来源、不确定项和关键判断。\n\n## 可直接复制\n\n\`\`\`text\n${prompt}\n\`\`\`\n\n## 适用输入\n\n${work.inputs.map((item) => `- ${item}`).join("\n")}\n\n## 人工复核\n\n${work.guardrails.map((item) => `- ${item}`).join("\n")}\n`;
}

function skillMarkdown(work) {
  const triggerWords = work.tags.join("、");
  return `---\nname: ${work.slug}\ndescription: ${work.description} Use when the user asks to handle ${triggerWords}, or requests the workflow described by this skill.\n---\n\n# ${work.title}\n\n## Inputs\n\nCollect the following before execution:\n\n${work.inputs.map((item) => `- ${item}`).join("\n")}\n\nIf a required input is missing, ask only for the blocking information. Do not invent it.\n\n## Workflow\n\n${work.steps.map((item, index) => `${index + 1}. ${item}.`).join("\n")}\n\n## Output\n\nReturn the result in concise Chinese with these sections:\n\n${work.outputs.map((item) => `- ${item}`).join("\n")}\n\nPrefer tables for comparison and checklists for actions. Preserve source locations whenever available.\n\n## Quality Gates\n\n${work.guardrails.map((item) => `- ${item}.`).join("\n")}\n\nBefore finishing, separate confirmed facts, inferred judgments, and unresolved items.\n`;
}

function shortDescription(work) {
  return `${work.description}可直接复用的AI工作流模板。`.slice(0, 64);
}

function openaiYaml(work) {
  const short = shortDescription(work);
  return `interface:\n  display_name: "${work.title.replaceAll('"', "'")}"\n  short_description: "${short.replaceAll('"', "'")}"\n  default_prompt: "Use $${work.slug} to process my material with this workflow."\n`;
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

rmSync(downloadsRoot, { recursive: true, force: true });
rmSync(coversRoot, { recursive: true, force: true });
ensureDir(downloadsRoot);
ensureDir(coversRoot);

const catalog = [];

for (const draft of works) {
  const sourcePath = join(sourceRoot, draft.source);
  const sourceMarkdown = readFileSync(sourcePath, "utf8");
  const title = readTitle(sourceMarkdown);
  const work = { ...draft, title };
  const prompt = promptText(work);
  const itemRoot = join(downloadsRoot, work.slug);
  const skillRoot = join(itemRoot, "skill", work.slug);
  const agentsRoot = join(skillRoot, "agents");

  ensureDir(itemRoot);
  execFileSync("python3", [
    initSkillPath,
    work.slug,
    "--path",
    join(itemRoot, "skill"),
    "--interface",
    `display_name=${work.title}`,
    "--interface",
    `short_description=${shortDescription(work)}`,
    "--interface",
    `default_prompt=Use $${work.slug} to process my material with this workflow.`,
  ]);
  writeFileSync(join(itemRoot, "prompt.md"), promptMarkdown(work, prompt));
  writeFileSync(join(skillRoot, "SKILL.md"), skillMarkdown(work));
  writeFileSync(join(agentsRoot, "openai.yaml"), openaiYaml(work));

  const itemZip = join(itemRoot, `${work.slug}-complete.zip`);
  execFileSync("zip", ["-q", "-r", itemZip, "prompt.md", "skill"], { cwd: itemRoot });

  let cover = null;
  if (draft.source.startsWith("assets/")) {
    const coverSource = join(dirname(sourcePath), "01.png");
    if (existsSync(coverSource)) {
      const coverName = `${work.slug}.png`;
      copyFileSync(coverSource, join(coversRoot, coverName));
      cover = `/covers/${coverName}`;
    }
  }

  catalog.push({
    slug: work.slug,
    title: work.title,
    description: work.description,
    category: work.category,
    tags: work.tags,
    prompt,
    cover,
    sourceDate: readSourceDate(work.source),
    promptUrl: `/downloads/${work.slug}/prompt.md`,
    skillUrl: `/downloads/${work.slug}/skill/${work.slug}/SKILL.md`,
    bundleUrl: `/downloads/${work.slug}/${work.slug}-complete.zip`,
  });
}

writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

const allRoot = join(projectRoot, "public", "all-templates");
rmSync(allRoot, { recursive: true, force: true });
ensureDir(allRoot);
for (const work of catalog) {
  cpSync(join(downloadsRoot, work.slug), join(allRoot, work.slug), { recursive: true });
}

const allZip = join(projectRoot, "public", "ai-workflow-library-all.zip");
rmSync(allZip, { force: true });
execFileSync("zip", ["-q", "-r", allZip, "all-templates"], { cwd: join(projectRoot, "public") });
rmSync(allRoot, { recursive: true, force: true });

console.log(`Generated ${catalog.length} workflow templates.`);
