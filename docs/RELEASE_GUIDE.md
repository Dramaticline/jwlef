# 🚀 JWLE GitHub 开源 + APK 发布 · 全方位步骤指南

> 本指南面向**零基础用户**，手把手带你完成从代码上传 GitHub 到生成 APK 的全过程。
> 预计耗时：**30~60 分钟**（首次部署 GitHub Pages 可能需要等待几分钟）。

---

## 📋 目录

- [第一部分：GitHub 开源发布](#第一部分github-开源发布)
- [第二部分：生成 APK（三种方案）](#第二部分生成-apk三种方案)
- [第三部分：创建 GitHub Release](#第三部分创建-github-release)
- [第四部分：常见问题排查](#第四部分常见问题排查)
- [第五部分：后续维护](#第五部分后续维护)

---

## 第一部分：GitHub 开源发布

### Step 1：注册 GitHub 账号

1. 打开 [github.com](https://github.com)，点击 **Sign up**
2. 按提示完成注册（用户名建议用英文，如 `yourname`）
3. 验证邮箱（必须完成，否则无法创建仓库）

### Step 2：创建仓库

1. 登录后点击右上角 **+** → **New repository**
2. 填写信息：
   - **Repository name**：`jwle`
   - **Description**（可选）：`JWLE —— 朝夕 · 本地优先的情侣日常记录 PWA`
   - **Visibility**：选择 **Public**（开源必须公开）
   - **不要**勾选 "Add a README file"（我们用上传的）
   - **不要**勾选 "Add .gitignore"（我们已包含）
   - **不要**勾选 "Choose a license"（我们已包含）
3. 点击 **Create repository**

### Step 3：上传代码

#### 方式 A：网页拖拽（最简单）

1. 在新建的仓库页面，点击 **uploading an existing file**
2. 把本包内的**所有文件和文件夹**选中拖入（不要拖整个文件夹，只拖里面的内容）
3. 滚动到底部，填写 Commit message：`chore: initial open-source release of JWLE v0.1.0`
4. 点击 **Commit changes**

#### 方式 B：Git 命令行（推荐，更专业）

```bash
# 1. 打开终端，进入本包解压后的目录
cd /path/to/jwle-pwa-release

# 2. 初始化 Git
git init -b main

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "chore: initial open-source release of JWLE v0.1.0"

# 5. 关联远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/jwle.git

# 6. 推送到 GitHub
git push -u origin main
```

### Step 4：启用 GitHub Pages

1. 进入仓库页面 → 点击 **Settings** 标签
2. 左侧菜单找到 **Pages**
3. **Source** 选择 `Deploy from a branch`
4. **Branch** 选择 `main`，目录选择 `/ (root)`
5. 点击 **Save**
6. 等待 1~3 分钟，页面会显示部署地址：
   `https://你的用户名.github.io/jwle/`
7. 打开该地址，确认应用正常加载

> ✅ 此时你的 PWA 已在线，可通过浏览器安装到桌面。

### Step 5：启用自动部署（可选但推荐）

仓库已包含 `.github/workflows/deploy.yml`，推送代码后会**自动部署**到 GitHub Pages。

1. 进入 Settings → Pages
2. **Source** 改为 `GitHub Actions`
3. 后续每次 `git push`，GitHub 会自动重新部署

---

## 第二部分：生成 APK（三种方案）

### 🏆 推荐方案：PWABuilder（最简单，5 分钟）

**适用条件**：已完成 GitHub Pages 部署（有 HTTPS 在线地址）

1. 打开 [PWABuilder.com](https://www.pwabuilder.com/)
2. 输入你的 PWA 地址：`https://你的用户名.github.io/jwle/`
3. 点击 **Start** → 等待检测完成
4. 检测通过后，点击 **Build My PWA**
5. 选择 **Android** 平台
6. 配置信息：
   - **App Name**：`JWLE`
   - **Package ID**：`app.jwle.couple`（或自定义，如 `com.yourname.jwle`）
   - **App Version**：`1.0.0`
   - **Start URL**：`/jwle/index.html`（GitHub Pages 需带路径）
   - **Icon**：上传 `icons/icon-512.png`
   - **Splash Color**：`#f6efe9`
7. 签名设置：
   - 测试用途：选择 **No signing**（生成无签名 APK）
   - 正式用途：选择 **New** 让 PWABuilder 生成密钥
8. 点击 **Download** 下载打包好的 ZIP
9. 解压 ZIP，找到 `app-release-signed.apk`（或 `app-release-unsigned.apk`）

> ⚠️ **注意**：GitHub Pages 的 `start_url` 必须包含仓库名路径 `/jwle/`。
> 如果是自定义域名，则填 `/index.html`。

### 方案 B：Capacitor（纯本地，无需上线）

**适用条件**：不想部署到网上，希望 APK 完全内置资源、断网也能用。

**前置依赖**：
- [Node.js](https://nodejs.org/) 18+
- [Android Studio](https://developer.android.com/studio)（含 Android SDK）
- Java JDK 17+

**步骤**：

```bash
# 1. 安装 Capacitor CLI
npm install -g @capacitor/cli @capacitor/core

# 2. 在项目目录初始化（package.json 不存在时先 npm init -y）
npm init -y
npx cap init jwle app.jwle.couple --web-dir .

# 3. 添加 Android 平台
npx cap add android

# 4. 同步 Web 资源（把 index.html 等复制到 Android 项目）
npx cap sync

# 5. 用 Android Studio 打开
npx cap open android
```

在 Android Studio 中：
1. 等待 Gradle 同步完成
2. 菜单 **Build** → **Generate Signed Bundle / APK**
3. 选择 **APK** → **Next**
4. 选择 **Create new...** 创建签名密钥（记住密码和 keystore 位置！）
5. 选择 **release** 变体 → **Finish**
6. 生成的 APK 在 `android/app/release/app-release.apk`

### 方案 C：手动 TWA（命令行，适合开发者）

**前置依赖**：Node.js 18+、JDK 11+、Android SDK

```bash
# 1. 安装 Bubblewrap
npm install -g @bubblewrap/cli

# 2. 初始化（需要在线 manifest URL）
bubblewrap init --manifest=https://你的用户名.github.io/jwle/manifest.json

# 3. 构建
bubblewrap build

# 4. 产物在 android/app/build/outputs/apk/release/
#    app-release-signed.apk —— 已签名，可用于侧载
#    app-release-bundle.aab —— AAB，用于 Play Store
```


## 第三部分：创建 GitHub Release

### Step 1：准备 Release

1. 进入仓库页面 → 点击右侧 **Releases** → **Create a new release**
2. **Choose a tag**：输入 `v0.1.0`，点击 **Create new tag**
3. **Target**：选择 `main`
4. **Release title**：`JWLE v0.1.0 —— 首个公开版本`

### Step 2：填写 Release Notes

复制以下内容到描述框（按需修改）：

```markdown
## JWLE v0.1.0

首个公开版本 🎉

### ✨ 功能

- 📋 每日任务管理
- 💕 心情打卡与记录
- 📝 日记功能
- ⏰ 本地提醒通知
- 📦 数据导出（ZIP / Markdown / JSON）
- 🌙 深色模式
- 📱 PWA 安装支持（桌面 + 移动端）

### 📲 安装 APK

1. 下载下方的 `jwle-0.1.0.apk`
2. Android 允许「安装未知来源应用」
3. 打开 APK 文件完成安装

### 🔐 隐私

所有数据仅保存在本机，不上传任何服务器。

### 📄 许可证

MIT © 2026 JWLE contributors
```

### Step 3：上传 APK

1. 在 **Attach binaries** 区域，拖入你的 APK 文件
2. 点击 **Publish release**

---

## 第四部分：常见问题排查

### GitHub Pages 打不开 / 白屏

| 现象 | 原因 | 解决 |
|------|------|------|
| 404 页面 | 部署未完成 | 等待 3~5 分钟，刷新 |
| 样式丢失 | 路径问题 | 确认 `manifest.json` 中路径为相对路径 `./` |
| 安装图标不出现 | manifest 未检测到 | 用 [PWABuilder](https://www.pwabuilder.com/) 检测并修复 |

### PWABuilder 检测失败

| 现象 | 原因 | 解决 |
|------|------|------|
| "Manifest not found" | URL 错误 | 确认地址以 `/` 结尾，如 `https://user.github.io/jwle/` |
| "HTTPS required" | 未用 HTTPS | GitHub Pages 默认 HTTPS，确认地址是 `https://` |
| "Icons too small" | 图标尺寸不足 | 确保有 192×192 和 512×512 图标 |

### APK 安装失败

| 现象 | 原因 | 解决 |
|------|------|------|
| "应用未安装" | 签名冲突 | 卸载旧版本再装，或保持同一签名密钥 |
| "解析错误" | APK 文件损坏 | 重新下载，检查文件大小是否完整 |
| 安装后白屏 | TWA 无法加载在线 PWA | 确认 GitHub Pages 可访问；改用 Capacitor 方案 |
| "不支持的架构" | 设备架构不匹配 | PWABuilder 下载时选择 "All architectures" |

### APK 打开后内容空白

**原因**：TWA 方案需要在线 PWA 可访问。如果设备没网或 GitHub Pages 挂了，TWA 就加载不出来。

**解决**：改用 Capacitor 方案，把 Web 资源内置到 APK 中。

---

## 第五部分：后续维护

### 更新代码

```bash
# 修改文件后
git add .
git commit -m "feat: 添加了新功能"
git push origin main
# GitHub Actions 会自动部署到 GitHub Pages
```

### 发布新版本

1. 更新 `index.html` 中的版本号（搜索 `v0.1.0` 替换为 `v0.2.0`）
2. 用 PWABuilder 重新生成 APK（包名不变，版本号递增）
3. 创建新 Release，tag 为 `v0.2.0`
4. 上传新 APK

### 关键提醒

- **签名密钥必须保存好**：丢失后无法更新已安装的 APK
- **包名不要随意改**：改了等于全新应用
- **真实数据不要提交**：`.gitignore` 已排除常见敏感文件
- **定期备份**：设置页 → 导出数据

---

## 📚 参考资源

- [PWABuilder 官方文档](https://docs.pwabuilder.com/)
- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Google Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [选择开源许可证](https://choosealicense.com/)
- [Conventional Commits 规范](https://www.conventionalcommits.org/)

---

## 🤝 同类开源项目参考

以下项目与 JWLE 理念相似，可参考其开源实践：

| 项目 | 特点 | 许可证 |
|------|------|--------|
| [sanfenzhongfu/habit-tracker](https://github.com/sanfenzhongfu/habit-tracker) | 单文件习惯打卡，零构建 | MIT |
| [pucio8/productivity-dashboard](https://github.com/pucio8/productivity-dashboard) | 单文件 PWA + manifest + SW | — |
| [pertracker/pertracker](https://github.com/pertracker/pertracker) | 隐私优先的健康记录 PWA | MIT |

---

**祝你开源顺利！** 🎉 如有问题，欢迎在 GitHub Issues 交流。
