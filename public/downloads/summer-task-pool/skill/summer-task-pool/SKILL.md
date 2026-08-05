---
name: summer-task-pool
description: 把过满计划删减为可执行任务池，并保留必要缓冲。 Use when the user asks to handle 计划、任务池、减法, or requests the workflow described by this skill.
---

# 暑假计划别写太满｜我先让AI删掉一半

## Inputs

Collect the following before execution:

- 全部待办
- 可用时间
- 硬性截止日期
- 近期主目标

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 按影响与紧迫度判断价值.
2. 删除重复、模糊和短期无法推进项.
3. 安排核心、可选和恢复任务.

## Output

Return the result in concise Chinese with these sections:

- 精简任务池
- 暂缓清单
- 每周上限
- 缓冲时间建议

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不把每天排满.
- 优先保留影响近期结果的任务.
- 说明被删除任务的原因.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
