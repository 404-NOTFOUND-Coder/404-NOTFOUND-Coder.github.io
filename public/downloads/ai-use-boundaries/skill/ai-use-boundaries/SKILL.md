---
name: ai-use-boundaries
description: 为研究与学习任务划分 AI 可执行、需确认和不可外包的边界。 Use when the user asks to handle AI边界、科研规范、复核, or requests the workflow described by this skill.
---

# 研究AI的博士生｜这3件事我从不交给AI

## Inputs

Collect the following before execution:

- 计划交给 AI 的任务
- 风险与责任要求
- 可用资料与工具

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 判断任务属于整理、建议还是最终决策.
2. 识别引用、证据和结论风险.
3. 划分自动执行、人工确认和禁止外包.

## Output

Return the result in concise Chinese with these sections:

- 任务边界表
- 人工复核点
- 允许 AI 执行的动作
- 最终责任清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 引用与出处必须人工核验.
- 证据充分性不能由 AI 决定.
- 最终判断由使用者负责.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
