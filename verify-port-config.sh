#!/bin/bash

# 樊振东球迷网站 - 端口配置验证脚本

echo "🔍 樊振东球迷网站端口配置验证"
echo "=================================================="

# 定义端口和服务映射
ports=(3000 27001 27002 27003 27004 27005 27006 27007 27008 27009)
services=("前端应用" "API服务" "AI服务" "用户服务" "媒体服务" "新闻服务" "赛程服务" "API网关" "AI监控" "网关监控")

# 检查端口可用性
echo "📋 检查端口可用性..."
echo ""

available_ports=()
occupied_ports=()

for i in "${!ports[@]}"; do
    port="${ports[$i]}"
    service_name="${services[$i]}"
    if lsof -i :$port >/dev/null 2>&1; then
        pid=$(lsof -ti:$port)
        process=$(ps -p $pid -o comm= 2>/dev/null || echo "未知进程")
        echo "❌ 端口 $port ($service_name) 被占用 - PID: $pid ($process)"
        occupied_ports+=($port)
    else
        echo "✅ 端口 $port ($service_name) 可用"
        available_ports+=($port)
    fi
done

echo ""
echo "📊 端口状态统计:"
echo "✅ 可用端口: ${#available_ports[@]}/10"
echo "❌ 占用端口: ${#occupied_ports[@]}/10"

# 检查配置文件
echo ""
echo "📁 检查配置文件..."
echo ""

config_files=(
    "backend/api-service/.env:PORT=27001"
    "backend/api-service/.env.example:PORT=27001"
    "backend/ai-service/.env:PORT=27002"
    "backend/ai-service/.env.example:PORT=27002"
    "user-service/.env.example:PORT=27003"
    "media-service/.env.example:PORT=27004"
    "news-service/.env.example:PORT=27005"
    "schedule-service/.env.example:PORT=27006"
    "api-gateway/.env.example:PORT=27007"
    "frontpage/.env:VITE_API_GATEWAY_URL=http://localhost:27007"
    "frontpage/ai-generator/.env:VITE_API_BASE_URL=http://localhost:27001"
)

config_ok=0
config_total=${#config_files[@]}

for config in "${config_files[@]}"; do
    file="${config%%:*}"
    expected="${config##*:}"
    
    if [ -f "$file" ]; then
        if grep -q "$expected" "$file" 2>/dev/null; then
            echo "✅ $file - 配置正确"
            ((config_ok++))
        else
            echo "❌ $file - 配置错误或缺失: $expected"
        fi
    else
        echo "⚠️ $file - 文件不存在"
    fi
done

echo ""
echo "📊 配置文件状态:"
echo "✅ 正确配置: $config_ok/$config_total"

# 检查启动脚本
echo ""
echo "🚀 检查启动脚本..."
echo ""

scripts=(
    "start-all-services.sh"
    "stop-all-services.sh"
    "start-dev.sh"
)

script_ok=0
for script in "${scripts[@]}"; do
    if [ -f "$script" ] && [ -x "$script" ]; then
        echo "✅ $script - 存在且可执行"
        ((script_ok++))
    else
        echo "❌ $script - 不存在或不可执行"
    fi
done

echo ""
echo "📊 启动脚本状态:"
echo "✅ 可用脚本: $script_ok/${#scripts[@]}"

# 检查服务目录结构
echo ""
echo "📂 检查服务目录结构..."
echo ""

directories=(
    "backend/api-service"
    "backend/ai-service"
    "user-service"
    "media-service"
    "news-service"
    "schedule-service"
    "api-gateway"
    "frontpage"
    "frontpage/ai-generator"
)

dir_ok=0
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir - 目录存在"
        ((dir_ok++))
    else
        echo "❌ $dir - 目录不存在"
    fi
done

echo ""
echo "📊 目录结构状态:"
echo "✅ 存在目录: $dir_ok/${#directories[@]}"

# 生成总结报告
echo ""
echo "📋 配置验证总结"
echo "=================================================="

total_checks=$((10 + config_total + ${#scripts[@]} + ${#directories[@]}))
passed_checks=$((${#available_ports[@]} + config_ok + script_ok + dir_ok))

echo "🎯 总体状态: $passed_checks/$total_checks 项检查通过"

if [ ${#occupied_ports[@]} -gt 0 ]; then
    echo ""
    echo "⚠️ 需要处理的占用端口:"
    for port in "${occupied_ports[@]}"; do
        # 找到对应的服务名称
        for i in "${!ports[@]}"; do
            if [ "${ports[$i]}" = "$port" ]; then
                echo "   - 端口 $port (${services[$i]})"
                break
            fi
        done
    done
    echo ""
    echo "💡 解决方案:"
    echo "   1. 运行: ./stop-all-services.sh"
    echo "   2. 或手动杀死进程: lsof -ti:端口号 | xargs kill -9"
fi

if [ $config_ok -lt $config_total ]; then
    echo ""
    echo "⚠️ 配置文件需要检查和修复"
    echo "💡 解决方案:"
    echo "   1. 检查缺失的配置文件"
    echo "   2. 确认端口配置正确"
    echo "   3. 复制 .env.example 到 .env"
fi

if [ $passed_checks -eq $total_checks ]; then
    echo ""
    echo "🎉 所有配置检查通过！可以启动服务了。"
    echo ""
    echo "🚀 启动命令:"
    echo "   ./start-all-services.sh"
else
    echo ""
    echo "⚠️ 发现 $((total_checks - passed_checks)) 个问题，请先解决后再启动服务。"
fi

echo ""
echo "📖 更多信息请查看: 端口配置说明.md"
echo "=================================================="
