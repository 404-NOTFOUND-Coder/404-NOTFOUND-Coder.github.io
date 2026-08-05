---
name: messages-to-todo
description: 从零散群消息中提取动作、负责人、时间和追问项。 Use when the user asks to handle 群消息、待办、项目管理, or requests the workflow described by this skill.
---

# 节后开工前｜把工作群消息整理成周一待办

## Inputs

Collect the following before execution:

- 已脱敏且与自己相关的消息
- 当前日期
- 已有任务清单

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 逐条识别明确动作与承诺.
2. 提取负责人、截止时间和消息出处.
3. 把模糊表述改为待追问问题.

## Output

Return the result in concise Chinese with these sections:

- 可执行待办表
- 待确认问题
- 优先级建议
- 遗漏风险

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 没有明确的信息标记待确认.
- 不上传敏感工作内容.
- 保留消息出处便于核对.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
