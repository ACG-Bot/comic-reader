#!/bin/bash

# deploy.sh - 一键部署脚本 for Comic Reader（全平台��用）

# 打印提示信息
echo "🚀 开始部署 Comic Reader..."

# 检测操作系统
OS_TYPE=$(uname -s)
case "$OS_TYPE" in
    Linux*)
        if [ -d "/data/data/com.termux/files" ]; then
            PLATFORM="Termux"
        else
            PLATFORM="Linux"
        fi
        ;;
    Darwin*)
        PLATFORM="macOS"
        ;;
    CYGWIN*|MINGW32*|MSYS*|MINGW*)
        PLATFORM="Windows"
        ;;
    *)
        echo "❌ 错误：不支持的操作系统：$OS_TYPE"
        echo "支持的平台：Termux、Linux、macOS、Windows"
        exit 1
        ;;
esac
echo "检测到平台：$PLATFORM"

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "⚠️ Node.js 未安装，正在为你安装..."
    case "$PLATFORM" in
        Termux)
            pkg install nodejs -y
            ;;
        Linux)
            # 假设是 Ubuntu/Debian，其他发行版可能需要调整
            sudo apt update
            sudo apt install -y nodejs npm
            ;;
        macOS)
            # 检查是否安装 Homebrew
            if ! command -v brew &> /dev/null; then
                echo "⚠️ Homebrew 未安装，正在安装..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            brew install node
            ;;
        Windows)
            echo "⚠️ Windows 环境下无法自动安装 Node.js！"
            echo "请手动下载并安装 Node.js（建议版本 16 或以上）："
            echo "  1. 访问 https://nodejs.org/"
            echo "  2. 下载 LTS 版本（例如 16.x.x 或 18.x.x）"
            echo "  3. 运行安装程序并完成安装"
            echo "安装完成后，请重新运行此脚本。"
            exit 1
            ;;
    esac

    # 再次检查 Node.js 是否安装成功
    if ! command -v node &> /dev/null; then
        echo "❌ 错误：Node.js 安装失败！"
        echo "请手动安装 Node.js（建议版本 16 或以上），然后重新运行脚本。"
        exit 1
    fi
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "⚠️ npm 未安装，正在为你安装..."
    case "$PLATFORM" in
        Termux)
            pkg install npm -y
            ;;
        Linux)
            sudo apt install -y npm
            ;;
        macOS)
            # Homebrew 安装 Node.js 时会自动安装 npm
            echo "⚠️ npm 应该已随 Node.js 安装，请检查环境。"
            exit 1
            ;;
        Windows)
            echo "⚠️ npm 应该已随 Node.js 安装，请检查环境。"
            exit 1
            ;;
    esac

    # 再次检查 npm 是否安装成功
    if ! command -v npm &> /dev/null; then
        echo "❌ 错误：npm 安装失败！"
        echo "请手动安装 npm，然后重新运行脚本。"
        exit 1
    fi
fi

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "⚠️ 警告：Node.js 版本过低（当前版本：$(node -v））"
    echo "建议使用 Node.js 16 或以上版本，以确保兼容性。"
    echo "继续部署？（y/n）"
    read -r CONTINUE
    if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
        echo "部署已取消。"
        exit 1
    fi
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查安装是否成功
if [ $? -ne 0 ]; then
    echo "❌ 错误：依赖安装失败！"
    echo "请检查网络连接，或手动运行 'npm install' 查看详细错误信息。"
    exit 1
fi

# 检查端口是否被占用（需要 lsof 工具）
PORT=${PORT:-3000}
if command -v lsof &> /dev/null; then
    if lsof -i :$PORT &> /dev/null; then
        echo "❌ 错误：端口 $PORT 已被占用！"
        echo "请关闭占用端口的程序，或设置环境变量 PORT 指定其他端口（例如 PORT=3001 ./deploy.sh）。"
        exit 1
    fi
else
    echo "⚠️ 警告：lsof 未安装，无法检查端口 $PORT 是否被占用。"
fi

# 清理临时文件
if [ -d "temp" ]; then
    echo "🧹 清理临时文件..."
    rm -rf temp/*
fi

# 启动服务
echo "🚀 启动 Comic Reader 服务（端口：$PORT）..."
export PORT
npm start &

# 检查服务是否启动成功
sleep 2
if ! ps | grep -q "[n]ode.*server.js"; then
    echo "❌ 错误：服务启动失败！"
    echo "请检查 server.js 是否存在，或者手动运行 'npm start' 查看详细错误信息。"
    exit 1
fi

# 打印成功信息
echo "✅ Comic Reader 部署成功！"
echo "访问以下地址开始阅读漫画："
echo "  http://localhost:$PORT"
echo "（如果在局域网内访问，请使用设备的 IP 地址，例如 http://192.168.1.100:$PORT）"
echo "按 Ctrl+C 停止服务。"
