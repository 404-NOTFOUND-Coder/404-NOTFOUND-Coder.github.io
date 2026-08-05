---
name: shorter-prompts
description: 把冗长 Prompt 压缩为目标、材料、输出三部分。 Use when the user asks to handle Prompt、提问、效率, or requests the workflow described by this skill.
---

# 天天用AI后，我的Prompt反而越写越短

## Inputs

Collect the following before execution:

- 当前长 Prompt
- 唯一目标
- 必须保留的限制

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 删除角色扮演和重复背景.
2. 保留唯一目标与必要材料.
3. 明确输出格式和验收条件.

## Output

Return the result in concise Chinese with these sections:

- 三段式精简 Prompt
- 删除项说明
- 缺失信息问题

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不删除影响正确性的限制.
- 一次只保留一个主要目标.
- 缺少关键材料时先提问.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
