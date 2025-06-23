# 樊振东球迷网 (FanZD.net)

[![Vue](https://img.shields.io/badge/Vue-3.4.29-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.10.2-409EFF?style=flat-square)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> 樊振东球迷非官方网站 - 记录传奇，见证历史

## 📖 项目简介

这是一个致敬乒乓球世界冠军**樊振东**的球迷网站，采用前后端分离架构，展示他的传奇职业生涯、最新动态、比赛赛程等内容，并提供AI应援物生成等互动功能。

## 🏗️ 项目架构

```
fanzdnet/
├── frontpage/           # 前端项目 (Vue 3 + Vite)
│   ├── src/
│   │   ├── components/  # 组件库
│   │   ├── views/       # 页面视图
│   │   ├── stores/      # 状态管理 (Pinia)
│   │   ├── api/         # API接口
│   │   ├── i18n/        # 国际化
│   │   └── utils/       # 工具函数
│   ├── public/          # 静态资源
│   └── dist/            # 构建输出
├── api-gateway/         # API网关服务 (计划中)
├── user-service/        # 用户服务 (计划中)
├── news-service/        # 新闻服务 (计划中)
├── schedule-service/    # 赛程服务 (计划中)
├── ai-service/          # AI服务 (计划中)
├── media-service/       # 媒体服务 (计划中)
├── docs/                # 项目文档
└── docker-compose.yml   # 容器编排 (计划中)
```

## ✨ 主要功能

### 🎯 核心功能
- **传奇历程轮播** - 展示樊振东职业生涯7个重要时刻
- **实时赛程** - 比赛安排和结果查询
- **新闻动态** - 最新新闻和媒体报道
- **精彩瞬间** - 比赛图片和视频画廊
- **大事记** - 职业生涯时间线
- **采访内容** - 专访和访谈资料

### 🤖 AI功能
- **智能应援物生成器**
  - 智能口号生成
  - 应援横幅设计
  - 趣味表情包制作

### 🌍 技术特性
- **多语言支持** - 中文/英文/日文
- **PWA支持** - 离线访问和应用化体验
- **响应式设计** - 移动端/平板/桌面端适配
- **暗色主题** - 支持主题切换
- **实时数据** - WebSocket实时更新

## 🚀 快速开始

### 前端开发

```bash
# 进入前端目录
cd frontpage

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🛠️ 技术栈

### 前端
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: Vue I18n
- **样式**: SCSS
- **图标**: Element Plus Icons

### 后端 (计划中)
- **API网关**: Express.js / Fastify
- **微服务**: Node.js / Python
- **数据库**: PostgreSQL / Redis
- **消息队列**: RabbitMQ
- **容器化**: Docker + Docker Compose
- **部署**: Kubernetes / Docker Swarm

## 📱 功能模块

### 1. 首页轮播
- 史诗级视觉展示
- 星空背景动画
- 传奇时刻回顾

### 2. 赛程管理
- 比赛时间表
- 赛事结果
- 统计数据

### 3. 新闻中心
- 最新动态
- 媒体报道
- 官方公告

### 4. 媒体画廊
- 比赛照片
- 视频集锦
- 精彩瞬间

### 5. AI应援工具
- 智能内容生成
- 个性化定制
- 社交分享

## 🌟 项目亮点

- **沉浸式体验** - 星空主题 + 英雄轮播营造史诗感
- **现代化架构** - 微服务 + 前后端分离
- **国际化支持** - 多语言无缝切换
- **移动优先** - 响应式设计 + PWA
- **AI驱动** - 智能内容生成
- **实时更新** - WebSocket + 缓存策略

## 📄 开发计划

### Phase 1 - 前端基础 ✅
- [x] 项目架构搭建
- [x] 核心页面开发
- [x] 响应式布局
- [x] 多语言支持

### Phase 2 - 后端服务 🚧
- [ ] API网关搭建
- [ ] 用户服务开发
- [ ] 新闻服务开发
- [ ] 赛程服务开发

### Phase 3 - AI功能 📋
- [ ] AI服务集成
- [ ] 内容生成算法
- [ ] 用户交互优化

### Phase 4 - 部署上线 📋
- [ ] 容器化部署
- [ ] CI/CD流水线
- [ ] 性能监控
- [ ] 安全加固

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目地址: [https://github.com/Matthewyin/fanzdnet](https://github.com/Matthewyin/fanzdnet)
- 问题反馈: [Issues](https://github.com/Matthewyin/fanzdnet/issues)

## 🙏 致谢

感谢所有为樊振东加油的球迷朋友们！让我们一起见证传奇继续！

---

**免责声明**: 本网站为球迷自发创建的非官方网站，所有内容仅供球迷交流使用。 