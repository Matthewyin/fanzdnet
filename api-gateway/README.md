# API Gateway Service

## 功能描述

API网关服务，负责：
- 路由分发
- 认证授权
- 限流控制
- 负载均衡
- API文档

## 技术栈

- Node.js + Express/Fastify
- Redis (缓存)
- JWT (认证)

## 开发计划

- [ ] 基础路由配置
- [ ] JWT认证中间件
- [ ] 限流中间件
- [ ] API文档生成
- [ ] 健康检查接口

## API路由规划

```
/api/v1/auth/*          -> user-service
/api/v1/news/*          -> news-service  
/api/v1/schedule/*      -> schedule-service
/api/v1/ai/*            -> ai-service
/api/v1/media/*         -> media-service
``` 