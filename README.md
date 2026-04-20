# cc-designer

在 Claude Code / OpenClaw / 其他具备档案系统的 coding agent 环境中，用 HTML 直接产出设计成品的 skill。

适合的产物：
- slide deck / 简报
- interactive prototype
- animation / motion demo
- wireframe
- landing page mock
- design canvas

## 特色

- 输出可直接在浏览器开启的 HTML 档
- 内建 deck、device frame、animation、design canvas starters
- 强调早期半成品、变体探索、可验证交付
- 预设语言与说明为 zh-CN

## Repo 结构

```text
cc-designer/
├─ SKILL.md
├─ README.md
├─ LICENSE
├─ assets/
│  ├─ evals/
│  └─ starters/
└─ references/
```

## 主要内容

- `SKILL.md`: skill 主规格、触发条件、workflow、tool rules
- `assets/starters/`: 可复用的设计起手式元件
- `assets/evals/`: eval 与 regression gate
- `references/`: deck、prototype、animation、wireframe、verification 等补充规范

## 何时用

当使用者要你：
- 「帮我做一份 deck / 简报」
- 「prototype 一个 flow」
- 「做几个 wireframe / 视觉方向」
- 「做一个互动 demo / animation」
- 「把内容整理成可展示的 HTML 设计稿」

不适合：
- 正式 production app 开发
- backend / API / database
- Figma / Sketch 原生档
- 单纯 CSS utility 或 framework config 任务

## 安装

把资料夹放到 Claude skills 目录，例如：

```bash
mkdir -p ~/.claude/skills
cp -R cc-designer ~/.claude/skills/cc-designer
```

或直接 clone：

```bash
git clone https://github.com/Openclaw-Metis/cc-designer.git ~/.claude/skills/cc-designer
```

## 使用方式

把它当成一个「设计产物生成 skill」来呼叫。输入最好包含其中一种：
- PRD / deck 大纲
- screenshot / reference site
- 现有 UI kit / codebase
- logo、色票、字型等品牌素材

输出目标应该是：
- 至少 1 份可直接打开的 HTML
- 有清楚命名
- console 无错误
- 视需要附变体或 tweaks

## License

MIT
