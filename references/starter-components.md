# Starter components 索引

`assets/starters/` 下的 scaffold 元件。**只复制用得到的**——不要整包倒进使用者资料夹。

| Kind | File | Type | 用途 |
|---|---|---|---|
| Slide deck shell | `assets/starters/deck_stage.js` | vanilla web component | 任何 slide 简报 |
| Timeline animation | `assets/starters/animations.jsx` | React JSX | motion / video-style 动画 |
| Design canvas | `assets/starters/design_canvas.jsx` | React JSX | 并列 2+ 静态选项 / 草图 pin board |
| iOS frame | `assets/starters/ios_frame.jsx` | React JSX | iPhone（iOS 26 Liquid Glass） |
| Android frame | `assets/starters/android_frame.jsx` | React JSX | Android（Material 3） |
| macOS window | `assets/starters/macos_window.jsx` | React JSX | macOS Tahoe Liquid Glass 视窗 |
| Browser window | `assets/starters/browser_window.jsx` | React JSX | Chrome 风格 dark tab bar + toolbar |

## 复制方法（Claude Code）

```bash
# 假设使用者工作目录为 /home/user/design/onboarding-proto/
cp /home/ubuntu/.claude/skills/cc-designer/assets/starters/ios_frame.jsx \
   /home/user/design/onboarding-proto/ios_frame.jsx

cp /home/ubuntu/.claude/skills/cc-designer/assets/starters/deck_stage.js \
   /home/user/design/onboarding-proto/deck_stage.js
```

或用 Write 把 starter 内容写进目标位置（不一定要 cp）。

## 载入

- `.js` → `<script src="deck_stage.js"></script>`（一般 script）
- `.jsx` → `<script type="text/babel" src="ios_frame.jsx"></script>`（Babel 转译）

副档名决定载入方式——**别**用 `.js` 载入 `.jsx` 或反之。

## deck_stage.js — `<deck-stage>` web component

- `<deck-stage>` 做父；每张 slide 是其**直系** `<section>`（中间不能包 `<div>`）
- 自动处理：1920×1080 scaling、键盘/点击/tap 翻页、按 `R` 重置、localStorage 持久化、列印时还原到 authored size、`slidechange` 事件 → `window.postMessage`
- 不想 auto-scale 时加 `noscale` attribute（例如 landing page）
- 不要自己包 `<div style="transform: scale(...)">`——会打架
- 完整范例见 `decks.md`

## animations.jsx — Stage + Sprite + Playback

导出的 component / function：

- `<Stage width height duration autoPlay loop showControls>` — 动画容器（内建时间轴 + control bar）
- `<Sprite start end keepMounted>` — 生命周期片段，`keepMounted` 让 sprite 在区段外保留但 opacity=0
- `<TextSprite>`、`<ImageSprite>`、`<RectSprite>` — 内建三种常用 sprite
- `<PlaybackBar>` — 自订控制列（通常不用自己放，Stage 会自己管）
- `useTime()` — 取得 Stage 内 global `time`
- `useSprite()` — 在 sprite 内取得 `localTime`、`progress`、`duration`
- `interpolate(input, output, easing?)` — curry 版本，回传 `(t) => value`
- `animate(keyframes)` — 依多 keyframe 生 interpolator
- `Easing` — `linear`、`easeIn/Out/InOutQuad/Cubic/Quart/Quint`、`easeInOutSine`、`easeInOutExpo` 等
- **没有** `Easing.spring`、**没有** `Sprite` 的 `enter` / `exit` props——用 `useSprite().progress` + `interpolate()` 自己组

完整范例见 `animations.md`。

## design_canvas.jsx — Figma 风 pan/zoom 画布

- `<DesignCanvas minScale maxScale>` — 外层画布，trackpad 双指拖 = pan、pinch = zoom；wheel = zoom；按下拖 = pan
- `<DCSection title subtitle gap>` — 加标题的区块群组
- `<DCArtboard label width height>` — 单张 artboard（含顶部 label），**取代旧版 `<Cell>`**
- `<DCPostIt top left right bottom rotate width>` — 便利贴式注解，绝对定位
- 父容器要 `position: relative; overflow: hidden`
- 完整范例见 `wireframes.md`

## iOS frame（iOS 26 Liquid Glass）

从 `ios_frame.jsx` 汇出：

- `<IOSDevice dark statusBarTime navTitle showKeyboard showTabBar>` — 整机外框（含 Dynamic Island、status bar、navbar、home indicator）
- `<IOSStatusBar dark time>`、`<IOSNavBar title dark trailingIcon>`、`<IOSGlassPill>`、`<IOSList header>`、`<IOSListRow title detail icon chevron isLast dark>`、`<IOSKeyboard dark>` — 可单独使用

## Android frame（Material 3）

从 `android_frame.jsx` 汇出：

- `<AndroidDevice dark>` — 整机外框
- `<AndroidStatusBar>`、`<AndroidAppBar title large>`、`<AndroidListItem headline supporting leading>`、`<AndroidNavBar>`、`<AndroidKeyboard>`

## macOS window（Tahoe Liquid Glass）

从 `macos_window.jsx` 汇出：

- `<MacWindow dark sidebar toolbar>` — 含 sidebar 的整窗
- `<MacSidebar>`、`<MacSidebarHeader title>`、`<MacSidebarItem label selected>`、`<MacToolbar title>`、`<MacTrafficLights>`、`<MacGlass radius dark>`

## Browser window（Chrome 风）

从 `browser_window.jsx` 汇出：

- `<ChromeWindow tabs activeIndex url>` — 整窗（含 tab bar + toolbar）
- `<ChromeTabBar>`、`<ChromeTab title active>`、`<ChromeToolbar url>`、`<ChromeTrafficLights>`

## 本 skill 的 starter 取自哪

来自 Claude.ai Artifacts designer 环境的 starter component set，已精简为 Claude Code filesystem 可直接复制使用的版本。若原版有更新，本 starter 也可能需要同步。

## 新增 starter

若你在 prototype 过程频繁重建某个 scaffold（例如 `marketing_hero.jsx`、`keyboard_ios.jsx`），可提 PR 或通知 maintainer 加进 `assets/starters/`——这 skill 需要依任务刷新 starter library。
