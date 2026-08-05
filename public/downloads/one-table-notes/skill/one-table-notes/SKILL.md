---
name: one-table-notes
description: 把资料压成原话、自己的理解、实际用途三列表。 Use when the user asks to handle 学习笔记、知识管理、表格, or requests the workflow described by this skill.
---

# 读完一堆资料后，我只留下这张表

## Inputs

Collect the following before execution:

- 资料正文或摘录
- 当前研究或学习问题
- 原文位置

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 保留关键原话与出处.
2. 用自己的语言解释含义.
3. 说明能支持哪个问题或判断.

## Output

Return the result in concise Chinese with these sections:

- 三列学习表
- 无法解释项
- 无法落地项
- 复读建议

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 理解列不得照抄原文.
- 用途不明确时标记暂不收录.
- 不编造出处.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
