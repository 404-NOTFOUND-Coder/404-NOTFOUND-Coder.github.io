---
name: agent-acceptance-sheet
description: 把 Agent 任务改写成可检查的交付物、通过条件和停止边界。 Use when the user asks to handle AI Agent、验收标准、工作流, or requests the workflow described by this skill.
---

# 我给Agent的不是任务，是一张验收表

## Inputs

Collect the following before execution:

- Agent 要完成的目标
- 期望交付物与格式
- 可用材料和工具
- 高风险动作与禁止项

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 定义最终交付物、文件名、字段和格式.
2. 把完成标准改写成逐项可检查的通过条件.
3. 为结论和修改设置证据或测试入口.
4. 列出缺失材料、登录、外部提交和不可逆操作的停止条件.
5. 明确禁止猜测、越界修改和无关操作.

## Output

Return the result in concise Chinese with these sections:

- Agent 验收表
- 通过条件清单
- 证据与测试要求
- 停止条件和禁止项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不可使用无法判断是否通过的模糊标准.
- 高风险和不可逆动作必须先暂停确认.
- 输入不足时报告缺口而不是自行补全.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
