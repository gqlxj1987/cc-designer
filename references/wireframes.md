# Wireframe + design canvas 子流程

两种「多选项探索」的形式：
- **Wireframe**：低拟真、著重结构与 flow——黑白、placeholder 图、真实 copy
- **Design canvas**：把多个静态版本并列在 pan/zoom 画布上，让 user 一次比较

## Wireframe

何时用：使用者还没决定版面、flow 或资讯结构；还不想谈颜色与字型。

规则：
- **不用色**——灰阶 + 单一 accent（例如蓝）
- **不用花俏字型**——系统字或 monospace
- **不放真图片**——`div` + 标签 `[Hero image — H2 product photo]`
- **放真实 copy**——草稿写 30% 的最终 copy；不写 Lorem
- **标注 annotations**——每个 section 旁边有一行小字解释意图（目的、互动、资料来源）

```html
<section class="wf">
  <header>[Logo] [Nav: Home / Pricing / Docs] [Sign in]</header>
  <aside class="note">顶 nav 靠左 logo、靠右 CTA</aside>
  <main>
    <h1>One-line value prop</h1>
    <p>Supporting line — who it's for, what they get</p>
    <button>Primary CTA</button>
    <a>Secondary</a>
    <aside class="note">hero 用 90vh、CTA 放第一萤</aside>
  </main>
</section>
```

3-5 个方向的 wireframe 通常长这样：
1. Conservative（照既有 pattern）
2. Content-first（放大 copy、降 UI chrome）
3. Visual-first（大图 / 大 hero）
4. Dense（一页解决）
5. Bold / 不寻常（unusual layout、metaphor、反模式）

## Design canvas（并列静态选项）

何时用：探索颜色、字型、版面、icon 风格、logo variant、wireframe direction——并列一页好比较，Figma 风 pan/zoom。

用 `assets/starters/design_canvas.jsx`——提供可 pan / 可 zoom 的画布 + artboards + post-it 注解。

### 互动 vs. 静态

- 外层 `<DesignCanvas>` 拖曳与缩放都内建：
  - 滑鼠按住拖 → pan
  - `wheel` + `ctrl/cmd` 或 trackpad pinch → zoom
  - `wheel` 单纯 → pan
- 父容器要 `position: relative; overflow: hidden`；本 starter 预设给你
- `minScale` / `maxScale` 可调（预设 0.1 ~ 8）

### Component 形状

```jsx
<DesignCanvas minScale={0.2} maxScale={4}>
  <DCSection title="Hero direction" subtitle="3 个 copy / typography 组合" gap={48}>
    <DCArtboard label="A — warm serif" width={1440} height={900}>
      <HeroA />
    </DCArtboard>
    <DCArtboard label="B — cold mono" width={1440} height={900}>
      <HeroB />
    </DCArtboard>
    <DCArtboard label="C — brutalist" width={1440} height={900}>
      <HeroC />
    </DCArtboard>
  </DCSection>

  <DCPostIt top={200} left={1500} rotate={-3}>
    客户反馈：想要 B 的 typographic confidence + A 的 warmth
  </DCPostIt>
</DesignCanvas>
```

- `<DCSection>` 给一组 artboard 上标题 + 副标题；多 section 可直接 stack
- `<DCArtboard label width height>` 是单张板；label 会在顶端渲染
- `<DCPostIt top left right bottom rotate width>` 是绝对定位的便利贴，用来放注解

### 没有 `<Cell>`

旧版 `<Cell>` 已被 `<DCArtboard>` 取代。若看到旧 example 写 `<Cell label="...">`，换成 `<DCArtboard label="..." width={...} height={...}>` 即可。

### 量

- 至少 3 张 artboard——canvas 的 value 在「同时并列看」
- 单 canvas 上不超过 ~12 张 artboard，否则 zoom 拉远看不到细节

## 混合：canvas of prototypes

有时使用者要同时比较「多个 onboarding flow 的第一 screen」：
- 用 `DesignCanvas` + 每格放一个 `<IOSDevice>`（或 `<AndroidDevice>`）
- 保持轻量——每格别跑完整 prototype，只 render 关键 screen

## 变体命名

不要用「Variant 1 / 2 / 3」——太抽象。用意图命名：
- 「Warm serif, strong hero」
- 「Mono, minimal chrome」
- 「Split layout, product photo dominant」

## 交付

交一份 HTML，让使用者选方向；使用者挑定方向后，**再**进 prototype 或 deck 流程——不要一次把 wireframe 与 hi-fi 都交。
