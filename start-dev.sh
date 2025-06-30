#!/bin/bash

# 樊振东球迷网站AI应援物生成器 - 开发环境启动脚本

echo "🏓 樊振东球迷网站AI应援物生成器 - 开发环境启动"
echo "=================================================="

# 检查依赖
echo "📋 检查系统依赖..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装，请先安装 Python 3.9+"
    exit 1
fi

# 检查MySQL
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL 未安装，请先安装 MySQL 8.0+"
    exit 1
fi

# 检查Redis
if ! command -v redis-cli &> /dev/null; then
    echo "❌ Redis 未安装，请先安装 Redis 6.0+"
    exit 1
fi

echo "✅ 系统依赖检查完成"

# 启动数据库服务
echo "🗄️ 启动数据库服务..."

# 启动MySQL (根据系统调整)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    brew services start mysql
    brew services start redis
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo systemctl start mysql
    sudo systemctl start redis-server
fi

# 等待服务启动
sleep 3

# 检查服务状态
echo "🔍 检查服务状态..."
if ! redis-cli ping &> /dev/null; then
    echo "❌ Redis 服务启动失败"
    exit 1
fi

echo "✅ 数据库服务启动成功"

# 初始化数据库
echo "🔧 初始化数据库..."
if [ -f "database/init_fanzd_net.sql" ]; then
    mysql -u root -p < database/init_fanzd_net.sql
    echo "✅ 数据库初始化完成"
else
    echo "⚠️ 数据库初始化文件不存在，请手动创建数据库"
fi

# 启动后端服务
echo "🚀 启动后端服务..."

# 启动API服务
echo "📡 启动API服务..."
cd backend/api-service
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ 请编辑 backend/api-service/.env 文件配置数据库连接"
fi

npm install
npm run dev &
API_PID=$!
cd ../..

# 启动AI服务
echo "🤖 启动AI服务..."
cd backend/ai-service
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ 请编辑 backend/ai-service/.env 文件配置Gemini API密钥"
fi

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.main &
AI_PID=$!
cd ../..

# 启动前端服务
echo "🎨 启动前端服务..."
cd frontpage/ai-generator
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install
npm run dev &
FRONTEND_PID=$!
cd ../..

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."

# 检查API服务
if curl -s http://localhost:27001/health > /dev/null; then
    echo "✅ API服务运行正常 (http://localhost:27001)"
else
    echo "❌ API服务启动失败"
fi

# 检查AI服务
if curl -s http://localhost:27002/health > /dev/null; then
    echo "✅ AI服务运行正常 (http://localhost:27002)"
else
    echo "❌ AI服务启动失败"
fi

# 检查前端服务
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务运行正常 (http://localhost:3000)"
else
    echo "❌ 前端服务启动失败"
fi

echo ""
echo "🎉 启动完成！"
echo "=================================================="
echo "📱 前端应用: http://localhost:3000"
echo "📡 API服务: http://localhost:27001"
echo "🤖 AI服务: http://localhost:27002"
echo "🌐 API网关: http://localhost:27007"
echo "=================================================="
echo ""
echo "🎯 使用指南:"
echo "1. 访问 http://localhost:3000 打开应用"
echo "2. 点击右上角'增强版生成器'体验新功能"
echo "3. 选择生成类型（横幅/口号/表情包）"
echo "4. 选择视觉元素并配置参数"
echo "5. 输入创意描述，开始AI生成"
echo ""
echo "⚠️ 注意事项:"
echo "- 确保已配置Gemini API密钥"
echo "- 首次使用需要注册账户"
echo "- 免费用户每日有生成次数限制"
echo ""
echo "🛑 停止服务: Ctrl+C"

# 保存进程ID以便后续清理
echo $API_PID > .api.pid
echo $AI_PID > .ai.pid
echo $FRONTEND_PID > .frontend.pid

# 等待用户中断
wait
