# AI 代理接入

Claude Code、Claude Desktop、Codex 等 MCP 客户端如何经由 OpsMaxx 触达你的基础设施，而始终看不到任何凭据。

[English](../ai-agents.md) · **简体中文**

[← 返回 README](../../README.zh-CN.md)

---



Claude Code、Claude Desktop、Codex、Gemini CLI，以及任何会说 [MCP](https://modelcontextprotocol.io) 的东西，都可以经由 OpsMaxx 列出你的服务器、执行命令、浏览/编辑文件、查看指标。代理用友好的名字索取一台服务器；OpsMaxx 负责解析出真正的连接、执行逐能力策略，并能在任何敏感操作运行之前停下来询问你。

云服务器 —— Google Cloud、AWS 与 Azure —— 可以按同样的方式寻址，受同样的权限约束。它们是唯一一类「服务一个代理意味着在**你的**电脑上运行程序、而不只是在远端主机上」的服务器，因为触达它们本来就需要如此。这一点由什么约束、以及如何选择不接受它，见 [AI-SECURITY.md](../AI-SECURITY.md#cloud-servers-where-an-agents-input-does-reach-an-argv)。

![AI 代理 → MCP → OpsMaxx 策略 → 审批 → SSH/SFTP/数据库 → 服务器](../images/ai-mcp-architecture.svg)

**经由 OpsMaxx 接入的 AI 代理永远拿不到：**

- SSH 密码
- SSH 私钥或口令
- 数据库密码或连接串中的凭据
- 保险库机密 —— 根本不存在能读取保险库的 MCP 工具
- sudo 或 root 权限 —— 不受限的 shell（`sudo -i`、`su` …）在除一个之外的所有配置下都被拒绝：你亲自设为 Bypass 的会话（见[权限配置](../AI-MCP.md#permission-profiles)）

它只会拿到一个友好的服务器名、某项能力的 ALLOW/ASK/DENY 设置所允许的范围，以及脱敏后的文本输出。完整威胁模型见 [AI-SECURITY.md](../AI-SECURITY.md) —— 包括这套设计**不**声称能挡住什么。

![OpsMaxx 的「AI 与 MCP」总览界面](../images/ai-mcp-overview.png)

### 一个选择：配置

每个会话有一个**配置**，只有你能在 OpsMaxx 窗口里设置它：

| 配置 | 代理能做什么 |
|---|---|
| **只读** | 四处查看，绝不改动任何东西 |
| **先询问** | 每次读取都运行；每个改动在运行前都要你批准 |
| **自动** | 常规工作照常运行；sudo 与有风险的操作 —— 破坏性命令、数据库写入、隧道、服务器变更、启动 VPN、CI 运行 —— 会询问 |
| **放行（不询问）** | 什么都不问、什么都不拒，已保护的目标除外。审计日志会照此记录 |
| **自定义** | 套用你挑选的某个访问组，严格按其写法执行 |

前四种无需配置。除「放行」之外，它们都不会去读 `/etc/shadow`、SSH 密钥或 shell 历史。每一次 `execute_command` 都算作一次改动，因此在「只读」下，代理会用 `read_file`、`list_files` 等读取类工具。

**自定义**用于那四种表达不了的策略。**访问组**是一套逐能力的 ALLOW/ASK/DENY 策略，上面还可以叠加文件路径规则。OpsMaxx 自带五个：**只读**、**可执行命令，不可写入**、**读写**、**sudo 权限**与**完全访问**，你也可以自建：

<p align="center">
<img src="images/ai-access-groups.png" alt="访问组能力：每一项都是 ALLOW/ASK/DENY" width="49%" />
<img src="images/ai-access-groups-assignment.png" alt="文件路径规则与按服务器/工作区的指派" width="49%" />
</p>

两项设置凌驾于任何配置之上：

- **已保护。** 把某个工作区或服务器标为已保护，那里的每一次改动都会被询问 —— 包括「自动」、「自定义」与「放行」。
- **Restrictions**（限制；这一处目前仍显示英文）。给某个工作区或服务器指派一个访问组，把它压制在任何会话本可获得的权限之下；或指派 **No AI Access**（禁止 AI 访问）使它完全不可触达。限制会收窄除「放行」之外的每一种配置；而「禁止 AI 访问」连放行也挡得住。会话里的 **Effective access**（实际生效的权限；这一处目前仍显示英文）面板会列出其触达范围内的各项限制，每项都带一个移除按钮。

因此，要在一场「放行」会话面前保住一台生产机器，就把它标为已保护，或设为「禁止 AI 访问」。[权限配置](../AI-MCP.md#permission-profiles)有全部细节，包括「放行」究竟不会解除什么。

### 一个完整例子

**你对 Claude Code 说：***「看看我的生产 Nginx 服务器。」*

1. Claude Code 调用 OpsMaxx 的 `list_servers` 工具。拿回来的是该会话的工作区与配置所能看到的那些友好名称 —— 比如 `Nginx Server Prod` —— 永远不是主机名、IP 或用户名。
2. 它调用 `get_server_metrics`（或用类似 `systemctl status nginx` 的东西调 `execute_command`），并指名那台服务器。OpsMaxx 把 `"Nginx Server Prod"` 解析成真正的服务器记录，检查会话配置与该服务器上的任何限制，若答案是 ALLOW，就从你的操作系统钥匙串取出真正的 SSH 凭据并连接。若是 ASK，该请求会停在**审批**里等你决定。
3. 命令经一条正常的 SSH 连接执行，和交互式终端会话用的是同一条。输出在被返回之前会扫描已知机密与形似机密的模式并脱敏。
4. Claude Code 看到结果 —— CPU、内存、`systemctl` 输出，无论问的是什么 —— 并回报给你。它从未见过这台服务器的 IP、用户名，或那条用于认证连接的密钥。整个往返都在**审计日志**里，与 OpsMaxx 允许过、询问过、拒绝过或失败过的其他一切并列：

![审计日志：显示代理、会话、工作区/服务器、动作与结果](../images/ai-audit-log.png)

### 接入一个代理

最快的路径是 **AI 与 MCP → 总览 → 连接一个代理**。点一下就会打开桥、按你选的配置创建一个会话，并把它交给客户端。它不写任何工作区指派，因此永远不会把之后的会话压在这一次之下：

| 按钮 | 作用 |
|---|---|
| **连接 Claude Code** | 复制一条现成的 `claude mcp add` 命令（令牌已写在里面）—— 粘到终端里执行 |
| **连接 Claude Desktop** | 把桥的条目写进 `claude_desktop_config.json`，与其中已有内容合并 |
| **连接 Codex** | 往 `~/.codex/config.toml` 写入一个受管的 `[mcp_servers.opsmaxx]` 块 |

已有的配置文件会先备份，其中其他 MCP 服务器保持不动；再次点击同一个按钮会**替换它自己的条目**，而不是新增第二条。你已经指派过访问组的工作区 —— 包括指派为**禁止 AI 访问**的 —— 永远不会被重新指派。

如果你不想点按钮，也有 CLI：

| 命令 | 作用 |
|---|---|
| `opsmaxx claude` | 把 OpsMaxx 注册给 Claude Code（`claude mcp add`）并启动它 —— 配对码会出现在 OpsMaxx 里，无需手工复制令牌 |
| `opsmaxx codex` | 同上，用于 Codex —— 往 `~/.codex/config.toml` 写一个受管块 |
| `opsmaxx run -- <command>` | 对任何其他能感知 MCP 的 CLI 走同样的配对流程，通过 `OPSMAXX_MCP_COMMAND`/`OPSMAXX_MCP_ARGS` |

> 在 macOS 上，安装器**不会**把 `opsmaxx` 命令加进你的 `PATH`（只有 Windows 安装器会）。请用界面上的连接按钮，或直接调用应用包内部的启动器。

其他所有客户端都通过 **Streamable HTTP** 连接，使用一条 URL 与一个由 OpsMaxx 自己的 **Security** 标签页为你生成的 bearer 令牌：

![Security 标签页：启用开关、端口、审批超时，以及连接代码片段](../images/ai-security.png)

**Claude Desktop 是例外** —— 它用不了那条 URL。见下文[接入 Claude Desktop](#接入-claude-desktop)。

### 手工添加令牌

并不是每个客户端都已经有「一条命令搞定」的启动器：

![在 AI 与 MCP → AI 代理 下创建一个 AI 代理会话](../images/ai-agents.png)

1. **AI 与 MCP → AI 代理 → 新建 AI 代理会话** —— 选一个工作区与一个配置（若选「自定义」，再选一个访问组），然后点**创建会话**。
2. 令牌只会**显示一次**，旁边就是一段现成的 JSON —— 点 **Copy JSON config**（复制 JSON 配置；这一处目前仍显示英文），或者直接复制原始令牌自己写条目。
3. 把它粘进客户端自己的 MCP 配置文件，放在 `mcpServers` 下。
4. 重启客户端。

```json
{
  "mcpServers": {
    "opsmaxx": {
      "type": "http",
      "url": "http://127.0.0.1:<port>/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

**Claude Code** 完全不需要改文件 —— 一条命令注册同样的东西：

```bash
claude mcp add -s user --transport http opsmaxx http://127.0.0.1:<port>/mcp --header "Authorization: Bearer <token>"
```

### 接入 Claude Desktop

Claude Desktop **不读** `claude_desktop_config.json` 里的 `url` 或 `headers`。该文件中的条目会以 stdio 子进程方式启动；Desktop 的远程服务器支持是一个独立的、账号级的 Connectors 功能，那里没有任何地方可以放一个针对 `127.0.0.1` 地址的 bearer 令牌。

OpsMaxx 正是为这种情况附带了一个 stdio 桥 —— 一个纯协议中继，把消息转发到同一个带认证的 HTTP 端点，因此只支持 stdio 的客户端能得到完全相同的策略、审批与审计路径（`src/cli/bridge.ts`）。

最省事的做法是用 npm 包，它就是同一个中继，只是不必写绝对路径：

```json
{
  "mcpServers": {
    "opsmaxx": {
      "command": "npx",
      "args": ["-y", "@opsmaxx/mcp"],
      "env": { "OPSMAXX_MCP_TOKEN": "<token>", "OPSMAXX_MCP_PORT": "<port>" }
    }
  }
}
```

只要你至少跑过一次 `opsmaxx claude`，`env` 块就可以省掉：该包会读取 CLI 已经缓存的会话。源码与细节：[`@opsmaxx/mcp`](https://github.com/OpsMaxx/opsmaxx-mcp)。

或者让 Desktop 直接用随应用打包的桥，完全不依赖 Node：

```json
{
  "mcpServers": {
    "opsmaxx": {
      "command": "/Applications/OpsMaxx.app/Contents/MacOS/OpsMaxx",
      "args": [
        "/Applications/OpsMaxx.app/Contents/Resources/app.asar.unpacked/out/cli/index.js",
        "bridge", "--token", "<token>", "--port", "<port>"
      ],
      "env": { "ELECTRON_RUN_AS_NODE": "1" }
    }
  }
}
```

在 **Windows** 上，这两条路径分别是 `%LOCALAPPDATA%\Programs\OpsMaxx\OpsMaxx.exe` 与 `%LOCALAPPDATA%\Programs\OpsMaxx\resources\app.asar.unpacked\out\cli\index.js`。

配置文件位于 macOS 的 `~/Library/Application Support/Claude/claude_desktop_config.json`，Windows 的 `%APPDATA%\Claude\claude_desktop_config.json`。改完请重启 Desktop。

`ELECTRON_RUN_AS_NODE` 让 OpsMaxx 自己打包的 Electron 二进制以普通 Node 的方式运行这个桥，因此无需额外安装任何东西，也不依赖你 `PATH` 上有什么 —— 而 Claude Desktop 并不会从你的 shell 继承 `PATH`。

> **给 Desktop 会话设成不过期。** 创建时把**过期时间**设为*从不*。默认是 60 分钟，之后 Desktop 会静默地再也连不上 OpsMaxx，直到你签发新令牌。

令牌只显示一次，且只以哈希形式保存 —— 如果弄丢了，在**活动会话**下吊销那个会话并新建一个，而不是去把它找回来：

![活动会话：所有存在的会话，带「吊销」与「停止所有 AI 访问」](../images/ai-active-sessions.png)

**完整技术指南（架构、会话、访问组、配对、排查）：** [docs/AI-MCP.md](../AI-MCP.md)。**威胁模型：** [docs/AI-SECURITY.md](../AI-SECURITY.md)。

---

[← 返回 README](../../README.zh-CN.md)
