# Telegram 节点池管理器

自动从 Telegram 频道抓取节点，经过可用性测试后同步到 GitHub。

## 功能

- 🔄 自动从 Telegram 频道增量抓取节点
- 📦 合并多个来源的节点 (snippet + telegram)
- ✅ 节点可用性测试 (TCP 连接检测)
- 📝 仅保存可用节点
- 🚀 自动同步到 GitHub 仓库

## 数据来源

### Telegram 频道
- **频道名称**: 免费高速订阅节点
- **频道 ID**: 1914963500

### Snippet 文件
- 可从 GitHub 或其他来源获取合并节点列表

## 可用性测试标准

- TCP 连接超时：5 秒
- 支持协议：Shadowsocks (ss)
- 仅保留可用的节点

## 使用参考

本项目的抓取和过滤逻辑参考了以下项目：

- **[VPM](https://github.com/xiaotaiye88/VPM)** - 开源节点池管理方案

## 输出文件

- `available.json` - 包含所有可用节点的 JSON 文件

## 定时任务

每 15 分钟自动执行一次，确保节点池保持最新。

## 本地保存路径

- `~/.hermes/pools/available.json`

## 许可证

MIT License
