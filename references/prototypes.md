# Interactive prototype 子流程

目标：**像真的一样**——看起来像真产品、点起来像真产品、但只有关键 flow 是真的，其他都是精心的 placeholder。

## 何时选 prototype 而不是 deck

- 要展示互动（点击 → 状态改变、多步 flow、表单）
- 要 demo 动画或 hover 行为
- 要 user test flow

## 何时选 canvas 而不是 prototype

- 纯视觉探索（多个色彩 / 版面 / icon 组并列比较）→ 用 `design_canvas.jsx`
- 见 `wireframes.md`

## 先决定：React 还是 static HTML？

- **Default 是 static HTML + CSS**——大多数 landing / marketing mock / 浅互动 prototype 不需要 React
- 何时加 React：多步骤 state、form validation、Tweaks panel 逻辑、跨 screen 转场、动态列表
- 即使决定用 React，仍预设 CDN pinned + Babel inline；不要开 npm / build pipeline

## 骨架（需要 React 时）

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Onboarding Prototype</title>
<!-- Pinned React + Babel -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<style>
  body { margin: 0; display: grid; place-content: center; min-height: 100vh; background: #fafaf5; }
</style>
</head>
<body>
<div id="root"></div>

<!-- 共用 primitives -->
<script type="text/babel" src="components.jsx"></script>
<!-- Starter（装置框） -->
<script type="text/babel" src="ios_frame.jsx"></script>
<!-- 各 screen -->
<script type="text/babel" src="screens.jsx"></script>
<!-- Main App -->
<script type="text/babel" src="app.jsx"></script>

</body>
</html>
```

## 关键跨档 scope 规则

每个 `<script type="text/babel">` 有独立 scope。要共享 component，**档末 `Object.assign(window, {...})`**：

```jsx
// components.jsx
function Button({ children, onClick }) { /* ... */ }
function Chip({ label }) { /* ... */ }

Object.assign(window, { Button, Chip });
```

```jsx
// screens.jsx — Button 与 Chip 已在 window 上
function WelcomeScreen({ onNext }) {
  return (
    <div data-screen-label="01 Welcome">
      <h1>Welcome</h1>
      <Button onClick={onNext}>Get started</Button>
    </div>
  );
}

Object.assign(window, { WelcomeScreen });
```

```jsx
// app.jsx
function App() {
  const [step, setStep] = React.useState(0);
  // ...
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

Starter 档（例如 `ios_frame.jsx`）本身已在档尾做 `Object.assign(window, {...})`，直接用即可——检查档尾就知道它暴露了哪些名字。

## 绝对不要

- 写 `const styles = {...}`——多档同名会撞。改 `const welcomeStyles = {...}` 或 inline style。
- 加 `type="module"` 到 `<script>`——会 break。
- 单档 > 1000 行——拆！
- **在 Claude.ai Artifacts iframe 预览的 prototype** 中用 `scrollIntoView`——host 会被打坏。本地 HTML 直接双击打开用 `scrollIntoView` 没问题。若不确定使用者会在哪里预览，预设用 `element.scrollTo()` / `window.scrollTo()` / ref + `getBoundingClientRect` 自算。

## 装置 / 视窗 frame

为了看起来像真产品，包一层 frame：
- iOS → `ios_frame.jsx`（iOS 26 Liquid Glass）
- Android → `android_frame.jsx`（Material 3）
- 桌机 app → `macos_window.jsx`（macOS Tahoe Liquid Glass）
- 浏览器内 → `browser_window.jsx`（Chrome dark）

```jsx
// 从 assets/starters 复制进来，由 Babel 载入
<IOSDevice dark={false} navTitle="Home" showTabBar>
  <WelcomeScreen onNext={handleNext} />
</IOSDevice>
```

实际可用的 export 请检查 starter 档尾的 `Object.assign(window, {...})`。对照 `starter-components.md`：
- ios_frame.jsx：`IOSDevice`、`IOSStatusBar`、`IOSNavBar`、`IOSGlassPill`、`IOSList`、`IOSListRow`、`IOSKeyboard`
- android_frame.jsx：`AndroidDevice`、`AndroidStatusBar`、`AndroidAppBar`、`AndroidListItem`、`AndroidNavBar`、`AndroidKeyboard`
- macos_window.jsx：`MacWindow`、`MacSidebar`、`MacSidebarItem`、`MacSidebarHeader`、`MacToolbar`、`MacTrafficLights`、`MacGlass`
- browser_window.jsx：`ChromeWindow`、`ChromeTabBar`、`ChromeTab`、`ChromeToolbar`、`ChromeTrafficLights`

不要自己画装置边框——starter 做得精细得多（status bar、动态岛、Liquid Glass 折射、虚拟键盘）。

## 解读 `<mentioned-element>` blocks

当使用者在预览 pane 中点击 / 评论某个 element，harness 会附上 `<mentioned-element>` 描述——有 `react:` 链、`dom:` 链、`id:`（`data-cc-id="cc-N"` 或 `data-dm-ref="N"`）。

- `data-cc-id` / `data-dm-ref` 是 runtime 临时属性，**不在 source**——别在 source 搜
- 用 `react:` 链推回你的 component；若还是不清楚，在浏览器 devtools 或 gstack `/browse` 内 eval 确认
- **不要盲猜后就改**——先探再改

## 为了让使用者能 comment，帮 screen 加 label

每个代表 screen / view 的 element 加 `data-screen-label`：

```jsx
<div data-screen-label="01 Welcome"> ... </div>
<div data-screen-label="02 Permission Ask"> ... </div>
```

1-indexed，match 使用者会讲的话。

## Tweaks 加在 prototype 上

Tweaks 让使用者即时切换变体。典型 prototype 的 tweaks：
- 主色 / accent
- 主 CTA copy
- 动画 curve（ease-out / linear）
- 要不要加 skip / back 按钮
- onboarding 步骤数
- `dark` prop 切换（装置 frame 支援）

细节见 `tweaks.md`。

## Claude integration（可选）

若 prototype 需要真的 AI 回复，可用 `window.claude.complete()`（Claude.ai Artifacts 环境有提供；Claude Code 本地不一定）：

```js
const text = await window.claude.complete("Summarize ...");
// or
const text2 = await window.claude.complete({
  messages: [{ role: "user", content: "..." }]
});
```

- 使用 `claude-haiku-4-5`、1024 token 上限
- 有 rate limit
- Claude Code 本地 CLI 执行时此 API 不存在——如果使用者会在本地跑，改用 mock 回复或 placeholder

## 内容密度

- Mobile hit target 最小 44×44 px
- 别塞太多 section；prototype 要 focus 在关键 flow
- 内文用真实语气、真实长度的 copy；不要 Lorem ipsum
