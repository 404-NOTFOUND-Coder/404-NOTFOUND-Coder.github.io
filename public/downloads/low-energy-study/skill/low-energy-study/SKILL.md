---
name: low-energy-study
description: 根据精力而不是意志力，安排高、中、低负荷学习任务。 Use when the user asks to handle 学习计划、精力管理、低状态, or requests the workflow described by this skill.
---

# 天气越热，我越不想靠意志力学习

## Inputs

Collect the following before execution:

- 今日精力水平
- 可用时间段
- 任务列表
- 必须完成项

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 估计每项任务的认知负荷.
2. 匹配高、中、低精力时段.
3. 把大任务拆成最小可启动动作.

## Output

Return the result in concise Chinese with these sections:

- 精力匹配日程
- 最低完成线
- 恢复性任务
- 明日接续点

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不把低精力解释为懒惰.
- 保留休息和恢复.
- 避免过度承诺.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
