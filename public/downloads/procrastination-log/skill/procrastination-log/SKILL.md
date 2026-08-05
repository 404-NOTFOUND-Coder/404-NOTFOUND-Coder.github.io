---
name: procrastination-log
description: 分析一天的行为记录，找到拖延发生的具体触发点。 Use when the user asks to handle 拖延、行为记录、复盘, or requests the workflow described by this skill.
---

# 我把一天的拖延记录喂给AI，发现不是我懒

## Inputs

Collect the following before execution:

- 按时间记录的一天行为
- 原计划
- 当时精力与情绪

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 对齐计划与实际行为.
2. 寻找任务切换和逃避触发点.
3. 区分任务模糊、阻力过高和环境干扰.

## Output

Return the result in concise Chinese with these sections:

- 拖延触发点
- 证据片段
- 下一次替代动作
- 一项环境调整

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不做心理或医学诊断.
- 不使用懒惰等人格标签.
- 建议必须小且可执行.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
