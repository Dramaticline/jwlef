# 贡献指南

感谢你考虑为 JWLE 做贡献！

## 如何贡献

### 报告问题

1. 在 [GitHub Issues](https://github.com/你的用户名/jwle/issues) 搜索是否已有相同问题
2. 新建 Issue，包含：
   - 复现步骤
   - 期望行为与实际行为
   - 浏览器/设备信息
   - 截图（如适用）

### 提交代码

1. Fork 本仓库
2. 创建分支：`git checkout -b feat/你的功能名`
3. 提交修改：`git commit -m "feat: 添加了 xxx 功能"`
4. 推送分支：`git push origin feat/你的功能名`
5. 创建 Pull Request

### 提交信息规范

采用 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `style:` 格式调整
- `refactor:` 重构
- `perf:` 性能优化
- `chore:` 构建/工具链

## 开发环境

无需构建工具链。直接编辑 `index.html`，用浏览器打开即可调试。

## 代码风格

- 保持单文件结构，不引入框架
- 遵循现有代码的缩进与命名风格
- 新功能尽量自包含，减少全局依赖

## 隐私红线

- **严禁**提交任何真实用户数据、记录、截图
- **严禁**在代码中硬编码 API Key、Token
- **严禁**引入会收集用户数据的第三方 SDK
- 测试时使用假数据

## 发布流程

详见 [发布指南](./docs/RELEASE.md)（如有）。
