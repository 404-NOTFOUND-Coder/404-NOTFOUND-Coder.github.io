---
name: progress-three-sentences
description: 用完成了什么、卡在哪里、下一步做什么讲清进展。 Use when the user asks to handle 进展汇报、三句话、项目管理, or requests the workflow described by this skill.
---

# 别人问我进展时，我用3句话讲清楚

## Inputs

Collect the following before execution:

- 本阶段完成事项
- 当前卡点
- 下一步计划
- 时间范围

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 从活动中筛出可验证结果.
2. 用事实描述卡点与影响.
3. 给出下一步动作和预计时间.

## Output

Return the result in concise Chinese with these sections:

- 三句话进展
- 详细备查版
- 需要协助项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不把忙碌当进展.
- 不隐去影响交付的卡点.
- 时间估计需说明不确定性.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
