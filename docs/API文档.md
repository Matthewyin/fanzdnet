# 樊振东球迷网站AI应援物生成器 - API文档

## 📋 目录

1. [API概述](#api概述)
2. [认证系统](#认证系统)
3. [用户管理](#用户管理)
4. [文件管理](#文件管理)
5. [AI生成服务](#ai生成服务)
6. [错误处理](#错误处理)
7. [请求示例](#请求示例)

## 🌐 API概述

### 基础信息
- **API版本**: v1.0.0
- **基础URL**: `http://localhost:3001/api`（开发环境）
- **AI服务URL**: `http://localhost:8000/api/v1`（AI服务）
- **数据格式**: JSON
- **字符编码**: UTF-8

### 通用响应格式
```json
{
  "success": true,
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-12-29T10:00:00.000Z"
}
```

### 错误响应格式
```json
{
  "success": false,
  "error": "错误描述",
  "code": "ERROR_CODE",
  "detail": "详细错误信息",
  "timestamp": "2024-12-29T10:00:00.000Z"
}
```

## 🔐 认证系统

### JWT Token认证
所有需要认证的接口都需要在请求头中包含JWT Token：

```http
Authorization: Bearer <your-jwt-token>
```

### 认证接口

#### 用户注册
```http
POST /api/auth/register
```

**请求体**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "nickname": "测试用户"
}
```

**响应**:
```json
{
  "message": "注册成功",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "nickname": "测试用户",
    "user_level": "free",
    "created_at": "2024-12-29T10:00:00.000Z"
  }
}
```

#### 用户登录
```http
POST /api/auth/login
```

**请求体**:
```json
{
  "login": "testuser",
  "password": "password123"
}
```

**响应**:
```json
{
  "message": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "nickname": "测试用户"
  }
}
```

#### 获取用户信息
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

**响应**:
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "nickname": "测试用户",
    "user_level": "free",
    "daily_quota": 3,
    "used_quota": 1,
    "created_at": "2024-12-29T10:00:00.000Z"
  }
}
```

#### 用户登出
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**响应**:
```json
{
  "message": "登出成功"
}
```

## 👤 用户管理

#### 更新用户信息
```http
PUT /api/users/profile
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "nickname": "新昵称",
  "email": "newemail@example.com"
}
```

#### 修改密码
```http
PUT /api/users/password
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### 获取用户统计
```http
GET /api/users/stats
Authorization: Bearer <token>
```

**响应**:
```json
{
  "stats": {
    "totalGenerations": 15,
    "totalFiles": 8,
    "usedStorage": 2048576,
    "lastLoginAt": "2024-12-29T10:00:00.000Z"
  }
}
```

## 📁 文件管理

#### 文件上传
```http
POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**请求体**:
```
files: [File1, File2, ...]
```

**响应**:
```json
{
  "message": "文件上传成功",
  "files": [
    {
      "id": 1,
      "originalName": "image.jpg",
      "filename": "files-1640000000000-123456789.jpg",
      "size": 1024576,
      "mimetype": "image/jpeg",
      "width": 1920,
      "height": 1080,
      "url": "/api/files/view/files-1640000000000-123456789.jpg",
      "thumbnailUrl": "/api/files/thumbnail/files-1640000000000-123456789.jpg"
    }
  ]
}
```

#### 获取文件列表
```http
GET /api/files/list?page=1&limit=20&type=image
Authorization: Bearer <token>
```

**查询参数**:
- `page`: 页码（默认1）
- `limit`: 每页数量（默认20）
- `type`: 文件类型过滤（可选）

**响应**:
```json
{
  "files": [
    {
      "id": 1,
      "originalName": "image.jpg",
      "filename": "files-1640000000000-123456789.jpg",
      "size": 1024576,
      "mimetype": "image/jpeg",
      "width": 1920,
      "height": 1080,
      "url": "/api/files/view/files-1640000000000-123456789.jpg",
      "thumbnailUrl": "/api/files/thumbnail/files-1640000000000-123456789.jpg",
      "uploadTime": "2024-12-29T10:00:00.000Z",
      "sizeFormatted": "1.0 MB"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### 查看文件
```http
GET /api/files/view/:filename
```

**响应**: 返回文件内容（图片、文档等）

#### 查看缩略图
```http
GET /api/files/thumbnail/:filename
```

**响应**: 返回缩略图内容

#### 删除文件
```http
DELETE /api/files/:id
Authorization: Bearer <token>
```

**响应**:
```json
{
  "message": "文件删除成功"
}
```

## 🤖 AI生成服务

### 服务状态检查

#### 健康检查
```http
GET /api/v1/health
```

**响应**:
```json
{
  "status": "healthy",
  "components": {
    "database": "healthy",
    "redis": "healthy",
    "ai_service": "ready"
  },
  "queue_size": 0
}
```

#### 模型状态
```http
GET /api/v1/models/status
```

**响应**:
```json
{
  "models": {
    "gemini": {
      "configured": true,
      "available": true
    },
    "openai": {
      "configured": false,
      "available": false
    }
  },
  "service_ready": true
}
```

#### 队列状态
```http
GET /api/v1/queue/status
```

**响应**:
```json
{
  "queue_size": 2,
  "worker_count": 10,
  "service_ready": true
}
```

### 内容生成

#### 生成内容
```http
POST /api/v1/generate
```

**请求体**:
```json
{
  "task_id": "task_1640000000000_abc123",
  "type": "banner",
  "prompt": "为樊振东加油的横幅",
  "parameters": {
    "width": 800,
    "height": 300,
    "backgroundColor": "#ff0000",
    "textColor": "#ffffff",
    "fontSize": 48,
    "fontWeight": "bold"
  }
}
```

**生成类型**:
- `banner`: 应援横幅
- `slogan`: 应援口号
- `emoji`: 表情包

**响应**:
```json
{
  "message": "生成任务已启动",
  "task_id": "task_1640000000000_abc123",
  "status": "queued",
  "estimated_time": 30
}
```

#### 获取任务状态
```http
GET /api/v1/task/:taskId
```

**响应**:
```json
{
  "task_id": "task_1640000000000_abc123",
  "status": "completed",
  "progress": 100,
  "result": {
    "type": "banner",
    "content": "樊振东加油！",
    "image_path": "generated/banners/task_1640000000000_abc123.png",
    "generation_time": 2.3
  }
}
```

**任务状态**:
- `pending`: 等待处理
- `processing`: 处理中
- `completed`: 已完成
- `failed`: 失败

#### 测试生成
```http
POST /api/v1/test/generate
```

**响应**:
```json
{
  "message": "测试生成任务已创建",
  "test_task_id": "test_1640000000000_xyz789",
  "result": {
    "status": "queued",
    "task_id": "test_1640000000000_xyz789"
  }
}
```

## ⚠️ 错误处理

### 错误代码

#### 认证错误 (401)
- `NO_TOKEN`: 缺少认证令牌
- `INVALID_TOKEN`: 无效的认证令牌
- `TOKEN_EXPIRED`: 认证令牌已过期
- `INVALID_CREDENTIALS`: 用户名或密码错误

#### 权限错误 (403)
- `INSUFFICIENT_PERMISSIONS`: 权限不足
- `QUOTA_EXCEEDED`: 配额已用完
- `ACCOUNT_SUSPENDED`: 账户已暂停

#### 请求错误 (400)
- `VALIDATION_ERROR`: 请求参数验证失败
- `USER_EXISTS`: 用户已存在
- `INVALID_FILE_TYPE`: 不支持的文件类型
- `FILE_TOO_LARGE`: 文件过大

#### 资源错误 (404)
- `USER_NOT_FOUND`: 用户不存在
- `FILE_NOT_FOUND`: 文件不存在
- `TASK_NOT_FOUND`: 任务不存在

#### 服务错误 (500)
- `INTERNAL_SERVER_ERROR`: 内部服务器错误
- `DATABASE_ERROR`: 数据库错误
- `AI_SERVICE_ERROR`: AI服务错误
- `STORAGE_ERROR`: 存储服务错误

#### AI服务错误 (503)
- `AI_SERVICE_UNAVAILABLE`: AI服务不可用
- `GENERATION_FAILED`: 生成失败
- `QUEUE_FULL`: 队列已满

### 错误响应示例

```json
{
  "success": false,
  "error": "认证令牌无效",
  "code": "INVALID_TOKEN",
  "detail": "JWT token is malformed",
  "timestamp": "2024-12-29T10:00:00.000Z"
}
```

## 📝 请求示例

### 完整的横幅生成流程

```javascript
// 1. 用户登录
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    login: 'testuser',
    password: 'password123'
  })
});

const { token } = await loginResponse.json();

// 2. 生成横幅
const generateResponse = await fetch('/api/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    task_id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'banner',
    prompt: '樊振东加油！',
    parameters: {
      width: 800,
      height: 300,
      backgroundColor: '#ff0000',
      textColor: '#ffffff',
      fontSize: 48,
      fontWeight: 'bold'
    }
  })
});

const { task_id } = await generateResponse.json();

// 3. 轮询任务状态
const pollTaskStatus = async (taskId) => {
  const response = await fetch(`/api/v1/task/${taskId}`);
  const task = await response.json();
  
  if (task.status === 'completed') {
    return task.result;
  } else if (task.status === 'failed') {
    throw new Error(task.error);
  } else {
    // 等待2秒后重试
    await new Promise(resolve => setTimeout(resolve, 2000));
    return pollTaskStatus(taskId);
  }
};

// 4. 获取生成结果
const result = await pollTaskStatus(task_id);
console.log('生成完成:', result);
```

### 文件上传示例

```javascript
// 文件上传
const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('files', file);
  
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return await response.json();
};

// 使用示例
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
const result = await uploadFile(file, token);
```

## 📊 速率限制

### 限制规则
- **认证接口**: 每分钟10次请求
- **生成接口**: 每小时根据用户等级限制
- **文件上传**: 每分钟5次请求
- **其他接口**: 每分钟100次请求

### 限制响应头
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

### 超限响应
```json
{
  "success": false,
  "error": "请求频率超限",
  "code": "RATE_LIMIT_EXCEEDED",
  "detail": "Too many requests, please try again later",
  "retry_after": 60
}
```

---

**API版本**: v1.0.0  
**更新时间**: 2024年12月  
**技术支持**: api-support@fanzdnet.com
