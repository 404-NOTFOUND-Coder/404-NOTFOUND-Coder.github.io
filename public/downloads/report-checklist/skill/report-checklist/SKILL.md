---
name: report-checklist
description: 写 PPT 前先检查对象、目标、证据、结论和下一步。 Use when the user asks to handle 汇报、检查表、PPT, or requests the workflow described by this skill.
---

# 做汇报前，我不先写PPT，先做这张检查表

## Inputs

Collect the following before execution:

- 汇报主题
- 听众
- 现有材料
- 希望推动的决定

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 明确听众最关心的问题.
2. 核对每个结论的证据.
3. 删除与目标无关的材料.
4. 补上下一步与待决策项.

## Output

Return the result in concise Chinese with these sections:

- 汇报前检查表
- 证据缺口
- 建议结构
- 可删除内容

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不先生成华丽措辞.
- 结论必须有证据支撑.
- 未知项不得包装成确定事实.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
