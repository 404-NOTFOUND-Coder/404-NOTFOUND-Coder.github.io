---
name: paragraph-explainer
description: 把论文中看不懂的一段拆成结论、前提、术语和不确定项。 Use when the user asks to handle 论文阅读、难段解释、科研, or requests the workflow described by this skill.
---

# 读论文卡住时，我只让AI解释这一段

## Inputs

Collect the following before execution:

- 卡住的论文段落
- 段落前后各一至两句
- 相关公式、图表或引用
- 自己的具体疑问

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 识别本段试图建立的核心结论.
2. 列出结论依赖的前提和上下文.
3. 结合本段语境解释关键术语、变量和对比对象.
4. 标记无法仅凭当前材料确认的解释.
5. 将解释逐句映射回原文.

## Output

Return the result in concise Chinese with these sections:

- 一句话段落结论
- 前提与术语表
- 逐句解释与原文映射
- 后续查证问题

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 只解释给定段落和必要上下文.
- 不得把合理推测写成作者原意.
- 公式、图表和引用必须回到原文确认.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
