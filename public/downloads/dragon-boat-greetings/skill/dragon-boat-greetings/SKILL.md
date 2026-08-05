---
name: dragon-boat-greetings
description: 根据真实关系与交集，写出没有群发感的节日祝福。 Use when the user asks to handle 节日祝福、沟通、写作, or requests the workflow described by this skill.
---

# 端午祝福别群发｜给导师老板这样写

## Inputs

Collect the following before execution:

- 祝福对象及关系
- 最近一次真实交集
- 平时说话语气
- 期望长度

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 识别双方关系与合适边界.
2. 只使用已提供的真实细节.
3. 分别生成克制、自然两个版本.

## Output

Return the result in concise Chinese with these sections:

- 简短版祝福
- 自然版祝福
- 发送前人工修改建议

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得编造共同经历.
- 避免空泛节日辞藻.
- 不同对象分别生成.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
