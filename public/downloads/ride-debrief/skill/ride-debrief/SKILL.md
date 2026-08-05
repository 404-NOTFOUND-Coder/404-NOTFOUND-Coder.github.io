---
name: ride-debrief
description: 把骑行数据和主观感受整理成下一次可执行的调整。 Use when the user asks to handle 骑行、复盘、成都生活, or requests the workflow described by this skill.
---

# 骑车回来后，我用AI复盘了10分钟

## Inputs

Collect the following before execution:

- 路线与运动数据
- 途中感受
- 补给和装备记录
- 异常情况

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 对齐时间、路段与主观感受.
2. 识别配速、补给和装备问题.
3. 提出下一次只改一到三项的方案.

## Output

Return the result in concise Chinese with these sections:

- 骑行复盘表
- 关键问题
- 保留做法
- 下次调整

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不提供医疗诊断.
- 数据缺失时不得猜测.
- 身体不适需建议停止并寻求专业意见.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
