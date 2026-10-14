<div align="center">

<img src="docs/images/logo.png" alt="OpsMaxx logo" width="120" />

# OpsMaxx

[English](README.md) · **简体中文**

**免费的 SSH 客户端、SFTP 文件浏览器、数据库客户端、密钥保险库与安全的 AI 代理网关 —— 全在一个桌面应用里。**

你的 DevOps 工作站，随处可用。Windows · macOS · Linux。

**[opsmaxx.dev](https://opsmaxx.dev)**

<a href="https://github.com/OpsMaxx/OpsMaxx/releases/latest">
<img src="https://img.shields.io/badge/Download%20OpsMaxx-22c7d6?style=for-the-badge&labelColor=0d1119" alt="Download OpsMaxx" height="34" />
</a>

<a href="https://github.com/OpsMaxx/OpsMaxx/releases/latest"><img src="https://img.shields.io/badge/Windows-0d1119?style=for-the-badge&logo=windows&logoColor=22c7d6" alt="Windows" height="26" /></a>
<a href="https://github.com/OpsMaxx/OpsMaxx/releases/latest"><img src="https://img.shields.io/badge/macOS-0d1119?style=for-the-badge&logo=apple&logoColor=22c7d6" alt="macOS" height="26" /></a>
<a href="https://github.com/OpsMaxx/OpsMaxx/releases/latest"><img src="https://img.shields.io/badge/Linux-0d1119?style=for-the-badge&logo=linux&logoColor=22c7d6" alt="Linux" height="26" /></a>

[![Latest release](https://img.shields.io/github/v/release/OpsMaxx/OpsMaxx?style=flat-square&label=release&color=22c7d6&labelColor=30363d&sort=semver)](https://github.com/OpsMaxx/OpsMaxx/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/OpsMaxx/OpsMaxx/total?style=flat-square&label=downloads&color=22c7d6&labelColor=30363d)](https://github.com/OpsMaxx/OpsMaxx/releases)
[![Stars](https://img.shields.io/github/stars/OpsMaxx/OpsMaxx?style=flat-square&label=stars&color=22c7d6&labelColor=30363d)](https://github.com/OpsMaxx/OpsMaxx/stargazers)
[![License](https://img.shields.io/badge/license-MIT-22c7d6?style=flat-square&labelColor=30363d)](LICENSE)

[官网](https://opsmaxx.dev) · [安装](docs/zh-CN/install.md) · [功能](docs/zh-CN/features.md) · [AI 代理](docs/zh-CN/ai-agents.md) · [工作区](docs/zh-CN/workspaces.md) · [终端](docs/terminal.md) · [数据库](docs/zh-CN/databases.md) · [隧道](docs/zh-CN/tunnels.md) · [保险库](docs/zh-CN/vault.md) · [安全](docs/zh-CN/security.md) · [常见问题](docs/zh-CN/faq.md)

> 链接到的这些文档目前**只有英文版**；界面本身已支持简体中文。

</div>

---

> [!IMPORTANT]
> **Windows 首次运行 OpsMaxx 时会弹出安全警告。** 构建产物没有代码签名 —— 一张证书每年要 200–400 美元 —— 所以 Windows 无法确认**发布者是谁**。这与文件本身是否安全无关。
>
> 每个发布版本在上传前都会扫描，并为每个文件附带 **SHA-256**。
> → [如何绕过该警告](docs/install.md#first-run-why-windows-shows-a-warning) · [杀毒扫描结果](docs/install.md#antivirus-scan)

OpsMaxx 是 **MobaXterm、PuTTY、Termius、SecureCRT 与 MobaXterm Personal Edition 的免费开源替代品**，为那些整天在跳板机、生产机器和数据库之间来回切换的工程师而做 —— 如今也为协助他们的 AI 编程代理而做。它把 **SSH 终端**、**SFTP 文件浏览器**、**服务器监控**、**SSH 隧道**、**支持多种引擎的数据库客户端**、**加密的密码保险库**，以及一个**供 Claude Code、Claude Desktop、Codex 等 AI 代理安全接入的 [MCP](docs/zh-CN/ai-agents.md) 桥**放进同一个窗口 —— 无需账号、无遥测、无订阅。

**让它与别家不同的**不是其中任何一项单独的能力 —— MobaXterm、Termius 等各自都做到了其中一部分。不同之处在于它们**处在同一个地方、共用同一份凭据存储**，而这份凭据存储如今还成了 AI 代理与你基础设施**之间**的一道屏障，而不是代理可以随意拿到手的东西。

![OpsMaxx 主界面](docs/images/main-window.png)

## 为什么选 OpsMaxx

大多数终端工具只做一件事，而一个典型的 DevOps 任务需要四件：经跳板机开一个 shell、跟踪一个日志文件、连一个只能从内网访问的数据库、查一条凭据。OpsMaxx 把它们放在一处、按项目归类，并用操作系统的钥匙串封存你的凭据与服务器列表，而不是把它们留在明文配置文件里。

- **不锁定** —— 可直接从你现有的 `~/.ssh/config` 导入连接
- **不需要账号** —— 不会上传你或你的资产信息；OpsMaxx 唯一自行发起的连接是更新检查，默认开启且可关闭
- **不要钱** —— MIT 许可，永久免费，欢迎贡献
- **凭据不外泄，对 AI 也是** —— Claude Code、Claude Desktop 和 Codex 可以通过它执行命令、读取文件，却永远看不到密码、私钥、IP 或用户名 —— 见 [AI 代理接入](docs/zh-CN/ai-agents.md)

## 功能一览

| | |
|---|---|
| **SSH 终端** | 基于 xterm，GPU 渲染，支持分屏、搜索，每台服务器可串联无限级跳板机 |
| **本地终端** | 在同一标签栏中并排放置你自己的 zsh、bash、PowerShell、Git Bash、MSYS2 或 WSL —— 且任何 AI 代理都触及不到 |
| **SFTP 浏览器** | 在同一条连接上浏览、编辑、上传与删除文件 |
| **云服务器** | 通过本机已有的 `gcloud`、`aws` 或 `az` 接入 Google Cloud、AWS 与 Azure 机器 —— 不保存云凭据，拿到的是真正的 SSH 会话，因此文件与监控同样可用 |
| **远程桌面** | 用 RDP 连 Windows 主机，需要时经跳板机 —— 使用独立账号，无需 SSH |
| **监控** | 每台服务器的实时 CPU、内存、磁盘与网络，资产墙、后台检查与 webhook 警报 |
| **服务检查** | 对任何可达目标的 HTTP 检查，窗口关着也在跑，旁边还有 ping 与 traceroute |
| **隧道与 VPN** | 本地、远程与 SOCKS5 转发；无需管理员权限的用户态 WireGuard；OpenVPN、frp，以及**内置的 Tailscale 与 ngrok** —— 无需另装客户端 |
| **HTTP 客户端** | REST、WebSocket 与 GraphQL 请求从本机发出，或经服务器的 SSH 连接、或走 VPN —— 因此 `localhost` 可以指那台服务器；私有 CA 可按集合单独信任 |
| **数据库** | PostgreSQL、MySQL、SQL Server、MongoDB 与 Redis，可直连或经跳板机 |
| **容器** | 服务器上或本机的 Docker 与 Kubernetes —— 容器、镜像、日志，并可进入其中一个 shell |
| **CI/CD** | 在 Jenkins、GitLab、GitHub Actions 中，把流水线、运行历史与失败步骤的日志读在对应服务器旁边。只读，且默认关闭：开启后会用你提供的令牌定时轮询第三方的 API |
| **保险库** | AES-256-GCM 密钥存储，凭据放在操作系统钥匙串而非配置文件 |
| **AI 代理网关** | Claude Code、Claude Desktop 与 Codex 可以经由它工作，却始终看不到密码、密钥、IP 或用户名 |
| **界面语言** | 英文与 **简体中文**，在 **设置 › 语言** 中切换，或设为跟随操作系统。这只覆盖应用界面，文档仍为英文。翻译层的机制、它看不到什么，以及尚未翻完的部分见 [docs/i18n.md](docs/i18n.md) |

→ **[完整功能列表、它替代了什么、以及它是为哪种工作而生](docs/zh-CN/features.md)**

## 安装

```bash
brew install --cask opsmaxx/tap/opsmaxx     # macOS
```

该 tap 是第三方的，因此 Homebrew 会先要求你 `brew tap opsmaxx/tap` 并确认信任。

**Windows** 目前只能直接下载：winget 清单还在[审核中](https://github.com/microsoft/winget-pkgs/pulls?q=OpsMaxx)，社区提交的清单要等志愿审核者处理，所以 `winget install OpsMaxx.OpsMaxx` 还不能用。等它能用的那天，这句话会改。

从 **[最新发布](https://github.com/OpsMaxx/OpsMaxx/releases/latest)** 下载安装包 —— Windows 用 `.exe`，macOS 用 `.dmg`，Linux 用 `.AppImage` 或 `.deb`。

→ **[所有安装方式、校验和，以及首次运行的安全警告](docs/zh-CN/install.md)**

## 快速开始

1. **添加服务器** —— 点击「连接」侧边栏里的 **+**，或按 <kbd>Ctrl</kbd>+<kbd>N</kbd>。可用密码、私钥、SSH agent 或证书认证。
2. **在同一对话框里添加跳板机** —— 点 **Add jump host**；各跳按顺序连接，每一跳都可以借用某个已保存服务器的凭据。
3. **打开会话** —— 点击一台服务器。双击则在独立标签中开第二个会话。

已经在 `~/.ssh/config` 里维护主机？直接导入即可，不必重打 —— `ProxyJump` 也会一并带过来。

→ **[带截图的长版操作指引](docs/zh-CN/install.md)**

## 文档

| | |
|---|---|
| **[功能](docs/zh-CN/features.md)** | 完整列表，与 MobaXterm、PuTTY、Termius、SecureCRT 的对比，以及真实使用场景 |
| **[安装](docs/zh-CN/install.md)** | Windows、macOS、Linux 的各种安装方式，以及首次运行的安全警告 |
| **[AI 代理接入](docs/zh-CN/ai-agents.md)** | MCP 客户端如何在不接触凭据的前提下访问你的基础设施 |
| **[工作区](docs/zh-CN/workspaces.md)** | 把客户、环境与项目彼此隔开，以及如何锁定它们 |
| **[终端](docs/terminal.md)** | 终端、本地 shell、命令面板与全部快捷键 |
| **[云服务器](docs/zh-CN/cloud.md)** | 通过你已有的 CLI 使用 Google Cloud、AWS 与 Azure —— 以及为什么它做的是代理而非包装 |
| **[监控](docs/zh-CN/monitoring.md)** | 观察整个资产，并把一项变更跑到所有机器上 |
| **[数据库](docs/zh-CN/databases.md)** | 五种引擎，直连或经跳板机 |
| **[隧道与 VPN](docs/zh-CN/tunnels.md)** | 转发、SOCKS5、WireGuard、OpenVPN 与 frp |
| **[保险库与设置](docs/zh-CN/vault.md)** | 密钥存储、备份，以及值得了解的设置项 |
| **[安全](docs/zh-CN/security.md)** | 凭据如何存放，以及如何避免明文落盘 |
| **[界面语言](docs/i18n.md)** | 翻译层：以英文原文为键、两个测量工具各自能看见与看不见什么、还剩哪些待译 |
| **[常见问题](docs/zh-CN/faq.md)** | 最常被问到的问题 |

## 安全

- 凭据**以及你的服务器列表**都用 **Electron `safeStorage`** 封存，底层分别是 Windows 的 DPAPI、macOS 的 Keychain、Linux 的 libsecret。并非应用写出的所有文件都被封存 —— MCP 桥的配置里有一个明文令牌（否则代理读不到），抓取到的请求体与用外部编辑器打开的文件本质上也是明文。[SECURITY.md](SECURITY.md) 逐一列出每个文件并说明属于哪种
- 保险库与备份使用 **AES-256-GCM**，密钥派生用 **scrypt**，N=32768 r=8 p=3；文件会记录写入时所用的参数，并在下次打开时按当前参数重新封存
- 工作区密码以 **scrypt 校验值**保存并做常数时间比较。它只把守界面 —— 并不会单独加密该工作区中的服务器
- **主机密钥会被校验**：未知服务器会弹出 SHA-256 指纹请你确认，密钥变更则直接拒绝
- **远程桌面证书同样做固定（pinning）** —— RDP 服务器默认自签，因此首次见到会询问，之后变更会被拒绝
- shell 输入是**被解析，而不是被求值**的 —— 不对你输入的任何内容做 `eval`
- 渲染进程开启 `contextIsolation`、关闭 `nodeIntegration`，并处在严格的 Content-Security-Policy 之下

发现安全漏洞？请先读 [SECURITY.md](SECURITY.md) —— 不要开公开 issue。

## 参与贡献

非常欢迎贡献，无论是代码、文档、缺陷报告，还是翻译。上手请先读 [CONTRIBUTING.md](CONTRIBUTING.md)（架构概览与开发流程），并请遵守我们的[行为准则](CODE_OF_CONDUCT.md)。若要做翻译，[docs/i18n.md](docs/i18n.md) 说明了这一层、用于度量它的两个命令，以及还剩什么 —— 一条译文就是词表里的一行，而缺了译文只会退回英文，不会让界面崩掉。

适合新手的问题都打了 [`good first issue`](https://github.com/OpsMaxx/OpsMaxx/labels/good%20first%20issue) 标签。

## 许可

OpsMaxx 以 **[MIT 许可](LICENSE)** 发布 —— 可自由使用、复制、修改与分发，个人与商业用途皆可，不收费、无订阅。

**本工具不售卖。** 它是给社区的。如果有人为 OpsMaxx 本身向你收钱，那是多收了 —— 在这里免费下载即可。MIT 许可确实允许他人再分发、乃至在其上构建商业产品；这是「真正开源」刻意付出的代价，也正是企业可以不经过法务审查就能采用它的原因。

**请保留版权声明，并且不要暗示维护者认可某个 fork。**

---

<div align="center">

**为 DevOps 社区而做。** 如果 OpsMaxx 帮你省下了时间，一颗 ⭐ 能帮更多人找到它。

[⬇ 下载 OpsMaxx](https://github.com/OpsMaxx/OpsMaxx/releases/latest) · [🐞 报告缺陷](https://github.com/OpsMaxx/OpsMaxx/issues/new?template=bug_report.yml) · [📧 联系](mailto:aliwaqarofficial@gmail.com)

*关键词：开源 SSH 客户端、Windows 免费 SSH 客户端、MobaXterm 替代品、PuTTY 替代品、Termius 替代品、SecureCRT 替代品、Xshell 替代品、Mac 上的 MobaXterm、macOS SSH 客户端、Linux SSH 客户端、SSH 终端管理器、SSH 连接管理、SFTP 客户端、SCP 文件传输、SSH 隧道管理、端口转发工具、SOCKS5 代理客户端、跳板机客户端、ProxyJump 图形界面、ssh config 导入、服务器监控工具、数据库图形客户端、PostgreSQL 客户端、MySQL 客户端、MongoDB 客户端、Redis 客户端、SQL Server 客户端、经 SSH 隧道连数据库、开发者密码管理、加密密钥保险库、AES-256-GCM 保险库、运维工具、系统管理工具、自托管、无遥测、无订阅、Electron SSH 客户端、跨平台终端、Windows macOS Linux、MCP server、Model Context Protocol、AI 代理 SSH 访问、Claude Code MCP 集成、Claude Desktop MCP、Codex MCP、Gemini CLI MCP、AI 运维工具、AI 基础设施安全访问、AI 代理访问控制、无凭据 AI 自动化、人工审批的 AI 操作、AI 审计日志。*
