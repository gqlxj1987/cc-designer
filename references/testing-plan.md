# Testing plan

本檔是 cc-designer 的測試設計文件。觸發與功能測試的 canonical 資料仍在 `assets/evals/evals.json`，本文件補規則、near-miss、regression gates 與 feedback loop 細節。

## Triggering tests

Should trigger：
- 「幫我做一份 6 頁的產品 pitch deck」
- 「做一個外送 app 的 onboarding prototype」
- 「mock 這張截圖成可點擊的 HTML」
- 「做一段開場動畫」
- 「wireframe 我的 landing，3 個方向」
- 「把這份 PRD 變成投影片」
- 「design something like Linear 的首頁」

Should NOT trigger：
- 「幫我改 Tailwind config 新增 spacing」→ frontend-skill
- 「audit 我的首頁視覺」→ `/design-review`
- 「從零建一套設計 tokens」→ `/design-consultation`
- 「PR 要不要這樣改」→ 一般 review

Near-miss / 易混淆：
- 「設計一個 component」→ 若目標是 repo production code：frontend-skill；若是先 mock：cc-designer
- 「幫我做個網頁」→ 若是 landing / marketing mock：cc-designer；若是真的要進 Next.js：frontend-skill

Should ask before acting：
- 沒有任何設計脈絡時，不要直接從零開始畫；先停下來問

## Functional tests

Test case 1：deck from PRD
- Given：有一份 PRD 檔案路徑、使用者說「8 頁、給董事會看、要像 Linear」
- When：執行 cc-designer flow
- Then：產出 `<name>.html`，用 `deck_stage.js`（web component）；8 個 `<section>`；console 無錯誤；頂端有設計敘事註解；Tweaks 含主色 / 字型切換

Test case 2：Interactive prototype
- Given：使用者給 1 張截圖 + 4 步驟說明
- When：執行 cc-designer flow
- Then：若需要 React 才產出 React + Babel prototype；使用 `IOSDevice` 包 children；每 screen 有 `data-screen-label`；Tweaks 含顏色與 CTA copy 切換

Test case 3：No context, should stop
- Given：「幫我設計 app」沒有其他脈絡
- When：執行
- Then：skill 應停下來要求 UI kit / 截圖 / 品牌資料，而非憑空畫

## Performance comparison

- Baseline（無 skill）：Claude 會產出單一 HTML，常常缺 integrity hash、styles 命名撞、沒有 Tweaks、沒複製 assets、console 有錯誤
- With skill：pinned 版本、styles 命名正確、Tweaks 預設附、assets 本地複製、交付前驗證

## ROI guardrail

- Quality gain 必須高過：額外 tool calls（~10-20 次 Read / Write）、額外 bundle 時間（starter copies）、維護 starter 檔的心力
- 若使用者要求的是 one-shot「寫個 HTML」而非「設計」，退回一般 prompt 就好，不要硬上本 skill

## Regression gates（與 `assets/evals/regression_gates.json` 同步）

目前閾值見 `assets/evals/regression_gates.json`，由 `~/.claude/skills/skill-creator-advanced/scripts/check_regression_gates.py` 執行（cc-designer 自身不帶 scripts/）。發版條件：

| 指標 | 閾值 | 資料來源 |
|---|---|---|
| `min_pass_rate_delta` | ≥ +0.15（相對 baseline） | `regression_gates.json` |
| `max_time_increase_seconds` | ≤ 60 | `regression_gates.json` |
| `max_token_increase` | ≤ 5000 | `regression_gates.json` |
| `require_non_negative_pass_rate` | `true` | `regression_gates.json` |
| Max under-trigger failures | ≤ 2 / 10 | 手動核對 `run_eval.py` 輸出 |
| Max over-trigger failures | ≤ 1 / 10 | 手動核對 `run_eval.py` 輸出 |

**若要調整數字，先改 `regression_gates.json` 再同步本表**——JSON 是 source of truth，本表只是人讀版註解。

## Feedback loop — 常見失敗訊號

- Console 有錯誤 → 多半是 React UMD / integrity hash / styles 命名撞；修 Critical rules 1-3
- 視覺太「AI 感」 → 檢查 `references/content-guidelines.md` 的 AI slop tropes
- 使用者說「太像 web 了」 → 提醒自己任務是 deck / prototype / animation，避免用 web 設計套路
- 交付後 Tweaks 無作用 → 檢查 `references/tweaks.md` 的 `postMessage` 順序
- 資料夾 collision → 見 SKILL.md 的 cwd collision 規則，用 `<project>-v2/` 後綴

## Host compatibility checks

- Claude Code：Read / Write / Edit / Bash / Glob / Grep + `/browse`（可選）
- Codex CLI：同上但無 `/browse`——用 `xdg-open` / `open` 預覽
- OpenClaw：同 Codex CLI
- 任何沒有 filesystem 的 chat 介面：**不支援**（無法交付 HTML）
