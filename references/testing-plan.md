# Testing plan

本档是 cc-designer 的测试设计文件。触发与功能测试的 canonical 资料仍在 `assets/evals/evals.json`，本文件补规则、near-miss、regression gates 与 feedback loop 细节。

## Triggering tests

Should trigger：
- 「帮我做一份 6 页的产品 pitch deck」
- 「做一个外送 app 的 onboarding prototype」
- 「mock 这张截图成可点击的 HTML」
- 「做一段开场动画」
- 「wireframe 我的 landing，3 个方向」
- 「把这份 PRD 变成投影片」
- 「design something like Linear 的首页」

Should NOT trigger：
- 「帮我改 Tailwind config 新增 spacing」→ frontend-skill
- 「audit 我的首页视觉」→ `/design-review`
- 「从零建一套设计 tokens」→ `/design-consultation`
- 「PR 要不要这样改」→ 一般 review

Near-miss / 易混淆：
- 「设计一个 component」→ 若目标是 repo production code：frontend-skill；若是先 mock：cc-designer
- 「帮我做个网页」→ 若是 landing / marketing mock：cc-designer；若是真的要进 Next.js：frontend-skill

Should ask before acting：
- 没有任何设计脉络时，不要直接从零开始画；先停下来问

## Functional tests

Test case 1：deck from PRD
- Given：有一份 PRD 档案路径、使用者说「8 页、给董事会看、要像 Linear」
- When：执行 cc-designer flow
- Then：产出 `<name>.html`，用 `deck_stage.js`（web component）；8 个 `<section>`；console 无错误；顶端有设计叙事注解；Tweaks 含主色 / 字型切换

Test case 2：Interactive prototype
- Given：使用者给 1 张截图 + 4 步骤说明
- When：执行 cc-designer flow
- Then：若需要 React 才产出 React + Babel prototype；使用 `IOSDevice` 包 children；每 screen 有 `data-screen-label`；Tweaks 含颜色与 CTA copy 切换

Test case 3：No context, should stop
- Given：「帮我设计 app」没有其他脉络
- When：执行
- Then：skill 应停下来要求 UI kit / 截图 / 品牌资料，而非凭空画

## Performance comparison

- Baseline（无 skill）：Claude 会产出单一 HTML，常常缺 integrity hash、styles 命名撞、没有 Tweaks、没复制 assets、console 有错误
- With skill：pinned 版本、styles 命名正确、Tweaks 预设附、assets 本地复制、交付前验证

## ROI guardrail

- Quality gain 必须高过：额外 tool calls（~10-20 次 Read / Write）、额外 bundle 时间（starter copies）、维护 starter 档的心力
- 若使用者要求的是 one-shot「写个 HTML」而非「设计」，退回一般 prompt 就好，不要硬上本 skill

## Regression gates（与 `assets/evals/regression_gates.json` 同步）

目前阈值见 `assets/evals/regression_gates.json`，由 `~/.claude/skills/skill-creator-advanced/scripts/check_regression_gates.py` 执行（cc-designer 自身不带 scripts/）。发版条件：

| 指标 | 阈值 | 资料来源 |
|---|---|---|
| `min_pass_rate_delta` | ≥ +0.15（相对 baseline） | `regression_gates.json` |
| `max_time_increase_seconds` | ≤ 60 | `regression_gates.json` |
| `max_token_increase` | ≤ 5000 | `regression_gates.json` |
| `require_non_negative_pass_rate` | `true` | `regression_gates.json` |
| Max under-trigger failures | ≤ 2 / 10 | 手动核对 `run_eval.py` 输出 |
| Max over-trigger failures | ≤ 1 / 10 | 手动核对 `run_eval.py` 输出 |

**若要调整数字，先改 `regression_gates.json` 再同步本表**——JSON 是 source of truth，本表只是人读版注解。

## Feedback loop — 常见失败讯号

- Console 有错误 → 多半是 React UMD / integrity hash / styles 命名撞；修 Critical rules 1-3
- 视觉太「AI 感」 → 检查 `references/content-guidelines.md` 的 AI slop tropes
- 使用者说「太像 web 了」 → 提醒自己任务是 deck / prototype / animation，避免用 web 设计套路
- 交付后 Tweaks 无作用 → 检查 `references/tweaks.md` 的 `postMessage` 顺序
- 资料夹 collision → 见 SKILL.md 的 cwd collision 规则，用 `<project>-v2/` 后缀

## Host compatibility checks

- Claude Code：Read / Write / Edit / Bash / Glob / Grep + `/browse`（可选）
- Codex CLI：同上但无 `/browse`——用 `xdg-open` / `open` 预览
- OpenClaw：同 Codex CLI
- 任何没有 filesystem 的 chat 介面：**不支援**（无法交付 HTML）
