---
name: find-stuck-points
description: 不直接总结难资料，而是先定位术语、逻辑和前置知识卡点。 Use when the user asks to handle 难文献、卡点、阅读, or requests the workflow described by this skill.
---

# 读不懂资料时，我不让AI总结

## Inputs

Collect the following before execution:

- 读不懂的原文段落
- 自己的理解
- 已掌握的背景知识

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 逐句标出术语与指代.
2. 还原论证链条.
3. 识别缺失的前置知识.
4. 给出最短补课路径.

## Output

Return the result in concise Chinese with these sections:

- 卡点清单
- 逻辑链
- 前置知识地图
- 回读顺序

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不跳过原文直接给结论.
- 区分原文含义与解释.
- 不确定解释需显式标注.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
