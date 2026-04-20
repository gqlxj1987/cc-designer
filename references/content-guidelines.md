# Content、视觉、排版准则

## 一则：少即是多

- **不塞填充内容**——永远不要为了填空间加 dummy section、placeholder 叙事、资讯性文字。每个元素都要赚到存在。
- 若一个区块感觉空，那是设计问题——用**排版与组合**解决，不是加内容。
- **加内容前先问**：若你觉得某 section / page / copy 会让设计更好，先问使用者；他比你更懂受众与目标。
- One thousand no's for every yes. 拒绝杂讯。

## AI slop 需要避开

- **狂用 gradient 背景**——整页 purple-to-blue gradient 是 slop。gradient 只在局部（logo 光晕、CTA hover）用。
- **无脉络的 emoji**——除非品牌 / 设计系统本身用 emoji，否则不放；先用 placeholder（纯色块 + 文字标示）。
- **圆角容器 + 左边色条 accent**——Notion-like card pattern 被滥用到变 slop。
- **用 SVG 自己画插图**——Claude 画的 custom SVG illustration 99% 是 slop。用 placeholder 或 asset。
- **过度使用的字型**——Inter、Roboto、Arial、Fraunces、system-ui 是 AI slop 警讯。用有个性的替代：Space Grotesk、Manrope、Geist、Instrument Serif、Commissioner、JetBrains Mono、IBM Plex。
- **Data slop**——乱塞数字、icon、stats 充气场：`87% 使用者很满意` `10x 速度` 没意义且没出处，删掉。
- 无理由的 grid 线、无理由的小 hover state、无理由的动画——每个视觉元素要有 intent。

## 文字尺寸

- **1920×1080 slide**：最小 24px，多数更大（heading 72-160px）
- **列印**：最小 12pt（16-20pt 比较舒服）
- **Mobile UI**：hit target 最小 44×44px
- **body text on landing**：16-18px、line-height 1.4-1.6、`text-wrap: pretty`
- **line length**：40-75 字元为宜；宽容器用 `max-width: 40ch` 或 `60ch`

## 色彩

- 优先用品牌色；没品牌就用**既有设计系统**的色票
- 真的受限需要延伸：用 `oklch()` 在相近色相延伸——不凭空创造全新颜色
  ```css
  --brand-600: oklch(0.55 0.15 270);   /* 品牌主紫 */
  --brand-400: oklch(0.68 0.15 270);   /* 浅一阶 */
  --brand-200: oklch(0.88 0.06 270);   /* 背景用 */
  ```
- 全 deck / page 用 1-2 个主背景色，不多
- Dark mode：用 `#0b0b0f` 类深色，不要纯黑 `#000`
- Light mode：用 `#f8f8f5` / `#fafaf5` 类温暖白，不要纯白 `#ffffff`

## 字型搭配

每个设计用 **1-2 种字型**，最多：
- Display + body（常见）
- Single 字型多 weight / italic（现代感）
- Mono + serif（editorial）
- 不要 3+ 字型同 page

## Rhythm / 节奏

- **Spacing scale**：用 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96px 这种指数阶梯
- **章节区隔**：hero slide → content → transition slide → content → CTA，视觉节奏要有呼吸
- **变化**：不要每 slide 都一样版面；交替 full-bleed image / 纯文字 / split layout

## CSS 是你的朋友

别低估 CSS 能做的：
- `text-wrap: pretty` / `balance`
- `oklch()` 色空间
- CSS Grid（`grid-template-areas`、`subgrid`）
- Container queries（`@container`）
- `mix-blend-mode`、`backdrop-filter`
- `clip-path`、`mask-image`
- `@property` 自订动画属性
- `accent-color`、`color-scheme`
- 使用者常常不知道可以做什么——用 CSS **惊艳他**

## SVG 用于

**可以**：icon（从 Lucide / Heroicons / Phosphor 复制，不要自己画）、简单 chart、logo mark
**不要**：custom illustration、scene art、人物、产品样貌

没 icon 可用：纯文字 label、纯色方块、Unicode character（`↗` `◆` `•`）都比自画 slop 好。

## Copy 语气

- 跟随既有品牌语气
- 没有品牌：punchy、具体、**有态度**——不要 marketing speak
- 禁用字：`seamless`、`unleash`、`empower`、`revolutionize`、`game-changing`、`next-generation`
- 句子短。动词强。
- CTA：以使用者角度，`Start free` / `Try it now` / `Book a demo`；不用 `Get started for free today` 冗长版

## Imagery

- 有品牌素材 → 用
- 有 UI kit 的产品截图 → 用
- 都没有 → **placeholder**：纯色方块 + `[Hero image — H2 product screenshot]`，请使用者提供
- 不用 stock photo 替代——太容易变 slop

## 无障碍最低线

- 对比 4.5:1（文字）、3:1（UI chrome）
- 不只靠颜色传达状态（error 要有 icon 或 text）
- 文字可 2x 放大不破版
- `alt` 属性给所有 meaningful image

## Checklist（交付前快速扫）

- [ ] 无 Lorem ipsum
- [ ] 无乱塞的 stats / 图示
- [ ] 至少一个有意义的视觉决策（为什么选这颜色 / 字型 / 版面）
- [ ] 文字尺寸符合目标媒介
- [ ] 不是过度使用的字型
- [ ] Gradient 背景仅局部用
- [ ] 所有 emoji 都刻意（或没有）
- [ ] 所有 SVG 都是 icon 或 logo（不是 illustration）
- [ ] 1-2 背景色，不多
