---
name: ai-writing-trim
description: 删除 AI 初稿中的空开场、无证据的确定语气和硬凑结构。 Use when the user asks to handle AI写作、改写、表达, or requests the workflow described by this skill.
---

# AI帮我写完后，我会删掉这3类话

## Inputs

Collect the following before execution:

- AI 生成的初稿
- 写作目的与目标读者
- 必须保留的事实和观点
- 可用的例子、数据或来源

If a required input is missing, ask only for the blocking information. Do not invent it.

## Workflow

1. 识别并删除不承担信息的空开场.
2. 把无证据的确定表述改成事实或不确定说明.
3. 按真实逻辑重组被硬拆的并列结构.
4. 补回具体对象、动作和可核验细节.

## Output

Return the result in concise Chinese with these sections:

- 去水分后的正文
- 删除与改写记录
- 缺少证据的断言清单
- 仍需作者补充的具体细节

Prefer tables for comparison and checklists for actions. Preserve source locations whenever available.

## Quality Gates

- 不得为了具体而编造事实和经历.
- 不得擅自改变作者的核心立场.
- 没有证据的强结论必须降级或标记待核验.

Before finishing, separate confirmed facts, inferred judgments, and unresolved items.
