---
name: agent-permissions
description: 为 AI Agent 设计最小权限、确认点和不可逆操作边界。 Use when the user asks to handle AI Agent、权限、安全, or requests the workflow described by this skill.
---

# AI Agent越能干，我越不敢放权

## Inputs

Collect the following before execution:

- Agent 要完成的任务
- 可调用工具
- 文件与账号范围
- 不可逆操作

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 列出完成任务所需的最小权限.
2. 区分浏览、写入和外部提交.
3. 为登录、下载、发送、删除设置确认点.

## Output

Return the result in concise Chinese with these sections:

- 权限矩阵
- 自动执行项
- 人工确认项
- 禁止操作项

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 默认最小权限.
- 不可逆操作必须确认.
- 不得访问任务无关目录和账号.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
