# 在 Claude Code 预览 / 验证

Claude.ai Artifacts 有 `show_to_user` / `done` / `fork_verifier_agent`；Claude Code CLI 没有这些。以下是 Claude Code 的对应方法。

## 优先顺序

1) **使用者有 gstack `/browse`** → 用它（最好，有 console log、可 eval_js、能截图）
2) **使用者有系统 open 命令** → `xdg-open` / `open` / `start`
3) **最后**：在对话内告诉使用者「请在档案管理员打开 `<绝对路径>`」

## gstack `/browse`（若可用）

使用者 CLAUDE.md 若引入 gstack，可呼叫 `$B`：

```bash
# 打开本地档案（file:// 需要绝对路径）
$B goto file:///home/user/design/onboarding-proto/index.html

# 截图确认版面
$B snapshot --viewport 1440x900 --out /tmp/check.png

# 看 console
$B console

# 执行 JS 验证
$B eval 'document.querySelectorAll("[data-screen-label]").length'

# deck 验证（翻页）
$B key ArrowRight
$B snapshot
```

若 `/browse` 的 `load-html` 可用（gstack 1.1+）：
```bash
$B load-html /home/user/design/onboarding-proto/index.html
```

## `xdg-open` / `open` / `start`

```bash
# Linux
xdg-open /home/user/design/onboarding-proto/index.html

# macOS
open /home/user/design/onboarding-proto/index.html

# Windows（WSL 里）
cmd.exe /c start file:///C:/Users/.../index.html
```

## 验证 checklist

开启后确认：
- [ ] 档案有被载入（没 404）
- [ ] console 无 error、无 warning（warning 至少要可解释）
- [ ] 所有 `<script>` 都 load 成功（check Network tab 或 `$B console`）
- [ ] React / Babel pinned 版本 + integrity 没被浏览器拒绝
- [ ] 主要视觉符合设计叙事
- [ ] 互动可点（prototype）、翻页可翻（deck）、动画可播（animation）
- [ ] Tweaks 切换有效（若有）
- [ ] Speaker notes 同步（若 deck + notes）
- [ ] 无 `scrollIntoView` 被触发（console 若 warn 要修）

## 若 console 有错

修到 clean 再算交付完成。常见错误：
- `React is not defined` → script tag 顺序错，或 React UMD 没成功 load（integrity hash 不对）
- `Unexpected token <` → `.jsx` 被当一般 `.js` 载入，忘加 `type="text/babel"`
- `Cannot read properties of undefined` → component 跨档共享但没 `Object.assign(window, ...)`
- `styles is not defined` → 某个档案用了 `const styles = {}` 被另一档 overwrite，改成 `<component>Styles`

## 交付前一定要本地预览过

**不**依赖使用者自己打开才发现错误——先验证再交付。这是 cc-designer 的硬规则。

## 截图给使用者确认（可选）

若使用者不在终端旁，或想要快速视觉 feedback：

```bash
# gstack
$B snapshot --viewport 1920x1080 --out /home/user/design/onboarding-proto/preview-hero.png

# Playwright / headless-chrome（若有安装）
# 跳过——设计师不负责 browser CI
```

然后在对话内 Read 这张图片检查。
