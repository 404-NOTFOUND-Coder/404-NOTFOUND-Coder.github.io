---
name: not-to-do-list
description: 把待办分成必须做、可以晚点做和暂时不做。 Use when the user asks to handle 不做清单、优先级、注意力, or requests the workflow described by this skill.
---

# 我用AI做了一个“不做清单”

## Inputs

Collect the following before execution:

- 当前全部待办
- 本周唯一目标
- 截止日期与依赖

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 识别真正影响进度的任务.
2. 找出只缓解焦虑但不产出结果的任务.
3. 判断一周内能否真实推进.

## Output

Return the result in concise Chinese with these sections:

- 必须做
- 可以晚点做
- 暂时不做
- 重新评估日期

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 解释每个分类的依据.
- 不把长期重要任务永久删除.
- 保留硬截止日期任务.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
