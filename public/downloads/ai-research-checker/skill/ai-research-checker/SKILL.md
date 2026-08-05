---
name: ai-research-checker
description: 让 AI 在问题、证据和结果三个阶段主动挑错。 Use when the user asks to handle AI科研、挑错、研究方法, or requests the workflow described by this skill.
---

# AI做研究越强，我越常让它挑错

## Inputs

Collect the following before execution:

- 研究问题或草稿
- 已有证据
- 当前结论
- 适用范围

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 寻找隐藏假设和不可验证说法.
2. 分开支持、反对与缺失证据.
3. 寻找矛盾、边界条件和替代解释.

## Output

Return the result in concise Chinese with these sections:

- 问题阶段检查
- 证据矩阵
- 结果反例
- 优先修正项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 没找到不等于不存在.
- 不得替研究者决定问题价值.
- 最终结论由人负责.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
