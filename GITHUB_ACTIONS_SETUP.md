# GitHub Actions 自动发布配置说明

## 迁移概述
已将 Travis CI 自动发布流程迁移至 GitHub Actions。

## 配置文件
- **新配置文件**: `.github/workflows/deploy.yml`
- **原配置文件**: `.travis.yml` (可删除)

## 功能说明
该工作流会在以下条件下自动触发：
- 推送代码到 `master` 分支

执行流程：
1. 检出代码
2. 设置 Node.js 环境 (v14.18.2)
3. 使用 yarn 安装依赖
4. 执行构建命令 (`yarn build`)
5. 通过 SSH 连接到服务器
6. 清空远程目录并上传新的构建文件

## 必要配置

### 1. 添加 SSH 私钥密钥
需要在 GitHub 仓库设置中添加加密的 SSH 私钥：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加以下密钥：
   - **Name**: `SSH_PRIVATE_KEY`
   - **Value**: 你的 SSH 私钥内容 (对应原 `id_rsa.enc` 解密后的内容)

### 2. 获取私钥方法
如果需要使用原有的私钥，可以：
```bash
# 使用原有的加密密钥解密
openssl aes-256-cbc -K $encrypted_a2df9b418bbc_key -iv $encrypted_a2df9b418bbc_iv \
  -in id_rsa.enc -out id_rsa -d
# 然后将 id_rsa 的内容复制到 GitHub Secrets
```

或者生成新的密钥对：
```bash
ssh-keygen -t rsa -b 4096 -f github_actions_deploy
# 将公钥添加到服务器 ~/.ssh/authorized_keys
# 将私钥内容添加到 GitHub Secrets
```

## 与 Travis CI 的主要区别

| 特性 | Travis CI | GitHub Actions |
|------|-----------|----------------|
| 缓存配置 | 手动配置 | 自动缓存 (setup-node) |
| SSH 密钥管理 | 加密文件 | GitHub Secrets |
| 执行环境 | Ubuntu | Ubuntu-latest |
| 集成度 | 外部服务 | GitHub 原生 |

## 验证部署
提交代码到 master 分支后，可以在：
- 仓库 → Actions 标签页
- 查看 "Deploy to Production" 工作流的执行状态

## 注意事项
1. 确保服务器 `39.104.15.110` 允许来自 GitHub Actions 的连接
2. 首次运行可能需要确认主机密钥（已自动配置跳过）
3. 建议先在非生产环境测试工作流
