# cc-designer

在 Claude Code / OpenClaw / 其他具備檔案系統的 coding agent 環境中，用 HTML 直接產出設計成品的 skill。

適合的產物：
- slide deck / 簡報
- interactive prototype
- animation / motion demo
- wireframe
- landing page mock
- design canvas

## 特色

- 輸出可直接在瀏覽器開啟的 HTML 檔
- 內建 deck、device frame、animation、design canvas starters
- 強調早期半成品、變體探索、可驗證交付
- 預設語言與說明為 zh-TW

## Repo 結構

```text
cc-designer/
├─ SKILL.md
├─ README.md
├─ LICENSE
├─ assets/
│  ├─ evals/
│  └─ starters/
└─ references/
```

## 主要內容

- `SKILL.md`: skill 主規格、觸發條件、workflow、tool rules
- `assets/starters/`: 可複用的設計起手式元件
- `assets/evals/`: eval 與 regression gate
- `references/`: deck、prototype、animation、wireframe、verification 等補充規範

## 何時用

當使用者要你：
- 「幫我做一份 deck / 簡報」
- 「prototype 一個 flow」
- 「做幾個 wireframe / 視覺方向」
- 「做一個互動 demo / animation」
- 「把內容整理成可展示的 HTML 設計稿」

不適合：
- 正式 production app 開發
- backend / API / database
- Figma / Sketch 原生檔
- 單純 CSS utility 或 framework config 任務

## 安裝

把資料夾放到 Claude skills 目錄，例如：

```bash
mkdir -p ~/.claude/skills
cp -R cc-designer ~/.claude/skills/cc-designer
```

或直接 clone：

```bash
git clone https://github.com/Openclaw-Metis/cc-designer.git ~/.claude/skills/cc-designer
```

## 使用方式

把它當成一個「設計產物生成 skill」來呼叫。輸入最好包含其中一種：
- PRD / deck 大綱
- screenshot / reference site
- 現有 UI kit / codebase
- logo、色票、字型等品牌素材

輸出目標應該是：
- 至少 1 份可直接打開的 HTML
- 有清楚命名
- console 無錯誤
- 視需要附變體或 tweaks

## License

MIT
