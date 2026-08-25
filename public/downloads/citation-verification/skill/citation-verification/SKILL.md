---
name: citation-verification
description: 逐条核验 AI 引用是否真实存在、准确对应并支持当前结论。 Use when the user asks to handle 引用核验、论文阅读、证据, or requests the workflow described by this skill.
---

# AI给的引用，我只信能点开的

## Inputs

Collect the following before execution:

- 待核验的结论与引用
- AI 给出的链接或书目信息
- 原始任务或研究主题
- 需要使用的引用格式

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 检查链接可访问性并核对题目、作者、年份.
2. 定位原文证据并判断是否支持当前结论.
3. 优先追溯论文、官方报告或一手数据.
4. 按可用、部分支持、冲突、未核验分类.

## Output

Return the result in concise Chinese with these sections:

- 引用核验表
- 可安全使用的引用
- 应删除或改写的结论
- 仍需人工查找的来源

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得生成或补全不存在的引用.
- 关键词相关不等于原文支持结论.
- 无法打开或无法定位原文时必须标记未核验.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
