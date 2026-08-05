---
name: waic-filter
description: 用三个落地问题过滤 AI 大会、新模型和产品热点。 Use when the user asks to handle AI热点、信息过滤、WAIC, or requests the workflow described by this skill.
---

# AI大会前，我只用3个问题过滤热点

## Inputs

Collect the following before execution:

- 热点新闻或发布内容
- 自己的真实任务
- 当前工具栈

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 判断是否减少重复整理.
2. 判断是否提高结果复核能力.
3. 判断能否沉淀为可重复流程.

## Output

Return the result in concise Chinese with these sections:

- 三问评分表
- 立即试用项
- 继续观察项
- 忽略理由

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 区分宣传演示与可验证能力.
- 不因新颖直接替换现有工具.
- 结论注明证据来源.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
