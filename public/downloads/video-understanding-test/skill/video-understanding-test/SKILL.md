---
name: video-understanding-test
description: 用时间顺序、状态变化和证据时间点测试视频理解能力。 Use when the user asks to handle 视频理解、多模态、评测, or requests the workflow described by this skill.
---

# AI真看懂视频了吗？我只测3件事

## Inputs

Collect the following before execution:

- 视频或带时间戳转写
- 希望验证的结论
- 关键事件列表

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 复述关键事件的时间顺序.
2. 标出对象状态变化.
3. 为每个结论定位证据时间点.
4. 列出不确定项.

## Output

Return the result in concise Chinese with these sections:

- 时间轴
- 状态变化表
- 结论证据索引
- 失败样例

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 摘要不能代替证据定位.
- 看不到的内容不得猜测.
- 最终判断回到原视频.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
