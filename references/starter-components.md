# Starter components 索引

`assets/starters/` 下的 scaffold 元件。**只複製用得到的**——不要整包倒進使用者資料夾。

| Kind | File | Type | 用途 |
|---|---|---|---|
| Slide deck shell | `assets/starters/deck_stage.js` | vanilla web component | 任何 slide 簡報 |
| Timeline animation | `assets/starters/animations.jsx` | React JSX | motion / video-style 動畫 |
| Design canvas | `assets/starters/design_canvas.jsx` | React JSX | 並列 2+ 靜態選項 |
| iOS frame | `assets/starters/ios_frame.jsx` | React JSX | iPhone 擬真外框 |
| Android frame | `assets/starters/android_frame.jsx` | React JSX | Android 擬真外框 |
| macOS window | `assets/starters/macos_window.jsx` | React JSX | 桌機 app 視窗 chrome |
| Browser window | `assets/starters/browser_window.jsx` | React JSX | 瀏覽器 chrome + tab |

## 複製方法（Claude Code）

```bash
# 假設使用者工作目錄為 /home/user/design/onboarding-proto/
cp /home/ubuntu/.claude/skills/cc-designer/assets/starters/ios_frame.jsx \
   /home/user/design/onboarding-proto/ios_frame.jsx

cp /home/ubuntu/.claude/skills/cc-designer/assets/starters/deck_stage.js \
   /home/user/design/onboarding-proto/deck_stage.js
```

或用 Write 把 starter 內容寫進目標位置（不一定要 cp）。

## 載入

- `.js` → `<script src="deck_stage.js"></script>`（一般 script）
- `.jsx` → `<script type="text/babel" src="ios_frame.jsx"></script>`（Babel 轉譯）

副檔名決定載入方式——**別**用 `.js` 載入 `.jsx` 或反之。

## deck_stage.js — web component

- `<deck-stage>` 做父；每張 slide 是其直系 `<section>`
- 它會處理：scaling、nav、localStorage、printing、data-screen-label 自動加、postMessage 同步
- 不要自己包一個 `<div style="transform: scale(...)">`——會打架
- 看 `decks.md` 有完整範例

## animations.jsx — Stage / Sprite

- `<Stage width height duration>` 是動畫容器
- `<Sprite start end enter exit>` 是個別時間段元素
- Hooks：`useTime()`、`useSprite()`、`interpolate()`、`Easing`
- 看 `animations.md` 有完整範例

## design_canvas.jsx — 多選項並陳

- `<DesignCanvas>` grid container
- `<Cell label="...">` 單格
- 每格有固定比例 + label
- 看 `wireframes.md` 有完整範例

## 裝置 / 視窗 frame

- `<IOSFrame>`、`<AndroidFrame>`、`<MacOSWindow>`、`<BrowserWindow>` 都吃 children
- 各自提供 status bar、動態島、鍵盤、traffic light、tab bar 等 chrome
- 內容區可用 flex / grid 排版
- 不要自己畫 bezels

## 本 skill 的 starter 取自哪

來自 Claude.ai Artifacts designer 環境的 starter component set，已精簡為 Claude Code filesystem 可直接複製使用的版本。若原版有更新，本 starter 也可能需要同步。

## 新增 starter

若你在 prototype 過程頻繁重建某個 scaffold（例如 `marketing_hero.jsx`、`keyboard_ios.jsx`），可提 PR 或通知 maintainer 加進 `assets/starters/`——這 skill 需要依任務刷新 starter library。
