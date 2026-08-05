---
name: multi-agent-less
description: 判断任务是否适合多 Agent 并行，并降低合并成本。 Use when the user asks to handle 多智能体、并行、任务拆分, or requests the workflow described by this skill.
---

# 同时开3个AI后，我反而更慢了

## Inputs

Collect the following before execution:

- 总目标
- 候选子任务
- 共享依赖
- 最终输出格式

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 检查子任务是否彼此独立.
2. 统一输入边界与输出格式.
3. 指定总负责人和冲突处理规则.
4. 不满足条件时改为串行.

## Output

Return the result in concise Chinese with these sections:

- 并行可行性判断
- Agent 分工表
- 统一验收标准
- 合并流程

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不能独立验收的任务不要并行.
- 避免多个 Agent 重复解决同一问题.
- 最终决定必须有唯一负责人.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
