# Troubleshooting

按症状查。未收录的问题请回写本档。

## 打开 HTML 空白 / console 一片红

- Cause：React / Babel script tag 没用 pinned + integrity，或误加 `type="module"`
- Fix：改回 SKILL.md Critical rule 1 的精确 snippet（React 18.3.1 + Babel 7.29.0 + integrity hash）

## 切 Tweaks 没反应

- Cause：`__edit_mode_available` 在 listener 注册前就送出
- Fix：见 `tweaks.md`——必须**先**注册 listener，**再** `postMessage`

## Deck 翻到第 5 页但 speaker notes 还停在第 1 页

- Cause：没 call `window.postMessage({slideIndexChanged: N})`
- Fix：用 `deck_stage.js`（web component `<deck-stage>`），它会自动处理——你不用自己发 message

## Deck 翻页没反应 / 没显示 overlay

- Cause：`<deck-stage>` 下的 `<section>` 不是直系子元素（被 `<div>` 包住）
- Fix：slides 必须是 `<deck-stage>` 的直系 children；移除中间 wrapper

## 列印 PDF 每张 slide 破图

- Cause：自订样式覆盖了 `deck_stage.js` 的 `@media print` rules
- Fix：让你的 section 样式不设 `transform`、不绑 viewport-relative 单位；列印时 stage 会自动还原至 1920×1080 authored size

## 同专案两个 component 都叫 `styles`，其中一个失效

- Cause：Critical rule 2 违反——多个 `<script type="text/babel">` 共用 global scope，同名变数互盖
- Fix：改 `const <componentName>Styles = { ... }`

## PPTX 汇出后 blur / mix-blend-mode 消失

- Cause：`editable` mode 把 DOM 转成原生 PowerPoint shapes，过度 CSS-only 效果不会 export
- Fix：需要汇出时避开 blur、mix-blend-mode、backdrop-filter；或改用 `screenshots` mode（一张图一页）

## 新 iOS / macOS 元件 backdrop-filter 在 Firefox 没效果

- Cause：Firefox 对 `backdrop-filter` 支援较晚；Liquid Glass 依赖此
- Fix：交付时提醒使用者用 Chromium-based 浏览器预览；或在 Tweaks 加 `disable-glass` 切换到纯色 fallback

## DesignCanvas 拖不动 / 缩放失效

- Cause：外层容器 `overflow: hidden` 不够、或 wheel 事件被父层拦
- Fix：确认 `DesignCanvas` 的父容器 `overflow: hidden` 且 `position: relative`；wheel listener 是 `passive: false` 才能 `preventDefault`
