---
name: video-timestamp-evidence
description: 让 AI 用开始时间、结束时间、事件和画面证据定位视频片段。 Use when the user asks to handle 视频理解、时间戳、多模态, or requests the workflow described by this skill.
---

# 让AI找视频片段，我只看它能不能报时间点

## Inputs

Collect the following before execution:

- 视频或可访问的视频文件
- 需要寻找的事件或状态变化
- 带时间戳字幕或转写（如有）
- 允许的时间误差

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 定位候选事件的开始与结束时间.
2. 区分画面动作、字幕内容和模型推断.
3. 描述支撑结论的人物、物体与状态变化.
4. 对不确定结果给出候选区间和原因.
5. 输出便于剪辑和复核的时间索引.

## Output

Return the result in concise Chinese with these sections:

- 视频片段时间表
- 事件与画面证据
- 候选时间段
- 不确定项和复核建议

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得用模糊的前段、中间或后段代替时间点.
- 看不到的事件不得根据字幕自行补全.
- 不确定时不得编造精确时间.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
