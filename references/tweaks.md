# Tweaks 协定

Tweaks = 使用者可在 preview 内切换的变体控制。使用者按 toolbar 的 Tweaks toggle 时，你的页面显示 tweak panel，让他改颜色、copy、布局等。

## 核心协定

**顺序很重要**：先注册 listener，**再**宣告 available。反了的话，host 的 activate 讯息可能在 handler 存在前就送达，toggle 变无效。

```js
// 1. 先注册 listener
window.addEventListener('message', (e) => {
  if (e.data?.type === '__activate_edit_mode')   showTweaksPanel();
  if (e.data?.type === '__deactivate_edit_mode') hideTweaksPanel();
});

// 2. 再宣告 available
window.parent.postMessage({ type: '__edit_mode_available' }, '*');
```

## 更改值时要通知 host 持久化

使用者在 panel 改值时，**同时**：
1. 在页面即时套用（改 CSS variable、改 state）
2. 通知 parent window 存到 disk：

```js
function applyTweak(key, value) {
  // 即时套用
  if (key === 'primaryColor') document.documentElement.style.setProperty('--accent', value);
  if (key === 'fontSize') document.documentElement.style.setProperty('--base-size', value + 'px');
  if (key === 'dark') document.body.classList.toggle('dark', value);

  // 持久化
  window.parent.postMessage(
    { type: '__edit_mode_set_keys', edits: { [key]: value } },
    '*'
  );
}
```

## 预设值用 EDITMODE marker 包裹

host 要在档案上重写你的 defaults，需要明确的 JSON 区块：

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#8b6cff",
  "fontSize": 16,
  "dark": false,
  "ctaCopy": "Get started",
  "layout": "split"
}/*EDITMODE-END*/;
```

规则：
- 必须是**合法 JSON**：双引号 key 与 string，不能用 JS object literal 的 single quote 或 trailing comma
- 整份档案只能有 **1 个** 这种 block
- 必须在 inline `<script>` 内（不在独立 `.js` 档）
- 如果有预设值超过这个 block，或要 runtime 计算，可以用另一个 `const DERIVED = {...}` 但不要给 EDITMODE marker

## Panel 设计

- 标题**必须**叫 `Tweaks`（和 toolbar toggle 一致）
- 浮动在右下角，或作为 inline handles
- Tweaks off 时**完全隐藏** controls——final 设计长什么样就长什么样
- UI 小而精——不要把 panel 变成巨型 dashboard
- 常见 tweakable items：
  - 主色、accent
  - 字型（如果有 2-3 组 style 可切）
  - Dark mode toggle
  - 主 CTA copy
  - Layout variants（如 split / stacked）
  - Feature flags（显示 / 隐藏某 section）
  - Density（compact / comfortable / spacious）
  - Animation curves

## Tweaks 预设也要附

即使使用者**没要求**变体，你也应该加 2-3 个「有趣的 tweaks」让他看到更多可能性——例如主色、字型、dark mode。

## 多 variant cycling

若使用者要求「同一个 section 的 5 种 variant 轮播」：
- 用 Tweaks 的 `variantIndex: 0`，改值时渲染对应 variant
- 不要开 5 个档案

## Panel sample code

```jsx
function TweaksPanel({ tweaks, setTweaks }) {
  return (
    <div style={tweaksPanelStyles.root}>
      <h3 style={tweaksPanelStyles.title}>Tweaks</h3>
      <label>
        Primary color
        <input type="color" value={tweaks.primaryColor}
               onChange={(e) => setTweaks({ ...tweaks, primaryColor: e.target.value })} />
      </label>
      <label>
        <input type="checkbox" checked={tweaks.dark}
               onChange={(e) => setTweaks({ ...tweaks, dark: e.target.checked })} />
        Dark mode
      </label>
      <label>
        Layout
        <select value={tweaks.layout} onChange={(e) => setTweaks({ ...tweaks, layout: e.target.value })}>
          <option value="split">Split</option>
          <option value="stacked">Stacked</option>
          <option value="centered">Centered</option>
        </select>
      </label>
    </div>
  );
}

const tweaksPanelStyles = {
  root: { position: 'fixed', bottom: 20, right: 20, padding: 16, background: 'rgba(0,0,0,0.85)', color: 'white', borderRadius: 8, fontSize: 12, display: 'grid', gap: 8 },
  title: { margin: 0, fontWeight: 600 },
};
```

注意 `tweaksPanelStyles`（不是 `styles`）——Critical rule。

## 在 Claude Code 本地环境

使用者在 Claude Code CLI 跑本地 HTML 时，parent window 不是 Claude.ai harness——`window.parent` 可能是自己（`window === window.parent`）。这种情况：
- `postMessage` 仍可呼叫但**不会**被 host 接住，档案不会被 runtime 改写
- Tweaks 仍能**即时改变视觉**——只是 reload 后会回到 defaults
- 若使用者希望 reload 后保留：在 `applyTweak` 里同时写 `localStorage.setItem('tweaks', JSON.stringify(...))`，load 时 restore

Sample：

```js
const saved = JSON.parse(localStorage.getItem('tweaks') || '{}');
const currentTweaks = { ...TWEAK_DEFAULTS, ...saved };

function applyAndPersist(key, value) {
  const next = { ...currentTweaks, [key]: value };
  Object.assign(currentTweaks, next);
  // 即时套用
  applyTweak(key, value);
  // 本地持久化（Claude Code）
  localStorage.setItem('tweaks', JSON.stringify(currentTweaks));
  // Artifact host 持久化（若有 parent）
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  }
}
```
