---
name: ai-cross-examination
description: 用提出者和审查者两个角色暴露 AI 结论的假设、反例与证据缺口。 Use when the user asks to handle 交叉质疑、信息核验、Prompt, or requests the workflow described by this skill.
---

# 同一个问题，我为什么会问两次AI

## Inputs

Collect the following before execution:

- 需要判断的问题
- 第一份 AI 回答或初步方案
- 可用原始材料
- 结论失误的影响

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 整理第一份回答的结论、依据和不确定项.
2. 以审查者角色寻找隐藏假设、反例和缺失证据.
3. 列出会让结论失效的边界条件.
4. 汇总两次输出的冲突点并指定核验来源.

## Output

Return the result in concise Chinese with these sections:

- 第一份结论摘要
- 反方审查表
- 关键冲突与失效条件
- 人工核验清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 第二次输出不得只重写或赞成第一份答案.
- 不得按模型数量或语气确定程度投票.
- 最终判断必须回到原始材料和证据.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
