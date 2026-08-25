import { execFileSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, utimesSync, writeFileSync } from "node:fs";
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
  {
    slug: "citation-verification",
    source: "assets/2026-08-20_citation_clickable/publish.md",
    category: "信息判断",
    description: "逐条核验 AI 引用是否真实存在、准确对应并支持当前结论。",
    tags: ["引用核验", "论文阅读", "证据"],
    inputs: ["待核验的结论与引用", "AI 给出的链接或书目信息", "原始任务或研究主题", "需要使用的引用格式"],
    steps: ["检查链接可访问性并核对题目、作者、年份", "定位原文证据并判断是否支持当前结论", "优先追溯论文、官方报告或一手数据", "按可用、部分支持、冲突、未核验分类"],
    outputs: ["引用核验表", "可安全使用的引用", "应删除或改写的结论", "仍需人工查找的来源"],
    guardrails: ["不得生成或补全不存在的引用", "关键词相关不等于原文支持结论", "无法打开或无法定位原文时必须标记未核验"],
  },
  {
    slug: "ai-writing-trim",
    source: "assets/2026-08-22_delete_ai_filler/publish.md",
    category: "Prompt方法",
    description: "删除 AI 初稿中的空开场、无证据的确定语气和硬凑结构。",
    tags: ["AI写作", "改写", "表达"],
    inputs: ["AI 生成的初稿", "写作目的与目标读者", "必须保留的事实和观点", "可用的例子、数据或来源"],
    steps: ["识别并删除不承担信息的空开场", "把无证据的确定表述改成事实或不确定说明", "按真实逻辑重组被硬拆的并列结构", "补回具体对象、动作和可核验细节"],
    outputs: ["去水分后的正文", "删除与改写记录", "缺少证据的断言清单", "仍需作者补充的具体细节"],
    guardrails: ["不得为了具体而编造事实和经历", "不得擅自改变作者的核心立场", "没有证据的强结论必须降级或标记待核验"],
  },
  {
    slug: "paragraph-explainer",
    source: "assets/2026-08-25_explain_one_paragraph/publish.md",
    category: "科研学习",
    description: "把论文中看不懂的一段拆成结论、前提、术语和不确定项。",
    tags: ["论文阅读", "难段解释", "科研"],
    inputs: ["卡住的论文段落", "段落前后各一至两句", "相关公式、图表或引用", "自己的具体疑问"],
    steps: ["识别本段试图建立的核心结论", "列出结论依赖的前提和上下文", "结合本段语境解释关键术语、变量和对比对象", "标记无法仅凭当前材料确认的解释", "将解释逐句映射回原文"],
    outputs: ["一句话段落结论", "前提与术语表", "逐句解释与原文映射", "后续查证问题"],
    guardrails: ["只解释给定段落和必要上下文", "不得把合理推测写成作者原意", "公式、图表和引用必须回到原文确认"],
  },
  {
    slug: "agent-acceptance-sheet",
    source: "assets/2026-08-27_agent_acceptance_sheet/publish.md",
    category: "Agent协作",
    description: "把 Agent 任务改写成可检查的交付物、通过条件和停止边界。",
    tags: ["AI Agent", "验收标准", "工作流"],
    inputs: ["Agent 要完成的目标", "期望交付物与格式", "可用材料和工具", "高风险动作与禁止项"],
    steps: ["定义最终交付物、文件名、字段和格式", "把完成标准改写成逐项可检查的通过条件", "为结论和修改设置证据或测试入口", "列出缺失材料、登录、外部提交和不可逆操作的停止条件", "明确禁止猜测、越界修改和无关操作"],
    outputs: ["Agent 验收表", "通过条件清单", "证据与测试要求", "停止条件和禁止项"],
    guardrails: ["不可使用无法判断是否通过的模糊标准", "高风险和不可逆动作必须先暂停确认", "输入不足时报告缺口而不是自行补全"],
  },
  {
    slug: "ai-cross-examination",
    source: "assets/2026-08-29_ask_ai_twice/publish.md",
    category: "信息判断",
    description: "用提出者和审查者两个角色暴露 AI 结论的假设、反例与证据缺口。",
    tags: ["交叉质疑", "信息核验", "Prompt"],
    inputs: ["需要判断的问题", "第一份 AI 回答或初步方案", "可用原始材料", "结论失误的影响"],
    steps: ["整理第一份回答的结论、依据和不确定项", "以审查者角色寻找隐藏假设、反例和缺失证据", "列出会让结论失效的边界条件", "汇总两次输出的冲突点并指定核验来源"],
    outputs: ["第一份结论摘要", "反方审查表", "关键冲突与失效条件", "人工核验清单"],
    guardrails: ["第二次输出不得只重写或赞成第一份答案", "不得按模型数量或语气确定程度投票", "最终判断必须回到原始材料和证据"],
  },
  {
    slug: "one-page-research-plan",
    source: "assets/2026-09-01_one_page_research_plan/publish.md",
    category: "科研学习",
    description: "把研究计划压缩为当前问题、最小实验、依赖风险和本周证据。",
    tags: ["科研规划", "最小实验", "研究生"],
    inputs: ["当前研究方向与候选问题", "已有结果和主要卡点", "本周可用时间与资源", "数据、算力、代码和合作依赖"],
    steps: ["从候选问题中确定一个当前优先问题", "设计一周内可结束且能减少不确定性的最小实验", "列出依赖、风险和卡住时的替代路径", "定义本周可检查的表格、曲线、日志或中间结果"],
    outputs: ["一页研究计划", "本周最小实验", "风险与替代路径", "可讨论的证据清单"],
    guardrails: ["一次只保留一个当前优先问题", "不得把学习和忙碌直接写成研究进展", "AI 只能协助压缩与检查，研究价值和方法由研究者判断"],
  },
  {
    slug: "video-timestamp-evidence",
    source: "assets/2026-09-03_video_timestamp_evidence/publish.md",
    category: "科研学习",
    description: "让 AI 用开始时间、结束时间、事件和画面证据定位视频片段。",
    tags: ["视频理解", "时间戳", "多模态"],
    inputs: ["视频或可访问的视频文件", "需要寻找的事件或状态变化", "带时间戳字幕或转写（如有）", "允许的时间误差"],
    steps: ["定位候选事件的开始与结束时间", "区分画面动作、字幕内容和模型推断", "描述支撑结论的人物、物体与状态变化", "对不确定结果给出候选区间和原因", "输出便于剪辑和复核的时间索引"],
    outputs: ["视频片段时间表", "事件与画面证据", "候选时间段", "不确定项和复核建议"],
    guardrails: ["不得用模糊的前段、中间或后段代替时间点", "看不到的事件不得根据字幕自行补全", "不确定时不得编造精确时间"],
  },
  {
    slug: "ai-tool-pruning",
    source: "assets/2026-09-05_fewer_ai_tools/publish.md",
    category: "自我管理",
    description: "按任务场景、节省时间和迁移成本精简重复的 AI 工具。",
    tags: ["AI工具", "数字极简", "效率"],
    inputs: ["当前 AI 工具清单", "每个工具的主要使用场景", "过去数周的实际使用频率", "账号、资料和学习迁移成本"],
    steps: ["按通用对话、检索和执行等场景归类", "为每类确定一个默认主力工具", "检查新工具是否明确替代现有场景并持续节省时间", "把未验证工具放入限时试用区", "输出保留、试用、归档和删除建议"],
    outputs: ["AI 工具精简表", "每类默认工具", "新工具试用规则", "迁移与清理清单"],
    guardrails: ["不得仅凭功能列表判断效率", "删除前检查数据导出、订阅和账号依赖", "涉及隐私与权限的工具需单独评估风险"],
  },
  {
    slug: "code-failure-checklist",
    source: "assets/2026-09-08_code_failure_checklist/publish.md",
    category: "Agent协作",
    description: "让 Coding Agent 在改文件前写清预期、现象、复现、影响和验证。",
    tags: ["AI编程", "Debug", "Coding Agent"],
    inputs: ["预期行为与实际现象", "错误日志和运行环境", "稳定复现步骤（如有）", "相关代码、测试和修改限制"],
    steps: ["分开描述预期结果与实际现象", "整理最小且可重复的复现步骤", "区分已观察证据和仍待验证的原因假设", "限定可能受影响的文件与测试", "在修改前提出最小修复方案和验证方式"],
    outputs: ["失败清单", "证据与假设表", "最小修改方案", "针对性测试和回归检查"],
    guardrails: ["失败尚未定位时不得批量修改文件", "无法复现时先补日志和诊断", "修改必须经测试证明有效且未引入回归"],
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
  const sourceDate = readSourceDate(work.source);
  const archiveTimestamp = new Date(`${sourceDate}T00:00:00Z`);
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

  for (const generatedFile of [
    join(itemRoot, "prompt.md"),
    join(skillRoot, "SKILL.md"),
    join(agentsRoot, "openai.yaml"),
  ]) {
    utimesSync(generatedFile, archiveTimestamp, archiveTimestamp);
  }

  const itemZip = join(itemRoot, `${work.slug}-complete.zip`);
  execFileSync("zip", ["-q", "-X", "-D", "-r", itemZip, "prompt.md", "skill"], { cwd: itemRoot });
  utimesSync(itemZip, archiveTimestamp, archiveTimestamp);

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
    sourceDate,
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
  cpSync(join(downloadsRoot, work.slug), join(allRoot, work.slug), { recursive: true, preserveTimestamps: true });
}

const allZip = join(projectRoot, "public", "ai-workflow-library-all.zip");
rmSync(allZip, { force: true });
execFileSync("zip", ["-q", "-X", "-D", "-r", allZip, "all-templates"], { cwd: join(projectRoot, "public") });
rmSync(allRoot, { recursive: true, force: true });

console.log(`Generated ${catalog.length} workflow templates.`);
