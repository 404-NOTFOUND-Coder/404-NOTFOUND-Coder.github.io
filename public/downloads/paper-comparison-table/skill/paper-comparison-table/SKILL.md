---
name: paper-comparison-table
description: 用统一维度比较多篇论文，定位共识、分歧和研究空白。 Use when the user asks to handle 论文阅读、对比表、科研, or requests the workflow described by this skill.
---

# 我的文献阅读整理法｜先做一张对比表

## Inputs

Collect the following before execution:

- 多篇论文全文或结构化摘录
- 研究主题
- 希望比较的维度

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 按问题、方法、数据、结论、局限统一提取.
2. 横向比较共识和分歧.
3. 标出可能的研究空白与复核位置.

## Output

Return the result in concise Chinese with these sections:

- 文献对比表
- 共识与分歧
- 研究空白候选
- 原文复核索引

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 未找到的信息写未找到.
- 结论与实验指标回原文确认.
- 研究空白只作为候选而非事实.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
