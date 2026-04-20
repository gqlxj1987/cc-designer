# Animation / motion 子流程

Motion 是设计的一部分——不是装饰。做动画时你是 animator，不是 web designer。

## 选动画工具

优先顺序：
1. `assets/starters/animations.jsx` — Stage + Sprite + `PlaybackBar` + Easing + `useTime()` / `useSprite()` + `interpolate()` / `animate()`
2. CSS transitions / React state（简单 hover、state 变化）
3. Popmotion / Framer Motion 等外部 lib — **只在** starter 真的覆盖不到时才退回

## Stage + Sprite 模型（starter 提供）

```jsx
<Stage width={1920} height={1080} duration={6} autoPlay loop>
  <Sprite start={0} end={2}>
    <FadeInTitle />
  </Sprite>

  <Sprite start={1.5} end={4} keepMounted>
    <Subtitle />
  </Sprite>

  <Sprite start={3} end={6}>
    <ProductMock />
  </Sprite>
</Stage>
```

- `<Stage width height duration autoPlay loop showControls>` — 自动 scale、内建 `PlaybackBar`；可用 `showControls={false}` 收起来
- `<Sprite start end keepMounted>` — 显示在 `[start, end)` 秒；`keepMounted` 会保留但 opacity=0（避免 enter 动画重跑）
- `<TextSprite>` / `<ImageSprite>` / `<RectSprite>` — 三个便利元件，内建 enter / exit + 位移；props 见档案开头
- Hooks：
  - `useTime()` → 取 Stage 内全域 `time`、`duration`、`playing`
  - `useSprite()` → 本 sprite 的 `localTime`、`progress`（0–1）、`duration`
- `interpolate([inputs], [outputs], easing?)` → **curry**，回传 `(t) => value`；不是旧版 `interpolate(t, inputs, outputs)`
- `animate([{ at, value, easing }, ...])` → 多 keyframe interpolator
- `Easing`：`linear`、`easeInQuad/OutQuad/InOutQuad`、`easeInCubic/OutCubic/InOutCubic`、`easeInOutQuart/Quint/Sine/Expo`；**没有** `Easing.spring`

## 自订 sprite — 靠 hook + interpolate

```jsx
function FadeInTitle() {
  const { progress } = useSprite()
  const opacity = interpolate([0, 1], [0, 1], Easing.easeOutCubic)(progress)
  const y = interpolate([0, 1], [24, 0], Easing.easeOutCubic)(progress)
  return <h1 style={{ opacity, transform: `translateY(${y}px)` }}>Hello</h1>
}
```

`<Sprite>` 没有 `enter` / `exit` props——用 `useSprite().progress` 自己组。

## 典型 beats

6 秒动画的节奏分配：
- 0-1.5s：hero title 出现（fade + slight slide）
- 1-2.5s：subtitle 跟上
- 2-4s：main visual（product mock、flow diagram）
- 4-5.5s：支持论据 / features
- 5.5-6s：CTA / logo / 收尾

## 常见反模式

- 每个 element 都动 → 看起来很乱；只动 1-3 个重点
- 每秒切一次画面 → 眼睛来不及；一个 moment 至少 0.8-1.5 秒
- 开场直接大爆炸 → 用 ease-out 缓入，不用 ease-in

## 互动 prototype 里的小动画

不是完整 motion video，而是按钮 hover、页面转场、loading state：
- CSS transition 就够：`transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1)`
- 转场可用 `<CSSTransition>` 或手刻 state-based className
- `scrollIntoView` 在 Claude.ai Artifacts iframe 会干扰 host；本地 HTML 直接用没问题——若不确定预览环境，预设用 `element.scrollTo()` 或 `window.scrollTo()`

## 互动 vs 影片

- **影片风格**（video-style HTML）：有 PlaybackBar、可 play/pause、时间轴清楚 → Stage + Sprite
- **互动风格**：使用者触发才动 → React state + CSS transition
- 混合：用 Stage 做主动画，但有 Tweaks 可 pause / 拖曳到特定时刻看该 frame

## 汇出

- 影片？用浏览器 screen recording 录 Stage 播放
- GIF？同上后 convert（ffmpeg）
- 不做进阶 MP4 汇出——这份 skill 不负责影片 encode
