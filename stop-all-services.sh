#!/bin/bash

# 樊振东球迷网站 - 停止所有服务脚本

echo "🛑 停止樊振东球迷网站所有服务"
echo "=================================================="

# 停止通过PID文件记录的进程
pid_files=(.api.pid .ai.pid .news.pid .schedule.pid .gateway.pid .frontend.pid)
service_names=("API服务" "AI服务" "新闻服务" "赛程服务" "API网关" "前端应用")

for i in "${!pid_files[@]}"; do
    pid_file="${pid_files[$i]}"
    service_name="${service_names[$i]}"
    
    if [ -f "$pid_file" ]; then
        pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            echo "🔄 停止 $service_name (PID: $pid)..."
            kill "$pid"
            sleep 1
            if kill -0 "$pid" 2>/dev/null; then
                echo "⚠️ 强制停止 $service_name..."
                kill -9 "$pid"
            fi
            echo "✅ $service_name 已停止"
        else
            echo "ℹ️ $service_name 进程不存在"
        fi
        rm -f "$pid_file"
    fi
done

# 停止可能占用端口的进程
ports=(3000 27001 27002 27005 27006 27007 27008 27009)
port_names=("前端应用" "API服务" "AI服务" "新闻服务" "赛程服务" "API网关" "AI监控" "网关监控")

echo ""
echo "🔍 检查端口占用情况..."

for i in "${!ports[@]}"; do
    port="${ports[$i]}"
    service_name="${port_names[$i]}"
    
    # 查找占用端口的进程
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "🔄 停止占用端口 $port 的进程 ($service_name, PID: $pid)..."
        kill "$pid" 2>/dev/null
        sleep 1
        # 如果进程仍然存在，强制杀死
        if kill -0 "$pid" 2>/dev/null; then
            kill -9 "$pid" 2>/dev/null
        fi
        echo "✅ 端口 $port 已释放"
    fi
done

# 停止Python虚拟环境中的进程
echo ""
echo "🐍 停止Python虚拟环境进程..."
pkill -f "python.*app.main" 2>/dev/null && echo "✅ Python AI服务进程已停止"

# 停止Node.js进程
echo ""
echo "📦 停止Node.js相关进程..."
pkill -f "node.*app.js" 2>/dev/null && echo "✅ Node.js服务进程已停止"
pkill -f "npm.*run.*dev" 2>/dev/null && echo "✅ npm开发进程已停止"

# 停止Vite开发服务器
pkill -f "vite" 2>/dev/null && echo "✅ Vite开发服务器已停止"

# 清理临时文件
echo ""
echo "🧹 清理临时文件..."
rm -f .*.pid
echo "✅ PID文件已清理"

# 最终检查
echo ""
echo "🔍 最终端口检查..."
active_ports=()
for port in "${ports[@]}"; do
    if lsof -ti:$port >/dev/null 2>&1; then
        active_ports+=($port)
    fi
done

if [ ${#active_ports[@]} -eq 0 ]; then
    echo "✅ 所有端口已释放"
else
    echo "⚠️ 以下端口仍被占用: ${active_ports[*]}"
    echo "   请手动检查: lsof -ti:端口号"
fi

echo ""
echo "🎉 服务停止完成！"
echo "=================================================="
echo ""
echo "💡 提示:"
echo "- 如需重新启动，运行: ./start-all-services.sh"
echo "- 查看日志文件: ls -la logs/"
echo "- 清理日志: rm -rf logs/*"
