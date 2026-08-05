---
name: prompt-three-lines
description: 用目标、依据、格式三句话写出清楚且可验收的 Prompt。 Use when the user asks to handle Prompt、三句话、输出格式, or requests the workflow described by this skill.
---

# 我现在写Prompt，只保留这3句话

## Inputs

Collect the following before execution:

- 要解决的唯一问题
- AI 可使用的材料
- 期望输出格式

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 把目标改写成一个动作.
2. 限定只能依据给定材料.
3. 写清字段、长度和不确定项处理.

## Output

Return the result in concise Chinese with these sections:

- 三句话 Prompt
- 变量占位符
- 验收检查项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 目标不得包含多个并列任务.
- 材料范围必须清楚.
- 输出格式应可检查.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
