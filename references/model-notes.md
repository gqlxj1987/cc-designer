# Model notes

针对不同 foundation model 的 cc-designer 使用差异。

## GPT-style / Sonnet-style

- 本 skill 的 imperative 步骤、critical rules、Tweaks 协定、React pinned hashes 都已写得足够具体，直接照做即可
- 预设 output contract 与 numbered workflow 对这类模型最稳

## Reasoning models（Opus / thinking-mode）

- 重点给「目标、品牌叙事、使用者期待」，让模型自由决定版面与 motion
- Critical rules 区段仍需硬性遵守
- 不要把 middle-of-the-road visual decisions 写死；留空间给模型挑 typography / layout

## 多回合拆分（所有模型通用）

复杂 prototype / deck 应拆成五个回合，而不是单一 mega prompt：

1. 探索 + 叙事（资料收集、design observation、叙事文）
2. 骨架 + 早期预览（v0，含 placeholder）
3. React components + 互动（v1）
4. Tweaks + 变体（v2）
5. 验证 + 交付（打开浏览器、console 检查、极短交付讯息）

每一回合结束让使用者确认方向，再进下一回合。单 mega prompt 的失败率明显较高——中途方向跑偏就来不及修。

## Token / cost 提醒

- Starter 复制是 filesystem 操作，不会 inflate conversation token
- 但 early preview（Step 4）打开浏览器确认时若用 `/browse`，snapshot 会回灌 context；只在必要 checkpoint 用
- 深度 reasoning model（Opus）跑完整 5 回合约 30-60k input tokens；Sonnet-style 约 20-40k
