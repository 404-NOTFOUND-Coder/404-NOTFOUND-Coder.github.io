---
name: hot-day-three-tasks
description: 低状态时把一天压缩成推进、维护、恢复三件事。 Use when the user asks to handle 三件事、低状态、任务压缩, or requests the workflow described by this skill.
---

# 热到不想动，我让AI把今天压成3件事

## Inputs

Collect the following before execution:

- 今日待办
- 当前状态
- 不可推迟事项
- 可用时间

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 选一件真正推进结果的任务.
2. 选一件维持系统运转的任务.
3. 选一件帮助恢复的任务.

## Output

Return the result in concise Chinese with these sections:

- 今日三件事
- 每项最低完成线
- 建议执行顺序
- 其余任务安置

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 总任务不超过三项.
- 恢复任务不能被删除.
- 不要伪装成更长的子任务列表.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
