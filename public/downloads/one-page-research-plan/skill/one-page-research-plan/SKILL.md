---
name: one-page-research-plan
description: 把研究计划压缩为当前问题、最小实验、依赖风险和本周证据。 Use when the user asks to handle 科研规划、最小实验、研究生, or requests the workflow described by this skill.
---

# 开学前，我把研究计划压成了一页

## Inputs

Collect the following before execution:

- 当前研究方向与候选问题
- 已有结果和主要卡点
- 本周可用时间与资源
- 数据、算力、代码和合作依赖

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 从候选问题中确定一个当前优先问题.
2. 设计一周内可结束且能减少不确定性的最小实验.
3. 列出依赖、风险和卡住时的替代路径.
4. 定义本周可检查的表格、曲线、日志或中间结果.

## Output

Return the result in concise Chinese with these sections:

- 一页研究计划
- 本周最小实验
- 风险与替代路径
- 可讨论的证据清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 一次只保留一个当前优先问题.
- 不得把学习和忙碌直接写成研究进展.
- AI 只能协助压缩与检查，研究价值和方法由研究者判断.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
