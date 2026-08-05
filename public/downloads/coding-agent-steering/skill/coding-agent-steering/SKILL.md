---
name: coding-agent-steering
description: Coding Agent 跑偏时，用停止、重申目标、限制下一步完成纠偏。 Use when the user asks to handle AI编程、Coding Agent、纠偏, or requests the workflow described by this skill.
---

# AI写代码跑偏后，我不再重开对话

## Inputs

Collect the following before execution:

- 当前唯一目标
- 已经发生的错误
- 允许的下一步
- 禁止动作

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 立即停止当前修改.
2. 用一句话重申唯一目标.
3. 提供失败证据.
4. 限定下一步只做诊断或方案.

## Output

Return the result in concise Chinese with these sections:

- 三句纠偏指令
- 下一步验收条件
- 恢复执行前检查

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 停止后不得继续改文件.
- 未确认原因前不扩大修改范围.
- 保留已有项目上下文.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
