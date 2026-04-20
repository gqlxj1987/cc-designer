# Quality checklist

每次 packaging / shipping 新版本前先过这份 checklist。每项要附 pass/fail 与**证据**（命令输出、档案路径、决策原因），不是被动笔记。

## Final gate

- Current version reviewed: `2026.4.19` (post-starter refresh + punch list pass, 2026-04-19)
- Overall status: **PASS (with 1 accepted exception: `README.md` in skill folder)**
- Blocking issues: 无
- Evidence / commands run (本轮 2026-04-19):
  - `format_check.py` → 1 error：`README.md must NOT be inside the skill folder`——**accepted exception**，因为 `Openclaw-Metis/cc-designer` 是单 skill repo，其 `README.md` 同时作为 skill 根目录与 GitHub repo 首页。若未来合并入 multi-skill monorepo，README 要搬到 repo root。
  - `quick_validate.py` → `Skill is valid!`
  - `audit_skill_references.py` → `Skill reference audit passed: 0 issues across 15 source file(s)`
  - `audit_unreferenced_files.py` → `Unreferenced file audit passed: 0 issues across 15 source file(s), 23 referenced file(s)`
  - 手动审查 SKILL.md（374 行，由 527 行 slim 下来）+ 13 份 references + 7 个 starter components

## Format checks

- [x] Folder name 是 kebab-case：`cc-designer`
- [x] `SKILL.md` 存在（大小写敏感）
- [x] YAML frontmatter `---` 开始与结束
- [x] frontmatter 有 `name` + `description`
- [x] `description` 由 850+ 字缩到 ~260 字（单段，合乎 1-3 句原则）
- [x] frontmatter 内无 `<` / `>`
- [x] `references/quality_checklist.md` 存在且为本轮 review 更新
- [x] `scripts/` / `references/` / `assets/` 内无未说明的孤儿档
- [~] skill folder 内无 `README.md` — **accepted exception**（单 skill repo；见 Final gate 解释）

## Requirement and policy checks

- [x] obvious queries 会触发（「做 deck」「动画」「prototype」「wireframe」「设计探索」）
- [x] paraphrases 会触发（「帮我 mock 一个画面」「做投影片」「pitch」「motion」）
- [x] 不该触发的不会触发（「实作 React app」「修这个 bug」「设计 DB schema」→ 走别的 skill）
- [x] 不会偷抢邻近 skill 的 query：
  - `frontend-skill` / `design-taste-frontend` 是「production frontend / app dev」——`cc-designer` 是「design artifact / visual exploration」
  - `design-html` 是 Pretext-native production HTML——`cc-designer` 是 standalone HTML proto / deck
  - `design-shotgun` 是「跑多版 AI variants 比对」——`cc-designer` 是手做版本
  - description 已写明「不适用：实作正式 Next.js / React 生产 app」
- [x] 中英混杂 query 都能触发（中文 description + 英文 trigger phrases）
- [x] cross-tool support 写明：核心是 host-agnostic standalone HTML/JS/JSX，preview 用 gstack `/browse` 或系统 `xdg-open`/`open`/`start`
- [x] description 明写何时用、何时不用、成功输出长相
- [x] 只有一个 primary job：产出可直接打开的 HTML 设计成品
- [x] 步骤用祈使句 + 写明 input / output / 验证点
- [x] opening summary 与 `<role>` / `<decision_boundary>` 用陈述句；workflow 步骤才用祈使
- [x] core workflow 端到端可走：Step 0 → 8
- [x] error handling 有方向：`references/troubleshooting.md` 列常见 console error + 修法
- [x] output structure 明订：主 HTML 档 + `design/<project>/` + 变体 / Tweaks + 交付讯息 ≤ 120 字
- [x] output contract 明写
- [x] default follow-through policy 明写（哪些直接做、哪些先问、哪些停下回报）
- [x] examples：两个 worked examples（pitch deck、onboarding prototype）
- [x] tool rules 明订：Read / Write / Edit / Bash / Glob / Grep / AskUserQuestion / gstack `/browse`
- [x] cross-tool：本 skill 只跑在 Claude Code-like filesystem 环境，无多 host wrapper（单一 source of truth）
- [x] auth / approval / persistence 明写（`localStorage` 或 `__edit_mode_set_keys` postMessage）
- [x] mutable state 不存在 skill folder（产出档写到使用者工作目录）

## Common error checks

- [x] `SKILL.md` / `references/*.md` 引用的本地路径都存在（`audit_skill_references.py` PASS）
- [x] 所有 13 份 `references/*.md` 都在 `references/` 下：
  - decks.md、prototypes.md、animations.md、wireframes.md
  - tweaks.md、content-guidelines.md、questions.md、starter-components.md、verification.md
  - testing-plan.md、troubleshooting.md、model-notes.md、distribution.md
  - quality_checklist.md
- [x] 所有 `assets/starters/*.{js,jsx}` 都在 `assets/starters/` 下（7 个）且在 `references/starter-components.md` 列表内
- [x] `assets/evals/evals.json` + `regression_gates.json` 都存在
- [x] 无孤儿档（`audit_unreferenced_files.py` PASS）
- [x] `SKILL.md`、`references/`、`scripts/` 之间无互相矛盾规则
- [x] **规则一致性**：
  - Placeholder scope 明确（explore 阶段 OK，handoff 到 `frontend-skill` 后套 production 规则）——SKILL.md 与全域 CLAUDE.md 不冲突
  - `scrollIntoView` 明确标为 Claude.ai Artifacts iframe 限制；本地 HTML 直接用没问题
  - 预设走 static HTML + CSS；React 只在需要互动 / state / Tweaks 逻辑时才上
  - cwd collision 规则：同名资料夹非空 → 问覆盖 / 并用 / 改名（`<project>-v2/`）
  - regression_gates.json 是 source of truth，`testing-plan.md` 的表格只是人读版
- [x] Starter API 与 references 同步：IOSDevice / MacWindow / AndroidDevice / ChromeWindow / DCArtboard / PlaybackBar / TextSprite 等新 exports 已写进 starter-components.md、prototypes.md、animations.md、wireframes.md、decks.md
- [x] 无 release-blocking `[TODO]` placeholder 残留在 user-facing 内容
- [x] follow-through policy 无 hidden side effects
- [x] neighbor-skill overlap 已 review：见 Requirement checks 区
- [x] 无 host wrapper fork（单 source of truth）

## Maintenance

- [x] version bumped：`2026.4.19`（post-refresh）
- [x] changes documented：commit message + Discord reply（在 skill folder 外）
- [x] evals 存于 `assets/evals/evals.json`（已同步 case 2 / 3 的新 API 名称）
- [x] regression gates 定于 `assets/evals/regression_gates.json`：
  - `min_pass_rate_delta: 0.15`
  - `max_time_increase_seconds: 60`
  - `max_token_increase: 5000`
  - `require_non_negative_pass_rate: true`
- [x] SKILL.md 的 `Ops & release` 表注记 JSON 为 source of truth
- [x] ROI review：本 skill 取代「使用者每次都要把 Claude.ai Artifacts 提示复制过来重贴」的痛点，且把 sandbox-only 工具映射成 Claude Code 原生工具——明显正向 ROI
- [x] long workflow 已拆分：8 个 Step；复杂分支放 `references/` 而非 SKILL.md
- [x] model-specific notes 已拆出到 `references/model-notes.md`

## 本轮检查指令证据

```bash
# 1) format check
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/format_check.py \
  /home/ubuntu/.claude/skills/cc-designer
# → 1 error (README.md inside skill folder) — accepted exception

# 2) quick validate
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/quick_validate.py \
  /home/ubuntu/.claude/skills/cc-designer
# → Skill is valid!

# 3) skill references
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/audit_skill_references.py \
  /home/ubuntu/.claude/skills/cc-designer
# → Skill reference audit passed: 0 issues across 15 source file(s)

# 4) unreferenced files
python3 /home/ubuntu/.claude/skills/skill-creator-advanced/scripts/audit_unreferenced_files.py \
  /home/ubuntu/.claude/skills/cc-designer
# → Unreferenced file audit passed: 0 issues
```
