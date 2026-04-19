# Animation / motion 子流程

Motion 是設計的一部分——不是裝飾。做動畫時你是 animator，不是 web designer。

## 選動畫工具

優先順序：
1. `assets/starters/animations.jsx` — Stage + Sprite + scrubber + Easing + `useTime()` / `useSprite()` hooks + entry/exit primitives
2. CSS transitions / React state（簡單 hover、state 變化）
3. Popmotion 或其他外部 lib — **只在** starter 真的覆蓋不到時才退回

## Stage / Sprite 模型（starter 提供）

```jsx
<Stage width={1920} height={1080} duration={6}>
  <Sprite start={0} end={2}>
    <HeroTitle />   {/* 0-2s 淡入 + 停 */}
  </Sprite>
  <Sprite start={1.5} end={4} enter="slide-up" exit="fade">
    <Subtitle />
  </Sprite>
  <Sprite start={3} end={6} enter="scale-in">
    <ProductMock />
  </Sprite>
</Stage>
```

- Stage：自動 scale、提供 scrubber、play/pause 按鈕
- Sprite：`start` / `end` 秒數內顯示；可給 `enter` / `exit` primitive（`fade` / `slide-up` / `slide-down` / `scale-in` 等）
- Hooks：`useTime()` 回傳目前秒數；`useSprite()` 回傳本 sprite 的 progress (0-1)
- `interpolate(t, [inputs], [outputs])`：把時間段 map 成值（例如 opacity）
- `Easing.easeOutCubic(t)`、`Easing.spring(t)` 等 curve helper

## 典型 beats

6 秒動畫的節奏分配：
- 0-1.5s：hero title 出現（fade + slight slide）
- 1-2.5s：subtitle 跟上
- 2-4s：main visual（product mock、flow diagram）
- 4-5.5s：支持論據 / features
- 5.5-6s：CTA / logo / 收尾

## 常見反模式

- 每個 element 都動 → 看起來很亂；只動 1-3 個重點
- 每秒切一次畫面 → 眼睛來不及；一個 moment 至少 0.8-1.5 秒
- 開場直接大爆炸 → 用 ease-out 緩入，不用 ease-in

## 互動 prototype 裡的小動畫

不是完整 motion video，而是按鈕 hover、頁面轉場、loading state：
- CSS transition 就夠：`transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1)`
- 轉場可用 `<CSSTransition>` 或手刻 state-based className
- 不要用 `scrollIntoView`（會打壞）

## 互動 vs 影片

- **影片風格**（video-style HTML）：有 scrubber、可 play/pause、時間軸清楚 → Stage + Sprite
- **互動風格**：使用者觸發才動 → React state + CSS transition
- 混合：用 Stage 做主動畫，但有 Tweaks 可 pause / 拖曳到特定時刻看該 frame

## 匯出

- 影片？用瀏覽器 screen recording 錄 Stage 播放
- GIF？同上後 convert（ffmpeg）
- 不做進階 MP4 匯出——這份 skill 不負責影片 encode
