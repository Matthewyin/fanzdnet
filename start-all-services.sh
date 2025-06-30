#!/bin/bash

# 樊振东球迷网站 - 完整服务启动脚本
# 端口分配：
# - 前端应用: 3000
# - API服务: 27001
# - AI服务: 27002
# - 新闻服务: 27005
# - 赛程服务: 27006
# - API网关: 27007

echo "🏓 樊振东球迷网站 - 完整服务启动"
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

echo "✅ 系统依赖检查完成"

# 创建日志目录
mkdir -p logs

# 启动后端服务
echo "🚀 启动后端服务..."

# 1. 启动API服务 (27001)
echo "📡 启动API服务 (端口: 27001)..."
cd backend/api-service
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ 请编辑 backend/api-service/.env 文件配置数据库连接"
fi
npm install > /dev/null 2>&1
npm run dev > ../../logs/api-service.log 2>&1 &
API_PID=$!
cd ../..

# 2. 启动AI服务 (27002)
echo "🤖 启动AI服务 (端口: 27002)..."
cd backend/ai-service
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ 请编辑 backend/ai-service/.env 文件配置Gemini API密钥"
fi
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1
python -m app.main > ../../logs/ai-service.log 2>&1 &
AI_PID=$!
cd ../..



# 3. 启动新闻服务 (27005)
echo "📰 启动新闻服务 (端口: 27005)..."
cd news-service
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
if [ -f "package.json" ]; then
    npm install > /dev/null 2>&1
    npm run dev > ../logs/news-service.log 2>&1 &
    NEWS_PID=$!
fi
cd ..

# 4. 启动赛程服务 (27006)
echo "🏆 启动赛程服务 (端口: 27006)..."
cd schedule-service
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
if [ -f "package.json" ]; then
    npm install > /dev/null 2>&1
    npm run dev > ../logs/schedule-service.log 2>&1 &
    SCHEDULE_PID=$!
fi
cd ..

# 5. 启动API网关 (27007)
echo "🌐 启动API网关 (端口: 27007)..."
cd api-gateway
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
if [ -f "package.json" ]; then
    npm install > /dev/null 2>&1
    npm run dev > ../logs/api-gateway.log 2>&1 &
    GATEWAY_PID=$!
fi
cd ..

# 启动前端服务
echo "🎨 启动前端服务..."
cd frontpage
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
npm install > /dev/null 2>&1
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 15

# 检查服务状态
echo "🔍 检查服务状态..."

# 检查各个服务
services=(
    "27001:API服务"
    "27002:AI服务"
    "27005:新闻服务"
    "27006:赛程服务"
    "27007:API网关"
    "3000:前端应用"
)

for service in "${services[@]}"; do
    port="${service%%:*}"
    name="${service##*:}"
    if curl -s "http://localhost:$port" > /dev/null 2>&1 || curl -s "http://localhost:$port/health" > /dev/null 2>&1; then
        echo "✅ $name 运行正常 (http://localhost:$port)"
    else
        echo "❌ $name 启动失败"
    fi
done

echo ""
echo "🎉 启动完成！"
echo "=================================================="
echo "🌐 主要访问地址:"
echo "📱 前端应用: http://localhost:3000"
echo "🌐 API网关: http://localhost:27007"
echo ""
echo "🔧 后端服务:"
echo "📡 API服务: http://localhost:27001"
echo "🤖 AI服务: http://localhost:27002"
echo "📰 新闻服务: http://localhost:27005"
echo "🏆 赛程服务: http://localhost:27006"
echo "=================================================="
echo ""
echo "📋 日志文件位置:"
echo "- API服务: logs/api-service.log"
echo "- AI服务: logs/ai-service.log"
echo "- 新闻服务: logs/news-service.log"
echo "- 赛程服务: logs/schedule-service.log"
echo "- API网关: logs/api-gateway.log"
echo "- 前端应用: logs/frontend.log"
echo ""
echo "🛑 停止所有服务: Ctrl+C"

# 保存进程ID
echo $API_PID > .api.pid
echo $AI_PID > .ai.pid
[ ! -z "$NEWS_PID" ] && echo $NEWS_PID > .news.pid
[ ! -z "$SCHEDULE_PID" ] && echo $SCHEDULE_PID > .schedule.pid
[ ! -z "$GATEWAY_PID" ] && echo $GATEWAY_PID > .gateway.pid
echo $FRONTEND_PID > .frontend.pid

# 等待用户中断
wait
