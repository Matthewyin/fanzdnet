# 部署和 HTTPS 配置指南

## 服务器信息

- **IP 地址**: 47.239.220.136
- **域名**: fanzd.net
- **系统**: Ubuntu 24.04
- **Web 服务器**: OpenResty 1.27.1.2

## 状态

✅ GitHub Actions 自动化部署已配置
✅ Certbot 已安装
✅ Nginx 配置已准备
✅ 服务器运行正常

---

## 第一步：配置域名解析

在你的域名管理面板（如阿里云、腾讯云、Namecheap 等）添加以下 DNS 记录：

### A 记录 1
```
类型: A
主机记录: @
记录值: 47.239.220.136
TTL: 600
```

### A 记录 2
```
类型: A
主机记录: www
记录值: 47.239.220.136
TTL: 600
```

### 等待 DNS 生效
- 通常需要 10 分钟到 2 小时
- 可以使用以下命令检查：
  ```bash
  nslookup fanzd.net
  dig +short fanzd.net
  ```

---

## 第二步：启用 HTTPS

DNS 生效后，运行以下命令：

```bash
ssh root@47.239.220.136
/root/complete-https.sh
```

这个脚本会自动：
1. ✅ 验证域名解析
2. ✅ 获取 Let's Encrypt 证书
3. ✅ 启用 HTTPS 重定向
4. ✅ 重启 OpenResty
5. ✅ 配置自动续期

---

## 第三步：验证部署

### 测试 HTTP
```bash
curl -I http://fanzd.net
```

### 测试 HTTPS
```bash
curl -I https://fanzd.net
```

### 在浏览器中访问
- http://fanzd.net （应重定向到 HTTPS）
- https://fanzd.net
- https://www.fanzd.net

---

## 自动化部署

### 触发方式

#### 自动触发
```bash
git add .
git commit -m "your changes"
git push origin main
```

#### 手动触发
1. 访问 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **Deploy to Alibaba Cloud**
4. 点击 **Run workflow**

### Secrets 配置
已在 GitHub 仓库 Secrets 中配置：
- `SERVER_IP`: 47.239.220.136
- `SERVER_PASSWORD`: 服务器密码

---

## 证书自动续期

### 配置状态
✅ Cron 任务已配置：每天凌晨 3:00 运行
✅ 续期后自动重启 OpenResty
✅ 静默模式，不发送邮件

### 手动续期测试
```bash
ssh root@47.239.220.136
certbot renew --dry-run
```

### 查看证书信息
```bash
ssh root@47.239.220.136
certbot certificates
```

### 证书路径
- 证书: `/etc/letsencrypt/live/fanzd.net/fullchain.pem`
- 私钥: `/etc/letsencrypt/live/fanzd.net/privkey.pem`

---

## 配置文件位置

### OpenResty
- 配置: `/usr/local/openresty/nginx/conf/nginx.conf`
- 配置备份: `/usr/local/openresty/nginx/conf/nginx.conf.bak`

### 项目
- 源码: `/var/www/fanzdnet`
- 静态文件: `/var/www/fanzdnet/.output/public`

### SSL 证书
- 证书: `/etc/letsencrypt/live/fanzd.net/`
- 续期脚本: `/etc/letsencrypt/renewal-hooks/deploy-nginx.sh`

---

## 常用命令

### 部署新代码
```bash
# 方式 1: 通过 GitHub Actions（推荐）
git push origin main

# 方式 2: 手动部署
ssh root@47.239.220.136
cd /var/www/fanzdnet
git pull origin main
npm ci
npm run generate
systemctl reload openresty
```

### 查看 OpenResty 状态
```bash
ssh root@47.239.220.136
systemctl status openresty
```

### 查看访问日志
```bash
ssh root@47.239.220.136
tail -f /usr/local/openresty/nginx/logs/access.log
```

### 查看错误日志
```bash
ssh root@47.239.220.136
tail -f /usr/local/openresty/nginx/logs/error.log
```

### 重启 OpenResty
```bash
ssh root@47.239.220.136
systemctl restart openresty
```

---

## 故障排查

### HTTPS 配置失败
**问题**: 域名未解析
**解决**: 检查 DNS 记录，等待 10-30 分钟后重试

### 证书续期失败
**检查**:
```bash
ssh root@47.239.220.136
certbot renew --dry-run
```

### OpenResty 无法启动
**检查配置**:
```bash
ssh root@47.239.220.136
openresty -t
```

**查看日志**:
```bash
journalctl -u openresty -n 50
```

---

## 安全建议

1. ✅ SSL/TLS 已启用
2. ✅ 安全响应头已配置
3. ✅ 防火墙已启用（仅开放 80, 443, 22）
4. ⚠️ 建议定期更新系统和依赖
5. ⚠️ 建议配置 fail2ban 防止暴力破解

---

## 下一步优化

- [ ] 配置 CDN 加速（阿里云 CDN）
- [ ] 配置监控告警
- [ ] 配置自动备份
- [ ] 添加更多安全防护（WAF、DDoS 防护）
