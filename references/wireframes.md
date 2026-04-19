# Wireframe + design canvas 子流程

兩種「多選項探索」的形式：
- **Wireframe**：低擬真、著重結構與 flow——黑白、placeholder 圖、真實 copy
- **Design canvas**：把多個靜態版本並列在一頁上，讓 user 一次比較

## Wireframe

何時用：使用者還沒決定版面、flow 或資訊結構；還不想談顏色與字型。

規則：
- **不用色**——灰階 + 單一 accent（例如藍）
- **不用花俏字型**——系統字或 monospace
- **不放真圖片**——`div` + 標籤 `[Hero image — H2 product photo]`
- **放真實 copy**——草稿寫 30% 的最終 copy；不寫 Lorem
- **標注 annotations**——每個 section 旁邊有一行小字解釋意圖（目的、互動、資料來源）

```html
<section class="wf">
  <header>[Logo] [Nav: Home / Pricing / Docs] [Sign in]</header>
  <aside class="note">頂 nav 靠左 logo、靠右 CTA</aside>
  <main>
    <h1>One-line value prop</h1>
    <p>Supporting line — who it's for, what they get</p>
    <button>Primary CTA</button>
    <a>Secondary</a>
    <aside class="note">hero 用 90vh、CTA 放第一螢</aside>
  </main>
</section>
```

3-5 個方向的 wireframe 通常長這樣：
1. Conservative（照既有 pattern）
2. Content-first（放大 copy、降 UI chrome）
3. Visual-first（大圖 / 大 hero）
4. Dense（一頁解決）
5. Bold / 不尋常（unusual layout、metaphor、反模式）

## Design canvas（並列靜態選項）

何時用：探索顏色、字型、版面、icon 風格、logo variant——並列一頁好比較。

用 `assets/starters/design_canvas.jsx`：它提供 grid 佈局與 labeled cell。

```jsx
<DesignCanvas>
  <Cell label="A — warm, serif heading">
    <Hero variant="A" />
  </Cell>
  <Cell label="B — cold, mono heading">
    <Hero variant="B" />
  </Cell>
  <Cell label="C — brutalist">
    <Hero variant="C" />
  </Cell>
</DesignCanvas>
```

- 每個 cell 固定比例（例如 16:9 或 3:2）
- cell 下有 label 解釋差異
- 至少 3 格——用 Tweaks 的話就變 1 格切換，canvas 的 value 在「同時並列看」

## 混合：canvas of prototypes

有時使用者要同時比較「多個 onboarding flow 的第一 screen」。
- 用 DesignCanvas + 每格放一個 iOSFrame（或 iframe）
- 保持輕量——每格別跑完整 prototype，只 render 關鍵 screen

## 變體命名

不要用「Variant 1 / 2 / 3」——太抽象。用意圖命名：
- 「Warm serif, strong hero」
- 「Mono, minimal chrome」
- 「Split layout, product photo dominant」

## 交付
交一份 HTML，讓使用者選方向；使用者挑定方向後，**再**進 prototype 或 deck 流程——不要一次把 wireframe 與 hi-fi 都交。
