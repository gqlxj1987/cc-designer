# 提问 playbook

好的提问 = 好的设计。Junior designer 问 5 个精准问题胜过 senior 假设 5 件事。

## 何时**一定要**问（用 AskUserQuestion 或明列问题）

- 使用者只给模糊需求（「设计一个 app」「做个简报」）
- 使用者要 prototype 但没给 UI kit / codebase / 截图
- 要做 6+ slide 的 deck 但没讲主题方向
- 要做 landing / marketing page 但没给品牌
- 任何「设计 app / 产品」类，而**没提供**任何既有资产

## 何时**不用**问（直接做）

- 使用者给了 PRD + 受众 + 长度
- 使用者给了截图 / codebase 要 recreate
- 小调整 / 追问 / 加一个 tweak
- 使用者明说「先做一版再说」

## 问题模板

### 起点 / 产品脉络（**几乎每次都要问**）
- 「你有既有的 UI kit、design system、或 repo 可以参考吗？」
- 「如果没有，能提供品牌 logo / 色彩、或你最喜欢的类似产品的 screenshot 吗？」
- 「完全没有参考 / 品牌的话我可以从头探索，但结果会比较泛——要这样做吗？」

### 变体数
- 「整体 flow 要几个 variation？」
- 「哪个部分你最想探索？版面 / 颜色 / 动画 / 文案？」

### 新意程度
- 「你想要 by-the-book（贴既有 pattern、保守）、novel（跳脱、不寻常），还是 mix？」
- 「有想要 surprise 的方向吗？」

### 关注重点（权重分配）
- 「这个 project 你最在意：flow / 视觉 / 文案 / 动画 的哪几个？」

### Tweaks
- 「要我加 Tweaks 让你即时切换吗？要切哪几个维度？」

### 技术 / 汇出
- 「deck 做好后要汇出 PPTX / PDF 吗？」
- 「prototype 要能给 user test 吗？还是只是 demo？」
- 「要放在某个装置 frame 里吗（iOS / Android / 浏览器）？」

### Scope
- 「这次要包含哪些 screen / section？」
- 「有没有哪些 screen 是下次再做就好？」

### 受众 / 场合
- 「deck 要给谁看？什么场合？时长？」
- 「prototype 要 demo 给谁？会需要真的点完全流程吗？」

## 不要问的问题

- 「你想要什么颜色？」——太宽。改问「有品牌主色吗？或有喜欢的参考网站？」
- 「你想要什么风格？」——太宽。改问「比较偏 minimal 像 Linear、或偏 expressive 像 Vercel？」
- 「要不要动画？」——若任务本来就是 animation 就别问。
- 过度问：每项都征询反而失去设计师的判断。2-3 个关键决策 + 品牌就够。

## Batch 一次问完

- 避免分 3 次各问 1 题——使用者会疲劳
- 一次 questions_v2（若可用）或一次 message 把 5-10 题丢出去
- 问题排序：**最关键的先**——起点 / 品牌 / 长度 > 变体 > 细节

## 当使用者说「你决定就好」

- 不要多问；给一个具体 plan（3 行）让他「yes / no / adjust」
- 例：「OK，我会做 8 slide pitch deck、浅色 Söhne 字型 + 紫色 accent、1 张 hero + 6 张 content + 1 张 CTA。对吗？」

## 示范（互动 prototype 要问 ≥ 10 题）

```
1. 有既有 UI kit 或 codebase 可参考吗？没的话请提供截图或品牌资料。
2. Platform 是 iOS、Android、桌机、还是浏览器内？
3. 几个 screen？每个 screen 主要目的是什么？
4. 要真的可点击完整 flow、还是局部 screen 就好？
5. 希望几种 variation？主要比较哪个维度（版面 / 色彩 / 互动 / copy）？
6. 对创新度的期待：保守贴 pattern、中间、还是大胆不寻常？
7. 动画重要吗？要做 motion demo 还是静态 mock？
8. 有没有品牌色、字型、logo？
9. 有没有想要我避开的视觉风格？
10. 要加哪些 Tweaks 供切换？
11. 做好后会怎么用（demo pitch、user test、internal review、汇出给他人）？
```
