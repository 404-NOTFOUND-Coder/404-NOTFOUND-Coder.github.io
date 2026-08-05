---
name: pdf-to-report
description: 把长 PDF 变成带出处、可复核的阅读框架和汇报提纲。 Use when the user asks to handle PDF、汇报、资料整理, or requests the workflow described by this skill.
---

# 30页资料，怎么用 AI 10 分钟整理成汇报

## Inputs

Collect the following before execution:

- PDF 或资料正文
- 汇报对象与时长
- 必须回答的问题

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 提取问题、方法、结论和待复核点.
2. 按观点、原文依据、汇报表达制表.
3. 生成背景到个人判断的五段式提纲.

## Output

Return the result in concise Chinese with these sections:

- 四问阅读框架
- 带出处的阅读表
- 五段式汇报提纲
- 高风险复核清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得补写原文不存在的信息.
- 关键结论必须附原文位置.
- 不确定内容明确标记待复核.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
