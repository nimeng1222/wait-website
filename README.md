# wait-website

[wait-monitor](https://github.com/nimeng1222/wait-release) 的项目官网：营销展示 + 使用文档 + 常见问题。

技术栈：Vite 6 + React 19 + TypeScript + Tailwind CSS v4 + React Router v8（HashRouter）。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build    # tsc -b && vite build，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 部署（GitHub Pages）

仓库已内置工作流 `.github/workflows/deploy.yml`，推送到 `main` 分支自动构建并部署。

首次使用需要在仓库中开启 Pages：

1. 打开仓库 **Settings → Pages**；
2. **Build and deployment → Source** 选择 **GitHub Actions**；
3. 推送 `main` 分支（或在 Actions 页面手动触发 `workflow_dispatch`）即可完成部署。

站点使用 HashRouter 与相对路径（`base: './'`），部署到任意子路径均可正常访问，刷新不会 404。

## 目录结构

```
├── public/screenshots/       # 仪表盘截图（dark / light）
├── src/
│   ├── components/           # 导航、页脚、代码块、复制按钮等
│   ├── pages/
│   │   ├── Home.tsx          # 首页（营销展示）
│   │   ├── Faq.tsx           # 常见问题（搜索 + 手风琴）
│   │   └── docs/             # 使用文档（快速开始 / Agent / 配置 / 维护）
│   ├── App.tsx               # 路由（HashRouter）
│   └── index.css             # Tailwind v4 入口
└── .github/workflows/deploy.yml
```

## 相关仓库

- [wait-release](https://github.com/nimeng1222/wait-release) — 公开安装脚本、服务端与 Agent 发布包
