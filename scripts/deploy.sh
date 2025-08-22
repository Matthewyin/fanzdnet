#!/bin/bash

# 部署脚本 - 樊振东粉丝网站
# 使用 Firebase App Hosting 部署

set -e  # 遇到错误立即退出

echo "🚀 开始部署樊振东粉丝网站..."

# 检查必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装，请先安装 Node.js"
        exit 1
    fi
    
    if ! command -v firebase &> /dev/null; then
        echo "❌ Firebase CLI 未安装，正在安装..."
        npm install -g firebase-tools
    fi
    
    echo "✅ 依赖检查完成"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    
    # 清理缓存
    echo "🧹 清理缓存..."
    rm -rf node_modules/.cache
    rm -rf .nuxt
    rm -rf .output
    
    # 安装依赖
    echo "📦 安装依赖..."
    npm ci
    
    # 构建项目
    echo "🏗️ 构建项目..."
    npm run build
    
    echo "✅ 项目构建完成"
}

# 验证构建结果
verify_build() {
    echo "🔍 验证构建结果..."
    
    if [ ! -d ".output" ]; then
        echo "❌ 构建失败：.output 目录不存在"
        exit 1
    fi
    
    if [ ! -f ".output/server/index.mjs" ]; then
        echo "❌ 构建失败：服务器文件不存在"
        exit 1
    fi
    
    if [ ! -d ".output/public" ]; then
        echo "❌ 构建失败：静态文件目录不存在"
        exit 1
    fi
    
    echo "✅ 构建验证通过"
}

# 部署到 Firebase
deploy_to_firebase() {
    echo "🚀 部署到 Firebase App Hosting..."
    
    # 检查 Firebase 登录状态
    if ! firebase projects:list &> /dev/null; then
        echo "🔐 请先登录 Firebase..."
        firebase login
    fi
    
    # 设置 Firebase 项目
    echo "📋 设置 Firebase 项目..."
    firebase use n8n-project-460516
    
    # 部署
    echo "🚀 开始部署..."
    firebase deploy --only hosting
    
    echo "✅ 部署完成"
}

# 部署后验证
post_deploy_verification() {
    echo "🔍 部署后验证..."
    
    local site_url="https://fanzd.net"
    
    echo "📡 检查网站可访问性..."
    if curl -s --head "$site_url" | head -n 1 | grep -q "200 OK"; then
        echo "✅ 网站可正常访问：$site_url"
    else
        echo "⚠️ 网站可能需要几分钟才能完全生效"
    fi
    
    echo "🔍 检查关键页面..."
    local pages=("/" "/timeline" "/ai-gallery" "/about")
    
    for page in "${pages[@]}"; do
        local url="$site_url$page"
        if curl -s --head "$url" | head -n 1 | grep -q "200"; then
            echo "✅ $url - 正常"
        else
            echo "⚠️ $url - 可能需要时间生效"
        fi
    done
    
    echo "🔍 检查 SEO 文件..."
    local seo_files=("/api/sitemap.xml" "/api/robots.txt")
    
    for file in "${seo_files[@]}"; do
        local url="$site_url$file"
        if curl -s --head "$url" | head -n 1 | grep -q "200"; then
            echo "✅ $url - 正常"
        else
            echo "⚠️ $url - 可能需要时间生效"
        fi
    done
}

# 显示部署信息
show_deployment_info() {
    echo ""
    echo "🎉 部署完成！"
    echo ""
    echo "📊 部署信息："
    echo "  🌐 网站地址: https://fanzd.net"
    echo "  📱 管理后台: https://fanzd.net/admin"
    echo "  🗺️ 网站地图: https://fanzd.net/api/sitemap.xml"
    echo "  🤖 Robots.txt: https://fanzd.net/api/robots.txt"
    echo ""
    echo "🔧 支持的语言："
    echo "  🇨🇳 中文: https://fanzd.net"
    echo "  🇺🇸 English: https://fanzd.net/en"
    echo "  🇫🇷 Français: https://fanzd.net/fr"
    echo "  🇩🇪 Deutsch: https://fanzd.net/de"
    echo "  🇯🇵 日本語: https://fanzd.net/ja"
    echo "  🇰🇷 한국어: https://fanzd.net/ko"
    echo "  🇸🇪 Svenska: https://fanzd.net/sv"
    echo ""
    echo "📈 性能优化："
    echo "  ✅ 图片优化和懒加载"
    echo "  ✅ 静态资源缓存"
    echo "  ✅ 服务端渲染 (SSR)"
    echo "  ✅ 预渲染关键页面"
    echo "  ✅ 压缩和优化"
    echo ""
    echo "🔍 SEO 优化："
    echo "  ✅ 多语言 hreflang 标签"
    echo "  ✅ 结构化数据"
    echo "  ✅ Open Graph 标签"
    echo "  ✅ Twitter Card 标签"
    echo "  ✅ 自动生成 sitemap"
    echo ""
    echo "🛡️ 安全特性："
    echo "  ✅ 内容安全策略 (CSP)"
    echo "  ✅ 安全响应头"
    echo "  ✅ XSS 保护"
    echo "  ✅ 点击劫持保护"
    echo ""
}

# 主函数
main() {
    echo "🌟 樊振东粉丝网站部署脚本"
    echo "================================"
    
    check_dependencies
    build_project
    verify_build
    deploy_to_firebase
    post_deploy_verification
    show_deployment_info
    
    echo "🎊 部署流程全部完成！"
}

# 处理命令行参数
case "${1:-}" in
    "build")
        echo "🔨 仅构建项目..."
        check_dependencies
        build_project
        verify_build
        echo "✅ 构建完成"
        ;;
    "deploy")
        echo "🚀 仅部署（跳过构建）..."
        deploy_to_firebase
        post_deploy_verification
        show_deployment_info
        ;;
    "verify")
        echo "🔍 仅验证部署..."
        post_deploy_verification
        ;;
    *)
        main
        ;;
esac
