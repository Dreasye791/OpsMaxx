# 数据库

PostgreSQL、MySQL、SQL Server、MongoDB 与 Redis，可直连，也可经跳板机。

[English](databases.md) · **简体中文**

[← 返回 README](../README.zh-CN.md)

---



OpsMaxx 支持 **PostgreSQL、MySQL、SQL Server、MongoDB 与 Redis**。可以用逐个字段填写，也可以直接给完整连接串；表与集合在侧边栏里浏览，每个数据库在自己的标签页中打开。

每种引擎在查询编辑器旁边都有一个**交互式 shell**：

- **MongoDB** —— `show dbs`、`use x`、`db.users.find({...}).sort({...}).limit(n)`、聚合管道、`ObjectId()` / `ISODate()` 辅助函数
- **PostgreSQL / MySQL / SQL Server** —— SQL，外加 psql 风格的元命令：`\l`、`\dt`、`\d <table>`、`\du`、`\c <database>`
- **Redis** —— 命令原样透传

**经 SSH 连数据库：** 在 *SSH 隧道* 字段里选一台跳板机，OpsMaxx 会自动开一条转发，于是你就能连到只在内网可路由的数据库。

**经 VPN 连数据库：** 在 *网络* 字段里选一个 WireGuard 或 OpenVPN 配置，隧道会在尝试连接之前先建立。跳板机与 VPN 可以同时设置 —— VPN 是最外层的传输通道，跳板机经由它到达。

**不只是查询，还能运维。** 客户端旁边还有一份关于服务器本身状况的读数：复制延迟、慢查询、表与索引的体积、连接数相对上限，以及其背后的锁与长事务。它覆盖 **PostgreSQL、MySQL/MariaDB、SQL Server、MongoDB 与 Redis** —— OpsMaxx 能连的每一种引擎都有，不会剩下某种引擎只有客户端、而运维面板被一句话打发。

一个报告零延迟的副本，并不等于一个健康的副本 —— 已经停掉的副本同样报零 —— 所以这份读数把「已追上」与「没有在复制」区分开来；这个区分是某个真正挂掉的副本教会它的。

---

[← 返回 README](../README.zh-CN.md)
