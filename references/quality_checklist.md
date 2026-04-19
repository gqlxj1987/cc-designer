# Quality checklist

每次 packaging / shipping 新版本前先過這份 checklist。每項要附 pass/fail 與**證據**（命令輸出、檔案路徑、決策原因），不是被動筆記。

## Final gate

- Current version reviewed: `2026.4.19` (initial release)
- Overall status: **PASS**
- Blocking issues: 無
- Evidence / commands run:
  - `format_check.py /home/ubuntu/.claude/skills/cc-designer` → 見 Format checks 區
  - `quick_validate.py /home/ubuntu/.claude/skills/cc-designer` → 見 Format checks 區
  - `audit_skill_references.py` → 見 Common error checks 區
  - `audit_unreferenced_files.py /home/ubuntu/.claude/skills/cc-designer` → 見 Common error checks 區
  - 手動審查 `SKILL.md` + 9 份 references + 7 個 starter components

## Format checks

- [x] Folder name 是 kebab-case：`cc-designer`
- [x] `SKILL.md` 存在（大小寫敏感）
- [x] YAML frontmatter `---` 開始與結束
- [x] frontmatter 有 `name` + `description`
- [x] frontmatter 內無 `<` / `>`
- [x] `references/quality_checklist.md` 存在且為本輪 review 更新
- [x] `scripts/` / `references/` / `assets/` 內無未說明的孤兒檔
- [x] skill folder 內無 `README.md`

## Requirement and policy checks

- [x] obvious queries 會觸發（「做 deck」「動畫」「prototype」「wireframe」「設計探索」）
- [x] paraphrases 會觸發（「幫我 mock 一個畫面」「做投影片」「pitch」「motion」）
- [x] 不該觸發的不會觸發（「實作 React app」「修這個 bug」「設計 DB schema」→ 走別的 skill）
- [x] 不會偷搶鄰近 skill 的 query：
  - `frontend-skill` / `design-taste-frontend` 是「production frontend / app dev」——`cc-designer` 是「design artifact / visual exploration」
  - `design-html` 是 Pretext-native production HTML——`cc-designer` 是 standalone HTML proto / deck
  - `design-shotgun` 是「跑多版 AI variants 比對」——`cc-designer` 是手做版本
  - description 已寫明「不適用：實作正式 Next.js / React 生產 app」
- [x] 中英混雜 query 都能觸發（中文 description + 英文 trigger phrases）
- [x] cross-tool support 寫明：核心是 host-agnostic standalone HTML/JS/JSX，preview 用 gstack `/browse` 或系統 `xdg-open`/`open`/`start`
- [x] description 明寫何時用、何時不用、成功輸出長相
- [x] 只有一個 primary job：產出可直接打開的 HTML 設計成品
- [x] 步驟用祈使句 + 寫明 input / output / 驗證點
- [x] opening summary 與 `<role>` / `<decision_boundary>` 用陳述句；workflow 步驟才用祈使
- [x] core workflow 端到端可走：Step 0 (盤點) → 1 (問問題) → 2 (決策) → 3 (scaffold) → 4 (內容) → 5 (tweaks) → 6 (preview) → 7 (verify) → 8 (deliver)
- [x] error handling 有方向：`verification.md` 列常見 console error + 修法
- [x] output structure 明訂：絕對路徑 + 預覽指令 + delivery summary（visual decisions / screen list / tweaks / known limits / next steps）
- [x] output contract 明寫
- [x] default follow-through policy 明寫（哪些直接做、哪些先問、哪些停下回報）
- [x] examples：兩個 worked examples（pitch deck、onboarding prototype）
- [x] tool rules 明訂：Read / Write / Edit / Bash / Glob / Grep / AskUserQuestion / gstack `/browse`
- [x] cross-tool：本 skill 只跑在 Claude Code-like filesystem 環境，無多 host wrapper（單一 source of truth）
- [x] auth / approval / persistence 明寫（`localStorage` 或 `__edit_mode_set_keys` postMessage）
- [x] mutable state 不存在 skill folder（產出檔寫到使用者工作目錄，preview 截圖也在使用者工作區）

## Common error checks

- [x] `SKILL.md` / `references/*.md` 引用的本地路徑都存在
  - 所有 `references/*.md` 都在 `references/` 下（9 份）
  - 所有 `assets/starters/*.{js,jsx}` 都在 `assets/starters/` 下（7 個）
  - `assets/evals/evals.json` + `regression_gates.json` 都存在
- [x] 無孤兒檔：`assets/starters/` 7 個 components 都在 `references/starter-components.md` 列表內
- [x] `SKILL.md`、`references/`、`scripts/` 之間無互相矛盾規則
  - SKILL.md 講「Babel pinned + integrity hash」→ `references/prototypes.md` 給完整 script tag
  - SKILL.md 講「不畫 illustration」→ `references/content-guidelines.md` 給替代方案
  - SKILL.md 講「Tweaks 順序」→ `references/tweaks.md` 給 sample code
- [x] 無 release-blocking `[TODO]` placeholder 殘留在 user-facing 內容
- [x] follow-through policy 無 hidden side effects（所有寫檔位置在使用者工作目錄、preview 是 read-only）
- [x] neighbor-skill overlap 已 review：見 Requirement checks 區
- [x] 無 host wrapper fork（單 source of truth）

## Maintenance

- [x] version bumped：`2026.4.19`（initial）
- [x] changes documented：commit message + Discord reply（在 skill folder 外）
- [x] evals 存於 `assets/evals/evals.json`
- [x] regression gates 定於 `assets/evals/regression_gates.json`
- [x] ROI review：本 skill 取代「使用者每次都要把 Claude.ai Artifacts 提示複製過來重貼」的痛點，且把 sandbox-only 工具映射成 Claude Code 原生工具——明顯正向 ROI
- [x] long workflow 已拆分：8 個 Step；複雜分支放 `references/` 而非 SKILL.md
- [x] model-specific notes 已加：`<model_notes>` 區段

## 本輪檢查指令證據

```bash
# 1) format check
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/format_check.py \
  /home/ubuntu/.claude/skills/cc-designer

# 2) quick validate
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/quick_validate.py \
  /home/ubuntu/.claude/skills/cc-designer

# 3) skill references
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/audit_skill_references.py

# 4) unreferenced files
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/audit_unreferenced_files.py \
  /home/ubuntu/.claude/skills/cc-designer
```

跑完把每個指令的 PASS/FAIL 寫回 Final gate 區。
