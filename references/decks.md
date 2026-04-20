# Slide deck 子流程

把 deck 看成一部短电影而不是文字列表。目标是**每一张 slide 都有一个明确的 idea**，用最小文字把它放大。

## 一次性规则

- **永远用 `deck_stage.js` 做骨架**（在 `assets/starters/deck_stage.js`）——它帮你处理：
  - 1920×1080 authored canvas + `transform: scale()` 自动缩放至任何 viewport
  - 键盘（←→、space、PgUp/PgDn、Home/End）与点击/tap zone 翻页
  - 按 `R` 重置回 slide 0（有小 keyboard hint）
  - 右下 slide 计数 overlay（hide on print）
  - `localStorage` 持久化目前 slide index（reload 后会回到原页）
  - 列印成 PDF（每张 slide 一页，自动还原到 authored size）
  - `slidechange` CustomEvent + `window.postMessage({slideIndexChanged: N})`（speaker notes 同步自动处理）
  - 触控装置自动启用三段 tap zone（左/中/右）
- 若要 1:1 authored size（例如 PPTX 汇出工具需要），在 `<deck-stage noscale>` 加 `noscale` attribute
- **不要手刻 scaling**
- 每张 slide 就是 `<deck-stage>` 的**直系** `<section>` 子元素（中间不能包 `<div>`）
- 不要在 deck 页面顶端放「title」类 chrome——slide 本体就是 title

## 标准骨架

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Product Pitch</title>
<script src="deck_stage.js"></script>
<style>
  :root {
    --bg: #0b0b0f;
    --fg: #f0f0f5;
    --accent: #8b6cff;
  }
  body { margin: 0; background: #000; color: var(--fg); font-family: "Söhne", system-ui, sans-serif; }
  section { display: grid; place-content: center; padding: 120px; }
  h1 { font-size: 120px; line-height: 0.95; margin: 0; text-wrap: balance; }
  h2 { font-size: 72px; }
  p  { font-size: 36px; line-height: 1.35; max-width: 1400px; text-wrap: pretty; }
</style>
</head>
<body>
  <deck-stage>
    <section data-screen-label="01 Title">
      <h1>Pitch deck — product name</h1>
      <p>One-line value prop</p>
    </section>
    <section data-screen-label="02 Problem">
      <h2>The problem</h2>
      <p>Why this matters right now.</p>
    </section>
    <!-- 6-8 slides -->
  </deck-stage>
</body>
</html>
```

## 系统决策先讲出来

写 code 前讲清楚：
- **主背景色**：最多 1-2 种（例如：白 + 一种深色章节开头）
- **heading 尺寸系统**：H1 120px、H2 72px、body 36px（以 1920×1080 为基准）
- **章节 rhythm**：hero slide / support slide / detail slide / CTA slide 各长什么样？
- **imagery 策略**：哪些 slide full-bleed image？哪些纯文字？哪些 split 50/50？
- **如果是文字重的 deck**：承诺至少引入 1-2 个图像 slide 或用 placeholder

## Slide label 规则

1-indexed，match slide counter：
- `data-screen-label="01 Title"`、`"02 Agenda"`、...
- 使用者讲「slide 5」= label `"05"`（不是阵列 index 4）
- 若没手动加，`deck_stage.js` 会自动补——建议还是手动加，让 source 自述

## 听 slide change 事件

需要同步外部 UI（speaker view、analytics）时：

```js
document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
  console.log('now at slide', e.detail.index)
})
```

或在 parent window 听：

```js
window.addEventListener('message', (e) => {
  if (typeof e.data?.slideIndexChanged === 'number') { /* ... */ }
})
```

## Speaker notes（仅在被要求时才做）

```html
<head>
  ...
  <script type="application/json" id="speaker-notes">
  [
    "Slide 0 notes — greet, set expectations",
    "Slide 1 notes — talk through the problem",
    "Slide 2 notes — ..."
  ]
  </script>
</head>
```

- JSON 阵列的 index 对应 slide index（0-indexed，与 slide label 的 1-index 差 1）
- `deck_stage.js` 会自动 render speaker notes overlay；你只需要放 `<script>` tag
- 内容写完整讲稿、口语、会在台上讲的话——不是条列
- 有 speaker notes 的 slide，主画面上就可以放少字 + 强视觉

## 字型

- 若已有系统：用系统字型（Geist Mono、Söhne、IBM Plex、Space Grotesk 等）
- 若没有：**不要**用 Inter / Roboto / Arial / Fraunces / system-ui 作为主字——这些是 AI slop 常见字
- 候选：JetBrains Mono、Space Grotesk、Manrope、Fraktur display、Crimson Pro、Instrument Serif、Commissioner
- Web fonts：用 `<link>` 载入 Google Fonts 或 fontshare；别把字型档复制进 deck folder

## 背景 / 色

- 全 deck 背景色最多 1-2 种；章节开头可换背景区隔
- accent 色用品牌色；不要用一堆 gradient 背景填白
- 深 deck（dark mode）：用 `#0b0b0f` 类深色而不是纯黑 `#000000`
- 浅 deck：用 `#f8f8f5` 类温暖白而不是纯白

## 汇出 PPTX

若使用者要汇出：
- `deck_stage.js` 已内建 `noscale` 相容——汇出工具会加 attribute，deck 会自动还原到 1920×1080
- 汇出指令请使用者在 Claude.ai Artifacts 环境执行；Claude Code 本地环境不支援 gen_pptx
- 汇出用 `editable` mode 会转成原生 PowerPoint text/shape/image；`screenshots` mode 则是一张图一页
- 若要 editable，避免用过于 CSS-only 的效果（blur、mix-blend-mode、backdrop-filter）——这些不会 export
