---
name: ai-tool-pruning
description: 按任务场景、节省时间和迁移成本精简重复的 AI 工具。 Use when the user asks to handle AI工具、数字极简、效率, or requests the workflow described by this skill.
---

# AI工具装得越多，我反而越难开始

## Inputs

Collect the following before execution:

- 当前 AI 工具清单
- 每个工具的主要使用场景
- 过去数周的实际使用频率
- 账号、资料和学习迁移成本

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 按通用对话、检索和执行等场景归类.
2. 为每类确定一个默认主力工具.
3. 检查新工具是否明确替代现有场景并持续节省时间.
4. 把未验证工具放入限时试用区.
5. 输出保留、试用、归档和删除建议.

## Output

Return the result in concise Chinese with these sections:

- AI 工具精简表
- 每类默认工具
- 新工具试用规则
- 迁移与清理清单

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得仅凭功能列表判断效率.
- 删除前检查数据导出、订阅和账号依赖.
- 涉及隐私与权限的工具需单独评估风险.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
