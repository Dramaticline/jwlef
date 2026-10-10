# JWLE

> 朝夕 · 一天的事，一天的了 —— 本地优先的情侣日常记录 PWA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-brightgreen.svg)](./manifest.json)

## ✨ 简介

JWLE 是一款注重隐私的情侣日常记录应用，采用「本地优先」设计理念：

- 📋 **每日任务** — 记录彼此的待办，完成后打个勾
- 💕 **心情打卡** — 每天记录心情，回看情绪波动
- 📝 **日记记录** — 随时写下想对 TA 说的话
- ⏰ **提醒** — 设置重要事项的本地通知
- 📦 **导出备份** — 支持 `.zip` / `.md` / `.json` 格式
- 🌙 **深色模式** — 保护深夜的眼睛

**核心原则：你的数据只属于你。** 不上传、不追踪、不分析。

## 🚀 快速开始

### 方式一：浏览器直接使用

```bash
# 克隆仓库
git clone https://github.com/你的用户名/jwle.git
cd jwle

# 启动本地服务器（HTTPS 或 localhost 才能注册 Service Worker）
npx serve .
# 或
python3 -m http.server 8080
```

打开 `http://localhost:8080`，即可使用全部功能。

### 方式二：安装到桌面（PWA）

1. 部署到任意静态托管（GitHub Pages / Vercel / Netlify）
2. 用 Chrome/Edge 打开 HTTPS 地址
3. 地址栏出现安装图标 → 点击安装
4. Safari：分享 → 添加到主屏幕

### 方式三：安装 APK（Android）

前往 [Releases](https://github.com/你的用户名/jwle/releases) 下载最新 `.apk`，允许「安装未知来源」后安装。

## 📦 部署到 GitHub Pages

1. Fork 本仓库
2. 进入 Settings → Pages
3. Source 选择 `main` 分支，`/ (root)` 目录
4. 保存，等待部署完成
5. 访问 `https://你的用户名.github.io/jwle/`

> 部署后可用 [PWABuilder](https://www.pwabuilder.com/) 一键生成 Android APK。

## 📁 项目结构

```
jwle/
├── index.html          # 主应用（单文件，无构建步骤）
├── manifest.json       # PWA Web App Manifest
├── sw.js               # Service Worker（离线缓存）
├── offline.html        # 离线回退页面
├── README.md           # 本文件
├── LICENSE             # MIT 许可证
├── PRIVACY.md          # 隐私说明
├── SECURITY.md         # 安全政策
├── CONTRIBUTING.md     # 贡献指南
├── .gitignore          # Git 忽略规则
└── icons/              # 应用图标（JW 标识）
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    ├── apple-touch-icon.png
    └── favicon.ico
```

## 🔐 隐私

- 所有数据保存在**本地设备**
- 无服务器、无账号、无埋点
- 不收集任何个人信息
- 同步功能需用户主动配置 WebDAV，不经过开发者服务器

详见 [PRIVACY.md](./PRIVACY.md)。

## 📄 许可证

[MIT](./LICENSE) © 2026 JWLE contributors

---

⭐ 如果这个项目对你有帮助，请给个 Star！
