---
name: code-failure-checklist
description: 让 Coding Agent 在改文件前写清预期、现象、复现、影响和验证。 Use when the user asks to handle AI编程、Debug、Coding Agent, or requests the workflow described by this skill.
---

# AI改代码前，我先让它写失败清单

## Inputs

Collect the following before execution:

- 预期行为与实际现象
- 错误日志和运行环境
- 稳定复现步骤（如有）
- 相关代码、测试和修改限制

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 分开描述预期结果与实际现象.
2. 整理最小且可重复的复现步骤.
3. 区分已观察证据和仍待验证的原因假设.
4. 限定可能受影响的文件与测试.
5. 在修改前提出最小修复方案和验证方式.

## Output

Return the result in concise Chinese with these sections:

- 失败清单
- 证据与假设表
- 最小修改方案
- 针对性测试和回归检查

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 失败尚未定位时不得批量修改文件.
- 无法复现时先补日志和诊断.
- 修改必须经测试证明有效且未引入回归.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
