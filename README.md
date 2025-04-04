# Comic Reader 懒人包 - 小白也能轻松上手的漫画阅读器

欢迎使用 Comic Reader！这是一个简单易用的漫画阅读器，支持上传 zip 文件并在线阅读漫画，支持实时页码显示，适合在手机（Termux）、电脑（Windows/Linux/macOS）上使用。

本懒人包已经为你准备好了一切，只需按照以下步骤操作，即可快速启动并享受漫画阅读的乐趣！

---

## 功能亮点
- **上传 zip 文件**：支持上传包含图片的 zip 文件，自动解压并显示漫画。
- **支持多种图片格式**：支持 `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` 格式的图片。
- **实时页码显示**：左下角显示当前页码（例如“第 1/62 页”），滑动时自动更新。
- **自动清理临时文件**：上传的文件会在 30 分钟后自动删除，节省空间。
- **跨平台支持**：可以在手机（Termux）、Windows、Linux、macOS 上运行。

---

## 准备工作

### 1. 环境要求
你需要准备以下环境：
- **Node.js**：一个运行 JavaScript 的工具，版本建议 16 或以上。
  - 如果你没有安装 Node.js，下面会教你如何安装。
- **浏览器**：任何现代浏览器（如 Chrome、Firefox、Safari）都可以。
- **操作系统**：
  - 手机：Android（使用 Termux 应用）。
  - 电脑：Windows、Linux 或 macOS。

### 2. 下载懒人包
- 下载 `comic-reader-lazy.zip` 文件（由提供者分享）。
- 如果你没有下载链接，可以联系提供者获取。

---

## 部署步骤（小白向）

### 一、Termux（Android 手机）用户

#### 1. 安装 Termux
1. 打开手机的应用商店（Google Play 或其他应用市场）。
2. 搜索 `Termux`，下载并安装。
3. 打开 Termux 应用，进入一个黑色的命令行界面。

#### 2. 安装 Node.js
1. 在 Termux 中输入以下命令，按回车：
   pkg install nodejs
2. 等待安装完成（可能需要几分钟，视网络速度而定）。
3. 安装完成后，输入以下命令检查 Node.js 是否安装成功：
   node -v
   - 如果显示版本号（例如 `v16.20.0`），说明安装成功。
   - 如果提示错误，请重新运行安装命令，或检查网络连接。

#### 3. 解压懒人包
1. 将 `comic-reader-lazy.zip` 文件放到手机的 `Download` 文件夹（路径通常是 `/storage/emulated/0/Download/`）。
2. 在 Termux 中输入以下命令，进入 Download 目录：
   cd /storage/emulated/0/Download
3. 解压文件：
   unzip comic-reader-lazy.zip
   - 如果提示 `unzip: command not found`，先安装 unzip：
     pkg install unzip
     然后重新运行解压命令。
4. 进入解压后的目录：
   cd comic-reader-lazy

#### 4. 一键部署
1. 运行以下命令，赋予部署脚本执行权限：
   chmod +x deploy.sh
2. 运行一键部署脚本：
   ./deploy.sh
   - 脚本会自动安装依赖（可能需要几分钟，视网络速度而定）。
   - 安装完成后，服务会自动启动，你会看到类似以下输出：
     Comic reader running at http://localhost:3000

#### 5. 访问服务
1. 打开手机上的浏览器（推荐 Chrome 或 Firefox）。
2. 在地址栏输入：
   http://localhost:3000
   按回车，进入漫画阅读器页面。

---

### 二、Windows 用户

#### 1. 安装 Node.js
1. 打开浏览器，访问 Node.js 官网：`https://nodejs.org/`。
2. 下载推荐版本（LTS 版本，例如 `16.x.x` 或 `18.x.x`），选择 `Windows Installer (.msi)`。
3. 下载完成后，双击安装文件（例如 `node-v16.20.0-x64.msi`）。
4. 按照提示安装：
   - 点击“Next”，接受许可协议。
   - 选择安装路径（默认即可），继续“Next”。
   - 勾选“Automatically install the necessary tools”（自动安装工具），点击“Next”。
   - 点击“Install”开始安装，完成后点击“Finish”。
5. 打开命令提示符（按 `Win + R`，输入 `cmd`，按回车）。
6. 输入以下命令检查 Node.js 是否安装成功：
   node -v
   - 如果显示版本号（例如 `v16.20.0`），说明安装成功。
   - 如果提示错误，请重新安装。

#### 2. 解压懒人包
1. 将 `comic-reader-lazy.zip` 文件放到任意目录（例如 `C:\Users\YourName\Downloads`）。
2. 右键点击 `comic-reader-lazy.zip`，选择“解压到 comic-reader-lazy/”或“全部提取”。
3. 解压完成后，进入解压后的目录（例如 `C:\Users\YourName\Downloads\comic-reader-lazy`）。

#### 3. 安装依赖
1. 打开命令提示符（按 `Win + R`，输入 `cmd`，按回车）。
2. 进入解压后的目录：
   cd C:\Users\YourName\Downloads\comic-reader-lazy
   （将路径替换为你实际的解压路径）
3. 输入以下命令安装依赖：
   npm install
   - 等待安装完成（可能需要几分钟，视网络速度而定）。

#### 4. 启动服务
1. 在命令提示符中输入：
   npm start
   - 服务启动后，你会看到：
     Comic reader running at http://localhost:3000

#### 5. 访问服务
1. 打开浏览器（推荐 Chrome 或 Firefox）。
2. 在地址栏输入：
   http://localhost:3000
   按回车，进入漫画阅读器页面。

---

### 三、Linux/macOS 用户

#### 1. 安装 Node.js
1. 打开终端。
2. **Ubuntu/Debian**：
   sudo apt update
   sudo apt install nodejs npm
3. **macOS**（使用 Homebrew）：
   - 如果没有 Homebrew，先安装：
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   - 安装 Node.js：
     brew install node
4. 检查 Node.js 是否安装成功：
   node -v
   - 如果显示版本号（例如 `v16.20.0`），说明安装成功。

#### 2. 解压懒人包
1. 将 `comic-reader-lazy.zip` 文件放到任意目录（例如 `~/Downloads`）。
2. 打开终端，进入目录：
   cd ~/Downloads
3. 解压文件：
   unzip comic-reader-lazy.zip
4. 进入解压后的目录：
   cd comic-reader-lazy

#### 3. 一键部署
1. 运行以下命令，赋予部署脚本执行权限：
   chmod +x deploy.sh
2. 运行一键部署脚本：
   ./deploy.sh
   - 脚本会自动安装依赖并启动服务。

#### 4. 访问服务
1. 打开浏览器（推荐 Chrome 或 Firefox）。
2. 在地址栏输入：
   http://localhost:3000
   按回车，进入漫画阅读器页面。

---

## 使用说明

### 1. 上传漫画
1. 打开浏览器，访问 `http://localhost:3000`。
2. 点击“选择文件”按钮，选择一个包含漫画图片的 zip 文件。
   - 确保 zip 文件包含图片（支持 `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` 格式）。
   - 如果 zip 文件是加密的（需要密码），当前版本不支持解压。
3. 点击“上传漫画”按钮，等待加载完成。

### 2. 阅读漫画
- 加载完成后，页面会显示漫画图片。
- 滑动页面即可翻页。
- 左下角会显示当前页码（例如“第 1/62 页”），随着滑动实时更新。

### 3. 关闭服务
- 返回到运行服务的终端（Termux 或命令提示符）。
- 按 `Ctrl + C` 关闭服务。
- 关闭时，临时文件会自动清理。

---

## 常见问题排查

### 1. 无法访问 `http://localhost:3000`
- **可能原因**：
  - 服务未启动。
  - 端口被占用。
- **解决方法**：
  1. 确保服务已启动，检查终端是否显示：
     Comic reader running at http://localhost:3000
     如果没有，重新运行 `npm start` 或 `./deploy.sh`。
  2. 如果端口被占用，修改 `server.js` 中的端口号（将 `const port = 3000` 改为其他值，例如 `3001`），然后重新启动服务。

### 2. 上传文件后显示“加载漫画失败”
- **可能原因**：
  - zip 文件格式不正确。
  - zip 文件是加密的。
- **解决方法**：
  1. 确保 zip 文件包含图片（`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`）。
  2. 在终端中测试解压：
     unzip -l 你的文件.zip
     - 如果提示需要密码，说明文件是加密的，当前版本不支持。
     - 如果没有图片文件，检查 zip 文件内容。
  3. 尝试使用其他 zip 文件。

### 3. 页码显示不正确
- **可能原因**：
  - 浏览器窗口大小异常。
  - 快速滑动导致计算错误。
- **解决方法**：
  1. 刷新页面（按 F5）。
  2. 调整浏览器窗口大小，确保图片正常显示。
  3. 如果问题持续，打开浏览器开发者工具（F12），查看控制台是否有错误信息。

### 4. 依赖安装失败
- **可能原因**：
  - 网络问题。
  - Node.js 版本过低。
- **解决方法**：
  1. 确保网络连接正常，重新运行 `npm install`。
  2. 检查 Node.js 版本：
     node -v
     如果版本低于 16，升级 Node.js（参考“安装 Node.js”步骤）。
  3. 如果仍然失败，提供终端的错误日志。

### 5. Termux 提示“Permission denied”
- **可能原因**：
  - Termux 没有存储权限。
- **解决方法**：
  1. 授予 Termux 存储权限：
     termux-setup-storage
  2. 按照提示允许权限。
  3. 重新运行解压和部署命令。

---

## 进阶操作

### 1. 修改端口号
如果 `3000` 端口被占用：
1. 打开 `server.js` 文件。
2. 找到以下行:
   const port = 3000;
   修改为其他端口，例如：
   const port = 3001;
3. 保存文件，重新启动服务：
   npm start
4. 访问新的地址，例如 `http://localhost:3001`。

### 2. 在局域网内访问
如果你想在其他设备上访问（例如用另一台手机或电脑访问）：
1. 确保两台设备在同一 Wi-Fi 网络下。
2. 在运行服务的设备上查看 IP 地址：
   - **Termux**：
     ifconfig
     找到 `wlan0` 下的 `inet addr`，例如 `192.168.1.100`。
   - **Windows**：
     ipconfig
     找到“IPv4 地址”，例如 `192.168.1.100`。
3. 在另一台设备的浏览器中输入：
   http://192.168.1.100:3000
   （将 IP 地址替换为实际值）

### 3. 手动清理临时文件
临时文件存储在 `temp` 目录下，默认 30 分钟后自动清理。如果需要手动清理：
1. 停止服务（按 `Ctrl + C`）。
2. 进入 `temp` 目录：
   cd temp
3. 删除所有文件：
   - **Termux/Linux/macOS**：
     rm -rf *
   - **Windows**：
     del * /Q

---

## 问题反馈
如果遇到问题，请提供以下信息以便排查：
1. **环境信息**：
   - 操作系统（Termux/Windows/Linux/macOS）。
   - Node.js 版本（运行 `node -v` 查看）。
2. **日志信息**：
   - 终端中的完整日志输出。
   - 浏览器开发者工具中的控制台日志（按 F12 打开开发者工具，切换到“Console”选项卡）。
3. **使用的 zip 文件**：
   - 如果可能，提供你使用的 zip 文件，或者描述文件内容（是否有图片、是否加密）。
4. **问题描述**：
   - 详细描述问题（例如“上传后显示加载失败”“页码不更新”）。

---

## 致谢
感谢使用 Comic Reader！希望你享受阅读漫画的乐趣！如果有任何建议或改进需求，欢迎反馈。
