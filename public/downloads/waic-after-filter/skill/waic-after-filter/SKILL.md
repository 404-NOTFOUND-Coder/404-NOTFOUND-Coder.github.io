---
name: waic-after-filter
description: 把大会热点归入整理、复核和流程三类可用方向。 Use when the user asks to handle AI大会、落地、工作流, or requests the workflow described by this skill.
---

# AI大会看完，我只留下3个能用的方向

## Inputs

Collect the following before execution:

- 会后笔记或产品清单
- 自己的高频任务
- 验证所需成本

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 逐项映射到整理、复核或固定流程.
2. 设计一个最小验证任务.
3. 比较迁移成本和实际收益.

## Output

Return the result in concise Chinese with these sections:

- 可用方向清单
- 最小实验
- 观察指标
- 暂不采用项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不把演示效果当稳定能力.
- 一次只验证一个变量.
- 没有任务匹配时不强行采用.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
