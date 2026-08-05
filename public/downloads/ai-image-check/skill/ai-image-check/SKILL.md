---
name: ai-image-check
description: 从来源、画面一致性和外部证据核验疑似 AI 图片。 Use when the user asks to handle AI图片、事实核查、信息辨别, or requests the workflow described by this skill.
---

# 看到一张AI图，我先查这3处

## Inputs

Collect the following before execution:

- 图片及原始链接
- 发布账号信息
- 相关事件线索

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 追溯最早来源和生成说明.
2. 检查文字、反射、遮挡与物体关系.
3. 寻找其他角度、原视频和可信报道.

## Output

Return the result in concise Chinese with these sections:

- 证据核验表
- 支持与反对线索
- 无法确认项
- 谨慎结论

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得仅凭手指等单一细节判断.
- 检测器结果只能作为线索.
- 证据不足时结论必须保留不确定性.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
