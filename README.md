# fanzd.net (重构版)

本项目是 fanzd.net 粉丝站的重构版本，采用现代、轻量且高性能的技术栈构建。

## 项目简介

本次重构的核心目标是将原有的复杂微服务架构，简化为更易于维护、部署和扩展的单体全栈应用。项目保留并优化了原始版本的核心视觉元素与内容，特别是标志性的首页轮播图。

## 技术栈

*   **框架:** [Nuxt.js 3](https://nuxt.com/) - 一个混合式 Vue 框架，支持服务端渲染 (SSR) 和静态站点生成 (SSG)，以实现最佳性能和 SEO。
*   **语言:** TypeScript
*   **UI 框架:** Vue 3
*   **样式:** 标准 CSS，使用 CSS 变量实现主题切换。
*   **部署平台:** [Cloudflare Pages](https://pages.cloudflare.com/)

## 主要功能

*   **首页:** 标志性的英雄轮播图，包含复杂的背景动画和详尽的生涯回顾文案。
*   **主题切换:** 用户可在亮色、暗色和跟随系统三种模式间自由切换。
*   **内容页面:** 包含“最新动态”、“赛事信息”、“大事记”、“关于”等多个内容展示页面。
*   **AI 灵感站:** 一个预留的 API 接口，可为粉丝提供应援物设计的创意文字，未来可方便地接入真实的 AI 服务。

## 本地开发

### 环境要求

*   [Node.js](https://nodejs.org/) (建议使用 v18.x 或更高版本)
*   [npm](https://www.npmjs.com/)

### 安装与启动

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/Matthewyin/fanzdnet.git
    ```
2.  **进入项目目录:**
    ```bash
    cd fanzdnet
    ```
3.  **安装依赖:**
    ```bash
    npm install
    ```

### 运行开发服务器

执行以下命令以启动本地开发服务器，该服务支持热更新：

```bash
npm run dev
```

启动后，网站将在 `http://localhost:3000` 上可用。

## 部署

本项目已针对 **Cloudflare Pages** 的官方 Git 集成流程进行了优化，可实现无缝部署。

1.  **推送至 GitHub:** 将您的代码提交并推送到 `main` 分支。

2.  **配置 Cloudflare Pages:**
    *   登录到 Cloudflare 仪表板。
    *   创建一个新的 Pages 项目，并将其连接到您的 GitHub 仓库。
    *   在构建设置中使用以下配置：
        *   **框架预设 (Framework preset):** `Nuxt`
        *   **构建命令 (Build command):** `npm run build`
        *   **构建输出目录 (Build output directory):** `.output/public`

每次推送到 `main` 分支后，Cloudflare 都会自动拉取代码、构建并部署您的网站。