---
name: group-chat-to-itinerary
description: 把旅行群里的零散讨论整理成可执行、可核对的行程表。 Use when the user asks to handle 群聊、旅行、行程表, or requests the workflow described by this skill.
---

# 端午出发前｜30条群聊3分钟变行程表

## Inputs

Collect the following before execution:

- 已脱敏的旅行群聊
- 出行日期
- 已确认订单信息

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 按时间提取集合、交通、住宿与活动.
2. 区分已确认、暂定和待确认.
3. 列出成员分工与出发前核对项.

## Output

Return the result in concise Chinese with these sections:

- 按时间排序的行程表
- 待确认事项
- 人员分工
- 出发前检查清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得猜测缺失行程.
- 票务天气需提示官方复核.
- 不得保留隐私和完整订单号.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
