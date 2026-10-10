# 📲 JWLE × PWABuilder 构建 APK 完整指南

> 本文档专门讲解如何用 **PWABuilder** 把 JWLE 在线 PWA 一键转成 Android APK。
> 适合人群：零 Android 开发经验、不想装 Android Studio、只想快速拿到安装包的用户。
> 预计耗时：**10~15 分钟**（不含 GitHub Pages 首次部署等待时间）。

---

## 📋 前置条件检查清单

开始前请确认以下条件**全部满足**：

| # | 条件 | 如何确认 | 不满足怎么办 |
|---|------|----------|-------------|
| 1 | GitHub 仓库已创建 | 浏览器打开 `https://github.com/你的用户名/jwle` 能看到代码 | 参考 [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) 第一部分 |
| 2 | GitHub Pages 已启用 | 浏览器打开 `https://你的用户名.github.io/jwle/` 能看到应用界面 | 参考 [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) Step 4 |
| 3 | 地址是 HTTPS | 浏览器地址栏显示 🔒 图标 | GitHub Pages 默认 HTTPS，确认不是 `http://` |
| 4 | 能正常打开 | 页面加载完整、图标显示正常 | 检查文件路径和 manifest.json |
| 5 | 电脑有解压软件 | 能解压 ZIP | Windows 自带，Mac 自带，或用 7-Zip |

---

## 🚀 完整步骤

### Step 1：打开 PWABuilder

1. 浏览器访问 **[PWABuilder.com](https://www.pwabuilder.com/)**
2. 页面中央有一个输入框，标题类似 "URL to your PWA"

### Step 2：输入 PWA 地址

在输入框中填入你的 GitHub Pages 地址：

```
https://你的用户名.github.io/jwle/
```

> ⚠️ **三个坑，务必注意**：
> - 必须以 `https://` 开头（不是 `http://`）
> - 必须以 `/` 结尾（末尾有斜杠）
> - 仓库名 `jwle` 必须和实际仓库名一致

### Step 3：点击 Start，等待检测

1. 点击 **Start** 按钮（或按 Enter）
2. PWABuilder 会开始分析你的 PWA，大约等待 10~30 秒
3. 你会看到一个仪表盘，显示各项检测的通过情况

**正常结果应该是：**

| 检测项 | 状态 | 说明 |
|--------|------|------|
| HTTPS | ✅ Pass | GitHub Pages 默认支持 |
| Web App Manifest | ✅ Pass | JWLE 的 manifest.json 已配置完整 |
| Service Worker | ✅ Pass | sw.js 已实现缓存 |
| Icons | ✅ Pass | 10 个尺寸图标已就绪 |
| Apple Touch Icons | ✅ Pass | apple-touch-icon.png 已配置 |
| Theme Color | ✅ Pass | `#f6efe9` 已设置 |

> 如果某项 ❌ Fail，不要跳过，先看下方 [常见问题](#-常见问题) 排查。

### Step 4：进入 Android 打包流程

1. 在检测仪表盘页面，找到并点击 **"Build My PWA"** 按钮
2. 选择平台：**Android**（iOS 和 Windows 本次不选）
3. 点击 **Next** 或 **Options**

### Step 5：配置 Android 打包参数

进入配置页面后，按以下表格逐项填写：

| 字段 | 填写内容 | 说明 |
|------|----------|------|
| **App Name** | `JWLE` | 手机上显示的应用名称 |
| **Package ID** | `app.jwle.couple` | Android 唯一标识，格式：`域名反写.项目名`，建议改成你自己独有的，如 `com.你的名字.jwle` |
| **App Version** | `1.0.0` | 版本号，格式：主.次.修订 |
| **App Version Code** | `1` | 内部版本编号，每次更新 +1 |
| **Start URL** | `/jwle/index.html` | ⚠️ **GitHub Pages 必须带仓库名路径** |
| **Display** | `standalone` | 已默认，全屏无浏览器栏 |
| **Theme Color** | `#f6efe9` | 状态栏背景色 |
| **Background Color** | `#f6efe9` | 启动屏背景色 |
| **Icon** | 上传 `icons/icon-512.png` | 点击上传，选择 512×512 大图标 |
| **Maskable Icon** | 可留空或同上传 | 自适应图标，建议上传同一张 |
| **Splash Screen** | 自动生成 | 无需修改 |

> 💡 **Package ID 很重要**：一旦确定就不要改，改了等于全新应用，无法覆盖安装。

### Step 6：签名设置

PWABuilder 会提示你选择签名方式：

#### 选项 A：New（推荐用于测试）

1. 选择 **"New"**
2. PWABuilder 会自动生成签名密钥
3. 下载的 ZIP 中会包含一个 `signing.keystore` 文件
4. **务必保存好这个文件**，下次更新版本需要它

#### 选项 B：No signing（仅测试）

1. 选择 **"No signing"**
2. 生成无签名 APK
3. ⚠️ **不能上传到 Play Store**，只能本地侧载测试

#### 选项 C：Upload your own（有经验者）

如果你已有 keystore 文件，可以选择上传。

### Step 7：开始构建

1. 确认所有配置无误
2. 点击 **"Download"** 或 **"Build"** 按钮
3. 等待构建完成（约 30~60 秒）
4. 浏览器自动下载一个 ZIP 文件，文件名类似 `jwle-android.zip`

### Step 8：解压并找到 APK

1. 解压下载的 ZIP 文件
2. 进入解压后的文件夹，找到 `app-release-signed.apk`（或 `app-release-unsigned.apk`）
3. 这就是你要的 Android 安装包！

> 📁 完整目录结构参考：
> ```
> jwle-android/
> ├── app-release-signed.apk    ← 这个就是安装包！
> ├── signing.keystore           ← 签名密钥，保存好！
> ├── signing-key-info.txt       ← 密钥信息说明
> ├── assetlinks.json            ← 数字资产链接文件
> └── ...（其他文件）
> ```

### Step 9：安装到手机

#### 方式 A：传到手机安装

1. 把 APK 传到手机（微信文件传输、数据线、网盘均可）
2. 手机上打开 APK 文件
3. 如果提示"不允许安装未知来源应用"：
   - Android 8+：系统会弹出授权框 → 允许当前来源（如"文件管理"或"浏览器"）
   - 小米/华为等：进入 设置 → 隐私/安全 → 允许安装未知来源应用
4. 点击"安装" → 等待完成 → 打开

#### 方式 B：ADB 安装（开发者推荐）

```bash
# 手机开启 USB 调试，连接电脑
adb install app-release-signed.apk
```

#### 方式 C：侧载测试工具

- 可以用 [Ladle](https://ladle.io/) 等工具无线安装
- 或使用 Android Studio 的 Device Manager

---

## ✅ 安装后验收清单

安装完成后，逐项验证：

| # | 检查项 | 预期结果 |
|---|--------|----------|
| 1 | 桌面图标 | 显示 JW 标识图标 |
| 2 | 启动屏 | 显示 #f6efe9 米色背景，短暂显示后进入应用 |
| 3 | 全屏模式 | 无浏览器地址栏，像原生 App |
| 4 | 首页加载 | 正常显示日期、导航栏 |
| 5 | 功能可用 | 能添加任务、记录心情 |
| 6 | 退出重开 | 关闭后重新打开，数据保留 |
| 7 | 离线可用 | 关闭 WiFi 后打开，仍能使用（Service Worker 缓存生效） |

全部通过 → 恭喜，APK 构建成功！ 🎉

---

## 📤 上传到 GitHub Release

构建好的 APK 可以上传到 GitHub Releases，让别人也能下载：

1. 打开 `https://github.com/你的用户名/jwle/releases`
2. 点击 **"Create a new release"**
3. **Choose a tag**：输入 `v0.1.0`，点 **Create new tag**
4. **Release title**：`JWLE v0.1.0 —— 首个公开版本`
5. **Description** 填入以下内容：

```markdown
## JWLE v0.1.0

🎉 首个公开版本

### ✨ 功能一览

- 📋 每日任务管理
- 💕 心情打卡与记录
- 📝 日记功能
- ⏰ 本地提醒通知
- 📦 数据导出（ZIP / Markdown / JSON）
- 🌙 深色模式
- 📱 支持 PWA 安装（桌面 + 移动端）

### 📲 APK 安装说明

1. 下载下方 `jwle-0.1.0.apk`
2. Android 允许「安装未知来源应用」
3. 打开 APK 完成安装

### 🔐 隐私说明

所有数据仅保存在本机，不上传任何服务器。

### 📄 许可证

MIT © 2026 JWLE contributors
```

6. 把 APK 文件拖入 **Attach binaries** 区域
7. 点击 **Publish release**

---

## 🔄 后续更新流程

每次修改代码后，重新生成 APK：

1. 修改代码 → `git push` 到 GitHub
2. GitHub Pages 自动更新（约 1 分钟）
3. 打开 PWABuilder → 输入同一地址 → Start
4. **Package ID 保持不变**（和上次一样！）
5. **App Version Code +1**（如从 1 改为 2）
6. **使用同一个签名密钥**（上传上次保存的 `signing.keystore`）
7. 重新下载 APK
8. 上传到 GitHub Release，创建新 tag（如 `v0.2.0`）

> ⚠️ **三个不能变**：Package ID、签名密钥、应用名称。变了就无法覆盖安装。

---

## 🔐 签名密钥管理

### 保存密钥

下载的 ZIP 中包含 `signing.keystore` 和 `signing-key-info.txt`，务必：

1. **复制到两个不同位置**（如电脑 + U 盘）
2. **记录密码和别名**（写在纸上或密码管理器）
3. **不要上传到 GitHub**（`.gitignore` 已排除）

### 密钥信息记录模板

建议创建一个 `my-keystore-info.txt`（仅本地保存，不上传）：

```
应用名: JWLE
包名: app.jwle.couple
密钥库文件: signing.keystore
密钥库密码: xxxxxxxx
密钥别名: xxxxxxxx
密钥密码: xxxxxxxx
生成日期: 2026-xx-xx
```

### 密钥丢失怎么办

- 无法更新已安装的 APK（签名不一致）
- 只能生成新密钥，用户需卸载旧版再装新版
- 建议一开始就备份好

---

## ❓ 常见问题

### Q1：PWABuilder 检测失败，"Manifest not found"

**原因**：URL 路径不正确

**解决**：
- 确认 URL 以 `/` 结尾：`https://用户名.github.io/jwle/`
- 不要填仓库原始文件地址（`raw.githubusercontent.com`）
- 不要填 `index.html` 结尾的路径（除非你的 start_url 配置如此）

### Q2：检测提示 "Icons too small" 或 "Missing 512x512 icon"

**原因**：PWABuilder 检测时图标路径解析失败

**原因与解决**（⚠️ **最常见错误**，请优先排查）：

PWABuilder 报这三个图标错误，通常是以下原因之一：

#### ① 图标路径用了相对路径（`./` 开头）

PWABuilder 解析 manifest 时，相对路径可能无法正确拼接。

**修复**：所有图标 `src` 改用**绝对路径**（以 `/` 开头）：

```json
// ❌ 错误写法
{ "src": "./icons/icon-192.png", "sizes": "192x192", "type": "image/png" }

// ✅ 正确写法
{ "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" }
```

> ⚠️ **特别注意 GitHub Pages 项目站点的路径问题**：
> - 如果你直接绑定了自定义域名，`start_url` 和图标路径用 `/` 即可
> - 如果是 `https://用户名.github.io/项目名/` 这种子路径，有两种解法：
>   - **方案 A**（推荐）：把 `start_url` 设为 `/项目名/index.html`，图标路径设为 `/项目名/icons/xxx.png`
>   - **方案 B**：绑定自定义域名后，所有路径统一用 `/` 开头

#### ② 图标缺少 `type` 字段

PWABuilder 严格要求每个图标必须声明 MIME 类型。

```json
// ❌ 缺少 type
{ "src": "/icons/icon-192.png", "sizes": "192x192" }

// ✅ 有 type
{ "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" }
```

#### ③ Shortcut 图标同样需要 `type` 字段

很多人只修了主图标，忘了 shortcut 里的图标也要加 `type`：

```json
"shortcuts": [
  {
    "name": "今日",
    "url": "/index.html#work",
    "icons": [
      {
        "src": "/icons/icon-192.png",
        "sizes": "192x192",
        "type": "image/png"   // ← 不能省略
      }
    ]
  }
]
```

#### ④ 图标文件实际不存在或尺寸不匹配

即使 manifest 写得对，如果 PNG 文件本身损坏、尺寸不对、或文件名拼错，PWABuilder 照样报错。

**自检方法**：浏览器直接打开图标 URL，确认能显示：
```
https://用户名.github.io/jwle/icons/icon-512.png
```

#### ⑤ 缺少 maskable 图标（⚠️ 警告，非致命）

Android 自适应图标需要 `purpose: "maskable"` 的版本：

```json
{
  "src": "/icons/icon-192-maskable.png",
  "sizes": "192x192",
  "type": "image/png",
  "purpose": "maskable"
}
```

> maskable 图标要求：核心内容（文字、logo）必须放在安全区内（四周各留 20% 边距），否则在 Android 上会被圆角/水滴屏裁切。

**JWLE 项目已完成上述所有修复**，直接上传到 GitHub Pages 即可被 PWABuilder 正常识别。

### Q3：APK 安装后白屏

**原因**：TWA 无法加载在线 PWA（网络问题或 URL 配置错误）

**排查**：
1. 确认手机有网
2. 在手机浏览器打开 `https://用户名.github.io/jwle/`，确认能访问
3. 检查 PWABuilder 配置的 **Start URL** 是否正确（GitHub Pages 需带 `/jwle/` 前缀）
4. 如果经常离线使用，建议改用 [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) 中的 Capacitor 方案

### Q4：APK 打开后显示浏览器地址栏

**原因**：Digital Asset Links 未配置

**解决**：
- 将 ZIP 中的 `assetlinks.json` 部署到 `https://用户名.github.io/.well-known/assetlinks.json`
- GitHub Pages 部署方式：在仓库根目录创建 `.well-known/assetlinks.json` 文件，内容复制自 ZIP 中的同名文件
- 注意：GitHub Pages 默认不处理 `.json` 文件的 MIME 类型，可能需要额外配置

> 💡 如果只是自己用，地址栏不影响功能，可以暂时忽略。

### Q5：安装提示 "应用未安装"

**原因**：签名冲突

**解决**：
1. 先卸载手机上已有的 JWLE
2. 确保每次构建使用**同一个签名密钥**
3. 如果换了电脑，记得把之前保存的 `signing.keystore` 上传到 PWABuilder

### Q6：PWABuilder 下载的 ZIP 里没有 APK？

**原因**：构建可能失败了

**解决**：
1. 检查浏览器是否有拦截下载
2. 重新点击 Build，等待完整构建过程
3. 如果持续失败，尝试换浏览器（Chrome 优先）

### Q7：想同时支持 Android 和 iOS？

- **Android**：本文档的 PWABuilder 方案即可
- **iOS**：iPhone 用户直接在 Safari 中打开 PWA 地址 → 分享 → 添加到主屏幕，无需 APK

---

## 📊 与其他方案对比

| 维度 | PWABuilder（本文） | Capacitor | Bubblewrap CLI |
|------|-------------------|-----------|----------------|
| 难度 | ⭐ 最简单 | ⭐⭐⭐ 需装 Android Studio | ⭐⭐ 需命令行 |
| 时间 | 10~15 分钟 | 30~60 分钟 | 20~30 分钟 |
| 需要域名 | ✅ 必需 | ❌ 不需要 | ✅ 必需 |
| 离线启动 | ⚠️ 依赖 SW 缓存 | ✅ 完全内置 | ⚠️ 依赖 SW 缓存 |
| 上架 Play Store | ✅ 支持 AAB | ✅ 支持 AAB | ✅ 支持 AAB |
| 推荐场景 | 快速侧载测试 | 需要纯离线 | 喜欢命令行的开发者 |

---

## 🔗 相关文档

- [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) — 完整的 GitHub 开源 + APK 发布总指南
- [README.md](../README.md) — 项目主文档
- [PRIVACY.md](../PRIVACY.md) — 隐私说明
- [PWABuilder 官方文档](https://docs.pwabuilder.com/)
- [PWABuilder Android 打包文档](https://docs.pwabuilder.com/#/builder/android?id=packaging)

---

## 💡 快速回顾

```
① GitHub 上传代码 → ② 开启 Pages → ③ PWABuilder 输入 URL → ④ 配置参数
→ ⑤ 设置签名 → ⑥ 下载 ZIP → ⑦ 解压拿 APK → ⑧ 安装测试 → ⑨ 上传 Release
```

**最短路径**：如果你已经有 GitHub Pages 地址，只需 **Step 2 → Step 9**，10 分钟搞定。
