# 安装

Windows、macOS 与 Linux 的全部安装方式 —— 以及首次运行时的安全警告该怎么办。

[English](../install.md) · **简体中文**

[← 返回 README](../../README.zh-CN.md)

---

## 安装


从 [Releases](https://github.com/OpsMaxx/OpsMaxx/releases/latest) 页面下载最新构建。

| 平台 | 文件 | 说明 |
|---|---|---|
| **Windows 10/11** | [`OpsMaxx-x.y.z-setup.exe`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | 安装包，创建桌面与开始菜单快捷方式。不确定就选这个。 |
| **Windows（便携版）** | [`OpsMaxx-x.y.z-portable.exe`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | 单文件，无需安装，数据存放在 `.exe` 旁边 —— 可以直接从 U 盘运行 |
| **macOS（Apple Silicon）** | [`OpsMaxx-x.y.z-arm64.dmg`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | M1 及更新机型 |
| **macOS（Intel）** | [`OpsMaxx-x.y.z-x64.dmg`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | Intel Mac |
| **Linux** | [`OpsMaxx-x.y.z-x86_64.AppImage`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | `chmod +x OpsMaxx-*.AppImage` 后运行 —— 任意发行版皆可 |
| **Linux（Debian / Ubuntu）** | [`OpsMaxx-x.y.z-amd64.deb`](https://github.com/OpsMaxx/OpsMaxx/releases/latest) | `sudo apt install ./OpsMaxx-*-amd64.deb` |

### 包管理器

| | |
|---|---|
| **macOS** | 先 `brew trust opsmaxx/tap`，再 `brew install --cask opsmaxx/tap/opsmaxx` |
| **Windows** | `winget install OpsMaxx.OpsMaxx` —— [审核中](https://github.com/microsoft/winget-pkgs/pull/431465) |

Homebrew 的主 cask 仓库有一条知名度门槛，OpsMaxx 目前还达不到，因此这个 cask 暂时放在[它自己的 tap](https://github.com/OpsMaxx/homebrew-tap) 里。`brew trust` 这一步，是 Homebrew 在你说「我信任它」之前拒绝加载第三方 tap；它把守的 cask 只有几行元数据，你可以先读一遍。安装时 Homebrew 会清掉隔离标记，因此这条路径也顺带绕过了下面的首次运行警告。

<details>
<summary><b>发布页上其他那些文件是什么？</b></summary>

一次发布里有六个文件就是上面的下载项，其余的是构建元数据或源码归档，可以忽略。

| 文件 | 它是什么 | 你需要吗？ |
|---|---|---|
| `*.blockmap` | 安装包内容块的地图，用来算出两个版本之间文件的哪些部分变了，以便更新时只下载差异。 | **不需要** —— 它只被更新器读取，不会被你读取。 |
| **Source code**（zip / tar.gz） | 打标签那次提交的仓库快照，由 GitHub 生成。它不是构建产物 —— 里面没有应用，只有源码。 | **不需要**，除非你打算[从源码构建](#从源码构建)。 |

</details>

### 首次运行：为什么 Windows 会警告

**macOS 已经不再警告。** 自 0.30.1 起，macOS 构建已用 Apple Developer ID 签名并经 Apple 公证，票据被装订进应用内 —— 因此它能正常打开，离线也一样，不需要右键打开的变通办法。你可以自己验证：

```bash
spctl -a -vvv /Applications/OpsMaxx.app
```

关键是这句回答：`source=Notarized Developer ID`。

**Windows 仍然会警告**，因为那个构建完全没有签名。一张 Windows 代码签名证书每年要从证书颁发机构花掉大约 **200–400 美元**，而这个项目免费、以 MIT 许可发布、背后没有收入。任何未签名的应用都会受到同样的对待，无论写它的是谁。

**这个警告并不意味着文件不安全。** 它的意思是操作系统无法确认**是谁**发布了它。这一点你可以自己确认 —— 见下文[校验下载](#校验下载)，而且全部源码都是公开的。

<details>
<summary><b>Windows —— 「Windows 已保护你的电脑」</b></summary>

SmartScreen 会弹出一个蓝色对话框，写着 *「Windows 已保护你的电脑」*，而 **运行** 按钮是隐藏的。

1. 点 **更多信息**
2. 点 **仍要运行**

你也可能看到用户账户控制弹出的「发布者未知」提示 —— 同一个缺失证书导致的。这只会发生在第一次运行时。

</details>

<details>
<summary><b>macOS —— 「Apple 无法验证 OpsMaxx 是否不含恶意软件」</b></summary>

**从 0.30.1 起你不应该再看到这个。** 那些构建已用 Apple Developer ID 签名、经公证、票据已装订，因此 Gatekeeper 不会多问一句就放行 —— 离线也一样。如果这条提示确实出现了，那么要么这个构建早于 0.30.1，要么下载没有完成。先确认你手上是哪种：

```bash
spctl -a -vvv /Applications/OpsMaxx.app
```

`source=Notarized Developer ID` 说明应用没问题，是别的地方出了错。其他任何回答都说明磁盘上的这一份不是我们发布的 —— 请重新从[发布页](https://github.com/OpsMaxx/OpsMaxx/releases/latest)下载，并把它的 SHA-256 与发布说明核对，而不是直接点过警告。

在 0.30.1 之前的构建上，绕过的办法是 macOS 15 及更新版本里的 **系统设置 → 隐私与安全性 → 仍要打开**，或 macOS 14 及更早的 **右键 → 打开 → 打开**。升级是更好的答案。

</details>

<details>
<summary><b>macOS —— 「OpsMaxx 已损坏，无法打开」（0.2.2 及更早的发布）</b></summary>

![macOS Gatekeeper 对话框：「OpsMaxx 已损坏，无法打开。你应该将它移到废纸篓。」](../images/macos-damaged-dialog.png)

**下载并没有损坏，而且这个问题在 0.2.2 之后的发布中已修复。** 直到 0.2.2（含）的构建都让 macOS 应用保持未签名，这意味着 bundle 仍带着 Electron 自带的那个签名 —— 一个不覆盖 OpsMaxx 任何自有文件的签名。Gatekeeper 把这种不匹配读成「下载损坏」，于是用了这种措辞，而不是上面那条普通的「无法验证」。很恼人的是，这个对话框不提供**仍要打开**按钮，所以没有任何东西可以点过去。

如果你想在做任何事之前先确认文件是完整到达的，就把发布里给出的 SHA-256 与你下载的文件核对 —— 见[校验下载](#校验下载)。

**不要**把它移到废纸篓。改为运行一次：

```bash
/usr/bin/xattr -cr /Applications/OpsMaxx.app
```

然后照常打开应用。如果它仍然拒绝：

- 检查路径是否正确 —— 键入 `/usr/bin/xattr -cr ` 之后，把应用**拖进**终端窗口，而不是手打路径。
- 确认你指向的是 `/Applications` 里的那一份，而不是还留在 `~/Downloads` 里的那份。
- 保留 `/usr/bin/` 前缀。`PATH` 上更靠前的某个 Homebrew 或 `pip` 版 `xattr` 不支持 `-r`，它会悄悄地什么都不做，只打印自己的用法说明。

更新的发布采用的是 ad-hoc 签名，这让它们回到上面那类普通的「无法验证」—— 仍然是警告，但至少有一个按钮。

</details>

<details>
<summary><b>Linux —— 不会警告</b></summary>

Linux 不对未签名二进制做门禁，因此没有任何东西需要绕过。只需让 AppImage 可执行：

```bash
chmod +x OpsMaxx-*.AppImage
```

</details>

> **Windows 也会修好吗？** 暂时不会。macOS 是在 0.30.1 解决的 —— Apple 开发者账号每年 99 美元，这个还能承受；Windows 证书每年 200–400 美元，目前承受不了。在那之前，每次发布给出的 SHA-256 校验和，就是确认「你下载到的正是被构建出来的那一份」的途径。

### 杀毒扫描

每次发布在构建过程中、在任何内容被上传之前都会自动扫描。**三个扫描器中有两个会把关**：任意一个报毒就会让构建失败，因此一个存在的发布必然通过了这两个。

| 扫描器 | 它是什么 | 在哪儿跑 | 是否把关 |
|---|---|---|---|
| **Microsoft Defender** | Windows 自带的引擎 —— 也就是会在你自己机器上扫描安装包的同一个 | 在 Windows 构建机上，扫描它刚产出的每个可执行文件 —— 两个安装包，以及其中的 `.dll` 与 `.node` 文件 —— 并开启云保护，因此它看到的东西与你的机器看到的一致 | **是** |
| **ClamAV** | 开源引擎，签名在构建时刷新 | Linux 发布任务，覆盖全部产物 | **是** |
| **[VirusTotal](https://www.virustotal.com)** | 把 **70 多个商业引擎**的结果汇总在一份报告里 | 每个安装包 —— `.exe`、`.dmg`、`.AppImage`、`.deb` —— 前提是配置了 API key | 否 |

VirusTotal 只报告、不把关，这是刻意的：它需要 API key 与第三方服务，而这两者任一不可用都不应该能拦住一次发布 —— 也不该拦住别人从 fork 里切一次发布。每次发布的说明都会直说该扫描有没有跑，跑了就附上每个文件的报告链接。如果说明里写着*本次发布未运行*，那两个把关的扫描器仍然通过了，你也可以自己检查：

- **用哈希去查这个文件。** 每次发布都给出每个产物的 SHA-256。把它粘进 [virustotal.com](https://www.virustotal.com) —— 用哈希搜索能证明这份报告对应的正是你下载的那几个字节，而仅凭一个链接做不到这一点。
- **自己把文件上传**到 VirusTotal。
- **从源码构建。** 整个应用都在这个仓库里；见[从源码构建](#从源码构建)。

> **关于误报。** 未签名的 Electron 应用被一两个小众引擎误报是相当常见的事 —— 一个解开可执行文件、又发起网络连接的安装包，在结构上确实也是很多恶意软件在做的事。几个你从未听过的引擎报毒，而主流引擎结果干净，这是未签名开源桌面应用的常态。代码签名才能消除它，而那是成本问题，不是技术问题。

### 校验下载

发布页上每个文件都列出它的 SHA-256。把它与你下载到的文件比对 —— 构建是未签名的，因此这是现有最强的完整性检查：

```bash
sha256sum OpsMaxx-x.y.z-x86_64.AppImage    # Linux
shasum -a 256 OpsMaxx-x.y.z-arm64.dmg      # macOS
```

```powershell
Get-FileHash OpsMaxx-x.y.z-setup.exe -Algorithm SHA256    # Windows
```

### 从源码构建

```bash
git clone https://github.com/OpsMaxx/OpsMaxx.git
cd OpsMaxx
npm install

npm run dev          # run in development
npm run typecheck    # type check main, preload and renderer
npm run build        # bundle without packaging

npm run dist:win     # Windows installer + portable exe
npm run dist:linux   # AppImage + deb
npm run dist:mac     # dmg (must be run on macOS)
```

需要 **Node.js 20+**。每个平台的安装包要在该平台上构建。

## 快速开始


### 1. 添加一台服务器

点「连接」侧边栏里的 **+**，或按 <kbd>Ctrl</kbd>+<kbd>N</kbd>。

![添加服务器对话框](../images/add-server.png)

填上服务器、端口与用户名，然后选择认证方式：

- **密码** —— 存进你的操作系统钥匙串
- **私钥** —— 浏览到密钥文件；路径与可选口令存入钥匙串，绝不明文保存
- **SSH Agent** —— 使用 `SSH_AUTH_SOCK`，Windows 上则用 Pageant
- **证书** —— 用于基于证书的环境

> **没有扩展名的密钥文件**（`id_ed25519`，或任何裸文件名）都完全支持 —— 文件选择器默认显示所有文件。

**Tags**（标签；这一处目前仍显示英文）是可选的：用逗号分隔输入（`prod, eu-west, db`）。它们以小写保存、每台服务器最多八个，在侧边栏该服务器的行上显示为小标签，并可被侧边栏搜索匹配。在 **编辑服务器** 里同样可以修改或清空。

### 2. 在同一个对话框里添加跳板机

内网里的服务器要经堡垒机访问。点 **Add jump host**（添加跳板机；这一处目前仍显示英文），跳转就会出现在那里 —— 没有第二个对话框，也没有额外的步骤。

![带跳板机的添加服务器对话框](../images/add-server-jump-hosts.png)

每一跳都可以：

- **使用已保存的服务器** —— 该跳借用那台服务器已存的凭据，于是密钥只定义一次、反复复用，或
- **是一台自定义服务器** —— 自己设置主机、端口、用户与私钥

跳转按自上而下的顺序连接：`你 → 跳板 1 → 跳板 2 → 目标`。用箭头调整顺序。

### 3. 打开一个会话

点击一台服务器即可打开。**双击会在新标签中打开一个额外会话** —— 当你想要一个 shell 跟踪日志、另一个跑命令时很有用。

每一行的状态标记既有自己的形状、也有自己的颜色 —— 已连接是实心圆点，连接中是带中心点的脉冲圆环，空闲是三角形，未连接是空心圆环 —— 悬停会说明是哪种状态。等到每小时一次的主机信息采集读过某台服务器之后，它的行上还会显示一个图标，代表它报告的发行版族（Ubuntu、Debian、Red Hat、SUSE、Arch、Alpine、NixOS、Gentoo、OpenWrt）；尚未被读取的服务器，或运行着列表之外系统的服务器，则什么都不显示。

这个列表也支持键盘操作。用 <kbd>Tab</kbd> 进入，然后：

| 按键 | 动作 |
|---|---|
| <kbd>↑</kbd> / <kbd>↓</kbd> | 上一行 / 下一行 |
| <kbd>Home</kbd> / <kbd>End</kbd> | 第一行 / 最后一行 |
| <kbd>→</kbd> / <kbd>←</kbd> | 展开 / 折叠文件夹；在某台服务器上按 <kbd>←</kbd> 会跳到它所在的文件夹 |
| <kbd>Enter</kbd> | 打开该服务器，或展开 / 折叠文件夹 —— 与点击等价 |
| <kbd>Shift</kbd>+<kbd>F10</kbd> 或菜单键 | 右键菜单，并把焦点放进其中 |

会话在你切换工作区、改变视图或打开数据库时都会继续运行。在你关闭标签页之前，什么都不会被拆除。

---

[← 返回 README](../../README.zh-CN.md)
