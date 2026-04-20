# Distribution notes

## Packaging

cc-designer 自身没有 scripts/；打包请从 skill-creator-advanced 呼叫（`~/.claude/skills/skill-creator-advanced/scripts/package_skill.py`）：

```bash
python3 ~/.claude/skills/skill-creator-advanced/scripts/package_skill.py \
  /home/ubuntu/.claude/skills/cc-designer \
  <out-dir>
```

## Single source of truth

- 本 skill folder 是唯一真实来源
- 各 host（Claude Code / Codex CLI / OpenClaw）若要 wrapper，仅做薄层转接
- 不要把 SKILL.md 或 references 复制进 host wrapper——会造成漂移

## 外部发布

- README / release notes / 安装说明放在 repo root（skill folder 外）
- 目前 repo: `Openclaw-Metis/cc-designer`
- 本 skill folder 的 `README.md` 是单一 skill repo 的 GitHub 首页；若未来并入多 skill monorepo，这份 README 要搬到 repo root

## Eval workflow

- Approved prompts：`assets/evals/evals.json`
- Release thresholds：`assets/evals/regression_gates.json`
- Runner：`~/.claude/skills/skill-creator-advanced/scripts/run_eval.py` + `aggregate_benchmark.py` + `check_regression_gates.py`（cc-designer 自身不带 scripts/）
