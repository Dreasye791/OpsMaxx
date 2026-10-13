/**
 * 简体中文词条。
 *
 * ── 键为什么是英文原文 ──────────────────────────────────────────────────────
 *
 * 键就是英文原文，`'Settings': '设置'`，而不是 `'settings.title': '设置'`。
 * 原因写在 i18n/index.ts 的文件头里，这里只重复结论：命中就翻译，没命中就把
 * 原文照样显示出来。所以**未翻译的部分会优雅地退回英文**，不会出现空白按钮或
 * 裸露的 key——一份翻了七成的词条，得到的是一款「七成中文」的应用，而不是一
 * 款坏掉的应用。
 *
 * ── 维护约定 ────────────────────────────────────────────────────────────────
 *
 * 1. 键必须与源码里 `t('...')` 的字符串**逐字一致**，包括弯引号（“ ”）和破折
 *    号（—）。改英文原文 = 这条翻译失效，需要用
 *    `npm run i18n:coverage` 查出来。
 * 2. 占位符 `{name}` 必须保留，位置可以按中文语序调整：
 *    `'{count} sessions': '{count} 个会话'` 里的 `{count}` 不能丢、不能改名。
 * 3. 复数不单独建条目。中文没有单复数变化，所以 `'{count} session'` 和
 *    `'{count} sessions'` 指向同一个中文串——源码里仍然保留三元判断，因为英文
 *    那边需要它。
 * 4. 术语表见文件末尾，新增词条请沿用同一套译法，否则同一个概念会在不同页面
 *    出现两种叫法。
 */

export const zhCN: Record<string, string> = {
  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：左侧活动栏
  // ─────────────────────────────────────────────────────────────────────────
  'Toggle sidebar': '切换侧边栏',
  Sidebar: '侧边栏',

  Connections: '连接',
  Databases: '数据库',
  'Tunnels & VPN': '隧道与 VPN',
  Tunnels: '隧道',
  'HTTP Client': 'HTTP 客户端',
  HTTP: 'HTTP',
  Monitoring: '监控',
  Vault: '保险库',
  'AI & MCP': 'AI 与 MCP',
  Settings: '设置',

  'Monitoring — reading the estate': '监控 — 查看资产',
  'Operations — changing the estate': '运维 — 变更资产',
  Operations: '运维',
  'Fleet Monitor': '资产总览',

  // 提升为一级入口的模块。Docker / Kubernetes / CI/CD 是专有名词，不译。
  Docker: 'Docker',
  Kubernetes: 'Kubernetes',
  'CI/CD': 'CI/CD',
  Processes: '进程',
  Sync: '同步',
  'Docker — containers, compose projects and images': 'Docker — 容器、Compose 项目与镜像',
  'Kubernetes — clusters, pods and workloads': 'Kubernetes — 集群、Pod 与工作负载',
  'CI/CD — pipelines and run history': 'CI/CD — 流水线与运行历史',
  'Local processes — programs running on this machine': '本地进程 — 本机运行的程序',
  'Sync & devices — your own machines, and what has reached them':
    '同步与设备 — 你自己的机器，以及同步到它们的内容',

  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：标题栏
  // ─────────────────────────────────────────────────────────────────────────
  'Search or run a command…': '搜索或执行命令…',
  Minimize: '最小化',
  Maximize: '最大化',
  Restore: '还原',
  Close: '关闭',

  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：侧边栏
  // ─────────────────────────────────────────────────────────────────────────
  'New folder': '新建文件夹',
  'New group': '新建分组',
  'New monitor group': '新建监控分组',
  'Import from ~/.ssh/config': '从 ~/.ssh/config 导入',
  'Add server': '添加服务器',
  'Add database': '添加数据库',
  'New tunnel': '新建隧道',
  'New entry': '新建条目',

  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：工作区切换
  // ─────────────────────────────────────────────────────────────────────────
  Workspaces: '工作区',
  'Hidden workspaces': '已隐藏的工作区',
  'New workspace': '新建工作区',
  'Manage workspaces': '管理工作区',
  'Switch with Ctrl+{n}': '按 Ctrl+{n} 切换',

  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：状态栏
  // ─────────────────────────────────────────────────────────────────────────
  '{count} session': '{count} 个会话',
  '{count} sessions': '{count} 个会话',
  '{count} alert': '{count} 条告警',
  '{count} alerts': '{count} 条告警',
  '{count} AI action waiting': '{count} 个 AI 操作待处理',
  '{count} AI actions waiting': '{count} 个 AI 操作待处理',
  // 告警种类的名字（store/alerts.ts 的 LABEL），状态栏提示里逐条列出。
  'VPN down': 'VPN 断开',
  'Service down': '服务停止',
  'Pods restarting': 'Pod 反复重启',
  'VPN silent': 'VPN 无响应',
  CPU: 'CPU',
  Memory: '内存',
  Disk: '磁盘',
  Inodes: 'inode',
  Load: '负载',
  Unreachable: '不可达',
  'Job failed': '任务失败',
  'Tunnel down': '隧道断开',
  Backup: '备份',
  'Database alarm': '数据库告警',
  'Database watch': '数据库监控',
  'OOM kill': 'OOM 终止',
  Certificate: '证书',
  'VPN certificate': 'VPN 证书',
  'Error rate': '错误率',

  'Online': '在线',
  Offline: '离线',
  'A network interface is up. This does not test whether any particular server is reachable.':
    '本机网络接口已启用。这并不测试某个具体服务器是否可达。',
  'This machine has no network connection. SSH sessions and background checks will fail until it returns.':
    '本机没有网络连接。在网络恢复前，SSH 会话和后台检查都会失败。',

  'Alert inbox': '告警收件箱',
  'No active alerts. Click to open the alert inbox.': '暂无活跃告警。点击打开告警收件箱。',
  'Click to open the alert inbox.': '点击打开告警收件箱。',

  'Backup out of date': '备份已过期',
  'Backups paused': '备份已暂停',
  'Backups paused — unlock': '备份已暂停 — 点击解锁',
  'Click to open Backup & Restore.': '点击打开「备份与恢复」。',
  'Click to unlock and resume.': '点击解锁并继续。',
  'Stored connections have changed since the last export. Click to open Backup & Restore.':
    '自上次导出后，已保存的连接有变动。点击打开「备份与恢复」。',
  '{count} scheduled backups are not running. {reason} Click to open Backup & Restore.':
    '有 {count} 个计划备份未在运行。{reason} 点击打开「备份与恢复」。',
  'Unlocking resumes background checking, so alerts can be raised again.':
    '解锁后会恢复后台检查，告警也会重新产生。',

  // 后台采样器的状态栏警告标题（store/fleetStatus.ts 的 WARNINGS.label）。
  //
  // 只译标题，不译 tooltip。四个 tooltip 是拼接出来的多段长句
  // （`'…' + '…'`），运行期才拼成一个字符串，做键既脆弱又不可校验；它们本身是
  // 说明性长文，值得单独过一遍而不是塞进这一批。所以那四个 tooltip 目前仍是
  // 英文——这是已知缺口，不是遗漏。
  'Checks paused': '检查已暂停',
  'Some checks paused': '部分检查已暂停',
  'Nothing checked': '未检查任何目标',
  'Checks stopped': '检查已停止',
  '{agent} is blocked on "{action}" ({server}) and cannot continue until you answer. Click to bring the decision back up.':
    '{agent} 卡在「{action}」（{server}）上，在你答复之前无法继续。点击可重新打开这个待决事项。',

  // ─────────────────────────────────────────────────────────────────────────
  // 应用外壳：反馈问题
  // ─────────────────────────────────────────────────────────────────────────
  'Report bug': '反馈问题',
  'Settings — backup out of date: stored connections have changed since the last export':
    '设置 — 备份已过期：自上次导出后，已保存的连接有变动',
  'Report a bug — collects a report you can read before you send it':
    '反馈问题 — 生成一份报告，发送前你可以先过目',
  'Report a bug — debug mode is recording what the app does. Press to stop recording and build a report.':
    '反馈问题 — 调试模式正在记录应用行为。点击可停止记录并生成报告。',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：左侧导航（页面名）
  //
  // 同时被设置页和命令面板使用，见 store/nav.ts 的 SETTINGS_SECTION_LABELS。
  // ─────────────────────────────────────────────────────────────────────────
  General: '通用',
  Appearance: '外观',
  Language: '语言',
  Terminal: '终端',
  SSH: 'SSH',
  Security: '安全',
  SFTP: 'SFTP',
  Modules: '模块',
  Editor: '编辑器',
  'Keyboard Shortcuts': '快捷键',
  'Backup & Restore': '备份与恢复',
  Notifications: '通知',
  Advanced: '高级',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：搜索
  // ─────────────────────────────────────────────────────────────────────────
  'Search settings': '搜索设置',
  'Search results': '搜索结果',
  'No setting matches that. Try a word from what it does — “webhook”, “vault”, “background”.':
    '没有匹配的设置。可以试试描述它作用的词，比如「webhook」「保险库」「后台」。',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：语言
  // ─────────────────────────────────────────────────────────────────────────
  'What language OpsMaxx is shown in.': 'OpsMaxx 界面显示所使用的语言。',
  'Interface language': '界面语言',
  'Follow system': '跟随系统',
  'Following your system language, which is {language}.': '跟随系统语言，当前系统为{language}。',
  'Fixed to one language, whatever your system is set to.': '固定使用某一种语言，不随系统设置变化。',
  English: '英语',
  'Chinese (Simplified)': '简体中文',
  'Translation coverage': '翻译覆盖范围',
  'The app shell, Settings and the common dialogs are translated. Panels that have not been translated yet stay in English rather than showing a blank label.':
    '应用外壳、设置页和通用对话框已完成翻译。尚未翻译的面板会保持英文，而不会显示空白文案。',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：外观
  // ─────────────────────────────────────────────────────────────────────────
  'Theme and visual density.': '主题与界面密度。',
  Theme: '主题',
  'OpsMaxx is the default look. The classic dark and light themes are still here.':
    'OpsMaxx 是默认外观。经典深色与浅色主题仍然保留。',
  'OpsMaxx Light': 'OpsMaxx 浅色',
  'Classic dark': '经典深色',
  'Classic light': '经典浅色',
  System: '跟随系统',
  'Compact density': '紧凑布局',
  'Tighter rows and padding across trees, lists and the docked monitor. Font sizes are unchanged.':
    '收紧树形列表、普通列表和停靠监控面板的行高与内边距，字号不变。',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：通用 — 新手引导
  // ─────────────────────────────────────────────────────────────────────────
  Walkthrough: '新手引导',
  'A short tour of what is here and where it lives.': '简单走一遍：这里有什么，都放在哪里。',
  'Show the walkthrough': '显示新手引导',
  'Runs once on a first launch. Reopen it here whenever you want — it switches to each feature as it describes it, so nothing is hidden while you read.':
    '首次启动时自动运行一次。随时可以在这里重新打开——它会一边讲解一边切换到对应功能，阅读时不会挡住任何内容。',
  'Start walkthrough': '开始引导',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：通用 — 开机启动
  // ─────────────────────────────────────────────────────────────────────────
  'Start when I log in': '登录时启动',
  'Launch OpsMaxx with your machine, so background checking and alerts run from login rather than from whenever you next open the app.':
    '随系统一起启动 OpsMaxx，让后台检查和告警从登录时就开始运行，而不是等到你下次打开应用。',
  'Start in the background': '在后台启动',
  'Launch without opening a window. Checks still run and alerts still fire — OpsMaxx is waiting in the Dock rather than in front of you.':
    '启动时不打开窗口。检查照常运行、告警照常触发——OpsMaxx 待在后台等你，而不是挡在你面前。',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置：通用 — 更新
  // ─────────────────────────────────────────────────────────────────────────
  'Update channel': '更新通道',
  Channel: '通道',
  'Stable is the released build. Beta gets new features earlier, and gets their bugs earlier too — it is the build that has not been through as many hands yet.':
    '稳定版是已发布的构建。测试版更早拿到新功能，也更早碰到新功能的 Bug——它经过的验证环节更少。',
  Stable: '稳定版',
  Beta: '测试版',
  'Automatic updates': '自动更新',
  'Check for updates automatically': '自动检查更新',
  'Off means OpsMaxx only looks when you press Check for updates.':
    '关闭后，OpsMaxx 只在你点击「检查更新」时才去查找。',
  'How often to check': '检查频率',
  'Every check happens at launch as well. A longer interval only affects an app that stays open for days.':
    '每次启动时也都会检查一次。更长的间隔只对连续开启数天的应用有影响。',
  'Only at launch': '仅在启动时',
  'Every 6 hours': '每 6 小时',
  'Every 24 hours': '每 24 小时',
  'Download updates automatically': '自动下载更新',
  'Fetch the update in the background as soon as one is found. Off means you are told first and press Download yourself.':
    '一发现更新就在后台下载。关闭后，会先通知你，由你手动点击下载。',
  'Install on quit': '退出时安装',
  'Apply a downloaded update the next time you close OpsMaxx, instead of waiting for you to restart it now.':
    '在下次关闭 OpsMaxx 时应用已下载的更新，而不必现在就重启。',
  'Update check failed': '检查更新失败',

  // ─────────────────────────────────────────────────────────────────────────
  // 更新面板（components/settings/UpdatePanel.tsx）。
  //
  // 这一面板原先只有源码里的裸字符串：更新失败、已下载、手动安装、降级确认这几个
  // 状态**渲染审计基本走不到**（沙箱没有网络，检查会失败；下载/安装不会发生），
  // 所以「渲染占比」一直没把它们算进来。它们占全屏英文的大部分。
  //
  // 英文单复数各成一条键（'Last checked {count} minute ago.' 与 '...minutes...'）：
  // t 没有 ICU 复数，两条各归其位，中文两条映射到同一串即可。
  // ─────────────────────────────────────────────────────────────────────────

  'Not checked yet.': '尚未检查。',
  'Last checked just now.': '刚刚检查过。',
  'Last checked {count} minute ago.': '{count} 分钟前检查过。',
  'Last checked {count} minutes ago.': '{count} 分钟前检查过。',
  'Last checked {count} hour ago.': '{count} 小时前检查过。',
  'Last checked {count} hours ago.': '{count} 小时前检查过。',
  'Last checked {count} day ago.': '{count} 天前检查过。',
  'Last checked {count} days ago.': '{count} 天前检查过。',
  'Checking for updates…': '正在检查更新…',
  "You're on the latest version. {ago}": '已是最新版本。{ago}',
  'v{version} found — starting download…': '发现 v{version} —— 开始下载…',
  'v{version} is available.': '有可用版本 v{version}。',
  'v{version} is available': '有可用版本 v{version}',
  'Downloading update… {percent}%': '正在下载更新… {percent}%',
  'v{version} is ready to install.': 'v{version} 已可安装。',
  'Could not check for updates: {message}': '检查更新失败：{message}',
  'Update ready': '更新已就绪',
  'OpsMaxx will restart to finish installing v{version}.': 'OpsMaxx 将重启以完成安装 v{version}。',
  'v{version} has been downloaded, but this build cannot install it itself.':
    'v{version} 已下载，但这个构建无法自行安装。',
  '{message} — you can always grab the latest release directly.':
    '{message} —— 你随时可以直接下载最新版本。',
  'Restart & update': '重启并更新',
  'Releases page': '版本发布页',
  'Ignoring v{version}': '已忽略 v{version}',
  'The status bar stays quiet about this version. A newer one brings the indicator back on its own.':
    '状态栏不会再提示这个版本。出现更新的版本时，指示器会自己回来。',
  'Stop ignoring': '不再忽略',
  'Hide the status-bar indicator for v{version}. Updates stay on, and the next version will say so.':
    '不再为 v{version} 显示状态栏指示器。更新仍然开启，出现下一个版本时会照常提示。',
  'Ignore this version': '忽略此版本',
  'Unavailable on this build. {reason}': '此构建不可用。{reason}',
  'Unavailable until OpsMaxx knows what this build can install.':
    '在 OpsMaxx 得知此构建能安装什么之前不可用。',
  'macOS builds here are not notarized, so OpsMaxx cannot safely replace itself automatically — download the new version and open it the same way as the first install.':
    '这里的 macOS 构建未经公证，OpsMaxx 无法安全地自动替换自身 —— 请下载新版本，并像首次安装那样打开它。',
  'This is the portable build, which runs from wherever you put it — OpsMaxx cannot replace its own executable, so download the new version and swap it in.':
    '这是便携版，从你放置的位置运行 —— OpsMaxx 无法替换自己的可执行文件，请下载新版本并手动替换。',
  'This build cannot install updates itself — download the new version from the releases page.':
    '此构建无法自行安装更新 —— 请从版本发布页下载新版本。',
  'Restart to finish updating?': '重启以完成更新？',
  'OpsMaxx closes and reopens on the new version.': 'OpsMaxx 将关闭，并在新版本上重新打开。',
  'Every open SSH session, tunnel and file transfer ends when the app closes. Anything running on a server keeps running there, but OpsMaxx will not be watching it.':
    '应用关闭时，所有打开的 SSH 会话、隧道与文件传输都会结束。服务器上正在运行的东西会继续运行，但 OpsMaxx 不会再盯着它。',
  'Switch to the stable channel?': '切换到稳定通道？',
  'You are running v{version}, a beta build.': '你正在运行 v{version}，一个 beta 构建。',
  'Stay on beta': '留在 beta',
  'Switch to stable': '切换到稳定版',
  'The newest stable release is probably older than the beta you are on. OpsMaxx will offer it as an update and installing it moves this app {b} a version, taking the beta-only features with it.':
    '最新的稳定版很可能比你正在使用的 beta 更旧。OpsMaxx 会把它作为更新提供，而安装它会把本应用{b}一个版本，beta 专属功能也会随之消失。',
  'down': '下调',
  'Nothing changes until you install that update, and you can switch back to beta first.':
    '在你安装那次更新之前不会有任何变化，而且你可以先切回 beta。',

  // ─────────────────────────────────────────────────────────────────────────
  // 「译文早就在词表里、只是渲染处没包 t()」那一类的补齐部分。
  //
  // 2026-10-13 把审计剩余英文按成因分桶后，53 条属于这一类（键已存在），只有下面这批
  // 是真正新增的。包含保险库门/解锁弹窗、addy 面板的 KPI 取值、AI 安全开关的状态句、
  // 工作区删除提示。
  // ─────────────────────────────────────────────────────────────────────────

  'Hide': '隐藏',
  'Vault secured': '保险库已保护',
  'Vault locked': '保险库已锁定',
  'Vault unlocked': '保险库已解锁',
  'Vault file unreadable': '保险库文件无法读取',
  'Checking for a vault…': '正在检查保险库…',
  'The vault keeps passwords, SSH keys and other secrets encrypted on this machine, so OpsMaxx can use them without you retyping them. Pick a master password to protect it — it is never stored anywhere, so if you lose it the contents cannot be recovered.':
    '保险库把密码、SSH 密钥和其他机密加密保存在这台机器上，这样 OpsMaxx 就能直接使用它们，不必由你反复输入。请设置一个主密码来保护它 —— 主密码不保存在任何地方，一旦丢失，里面的内容就无法恢复。',
  'The entries were cleared from this screen after a spell of inactivity. Nothing else stopped — your connections, background checks and scheduled work are still running on the credentials in here. Enter your master password to look at them again.':
    '闲置一段时间后，这些条目会从本屏幕上清除。其他一切照常运行 —— 你的连接、后台检查与计划任务仍然使用这里的凭据在跑。输入主密码即可再次查看。',
  'Enter the master password you chose for this vault. It stays open until you lock it, quit OpsMaxx, or your machine goes to sleep.':
    '输入你为此保险库设置的主密码。它会一直保持打开，直到你锁定它、退出 OpsMaxx，或这台机器进入睡眠。',
  'On': '开启',
  'Live': '实时',
  'Idle': '空闲',
  'including this one': '包括本机',
  'on this account': '在此账户上',
  'relay not reported': '未报告中继',
  'not reported by this build': '此构建未报告',
  'relay {relay} — enrolment not reported': '中继 {relay} —— 未报告注册状态',
  'connected to the relay': '已连接到中继',
  'not connected right now': '当前未连接',
  'Pick the backup file to read': '选择要读取的备份文件',
  'Listening on 127.0.0.1:{port} — never reachable from outside this machine.':
    '正在监听 127.0.0.1:{port} —— 从这台机器外部永远无法访问。',
  'Not listening: OpsMaxx could not open 127.0.0.1:{port}. No AI agent can reach it until it does — pick another port, or turn this on again once the port is free.':
    '未在监听：OpsMaxx 无法打开 127.0.0.1:{port}。在它成功之前，任何 AI 代理都无法访问 —— 请换一个端口，或等端口空闲后再打开一次。',
  'Off. No AI agent can reach OpsMaxx while disabled.': '已关闭。关闭期间任何 AI 代理都无法访问 OpsMaxx。',
  'The last workspace cannot be deleted': '最后一个工作区不能删除',

  // 共享菜单（components/connections/ContextMenu.tsx）现在在渲染处翻译 label /
  // section / detail / footer，所以**任何**菜单项的 label 只要有词条就会显示中文。
  // 下面这条是「审计从不打开菜单」因而从未进过工单的一例。
  'Add one': '添加一个',

  // 会话配置标签：'Profile: Auto' 曾是一条整句词条，而值是可变的，改回占位符。
  'Profile: {mode}': '配置：{mode}',
  'Custom · no access group — nothing is allowed until you pick one':
    '自定义 · 未选择访问组 —— 在选择之前不允许任何操作',
  'Starts in: {mode} (your default — change under AI & MCP → Security)':
    '启动配置：{mode}（你的默认配置 —— 可在「AI 与 MCP → 安全」下修改）',
  'Starts in your default profile, which could not be read — check it under AI & MCP → Security.':
    '会话以你的默认配置启动，但该配置未能读取 —— 请在「AI 与 MCP → 安全」下检查。',
  '(unnamed)': '（未命名）',

  // ─────────────────────────────────────────────────────────────────────────
  // 菜单与动作（第一批）。
  //
  // 来源：`label:`/`section:`/`detail:` 字面量与词表的比对（脚本 opsmaxx-menus.py）。
  // 这些字面量分散在 data 文件里（treeMenus.ts、tabMenus.ts、layoutMenu.ts 等），
  // 没有 t() 调用点，而菜单渲染点（ContextMenu）用的是动态 t(e.label) —— 所以
  // **审计与覆盖率都看不见它们**，只能这样扫出来。
  //
  // 副作用（已知并接受）：这些条目在 i18n:coverage 里会被报成"孤儿"，因为工具
  // 无法把 data 文件里的字面量与 ContextMenu 的动态调用连起来。它们其实是活的，
  // **不要按孤儿报告删除**。
  // ─────────────────────────────────────────────────────────────────────────

  // 菜单里的通用动作
  'Undo': '撤销',
  'Redo': '重做',
  'Cut': '剪切',
  'Select all': '全选',
  'Rename…': '重命名…',
  'Rename again': '重新命名',
  'Delete all': '全部删除',
  'Delete row': '删除行',
  'Delete entry': '删除条目',
  'Delete folder': '删除文件夹',
  'Delete collection': '删除集合',
  'Delete collection…': '删除集合…',
  'Delete environment': '删除环境',
  'Duplicate row': '复制行',
  'Duplicate tab': '复制标签页',
  'Insert row below': '在下方插入行',
  'Show description': '显示描述',
  'Show it': '显示',
  'Find…': '查找…',
  'Fold all': '全部折叠',
  'Unfold all': '全部展开',
  'Wrap lines': '自动换行',
  'Move': '移动',
  'Move to…': '移动到…',
  'Reopen': '重新打开',
  'Reopen closed tab': '重新打开已关闭的标签页',
  'Recently closed': '最近关闭',
  'Close all': '全部关闭',
  'Close others': '关闭其他',
  'Close saved': '关闭已保存的',
  'Close to the right': '关闭右侧的',
  'Close Others': '关闭其他',
  'Close All Tabs': '关闭所有标签页',
  'Close All to the Left': '关闭左侧全部',
  'Close All to the Right': '关闭右侧全部',
  'This tab': '当前标签页',
  'Open tabs': '已打开的标签页',
  'Reset pane sizes': '重置面板尺寸',
  'Orientation': '方向',

  // HTTP 客户端：侧栏、标签页、地址栏、响应
  'Copy URL': '复制 URL',
  'Copy resolved URL': '复制解析后的地址',
  'Copy as cURL (with secrets)…': '复制为 cURL（含密钥）…',
  'Copy as "key: value"': '以 "key: value" 格式复制',
  'Copy as pretty JSON': '复制为格式化 JSON',
  'Copy with secrets': '连同密钥一起复制',
  'Copy key': '复制键',
  'Copy message': '复制消息',
  'Copy response': '复制响应',
  'Copy field name': '复制字段名',
  'Copy type': '复制类型',
  'Paste cURL…': '粘贴 cURL…',
  'Send again': '再次发送',
  'Send and download…': '发送并下载…',
  'Resend': '重新发送',
  'Save response to file…': '把响应保存到文件…',
  'Load into composer': '载入编辑器',
  'New request': '新建请求',
  'New collection': '新建集合',
  'New subfolder': '新建子文件夹',
  'New HTTP request': '新建 HTTP 请求',
  'New GraphQL request': '新建 GraphQL 请求',
  'HTTP request': 'HTTP 请求',
  'GraphQL request': 'GraphQL 请求',
  'Open request': '打开请求',
  'Open as new request': '作为新请求打开',
  'Open in new tab': '在新标签页打开',
  'Open collection settings': '打开集合设置',
  'Save to collection…': '保存到集合…',
  'Re-import from OpenAPI…': '从 OpenAPI 重新导入…',
  'Manage environments…': '管理环境…',
  'Variables in this request…': '此请求中的变量…',
  'Set as variable…': '设为变量…',
  'Set variable': '设置变量',
  'Replace this request instead': '改为替换此请求',
  'Reveal in sidebar': '在侧栏中显示',
  'Revert changes': '还原更改',
  'Clear history': '清空历史',
  'Clear all history…': '清空全部历史…',
  'Recover old data…': '恢复旧数据…',
  'Disconnect and close': '断开并关闭',
  'Disconnect idle sockets…': '断开空闲 socket…',
  'Restart OpsMaxx…': '重启 OpsMaxx…',
  'No other socket is open in this window': '此窗口中没有其他打开的 socket',
  'Read value from vault…': '从保险库读取值…',
  'Read value from vault': '从保险库读取值',
  'Trust this CA': '信任此 CA',
  'Stop verifying': '停止验证',
  'Go to type': '跳转到类型',
  'Subscription': '订阅',
  'Mutation': '变更',
  'Timeline': '时间线',
  'Cookies…': 'Cookie…',

  // 请求体与认证方式
  'Form URL-encoded': '表单 URL 编码',
  'Multipart': '多部分表单',
  'Binary file': '二进制文件',
  'Basic': 'Basic 认证',
  'Basic auth': 'Basic 认证',
  'Bearer token': 'Bearer 令牌',
  'API key': 'API 密钥',
  'No auth': '无认证',
  'Inherit from collection': '继承自集合',
  'Private Key': '私钥',

  // 连接、面板、SFTP 与工作区
  'Connect': '连接',
  'Open monitor': '打开监控',
  'Open remote desktop': '打开远程桌面',
  'Edit server': '编辑服务器',
  'Edit jump route': '编辑跳板路由',
  'Edit connection': '编辑连接',
  'Edit tunnel': '编辑隧道',
  'Edit…': '编辑…',
  'Remove…': '移除…',
  'Add a real server': '添加真实服务器',
  'Choose a server': '选择服务器',
  'Choose files': '选择文件',
  'Open vault': '打开保险库',
  'Unlock vault': '解锁保险库',
  'Move to vault…': '移入保险库…',
  'Review saved keys': '查看已保存的密钥',
  'Open here instead': '改为在此打开',
  'Open in editor (inline)': '在编辑器中打开（行内）',
  'Turn on shell integration': '开启 shell 集成',
  'No shells found on this machine': '这台机器上没有找到 shell',
  'Rescan shells': '重新扫描 shell',
  'Change the port': '更换端口',
  'Pick another port': '换个端口',
  'Try this file again': '重试此文件',
  'Choose a different file': '选择其他文件',
  'Choose another file': '选择另一个文件',
  'Set password': '设置密码',
  'Finish setup': '完成设置',
  'Install OpenVPN': '安装 OpenVPN',
  'Install a service': '安装服务',
  'Change a schedule': '修改计划',
  'Import profile': '导入配置',
  'Open profile': '打开配置',
  'Reinstall OpsMaxx': '重新安装 OpsMaxx',
  'Publish': '发布',
  'Get the URL': '获取地址',
  'Update token…': '更新令牌…',
  'Open AI security': '打开 AI 安全',
  'Open AI settings': '打开 AI 设置',
  'Open Connections': '打开「连接」',
  'Create one by hand': '手工创建一个',
  'View in audit log': '在审计日志中查看',

  // AI 审计日志里的结果词
  'Blocked by policy': '被策略阻止',
  'Denied': '已拒绝',
  'Denied — not asked': '已拒绝 —— 未询问',
  'Denied — timed out': '已拒绝 —— 超时',
  'Cancelled — agent disconnected': '已取消 —— 代理断开',
  'You refused this request.': '你拒绝了此请求。',

  // 监控、姿态与时间范围
  'Background checks on': '后台检查已开启',
  'Checks not running': '检查未运行',
  'Foreground only': '仅前台',
  'Everything kept': '全部保留',
  'Last 24 hours': '最近 24 小时',
  'Last 7 days': '最近 7 天',
  'Last 30 days': '最近 30 天',
  'Certificates': '证书',
  'Failed logins': '失败登录',
  'Firewall': '防火墙',
  'OOM kills': 'OOM 终止',
  'Security updates': '安全更新',
  'a minute': '一分钟',
  'an hour': '一小时',
  '6 hours': '6 小时',
  '24 hours': '24 小时',

  // 「此构建尚未接入……」一组：是状态说明，不是功能缺失的道歉
  'The network read is not wired up in this build.': '此构建尚未接入网络读取。',
  'The itemised disk view is not wired up in this build.': '此构建尚未接入逐项磁盘视图。',
  'Disk usage is not wired up in this build.': '此构建尚未接入磁盘用量。',
  'Container actions are not wired up in this build.': '此构建尚未接入容器操作。',
  'Finding compose files is not wired up in this build.': '此构建尚未接入 compose 文件查找。',
  'Healthcheck logs are not wired up in this build.': '此构建尚未接入健康检查日志。',
  'Inspect is not wired up in this build.': '此构建尚未接入检查功能。',
  'Reclaim is not wired up in this build.': '此构建尚未接入回收功能。',
  'The engine precheck is not wired up in this build.': '此构建尚未接入引擎预检。',

  // 同步与设备（addy）与凭据字段
  'Connected to the relay.': '已连接到中继。',
  'Nothing has synced yet.': '还没有任何内容同步过。',
  'Everything this device knows about has been carried.': '本设备所知道的一切都已传输完成。',
  'This build does not report the device list.': '此构建不上报设备列表。',
  'This build does not report which devices are enrolled.': '此构建不上报哪些设备已注册。',
  'A named custom field': '命名的自定义字段',
  'A named header': '命名的请求头',
  'A query parameter': '查询参数',
  'The entry’s key material': '条目的密钥材料',
  'The entry’s username': '条目的用户名',
  'The entry’s API key / password': '条目的 API 密钥 / 密码',
  'The entry’s password / API key': '条目的密码 / API 密钥',

  // 其他
  'You': '你',
  'OpsMaxx itself': 'OpsMaxx 自身',
  'Follow system language': '跟随系统语言',

  // ─────────────────────────────────────────────────────────────────────────
  // 资产清单（monitor/InventoryPanel.tsx + lib/inventory.ts）
  //
  // `lib/inventory.ts` 的列定义是数据，渲染点 `{column.label}` 与表头 title
  // 原先都是裸渲染 —— 所以「同类标签已有译文、界面却是英文」不是词表缺条，
  // 而是渲染点没接线。接线与词条在这一批一起补。
  // ─────────────────────────────────────────────────────────────────────────

  'Distribution': '发行版',
  'Collected': '采集时间',
  'Metadata': '元数据',
  'Arch': '架构',
  'RAM': '内存',
  'Virtualisation': '虚拟化',
  'The package manager this server uses.': '这台服务器使用的包管理器。',
  'Security updates specifically, where the distribution publishes them. Arch and Alpine have no security channel at all, and dnf cannot answer where the repositories omit updateinfo — those servers say so rather than reporting zero.':
    '仅统计安全更新，前提是该发行版发布这类信息。Arch 与 Alpine 完全没有安全更新通道；仓库未提供 updateinfo 时 dnf 也无法回答 —— 这些服务器会如实说明，而不是报 0。',
  'How long ago these facts were collected. Facts are collected about once an hour, not on the two-minute metrics cadence.':
    '这些信息是多久之前采集的。信息大约每小时采集一次，而不是跟随两分钟的指标采集节奏。',
  'How old the package cache behind the update counts is. This is a SECOND age and not the one above it: freshly collected counts read out of a forty-day-old cache are forty days out of date.':
    '更新计数所依据的软件包缓存有多旧。这是另一个时间，与上面那个不同：刚从四十天前的缓存读出来的计数，本身就已经落后四十天。',
  '{help} Click to sort; servers with no value for this column always sort last.':
    '{help} 点击可排序；此列没有值的服务器始终排在最后。',
  'Click to sort. Servers with no value for this column always sort last.':
    '点击可排序。此列没有值的服务器始终排在最后。',

  // ─────────────────────────────────────────────────────────────────────────
  // 首次设置向导的选项标签（onboarding/setupQuestions.ts）。
  //
  // 该文件的渲染点（SetupCard 的 PrefRow）**本来就在渲染处翻译**：
  // `{t(o.label)}`、`t(control.label)`、`t(o.detail)` —— 所以这里只需补词条，
  // 不必接线。向导是首次运行必经之路，且审计完全走不到（demo profile 会跳过）。
  // ─────────────────────────────────────────────────────────────────────────

  'Look & feel': '外观与体验',
  'Density': '紧凑度',
  'Comfortable': '宽松',
  'Compact': '紧凑',
  'Match my system': '跟随我的系统',
  'Updates & releases': '更新与版本发布',
  'Which builds to be offered': '提供哪些构建',
  'Stable only': '仅稳定版',
  'Beta and stable': '测试版与稳定版',
  'Earlier features, less proving.': '功能更新，验证更少。',
  'Check automatically': '自动检查',
  'Download in the background': '后台下载',
  'Watching the estate': '持续监控资产',
  'Sample servers in the background': '在后台采样服务器',
  'Only while I am looking': '仅在我查看时',
  'Keep watching in the background': '继续在后台监控',
  'Every minute': '每分钟',
  'Every 2 minutes': '每 2 分钟',
  'Every 5 minutes': '每 5 分钟',
  'Every 15 minutes': '每 15 分钟',
  'Once a day': '每天一次',
  'Tell me first': '先告诉我',
  'Tell me when a server is struggling': '服务器吃力时告诉我',
  'No alerts': '不提醒',
  'At what point': '在什么程度',
  '70% — tell me early': '70% —— 早点提醒我',
  '90% — only when it is serious': '90% —— 只在严重时提醒',
  'No — I will check': '不 —— 我会自己检查',
  'DevOps engineer': 'DevOps 工程师',
  'Cloud / platform engineer': '云 / 平台工程师',
  'Infrastructure / sysadmin': '基础设施 / 系统管理',
  'SRE / on-call': 'SRE / 值班',
  'Docker and Kubernetes panels on every server.': '每台服务器上的 Docker 与 Kubernetes 面板。',
  'The AppArmor module is present and switched off.': 'AppArmor 模块存在但已关闭。',

  // ─────────────────────────────────────────────────────────────────────────
  // 向导里选项与开关的说明句（同样在 PrefRow 渲染处翻译）。
  //
  // 这些是**多行字面量**，上一版扫描只认单行 `prop: '…'`，所以它们一直没进过
  // 工单 —— 修正扫描（把值的所有引号片段拼起来）后才浮出来。见 CODEBUDDY.md §9。
  // ─────────────────────────────────────────────────────────────────────────

  'Inventory, drift, a change log and security posture across the workspace.':
    '整个工作区的资产清单、漂移、变更日志与安全态势。',
  'Run commands across many servers, apply package updates, leave jobs running.':
    '在多台服务器上运行命令、应用软件包更新、让作业持续运行。',
  'Jenkins, GitLab CI or GitHub Actions, beside the server the run changed.':
    'Jenkins、GitLab CI 或 GitHub Actions，就放在这次运行所改动的服务器旁边。',
  'How OpsMaxx finds and takes new versions. Everything here is also in Settings › General.':
    'OpsMaxx 如何查找并获取新版本。这里的一切在「设置 › 通用」中也有。',
  'Beta cascades — a beta user is offered betas and stable releases, whichever is newer.':
    '测试版级联 —— 选择测试版的用户会同时收到测试版与稳定版，取其中较新的一个。',
  'Off means OpsMaxx only ever looks when you press the button.':
    '关闭后，OpsMaxx 只在你按下按钮时才查看。',
  'Zero means only at launch; anything else is additionally re-checked while open.':
    '0 表示只在启动时检查；其他值还会在应用打开期间额外复查。',
  'Nothing installs itself either way — applying an update is always a separate press.':
    '两种情况都不会自动安装 —— 应用更新永远需要单独按一次。',
  'Whether OpsMaxx samples your servers when nobody is looking at them. Off by default, and this is the switch worth understanding before you leave it.':
    'OpsMaxx 是否在无人查看时对服务器采样。默认关闭；在你决定放着不管之前，这是最值得弄明白的一个开关。',
  'On means OpsMaxx keeps connections to every server in the workspace open on a schedule, whether or not the monitor is on screen — so alerts and capacity trends keep working while the window is closed. Off means a server is only measured while you are looking at it.':
    '开启后，OpsMaxx 会按计划保持与工作区内每台服务器的连接，无论监控是否在屏幕上 —— 因此窗口关闭时，警报与容量趋势仍然有效。关闭后，只有你正在看着某台服务器时才会对它采样。',
  'Every sample is one connection per server. More often is not more accurate.':
    '每次采样对每台服务器建立一条连接。更频繁并不等于更准确。',
  'The master switch for every alert and every webhook: CPU and memory over the threshold, full disks, failed systemd units, load average.':
    '所有警报与 webhook 的总开关：CPU 与内存超阈值、磁盘写满、systemd 单元失败、负载均值。',
  'Covers failed units and full disks as well as CPU and memory. Switching it off also takes down any alerts already showing.':
    '除 CPU 与内存外，也覆盖失败的单元和写满的磁盘。关闭它还会同时撤下已在显示的警报。',
  'The same figure applies to CPU and to memory. Disk has its own, fixed at 85%. Per-server overrides live in Settings.':
    '同一个数值同时适用于 CPU 与内存。磁盘另有自己的阈值，固定为 85%。按服务器的覆盖设置位于「设置」中。',
  'Both of these are instant and both are in Settings › Appearance afterwards.':
    '两者都会立即生效，之后也都能在「设置 › 外观」中找到。',
  'System follows your operating system, including when it changes at sunset.':
    '跟随系统即跟随你的操作系统，包括它在日落时自动切换的情况。',
  'Compact tightens row heights and padding across every table in the app.':
    '紧凑会压缩应用内所有表格的行高与内边距。',
  'Containers and pipelines, and you change the servers as well as watching them.':
    '容器与流水线；你不仅观察这些服务器，还会改动它们。',
  'Mostly Kubernetes, with an eye on what the estate is made of and where it is heading.':
    '以 Kubernetes 为主，同时关注整个资产的构成与走向。',
  'You own the machines: what is on them, what needs patching, who can get in.':
    '这些机器归你管：上面装了什么、哪些需要打补丁、谁能进得去。',
  'You need to know something is wrong before somebody tells you. Mostly reading.':
    '你要在别人告诉你之前就知道出了问题。主要是查看。',

  // AI 审计结果里的「超时」明细（`title={t(outcome.detail)}` 已接线）
  'Nobody answered before the approval timeout, so OpsMaxx denied it. That is the fail-closed default, not a decision somebody made.':
    '在审批超时之前无人作答，因此 OpsMaxx 拒绝了它。这是故障时的默认拒绝，不是某个人做出的决定。',

  // 演示 shell 的提示与补丁页的占位文案
  'Simulated shell. Try: ls, pwd, whoami, uptime, echo <text>, clear':
    '模拟 shell。可以试试：ls、pwd、whoami、uptime、echo <text>、clear',
  'This build cannot list security updates. Restart the app to rebuild it.':
    '此构建无法列出安全更新。重启应用以重建。',

  // 两处裸渲染的表头/能力标签
  'Collections': '集合',
  'Server metrics': '服务器指标',

  // ─────────────────────────────────────────────────────────────────────────
  // 界面部件：按钮、表头、状态名、字段标签
  //
  // 这一批由 scripts/i18n/codemod.mjs 自动包上 t() 之后，从工作单里按长度升序
  // 挑出来的——短字符串就是按钮、表头和行内标签，是「这个应用有没有中文」最直
  // 接的来源。长句说明文在后面的分区里。
  //
  // 单 token 的条目（Add、Save、Run……）上下文有限，取的是这个应用里最常见的
  // 那个意思；如果发现某个词用错了地方，改这一条即可，不用动代码。
  // ─────────────────────────────────────────────────────────────────────────
  ms: '毫秒',
  ps: '进程',
  Add: '添加',
  All: '全部',
  'Esc': 'Esc',
  Hop: '跳',
  Key: '键',
  New: '新建',
  Raw: '原始',
  Run: '运行',
  Set: '设置',
  Yes: '是',
  ask: '询问',
  job: '任务',
  key: '键',
  mem: '内存',
  new: '新建',
  pid: 'PID',
  pod: 'Pod',
  rev: '版本',
  row: '行',
  url: 'URL',
  use: '使用',
  Auth: '认证',
  Back: '返回',
  Body: '正文',
  Copy: '复制',
  Deny: '拒绝',
  Dock: '停靠区',
  Done: '完成',
  Edit: '编辑',
  File: '文件',
  Host: '主机',
  Jobs: '任务',
  Join: '加入',
  Keep: '保留',
  Keys: '密钥',
  Kind: '类型',
  Lock: '锁定',
  Logs: '日志',
  Mode: '模式',
  More: '更多',
  Name: '名称',
  Next: '下一个',
  Open: '打开',
  Path: '路径',
  Peer: '对端',
  Pods: 'Pod',
  Port: '端口',
  Read: '读取',
  Root: '根',
  Runs: '运行记录',
  Save: '保存',
  Send: '发送',
  Sent: '已发送',
  Show: '显示',
  Size: '大小',
  Skip: '跳过',
  Step: '步骤',
  Stop: '停止',
  Tags: '标签',
  Tail: '追踪',
  Test: '测试',
  Text: '文本',
  Then: '然后',
  This: '此',
  Time: '时间',
  Took: '耗时',
  Tool: '工具',
  Type: '类型',
  Unit: '单元',
  Used: '已用',
  View: '查看',
  Wake: '唤醒',
  What: '什么',
  When: '何时',
  Wrap: '自动换行',
  beta: '测试版',
  busy: '忙碌',
  days: '天',
  demo: '演示',
  deny: '拒绝',
  disk: '磁盘',
  exit: '退出',
  fail: '失败',
  free: '空闲',
  from: '来自',
  help: '帮助',
  here: '此处',
  host: '主机',
  line: '行',
  live: '实时',
  lock: '锁定',
  mean: '平均',
  more: '更多',
  none: '无',
  over: '超过',
  ping: 'ping',
  plan: '方案',
  root: '根',
  sudo: 'sudo',
  used: '已用',
  wave: '波形',
  Agent: '代理',
  Clear: '清除',
  Drain: '排空',
  Email: '邮箱',
  Enter: '回车',
  Error: '错误',
  Files: '文件',
  Flags: '参数',
  Group: '分组',
  Hosts: '主机',
  Label: '标签',
  Leave: '保留',
  Local: '本地',
  Match: '匹配',
  Never: '从不',
  Nodes: '节点',
  Notes: '备注',
  Paste: '粘贴',
  Peers: '对端',
  Press: '按',
  Proto: '协议',
  Proxy: '代理',
  Query: '查询',
  Queue: '队列',
  Range: '范围',
  Reset: '重置',
  Retry: '重试',
  Rules: '规则',
  Scope: '范围',
  Shell: 'Shell',
  Start: '开始',
  Steps: '步骤',
  Title: '标题',
  Token: '令牌',
  Types: '类型',
  Usage: '用量',
  Value: '值',
  Where: '位置',
  'a day': '每天',
  after: '之后',
  alert: '告警',
  allow: '允许',
  below: '以下',
  block: '阻断',
  bytes: '字节',
  check: '检查',
  error: '错误',
  image: '镜像',
  match: '匹配',
  ports: '端口',
  shows: '显示',
  since: '自',
  value: '值',
  wheel: '滚轮',
  which: '哪个',
  '1 hour': '1 小时',
  '7 days': '7 天',
  Action: '操作',
  'Add to': '添加到',
  Agents: '代理',
  Alerts: '告警',
  Always: '始终',
  Anyone: '任何人',
  Before: '之前',
  Branch: '分支',
  Browse: '浏览',
  Bucket: '存储桶',
  'Build…': '构建…',
  Cancel: '取消',
  Change: '变更',
  Choose: '选择',
  Colour: '颜色',
  Cordon: '封锁',
  Create: '创建',
  Custom: '自定义',
  Delete: '删除',
  Device: '设备',
  Direct: '直连',
  Domain: '域名',
  Engine: '引擎',
  Events: '事件',
  Export: '导出',
  Fields: '字段',
  Filter: '筛选',
  Follow: '跟随',
  Forget: '移除',
  'Got it': '知道了',
  Header: '请求头',
  SSO: 'SSO',
  'I want': '我想',
  Import: '导入',
  Invite: '邀请',
  Kernel: '内核',
  Method: '方法',
  Params: '参数',
  Pretty: '格式化',
  Raised: '已触发',
  Reboot: '重启',
  Recent: '最近',
  Refuse: '拒绝',
  Region: '区域',
  Reload: '重新加载',
  Remote: '远程',
  Remove: '移除',
  Rename: '重命名',
  Result: '结果',
  Reveal: '显示',
  Review: '复核',
  Revoke: '吊销',
  'Run on': '运行于',
  Schema: '架构',
  Search: '搜索',
  Server: '服务器',
  'Start…': '开始…',
  Status: '状态',
  Tokens: '令牌',
  Unlock: '解锁',
  Upload: '上传',
  Window: '窗口',
  'a year': '每年',
  across: '跨',
  active: '活跃',
  'again…': '再次…',
  deploy: '部署',
  digest: '摘要',
  docker: 'docker',
  failed: '失败',
  global: '全局',
  groups: '个组',
  'in use': '使用中',
  linked: '已关联',
  locked: '已锁定',
  median: '中位数',
  module: '模块',
  passes: '通过',
  raised: '已触发',
  review: '复核',
  server: '服务器',
  sha256: 'sha256',
  shared: '共享',
  stolen: '被盗',
  'to run': '待运行',
  ubuntu: 'ubuntu',
  usable: '可用',
  'web-db': 'web-db',
  '2 hours': '2 小时',
  '30 days': '30 天',
  '4 hours': '4 小时',
  '8 hours': '8 小时',
  '90 days': '90 天',
  Account: '账户',
  Actions: '操作',
  'Add job': '新建任务',
  Address: '地址',
  Approve: '批准',
  'At most': '最多',
  Average: '平均',
  'By item': '按条目',
  Changes: '变更',
  'Change…': '变更…',
  'Choose…': '选择…',
  Command: '命令',
  Confirm: '确认',
  Cookies: 'Cookie',
  Created: '已创建',
  Details: '详情',
  Devices: '设备',
  Dismiss: '忽略',
  Enabled: '已启用',
  Entries: '条目',
  Expires: '过期时间',
  Forward: '转发',
  Globals: '全局变量',
  GraphQL: 'GraphQL',
  Headers: '请求头',
  History: '历史',
  'Import…': '导入…',
  Install: '安装',
  'Keep it': '保留',
  Loading: '加载中',
  Message: '消息',
  Monitor: '监控',
  'Move up': '上移',
  Network: '网络',
  'New job': '新建任务',
  'Not now': '暂不',
  'OS user': '系统用户',
  Outcome: '结果',
  Package: '软件包',
  'Pop out': '弹出',
  Preview: '预览',
  Process: '进程',
  Profile: '配置',
  Proxies: '代理',
  Reached: '已达到',
  Reading: '读取中',
  Refresh: '刷新',
  Remotes: '远程',
  Removed: '已移除',
  Replace: '替换',
  Request: '请求',
  Restart: '重启',
  Revoked: '已吊销',
  'Revoke…': '吊销…',
  Runbook: '操作手册',
  Running: '运行中',
  'Save to': '保存到',
  'Send to': '发送到',
  Sending: '发送中',
  Servers: '服务器',
  Session: '会话',
  Showing: '显示',
  Snippet: '代码片段',
  Started: '已启动',
  'To date': '至今',
  Traffic: '流量',
  Updated: '已更新',
  Updates: '更新',
  account: '账户',
  attempt: '尝试',
  baseUrl: 'baseUrl',
  bastion: '堡垒机',
  deletes: '删除',
  dropped: '已丢弃',
  entries: '条目',
  expired: '已过期',
  headers: '请求头',
  kubectl: 'kubectl',
  minutes: '分钟',
  offline: '离线',
  opsmaxx: 'opsmaxx',
  pairing: '配对',
  profile: '配置',
  reading: '读取中',
  removed: '已移除',
  restart: '重启',
  running: '运行中',
  started: '已启动',
  unbound: '未绑定',
  unknown: '未知',
  virtual: '虚拟',
  '1 minute': '1 分钟',
  '180 days': '180 天',
  Accounts: '账户',
  Activity: '活动',
  'Add job…': '新建任务…',
  'Add peer': '添加对端',
  'Add rule': '添加规则',
  'Apply to': '应用到',
  'At least': '至少',
  Beautify: '美化',
  'Bound to': '绑定到',
  'Built-in': '内置',
  Commands: '命令',
  Continue: '继续',
  'Copy all': '全部复制',
  Deleting: '删除中',
  Diagnose: '诊断',
  Dialling: '拨号中',
  Download: '下载',
  'Dump now': '立即转储',
  Finished: '已完成',
  'Going to': '将前往',
  Labelled: '已标注',
  'Loading…': '加载中…',
  'Lock now': '立即锁定',
  'Log tail': '日志追踪',
  'Looking…': '查询中…',
  Messages: '消息',
  Modified: '已修改',
  'New rule': '新建规则',
  'No body.': '无正文。',
  'No nodes': '无节点',
  'Not sent': '未发送',
  Overview: '概览',
  Packages: '软件包',
  Password: '密码',
  Pipeline: '流水线',
  Prettify: '格式化',
  cpu: 'CPU',
  not: '否',
  owed: '待付',
  vCPU: 'vCPU',
  xrdp: 'xrdp',
  nginx: 'nginx',
  ngrok: 'ngrok',
  'Ctrl ⏎': 'Ctrl ⏎',
  'Ctrl+L': 'Ctrl+L',
  'Host *': '主机 *',
  'RDP port': 'RDP 端口',
  'Reading…': '读取中…',
  Received: '已接收',
  Required: '必填',
  Response: '响应',
  Rollback: '回滚',
  'Route to': '路由到',
  'Run from': '运行于',
  'Save to…': '保存到…',
  Schedule: '计划',
  'Show log': '显示日志',
  Snoozing: '已暂停提醒',
  'Sync now': '立即同步',
  'Tab name': '标签页名称',
  'Then run': '然后运行',
  'This job': '此任务',
  'This run': '本次运行',
  Uncordon: '解除封锁',
  Username: '用户名',
  Visitors: '访问者',
  'Waiting…': '等待中…',
  conflict: '冲突',
  dangling: '悬空',
  database: '数据库',
  describe: '描述',
  'env vars': '环境变量',
  executor: '执行器',
  finished: '已完成',
  'from URI': '来自 URI',
  'idle for': '空闲',
  networks: '网络',
  'no label': '无标签',
  'reading…': '读取中…',
  requests: '请求',
  resident: '常驻',
  resolved: '已解决',
  '2 minutes': '2 分钟',
  '200 lines': '200 行',
  '5 minutes': '5 分钟',
  'Add field': '添加字段',
  'Add ngrok': '添加 ngrok',
  'Add proxy': '添加代理',
  Addresses: '地址',
  Approvals: '审批',
  Arguments: '参数',
  Attention: '注意',
  'Audit Log': '审计日志',
  Authtoken: '认证令牌',
  'Body type': '正文类型',
  'Body view': '正文视图',
  'Bulk edit': '批量编辑',
  'Change it': '修改它',
  'Check now': '立即检查',
  'Clear all': '全部清除',
  'Clear log': '清空日志',
  'Close tab': '关闭标签页',
  Connected: '已连接',
  Container: '容器',
  'Custom CA': '自定义 CA',
  Disabling: '停用中',
  Endpoints: '端点',
  ExecStart: 'ExecStart',
  Favorites: '收藏',
  'File path': '文件路径',
  'From date': '起始日期',
  Handshake: '握手',
  Ingresses: 'Ingress',
  Inventory: '资产清单',
  'Job title': '任务名称',
  'Keep them': '保留',
  'Kernel on': '内核位于',
  'Last sync': '上次同步',
  'Looked in': '查找位置',
  'Move down': '下移',
  'No claims': '无声明',
  'No prompt': '不提示',
  Pipelines: '流水线',
  Protected: '已保护',
  'Re-import': '重新导入',
  Reachable: '可达',
  'Read from': '读取自',
  'Read jobs': '读取任务',
  Reconnect: '重新连接',
  'Remove it': '移除',
  'Roll back': '回滚',
  'Rule name': '规则名称',
  'Run a job': '运行任务',
  'Run every': '运行间隔',
  'Save rule': '保存规则',
  'Send from': '发送自',
  'Set aside': '搁置',
  Subdomain: '子域名',
  'TLS / SSL': 'TLS / SSL',
  Transport: '传输',
  'Try again': '重试',
  'Unit name': '单元名称',
  Uploading: '上传中',
  Variables: '变量',
  WebSocket: 'WebSocket',
  'Whole run': '整个运行',
  Workspace: '工作区',
  'X-Api-Key': 'X-Api-Key',
  'and worse': '更糟',
  'ask again': '再次询问',
  'bytes out': '发送字节',
  connected: '已连接',
  container: '容器',
  'docker ps': 'docker ps',
  enforcing: '强制执行',
  filtering: '筛选中',
  namespace: '命名空间',
  'never run': '从未运行',
  'not shown': '未显示',
  restarted: '已重启',
  succeeded: '成功',
  'the vault': '保险库',
  '10 minutes': '10 分钟',
  '1000 lines': '1000 行',
  '15 minutes': '15 分钟',
  '5000 lines': '5000 行',
  'API server': 'API 服务器',
  'Add Server': '添加服务器',
  'Agent name': '代理名称',
  'All clear.': '一切正常。',
  'Allow once': '允许一次',
  Capability: '能力',
  'Change log': '变更日志',
  'Clear view': '清空视图',
  'Close code': '关闭码',
  'Close pane': '关闭面板',
  Connection: '连接',
  Containers: '容器',
  'Copy again': '再次复制',
  'Copy token': '复制令牌',
  'Copy value': '复制值',
  Credential: '凭据',
  DaemonSets: 'DaemonSet',
  'Debug mode': '调试模式',
  Definition: '定义',
  'Disable it': '停用它',
  Disconnect: '断开',
  'Disk usage': '磁盘用量',
  'Entry name': '条目名称',
  Everything: '全部',

  // ─────────────────────────────────────────────────────────────────────────
  // 按实际渲染清单补齐（来源：渲染遍历，非按长度猜测）
  // 这一批覆盖首屏、空状态、AI 与 MCP、同步与设备、HTTP 客户端、问题反馈。
  // ─────────────────────────────────────────────────────────────────────────

  'Not yet': '尚未',
  'Read it': '先读一读',
  Off: '关闭',
  None: '无',
  Auto: '自动',
  Disabled: '已禁用',
  characters: '个字符',
  'not read yet': '尚未读取',
  'Not reported': '未上报',
  'You are here': '你在这里',
  'Where you are': '你当前的位置',
  'Sync runs': '同步记录',
  'AI Agents': 'AI 代理',
  'No tunnels': '没有隧道',
  'Start here': '从这里开始',
  'New session': '新建会话',
  'New GraphQL': '新建 GraphQL',
  'This machine': '本机',
  'Session tabs': '会话标签页',
  'Add Database': '添加数据库',
  'Sync summary': '同步摘要',
  'Create vault': '创建保险库',
  'Create your vault': '创建你的保险库',
  'How it works': '工作原理',
  'Report a bug': '反馈问题',
  'Save report…': '保存报告…',
  'Create tunnel': '创建隧道',
  'New WebSocket': '新建 WebSocket',
  'New WebSocket or GraphQL request': '新建 WebSocket 或 GraphQL 请求',
  'Send (Ctrl+↵)': '发送（Ctrl+↵）',
  'More {label} options': '{label}的更多选项',
  'About {title}': '关于{title}',
  'Sync & devices': '同步与设备',
  'About & Updates': '关于与更新',

  // AI 会话配置（shared/mcp.ts 的 SESSION_MODES，在渲染处翻译）
  'Read only': '只读',
  'Ask first': '先询问',
  'Bypass permissions': '放行（不询问）',
  'Look around, never change anything': '只查看，不做任何修改',
  'Approve every change before it runs': '每次变更执行前都需批准',
  'Routine work runs; sudo and risky actions ask': '常规操作直接执行；sudo 与有风险的操作先询问',
  'No prompts or blocks, except on Protected targets': '不弹提示、不拦截，受保护的目标除外',
  'Use an access group, exactly as written': '按访问组原样执行',
  'Connecting…': '正在连接…',
  'Running on 127.0.0.1:{port}': '运行于 127.0.0.1:{port}',

  // ─────────────────────────────────────────────────────────────────────────
  // 已接线、只差词条的页面说明。来源：i18n:coverage 的 WIRED BUT
  // UNTRANSLATED ∩ i18n:render 的可见清单。全部是完整句，可直接翻译；
  // 被 JSX 拆开的片段一律不在此列（翻译片段会得到中英混排）。
  // ─────────────────────────────────────────────────────────────────────────
  'Let AI agents like Claude Code, Codex, Gemini CLI and other MCP-compatible clients operate your servers through OpsMaxx — without ever seeing an SSH password, private key or database credential. OpsMaxx resolves the friendly names, enforces access-group policy and asks for your approval on anything sensitive.':
    '让 Claude Code、Codex、Gemini CLI 等兼容 MCP 的客户端通过 OpsMaxx 操作你的服务器 —— 它们永远看不到 SSH 密码、私钥或数据库凭据。OpsMaxx 负责解析友好名称、执行访问组策略，并在涉及敏感操作时征求你的批准。',
  'The profile a session starts in when nobody picks one — CLI-paired and OAuth sessions always start in it. Until you set one they start on Custom with the default access group, which is no access at all if there is none. Each session’s profile can be changed under Active Sessions.':
    '无人指定时，会话启动所用的配置 —— CLI 配对与 OAuth 会话总是从它开始。在你设置之前，它们以「自定义」和默认访问组启动；若没有默认访问组，就等于完全没有权限。每个会话的配置都可以在「活动会话」下修改。',
  'On: the actions below still ask even where a capability says Allow. Off: Allow means allow (a command whose program is computed at run time still asks unless Sudo is Allow). Applies to agents on the Custom profile using this group; the predefined profiles carry their own.':
    '开启：即使某项能力标为「允许」，下列操作仍会征求同意。关闭：「允许」就是允许（程序名在运行时才确定的命令仍会询问，除非「sudo 权限」为允许）。适用于使用本组、配置为「自定义」的代理；预定义配置各自带有自己的设置。',
  'A client that asked to connect over OAuth waits here. Nothing is granted until you choose what it may do — there is no default, and the client cannot choose for itself. Approving creates a session exactly as if you had made one by hand.':
    '通过 OAuth 请求连接的客户端会在此等待。在你选定它可以做什么之前，不会授予任何权限 —— 没有默认值，客户端也无法自行选择。批准后创建的会话，与你手工创建的完全一样。',
  'The most specific matching pattern wins; anything unmatched falls back to Read/Write Files above. Sudo -i/su/bash-style unrestricted shells are blocked on every profile except Bypass, and are not configurable here.':
    '匹配最具体的规则生效；未匹配到的回退到上方的「读/写文件」。除「绕过」外，所有配置都会拦截 sudo -i、su、bash 这类无限制 shell，此处不可配置。',
  "Optional: under Access Groups, hold a workspace or server below every session's group with an assignment, or mark it Protected so agents there are held at Ask first — for production.":
    '可选：在「访问组」下用一条指派把某个工作区或服务器压到所有会话的组之下，或把它标记为「受保护」，让针对它的代理一律先询问 —— 用于生产环境。',
  'A restriction narrows every profile except Bypass. To hold this target even against Bypass, mark it Protected. No AI Access holds for every profile.':
    '限制会收紧除「绕过」以外的所有配置。若要连「绕过」也拦住，请把它标记为「受保护」。「禁止 AI 访问」对所有配置一律生效。',
  'What this agent may do, and how much it asks first. Custom uses an access group instead. You can change a running session’s profile at any time.':
    '这个代理可以做什么，以及事前需要征得多少同意。「自定义」改用访问组。运行中的会话可随时更改配置。',
  'Works the same way whether OpsMaxx is installed normally or running in portable mode — the port and token are all any client needs.':
    '无论 OpsMaxx 是常规安装还是便携运行，方式都一样 —— 客户端只需要端口和令牌。',
  'Actions an access group marked ASK wait here for your decision. An AI agent can never approve its own request — only this UI can.':
    '被访问组标记为「询问」的操作会在此等待你决定。AI 代理永远不能批准自己的请求 —— 只有这个界面可以。',
  'Every AI action OpsMaxx processed, whether allowed, approved, denied or failed. Never includes passwords, keys or other secrets.':
    'OpsMaxx 处理过的每一个 AI 操作，无论是允许、批准、拒绝还是失败。绝不包含密码、密钥或其他机密。',
  'This session only ever sees servers inside the workspace(s) selected here — pick as many as this agent needs.':
    '这个会话只能看到此处所选工作区内的服务器 —— 按这个代理的需要选即可。',
  'Most MCP-compatible clients accept a Streamable HTTP server via JSON configuration, for example:':
    '大多数兼容 MCP 的客户端都支持通过 JSON 配置接入 Streamable HTTP 服务器，例如：',
  'Every agent is held at Ask first here, whatever its profile; Read only stays read only.':
    '此处所有代理一律先询问，无论其配置为何；「只读」仍是只读。',
  'Immediately revokes every active session and denies every pending approval request.':
    '立即吊销所有活动会话，并拒绝所有待决的批准请求。',
  'What each one allows, asks about, or refuses — read from the groups themselves.':
    '每一组允许、询问与拒绝的范围 —— 直接读自各组自身。',
  'How long an ASK action waits for you before it is treated as denied.':
    '标记为「询问」的操作等待多久后被视为拒绝。',
  'A label for the Active Sessions list — e.g. "Claude Code", "Codex".':
    '「活动会话」列表里显示的标签 —— 例如 "Claude Code"、"Codex"。',
  'Restart the bridge (toggle it off and on) after changing this.':
    '修改后需要重启桥接（关闭再开启）。',
  'Global configuration for the OpsMaxx MCP bridge itself.':
    'OpsMaxx MCP 桥接自身的全局配置。',
  'Connecting Codex, Gemini CLI or another MCP client':
    '接入 Codex、Gemini CLI 或其他 MCP 客户端',
  'Or skip typing tokens: the OpsMaxx CLI launcher': '或者省去手动输入令牌：使用 OpsMaxx CLI 启动器',
  'Somewhere for a backup to go that is not this machine, written on a schedule and checked after every write. Each generation is read back off the destination and decrypted before the run is called a success, and older generations are only deleted once the new one has passed both.':
    '存放备份的地方，不在本机，按计划写入并在每次写入后校验。每一代备份都会从目标端读回并解密，之后这次运行才算成功；只有新一代通过了这两项检查，更早的备份才会被删除。',
  'New sessions, file browsing and monitoring reuse an existing authenticated connection instead of logging in again. On servers with two-factor authentication, a code is only requested when no connection is being reused — so this sets how often you are asked.':
    '新建会话、浏览文件和监控会复用已有的已认证连接，而不是重新登录。在启用双因素认证的服务器上，只有在没有连接可复用时才会要求验证码 —— 所以这一项决定了你被询问的频率。',
  'Writes a single encrypted file containing your workspaces, servers, databases, tunnels, stored credentials, vault and trusted host keys. Credentials are re-encrypted under this passphrase, so the file restores on any machine — and is unreadable without it.':
    '写出一个加密文件，内含你的工作区、服务器、数据库、隧道、已保存的凭据、保险库和可信主机密钥。凭据会用这个口令重新加密，因此该文件可在任何机器上恢复 —— 没有口令则无法读取。',
  'It carries what Alerts raises, so that switch has to be on too. And nothing is raised while you are elsewhere unless servers are checked in the background — so with that off, this stays silent in exactly the case you set it up for.':
    '它传递的是「警报」所产生的通知，所以那个开关也必须开启。若未开启后台检查，你在别处时就不会收到任何通知 —— 也就是说，关掉后台检查后，恰恰在你配置它要提醒的场景里它不会出声。',
  'A script, a dev server or an agent calls a third-party API through OpsMaxx without ever holding the key. Point its base URL at the address below; the credential is added here, on the way out, and never comes back in a response.':
    '脚本、开发服务器或代理可以经由 OpsMaxx 调用第三方 API，而无需持有密钥。把它的 base URL 指向下方地址即可；凭据在出口处由这里附加，且绝不会随响应返回。',
  'Destination, rule, outcome and how long it took. Never the body, the headers or the query string — a rule that puts the key in a query parameter is exactly the rule whose query string must not be written down.':
    '记录目标、规则、结果与耗时。绝不记录请求体、请求头或查询串 —— 把密钥放进查询参数的规则，恰恰正是其查询串绝不能落盘的规则。',
  'Every file written here contains your stored credentials, your vault and your trusted host keys, encrypted under one passphrase. Choosing a destination is choosing somewhere for those to live.':
    '此处写出的每个文件都含你保存的凭据、保险库与可信主机密钥，并用同一个口令加密。选择目标位置，就是为这些东西选择存放之处。',
  'Reads a Bitwarden or Vaultwarden vault into this one, once. It does not keep the two in step afterwards, and nothing is sent anywhere else: this machine talks to that server directly.':
    '把 Bitwarden 或 Vaultwarden 保险库一次性导入这里。导入后两者不再保持同步，也不会有任何数据发往别处：本机直接与该服务器通信。',
  'Starts an SSH agent that offers the keys stored here to git, ansible, rsync and anything else that looks for one. Nothing is signed without asking you first.':
    '启动一个 SSH 代理，把这里保存的密钥提供给 git、ansible、rsync 以及其他需要它的程序。任何签名都必须先征得你的同意。',
  'Nothing is intercepted and no certificate is installed — a caller opts in by pointing at us, which is why an unconfigured tool is unaffected.':
    '不会拦截任何流量，也不会安装证书 —— 调用方需主动指向我们才算接入，因此未配置的工具不受影响。',
  'One destination, one credential, one way of sending it. Nothing applies by default: a destination with no rule is refused, never forwarded.':
    '一个目标、一份凭据、一种发送方式。默认什么都不放行：没有规则的目标会被拒绝，绝不会被转发。',
  'Choose a passphrase you can find again — there is no way to open the file without it, and nothing here can reset it.':
    '请选一个你还能再想起来的口令 —— 没有它就无法打开文件，这里也无法重置。',
  'No tokens, so every request is refused. Create one above and give it to the script that needs it.':
    '还没有令牌，因此所有请求都会被拒绝。在上方创建一个，交给需要它的脚本。',
  'No rules yet, so the proxy will refuse everything. That is the safe state, not a broken one.':
    '还没有规则，因此代理会拒绝一切。这是安全状态，不是故障。',
  'An alert with no resolution leaves the reader working out whether it is still happening.':
    '没有解除条件的警报，会让读者自己去判断它是否还在持续。',
  'Sends one sample alert now, so a wrong URL is found here rather than during an incident.':
    '立即发送一条示例警报，这样 URL 填错会在这里被发现，而不是在事故当中。',
  'No SSH keys in the vault yet. Add one with its private key and it appears here.':
    '保险库里还没有 SSH 密钥。添加一个并附上私钥，它就会出现在这里。',
  'Click a shortcut and press the keys you want. Backspace clears it, Esc cancels.':
    '点击一个快捷键，然后按下你想要的组合键。退格清除，Esc 取消。',
  'Give each script or agent its own, so revoking one does not stop the others.':
    '给每个脚本或代理各发一份，这样吊销其中一个不会影响其他。',
  'Optional end date. A token with no end date never expires.':
    '可选的到期日期。不设到期日期的令牌永不过期。',
  'Proxy port': '代理端口',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置 › 模块的说明文字（shared/modules.ts 的 detail，23 条）。
  'Search systemd units, listening ports and servers across the workspace, from data the monitor already collects.':
    '在工作区内搜索 systemd 单元、监听端口和服务器，数据来自监控已经采集的内容。',
  'What every server is — distribution, architecture, CPU, virtualisation — and what it needs: pending updates, security updates where the distribution publishes them, and whether a reboot is owed. Read-only, and nothing is refreshed: package caches are read, never updated, and their age is reported alongside the counts.':
    '每台服务器是什么 —— 发行版、架构、CPU、虚拟化方式 —— 以及它需要什么：待安装的更新、发行版公布的安全更新，以及是否欠一次重启。只读，且不做任何刷新：包缓存只读取、绝不更新，其数据的新旧程度会与统计数字一并列出。',
  'What every server needs — pending updates, security updates where the distribution publishes them, and whether a reboot is owed — and applying them in waves, with a health check between waves and a hard refusal to restart a server other servers connect through. It never patches on a schedule and never decides for you.':
    '每台服务器需要什么 —— 待安装的更新、发行版公布的安全更新、是否欠一次重启 —— 并分批应用它们，批次之间做健康检查，且硬性拒绝重启那些有其他服务器连接的服务器。它绝不按计划打补丁，也绝不替你决定。',
  'Which key opens which server and whose it is: every authorized_keys file across the estate, fingerprinted, with locked and expired accounts and administrative group membership alongside. A server whose files could not be read is shown as unreadable and excluded from every count — never as a server with no keys. Reading is the whole of it: nothing on this tab writes to a server, and removing a key is a separate module on the Operations side.':
    '哪把密钥能打开哪台服务器、它属于谁：整个资产范围内所有 authorized_keys 文件，带指纹，并附上被锁定与已过期的账户以及管理组成员关系。文件读不到的服务器会标为不可读，并从所有统计中排除 —— 绝不会被当作一台没有密钥的服务器。读取就是它的全部：这个标签页上的任何操作都不会写入服务器，移除密钥是运维侧另一个独立模块。',
  'Remove one SSH key from every account across the estate that trusts it. Each server takes a timestamped backup, arms its own rollback before OpsMaxx lets go, and keeps the change only once a second, independent session has authenticated against the changed file. Accounts it may not touch are listed by name with the reason, and a key is never reported as gone from an estate that could not be fully read.':
    '从整个资产范围内所有信任某把 SSH 密钥的账户上移除它。每台服务器都会做一次带时间戳的备份，在 OpsMaxx 放手之前先准备好自己的回滚，并且只有在第二个独立会话针对改动后的文件完成认证之后，才保留这次变更。它不能触碰的账户会连原因一并以名称列出；在一份无法完整读取的资产上，绝不会报告某把密钥已经移除。',
  'How full a server is getting and when it runs out — "this disk fills in eleven days" — drawn from the samples the monitor already writes. It stores nothing of its own, schedules nothing and evaluates nothing in the background: every line is derived on demand from history that exists whether or not this is on. A forecast is never stated without the window it was drawn from and how much of that window was sampled. A gap where nothing was measured is left as a hole in the line rather than drawn across; disk and memory are still forecast ACROSS such gaps, because a disk keeps filling while nobody is watching, while CPU is not.':
    '服务器还有多满、什么时候会用尽 —— 「这个磁盘十一天后满」—— 取自监控已经在写入的样本。它自己不存储任何东西、不排定任何任务，也不在后台做任何计算：每一行都是按需从历史记录推导出来的，而那些历史无论此模块是否开启都存在。给出预测时，必定同时给出它取自哪个时间窗口、该窗口被采样的比例。没有测量到的空档会在曲线上留成缺口，而不是直接连过去；磁盘与内存仍会跨越这种空档继续预测，因为无人看守时磁盘照样在填满，CPU 却不是。',
  '"What did I change on Tuesday" — one timeline over four records that already exist: shells run on this machine, what you confirmed before a job or a broadcast ran, what an agent did through the MCP bridge, and the alerts, jobs and store events the durable history keeps. Metadata only: commands and targets, never output. It reads; it stores nothing of its own and writes nothing.':
    '「我周二改了什么」—— 一条时间线，覆盖四种已经存在的记录：本机运行过的 shell、你在某个作业或广播运行前确认过的内容、某个代理通过 MCP 桥接做过的事，以及持久历史保存的警报、作业与存储事件。只含元数据：命令与目标，绝不含输出。它只读取；自己不存储任何东西，也不写入任何东西。',
  'When an alert fires, run a job or post to the webhook — with a ceiling on how often it may act. A rule runs the job it was confirmed with, on the servers it was confirmed for, and refuses if either has changed. It is not a workflow language: one trigger, one filter, one action, one rate limit.':
    '警报触发时运行某个作业，或向 webhook 发帖 —— 并对它的行动频率设有上限。规则会用它被确认时使用的那个作业、在它被确认时选定的那些服务器上运行，只要其中任何一项已经变更就拒绝执行。它不是工作流语言：一个触发器、一个过滤器、一个动作、一个频率上限。',
  'Compare a watched configuration file across the estate and say where it diverges — "all twelve web servers have this nginx.conf, three do not". Every file is compared under normalisation rules that are named on screen, so two files that differ and are called the same say which rule ate the difference. A server that could not be read is never reported as a server that matches. Read-only: it never writes a file back to bring a server into line.':
    '比较一台被监视的配置文件在整个资产范围内的差异，并指出哪里有分歧 —— 「十二台 Web 服务器都有这个 nginx.conf，三台没有」。每个文件都在屏幕上具名的规范化规则下比较，因此两个内容不同却被视为相同的文件，会说明是哪条规则吃掉了差异。读不到的服务器绝不会被报告为「一致」。只读：它绝不把文件写回去让服务器对齐。',
  "What every server already knows about its own exposure: which firewall is active and the shape of its rules, whether SELinux or AppArmor is enforcing, how sshd compares with a hardening baseline, and how many logins have failed. Read-only, and emphatically not a vulnerability scanner — the pending security update count comes from the Inventory probe, which asks the server's own package manager, rather than from a CVE feed. A check that could not run is shown as unread, never as passed.":
    '每台服务器对自己的暴露面已经知道的事：哪个防火墙在生效、其规则大致是什么形状、SELinux 还是 AppArmor 处于强制模式、sshd 与加固基线的差距，以及有多少次登录失败。只读，且明确不是漏洞扫描器 —— 待安装的安全更新数量来自「清单」探针，它问的是服务器自己的包管理器，而不是某个 CVE 源。无法执行的检查会显示为未读取，绝不会显示为通过。',
  'Run one command across selected servers, with confirmation that scales to how many servers and how dangerous the command is.':
    '在选定的服务器上运行同一条命令，确认流程会随服务器数量和命令的危险程度而升级。',
  'Watch any URL from the outside and see whether it answers, how fast, and how often it has been up. External on purpose: a server can be perfectly healthy while the service in front of it returns 502.':
    '从外部监视任意 URL，看它是否响应、响应多快、可用率如何。刻意从外部发起：一台服务器可以完全健康，而它前面的服务却返回 502。',
  'Run ping and traceroute from this machine or from any server. "Can this server reach that service" is a different question from "can my laptop reach it", and it is usually the one that matters.':
    '从本机或任意服务器运行 ping 与 traceroute。「这台服务器能否访问那个服务」与「我的笔记本能否访问」是两个不同的问题，而通常要紧的是前者。',
  'Follow a systemd unit or a log file on several servers at once, interleaved by server.':
    '同时跟踪多台服务器上的一个 systemd 单元或一个日志文件，按服务器交错显示。',
  'Read crontabs, /etc/cron.d and systemd timers across the estate, and say which of those sources this account was actually allowed to read. Read-only: changing a schedule is a write, and it lives on the Operations side under Jobs.':
    '在整个资产范围内读取 crontab、/etc/cron.d 与 systemd 定时器，并说明这些来源中哪些是当前账户实际有权读取的。只读：修改计划属于写入，它位于运维侧的「作业」下。',
  'Compose a multi-step job, pick the servers, run it in waves and watch it. Every job asks for the confirmation its own risk demands, and the answer is recorded before anything runs.':
    '编排一个多步骤作业、选定服务器、分批运行并观察它。每个作业都会按其自身风险要求确认，而且在任何东西开始运行之前，先记录下确认结果。',
  'Read what each server supervises for your account with `systemd --user` — what is running, what has failed, and whether it survives you logging out. Read-only: nothing is started, stopped or written, and installing a new unit is a write that lives on the Operations side under Jobs.':
    '用 `systemd --user` 读取每台服务器为你的账户托管了什么 —— 哪些在运行、哪些已经失败，以及它们能否在你登出后存活。只读：不会启动、停止或写入任何东西；安装新单元属于写入，位于运维侧的「作业」下。',
  'Run, watch, restart and read the logs of a long-lived process on THIS machine — a dev server, a worker, a script that should outlive its terminal. Restart policies, exponential backoff, crash-loop detection and a bounded log ring, from the supervisor that already keeps VPN engines alive. Nothing runs on a remote server, nothing starts by itself, and a value that looks like a secret has to come from the vault rather than the process list.':
    '在**本机**上运行、观察、重启并读取某个长期存活进程的日志 —— 开发服务器、工作进程、本该比终端活得更久的脚本。重启策略、指数退避、崩溃循环检测和有界日志环形缓冲，都来自那个已经在维持 VPN 引擎存活的监管进程。不会有任何东西在远程服务器上运行，不会有任何东西自行启动，而看起来像机密的值必须来自保险库，而不是进程列表。',
  'List containers on a server, read their logs, and open a shell inside a running one. Uses the docker binary already on the server — a container shell is arbitrary code execution there.':
    '列出服务器上的容器、读取它们的日志，并在运行中的容器里打开一个 shell。使用服务器上已有的 docker 二进制文件 —— 容器内的 shell 在那台机器上等同于任意代码执行。',
  'Connect a Jenkins, GitLab or GitHub Actions account and read what it did: pipelines, run history, and the log of the step that failed, beside the server the run changed. This module reads only. Starting a build, cancelling one, and enabling or disabling a job are the separate "Start a build" module, and its controls appear on this tab only while that one is switched on.':
    '连接 Jenkins、GitLab 或 GitHub Actions 账户，读取它做过什么：流水线、运行历史、失败步骤的日志，并与该次运行所改动的服务器并列显示。这个模块只读取。启动构建、取消构建、启用或禁用任务属于另一个独立的「开始构建」模块，只有那个模块开启时，它的控件才会出现在这个标签页上。',
  'Start, re-run and cancel builds on a CI server OpsMaxx does not administer, and enable or disable a job. What runs is the pipeline definition already in that repository — not anything composed here — so it can deploy, migrate or restart whatever that file says. Once a run has started OpsMaxx cannot stop it: cancelling is a request to a third party that may already have finished.':
    '在 OpsMaxx 并不管理的 CI 服务器上启动、重跑和取消构建，以及启用或禁用某个任务。实际运行的是那个仓库里已有的流水线定义 —— 不是在这里编排的任何东西 —— 因此它可能部署、迁移或重启那个文件所说的一切。一旦运行开始，OpsMaxx 就无法停止它：取消只是向第三方发出的请求，而对方可能早已完成。',
  'List contexts, namespaces and pods and read pod logs, using the kubectl already on the server. Reading only: it never switches your context, never execs into a pod, and never applies or deletes anything.':
    '列出上下文、命名空间与 Pod 并读取 Pod 日志，使用服务器上已有的 kubectl。仅读取：它绝不切换你的上下文，绝不 exec 进入 Pod，也绝不 apply 或删除任何东西。',
  'Your own machines, and what has reached them. OpsMaxx can carry servers, workspaces, tunnels and the vault between your devices through an addy relay you run yourself — every object sealed before it leaves, and the relay holding no key. This panel is the readout and the way in: which relay this device is enrolled on, which devices are on the account, when each was last seen, and when anything last synced. It reads only, and it touches no server in the estate.':
    '你自己的机器，以及什么东西已经到达了它们。OpsMaxx 可以通过你自己运营的 addy 中继，在你的设备之间传递服务器、工作区、隧道和保险库 —— 每个对象在离开之前都已密封，中继不持有任何密钥。这个面板既是读数也是入口：本设备注册在哪个中继上、账户上有哪些设备、每台设备最后一次出现是什么时候，以及最后一次同步发生在何时。它只读取，也不触碰资产中的任何服务器。',

  // 设置 › 模块：分组名与页首说明。数据来自 Settings.tsx 的 MODULE_GROUPS ——
  // 属"数据表的值被渲染"，接线必须落在**渲染处**（定义处包 t() 会在模块加载时
  // 求值，那时语言还没定）。模块名与模块说明（detail）另成一批。
  // ─────────────────────────────────────────────────────────────────────────
  'Features that ship with OpsMaxx but stay off until you turn them on. Everything here is first-party code in the same repo, reviewed the same way — this is about not carrying what you do not use, not about running anyone else’s code.':
    '这些功能随 OpsMaxx 一起发布，但在你启用之前一直关闭。这里的一切都是同一仓库中的第一方代码，审查标准完全相同 —— 这是为了不背负你用不到的东西，而不是为了运行别人的代码。',
  'A module added by an update stays off on an existing install until you enable it here.':
    '更新新增的模块在已有安装中保持关闭，直到你在此启用它。',
  'These have their own icon in the sidebar on the left. Switching one off here removes its icon as well as its panel.':
    '这些模块在左侧边栏有自己的图标。在此关闭其中一个，会连图标一并移除，而不只是移除面板。',
  'Panels under Monitoring. These read the estate rather than changing it — except Rules, which can run a job you approved in advance, on the servers you picked, while nobody is watching.':
    '「监控」下的面板。它们读取资产而不做变更 —— 但「规则」例外：它可以在无人值守时，在你选定的服务器上运行你事先批准过的作业。',
  'Panels under Operations. These exist to write to servers: running commands across the fleet, installing updates, removing access. Every one ships off.':
    '「运维」下的面板。它们的存在就是为了写入服务器：在整个资产范围内运行命令、安装更新、移除访问权限。每一个默认都是关闭的。',

  'A relay you run yourself, which carries your data between your devices and cannot read any of it.': '由你自己运营的中继，它在你的设备之间传递数据，却读不到其中任何内容。',
  'Alerts, background checking, webhook delivery, and the monitor strip.': '警报、后台检查、webhook 投递，以及监控条。',
  "Applies to open terminals immediately. A scheme without its own background keeps the app's, so it follows light and dark.": '立即应用到已打开的终端。没有自带背景色的配色会沿用应用的背景，因此会跟随浅色/深色模式。',
  'Clears the vault from this screen and asks for your master password before showing it again. Nothing else stops — connections, background checks, pipeline polling and scheduled backups keep using the credentials in it. The vault locks completely when you quit or your machine sleeps. The timer counts vault inactivity, not time since you started the app, and background work does not postpone it.': '在此界面清空保险库，并在你再次查看前要求输入主密码。除此之外不会中断任何东西 —— 连接、后台检查、流水线轮询和计划备份仍会使用库中的凭据。退出应用或机器休眠时，保险库会完全锁定。计时器统计的是保险库的空闲时间，而不是应用启动以来的时间，后台任务也不会推迟它。',
  'Export an encrypted copy of everything, or restore from one.': '把全部内容导出为一份加密副本，或从这样的副本恢复。',
  'Let a script or an agent call a third-party API without ever holding the key.': '让脚本或代理在完全不持有密钥的情况下调用第三方 API。',
  'Measured from the end of one pass to the start of the next, so a slow estate slows the cadence instead of overlapping checks.': '从上一次遍历结束到下一次开始计时，因此响应慢的资产会让节奏放慢，而不是让检查彼此重叠。',
  'Other tools on this machine can use the SSH keys in your vault, without a second copy of them sitting in ~/.ssh.': '本机的其他工具可以使用你保险库里的 SSH 密钥，而无需在 ~/.ssh 再留一份副本。',
  "Passwords and key passphrases go to the vault, or to this platform's secure store when no vault is set up. Neither path writes plaintext to disk, and there is no setting that changes it.": '密码与密钥口令会存入保险库；未设置保险库时，则存入本平台的安全存储。两条路径都不会把明文写到磁盘上，也没有任何设置能改变这一点。',
  'Record a combination by clicking a shortcut. Conflicts are highlighted.': '点击某个快捷键，再按下你想要的组合键即可录制。冲突项会被高亮。',
  'Sample every server in this workspace on a schedule, even when the monitor is not open, so failures and resource alerts are noticed while you are elsewhere. Opens one SSH exec channel per server per pass, separately from the monitor, so it is real load on the estate rather than a reuse of what is already sampled. Needs the vault unlocked; while it is locked, checking pauses rather than failing.': '按计划对工作区内每台服务器采样，即使监控没有打开，这样你不在时也能发现故障与资源警报。每一轮会为每台服务器单独开一条 SSH exec 通道，与监控彼此独立，因此这是对资产的真实负载，而不是复用已有的采样。需要保险库处于解锁状态；锁定时检查会暂停，而不是失败。',
  'Standing permissions that let this machine keep working while nobody is here — and the only place to take one back.': '让这台机器在无人值守时继续工作的长期授权 —— 也是唯一能收回授权的地方。',
  'The encrypted store for passwords, SSH keys and API keys.': '存放密码、SSH 密钥与 API 密钥的加密存储。',
  'Your app version and update channel, this platform and its Electron, Chrome and Node versions, how many servers, workspaces, databases, tunnels and VPN profiles exist, which optional modules are on, and whether each configurable feature is switched on and actually set up. Counts and on/off states only — no names, hostnames, addresses, usernames, paths or credentials, and nothing read from any server. The crash screen copies this same report with the error text added, which is worth a glance before posting. Nothing is saved to disk.': '你的应用版本与更新通道、本平台及其 Electron、Chrome、Node 版本，有多少服务器、工作区、数据库、隧道和 VPN 配置，哪些可选模块已开启，以及每个可配置功能是否已打开并真正配置好。只含计数与开关状态 —— 不含名称、主机名、地址、用户名、路径或凭据，也不读取任何服务器。崩溃界面会复制同一份报告并附上错误文本，发布前值得看一眼。不会写入磁盘。',

  'Live CPU, memory, disk and network docked below the session. Sampling only runs for the visible tab.': '在会话下方停靠显示实时的 CPU、内存、磁盘与网络。只有当前可见的标签页才会采样。',
  'Double-clicking a file in the Files view uses the external editor instead of the built-in inline editor.': '在「文件」视图里双击文件时，使用外部编辑器，而不是内置的行内编辑器。',
  'When on, hidden workspaces take their place in the numbering and can be switched to by shortcut. When off, they are skipped and the numbers close up around them.': '开启后，隐藏的工作区仍占用编号位置，也可以用快捷键切换过去。关闭后，它们会被跳过，编号随之收拢。',
  'Typing exit ends the session, so the pane goes with it — the same as every other terminal. A shell that stopped for a reason keeps its pane and says why, whatever this is set to.': '输入 exit 会结束会话，面板随之关闭 —— 与其他终端一致。因故停止的 shell 会保留面板并说明原因，无论这一项如何设置。',
  'Click inside the line you are typing to put the shell cursor there. Needs shell integration, so it does nothing in a session without it, and stays out of the way while a command is running or a full-screen program is open.': '在你正在输入的那一行内点击，即可把 shell 光标移到该处。这依赖 shell 集成，因此在没有集成的会话里不起作用；当有命令正在运行或打开了全屏程序时，它也不会干扰。',
  'Once an hour, ask each stored database connection for its size and keep the number, so growth can be charted and a disk filling up has a cause beside it. Off by default: unlike a server check, this opens a CONNECTION on the database itself.': '每小时向每个已保存的数据库连接询问一次大小并记下该数字，这样就能绘制增长曲线，磁盘被填满时旁边也有原因可查。默认关闭：与服务器检查不同，这会在数据库本身上建立连接。',
  'Open a shell on this computer, and offer it alongside your servers in the Docker, Kubernetes, cron, Files and monitoring panels. When off, every one of those refuses locally and open local file sessions are closed. Never available to the AI bridge either way.': '在本机上打开 shell，并在 Docker、Kubernetes、cron、文件和监控面板中把它与你的服务器并列提供。关闭后，这些面板一律拒绝本地目标，已打开的本地文件会话会被关闭。无论开关如何，AI 桥接都不可用它。',
  'Whenever the vault has to be unlocked — opening the Vault, or anything that needs a stored credential — raise the fingerprint prompt without waiting for a click. Cancel it and the master password field is right there. Does nothing unless you have already set up biometric unlock.': '每当需要解锁保险库时 —— 打开保险库，或任何需要已保存凭据的操作 —— 直接弹出指纹验证，不必再点一下。取消后，主密码输入框就在那里。除非你已经配置过生物识别解锁，否则此项不起作用。',
  "Start local shells so they report where each prompt begins and what each command exited with. Uses the shell's own startup options for the session OpsMaxx starts — your shell config files are never modified, and turning this off restores the previous behaviour exactly. zsh and bash get prompt and command marks; fish gets command marks only; a login bash and PowerShell are not supported.": '启动本地 shell 时让它们报告每个提示符从哪里开始、每条命令以什么状态退出。使用 shell 自身的启动选项来创建 OpsMaxx 所启动的会话 —— 你的 shell 配置文件绝不会被修改，关闭此项会完全恢复之前的行为。zsh 和 bash 会得到提示符标记与命令标记；fish 只有命令标记；登录式 bash 与 PowerShell 不支持。',
  'Record which internal operations run and which fail, so a bug report can say what the app did and not only what it is. You do not need this page to start one — the bug icon in the left rail offers it, which is where a report begins. Those messages come from this machine and your servers, and they routinely name hostnames, usernames, file paths and commands; passwords, keys and tokens are filtered out before anything is written, a hostname cannot be. Nothing is sent anywhere: the trace stays on this computer, you read the whole report before it is written, and starting a new recording clears the old one.': '记录哪些内部操作在运行、哪些失败了，这样反馈报告能说明应用做了什么，而不只是它是什么。你不需要这个页面来开始记录 —— 左侧活动栏的 bug 图标就能提供，报告也从那里开始。这些消息来自本机和你的服务器，其中经常出现主机名、用户名、文件路径和命令；密码、密钥和令牌会在写入之前被过滤掉，主机名则不能。任何内容都不会被发送出去：记录留在本机，你可以在写出之前通读整份报告，开始新一次记录会清掉旧的。',
  'The master switch. Covers CPU and memory at or above the threshold, a root filesystem more than 85% full by blocks OR by inodes, a load average at or above 2 per core, and systemd units that have failed — and, since every webhook is sent from an alert, webhook delivery too. CPU, memory and load repeat once a minute while the condition lasts; a full disk or inode table repeats every six hours, or sooner if it gets 5 points worse. They clear themselves on recovery: a filesystem as soon as it is back to 85% or below, CPU and memory once they are 5 points under the threshold, so a server sitting exactly on the line does not flicker on and off. A server that crosses the same line five times in six hours is announced once more and then held quiet until it has gone six hours without crossing again. Anything the server could not measure — no inode accounting, no /proc/loadavg, no df — raises nothing and clears nothing, because a reading nobody could take is not a reading of zero. Switching this off also takes down any alerts already showing.': '总开关。涵盖达到或超过阈值的 CPU 与内存、按块数或 inode 数计算超过 85% 已用的根文件系统、每核平均负载达到或超过 2，以及已失败的 systemd 单元 —— 另外，由于每条 webhook 都由警报发出，它也包括 webhook 投递。条件持续期间，CPU、内存与负载每分钟重复一次；磁盘或 inode 表满每六小时重复一次，若再恶化 5 个点则更早。恢复后它们会自行解除：文件系统一旦回到 85% 或以下、CPU 与内存一旦低于阈值 5 个点即解除，因此正好压在临界线上的服务器不会来回闪烁。若一台服务器在六小时内五次越过同一条线，会再通告一次，然后保持安静，直到它连续六小时不再越线。服务器无法测量的东西 —— 没有 inode 统计、没有 /proc/loadavg、没有 df —— 既不触发也不解除，因为没人能取到的读数不等于零。关闭这个开关也会撤下已经显示出来的警报。',

  // 文件路径规则里的权限下拉：显式带占位符，否则 option 会被拆成两个文本节点。
  'read: {perm}': '读取：{perm}',
  'write: {perm}': '写入：{perm}',
  // 字号说明被 <b> 快捷键名拆成的两段。中文里接快捷键名是自然的，照译即可。
  'Applies to open terminals immediately. Also': '立即应用到已打开的终端。也可用',
  ', or Ctrl+scroll inside a terminal.': '，或在终端内按住 Ctrl 滚动。',

  'Lets an agent see that this server exists and read the permissions it has on it. Hostnames, usernames and keys are never disclosed.': '让代理看到这台服务器存在，并读取它对这台服务器拥有的权限。主机名、用户名和密钥永不披露。',
  "Runs shell commands over SSH. Unrestricted privilege-escalation shells (sudo -i, su, sudo bash) are refused whatever this is set to, in every mode but Bypass. While the group's Confirm risky actions is on, a destructive, elevated or run-time-computed command still asks even when this is allow. It also governs pod_command, one command run inside a Kubernetes container, which is checked against the same command rules and asked for on every call even when this is allow (only the Bypass profile skips it).": '通过 SSH 运行 shell 命令。无限制的提权 shell（sudo -i、su、sudo bash）在任何设置下、除「绕过」外的所有模式中一律拒绝。当该组的「确认风险操作」开启时，破坏性、提权或程序名在运行时才确定的命令即使标为允许也会询问。它还管辖 pod_command —— 在 Kubernetes 容器内运行的一条命令，按同一套命令规则检查，且即使标为允许也会每次询问（只有「绕过」配置会跳过）。',
  'Reads file contents and lists directories. The path rules below can widen or narrow this per path.': '读取文件内容并列出目录。下方的路径规则可以按路径放宽或收紧这一项。',
  'Creates, overwrites, renames and deletes files, and creates directories. The path rules below can widen or narrow this per path.': '创建、覆盖、重命名和删除文件，以及创建目录。下方的路径规则可以按路径放宽或收紧这一项。',
  'The transport underneath reading. Applied on top of the path rules, so denying it blocks every path regardless of what they say.': '读取所依赖的传输层。它叠加在路径规则之上，因此拒绝它会封堵所有路径，无论那些规则怎么写。',
  'The transport underneath writing. Denying it blocks every path regardless of what the rules say.': '写入所依赖的传输层。拒绝它会封堵所有路径，无论那些规则怎么写。',
  "Lists tunnels, defines and removes them, and opens or closes a forward. A local forward and a SOCKS proxy listen on this machine; a remote forward listens on the SERVER, where a non-loopback address publishes the port to that server’s network. Defining one does not start it. While the group's Confirm risky actions is on, defining, removing and opening all ask even when this is allow.": '列出隧道、定义和删除隧道，以及打开或关闭转发。本地转发和 SOCKS 代理监听本机；远程转发监听的是服务器，在那里非回环地址会把端口发布到该服务器的网络中。定义一条隧道并不会启动它。当该组的「确认风险操作」开启时，即使标为允许，定义、删除和打开也都会询问。',
  'Lists databases and runs queries against them through the server.': '列出数据库，并经由服务器对它们执行查询。',
  'Commands beginning with sudo, checked on top of Execute terminal commands. Path rules still apply — sudo does not waive them.': '以 sudo 开头的命令，在「执行终端命令」之上另行检查。路径规则仍然适用 —— sudo 不会豁免它们。',
  'CPU, memory, disk and uptime — and also every failed systemd unit and every listening port with the process that owns it. That is a service and port inventory of the server, not only its capacity.': 'CPU、内存、磁盘与运行时长 —— 还有每一个失败的 systemd 单元，以及每个监听端口及其所属进程。这是服务器的服务与端口清单，而不只是它的容量。',
  'Distribution and version, CPU model, architecture, virtualisation type, package manager, how many updates are pending, how many of those are SECURITY updates, and whether the server is waiting on a reboot. That is a patch-status report: it tells an agent which of your servers are unpatched and against what.': '发行版与版本、CPU 型号、架构、虚拟化类型、包管理器、有多少待安装的更新、其中有多少是安全更新，以及服务器是否在等待重启。这是一份补丁状态报告：它告诉代理你的哪些服务器尚未打补丁、缺的是哪些补丁。',
  'The rule lines themselves, as ufw, firewalld, nft or iptables print them — every address, port and protocol named in them, capped and stripped of control characters on the server. That is an inventory of what this server is exposed on and to whom, which is the thing an attacker would otherwise have to scan for. No agent can read it whatever this is set to: it is not behind any MCP tool. Setting it to allow lets OpsMaxx COLLECT the rules for this server, for a person to read in Security posture; anything else and they are never asked for.': '防火墙规则本身，即 ufw、firewalld、nft 或 iptables 打印出来的样子 —— 其中提到的每个地址、端口和协议，在服务器上会被截断并剔除控制字符。这相当于一份该服务器对外开放了什么、对谁开放的清单，而攻击者本来需要扫描才能得到它。无论这一项怎么设置，任何代理都无法读取它：它不在任何 MCP 工具之后。设为允许后，OpsMaxx 会为该服务器采集这些规则，供人在「安全态势」中查看；设为其他值则永远不会去取。',
  'The rules in /etc/sudoers and /etc/sudoers.d — which accounts and groups may run which commands as root, and which of them need no password. OpsMaxx reads it to replace a guess it makes today, that anyone in wheel or sudo has root, which is wrong in both directions. It is also the shortest description of how to take this machine, so it is asked for separately and never by an agent: no MCP tool exposes it whatever this is set to. Setting it to allow lets OpsMaxx COLLECT it for a person to read in Keys and access; anything else and it is never asked for.': '/etc/sudoers 与 /etc/sudoers.d 中的规则 —— 哪些账户和组能以 root 运行哪些命令，以及其中哪些不需要密码。OpsMaxx 读取它是为了取代目前的一个猜测：只要在 wheel 或 sudo 组里就有 root 权限 —— 而这个猜测两个方向上都可能出错。它同时也是「如何拿下这台机器」最短的说明，因此需要单独申请，且任何代理都无法取得：无论这一项怎么设置，都没有 MCP 工具会暴露它。设为允许后，OpsMaxx 会采集它，供人在「密钥与访问」中查看；设为其他值则永远不会去取。',
  "Adds a server to the workspace, changes a saved one — including where it points, which account it uses and which other saved server it jumps through — and removes one. It does not grant any access to the servers it manages. While the group's Confirm risky actions is on, adding is the only part allow makes silent: changing and removing an existing connection still ask. When a change asks, approving it covers further changes to that same server for the rest of that agent session and nothing else; each removal is asked for on its own. With Confirm risky actions off, allow is a standing permission to repoint or delete what is already saved. The same applies to saved database connections, including which saved server a database is reached through; querying a database is Database access, not this.": '向工作区添加服务器、修改已保存的服务器 —— 包括它指向哪里、使用哪个账户、经由哪台已保存的服务器跳转 —— 以及删除服务器。它不会授予对它所管理的服务器的任何访问权限。当该组的「确认风险操作」开启时，只有「添加」会被允许静默执行：修改和删除已有连接仍会询问。当某次修改询问时，批准它会覆盖该代理会话余下时间里对同一台服务器的后续修改，除此之外不覆盖任何东西；每一次删除都单独询问。关闭「确认风险操作」后，允许就是一项长期授权，可以重新指向或删除已保存的内容。同样的规则适用于已保存的数据库连接，包括经由哪台已保存的服务器访问某个数据库；而查询数据库属于「数据库访问」，不是这一项。',
  "Lists VPN profiles and reverse proxies, and starts or stops the VPNs. While the group's Confirm risky actions is on, starting a VPN, or stopping one live sessions depend on, asks even when this is allow. Reverse proxies are refused to an agent whatever this is set to; only a session you have put in Bypass mode can start or stop one.": '列出 VPN 配置与反向代理，并启动或停止 VPN。当该组的「确认风险操作」开启时，即使标为允许，启动一个 VPN、或停止一个正被活动会话依赖的 VPN 也会询问。无论这一项怎么设置，反向代理都对代理拒绝；只有你置于「绕过」模式的会话才能启动或停止它。',
  "Lists containers with their image, state, ports, uptime and compose project, and reads container logs. The logs are the part to weigh: an application writes its own connection strings, tokens and customer records to stdout, and this returns them as the container emitted them. It reads only — starting and stopping is a separate permission. It also covers the Kubernetes cluster a server's kubeconfig reaches: pods, workloads, nodes, events, pod logs, Helm releases, and which secrets exist and who is bound to what (names only, never a secret's value — but together a map of how to escalate).": '列出容器的镜像、状态、端口、运行时长与 compose 项目，并读取容器日志。日志是需要权衡的部分：应用会把自己的连接串、令牌和客户记录写到 stdout，而这一项会按容器输出的原样返回。它只读取 —— 启动和停止是另一项独立权限。它还覆盖服务器 kubeconfig 所能到达的 Kubernetes 集群：Pod、工作负载、节点、事件、Pod 日志、Helm 发布，以及存在哪些 Secret、谁绑定了什么（只给名称，绝不给 Secret 的值 —— 但合起来就是一张如何提权的图）。',
  'Restarts, stops and starts containers, and brings compose projects up and down. Stopping a container is an outage for whatever it serves, so this is separate from reading the list: an agent that may see what is running does not thereby get to stop it. In Kubernetes it covers a rolling restart of one workload and cordoning, uncordoning or draining one node; each is asked for on every call even when this is allow (only the Bypass profile skips it), and a drain refuses whenever its own preflight finds a blocker.': '重启、停止和启动容器，以及启停 compose 项目。停止一个容器就是中断它对外提供的服务，因此这一项与「读取列表」分开：能看到有什么在运行的代理，并不因此就可以停止它。在 Kubernetes 中，它涵盖对单个工作负载的滚动重启，以及对单个节点的 cordon、uncordon 或 drain；即使标为允许，每次调用也都会询问（只有「绕过」配置跳过），而 drain 在其自身预检发现阻塞项时一律拒绝。',
  'Reads the backup destinations and how each is doing — the last successful run, how late it is, and any alarm raised against it. It names destinations and their kind, never their credentials. Running a backup and restoring one are not here at any setting: a run outlives the approval that started it, and a restore overwrites data.': '读取备份目标以及各自的状况 —— 上一次成功运行、滞后了多久，以及针对它发出的任何告警。它会给出目标名称与类型，绝不给凭据。运行备份与恢复备份在任何设置下都不在此列：一次运行会超出启动它的那次审批的时效，而恢复会覆盖数据。',
  'Answers questions over everything already collected rather than one host at a time — the inventory, search across it, drift, alerts and the running process list. One call can return data from every server in the workspace, so the reach is the workspace and not the server this is set on.': '针对已经采集到的全部内容回答问题，而不是一台主机一台主机地问 —— 清单、跨清单搜索、配置漂移、告警以及运行中的进程列表。一次调用可以返回工作区内每台服务器的数据，因此其触及范围是整个工作区，而不是这一项所设置的那台服务器。',
  'Lists the CI connections, the pipelines on them and their recent runs, and reads the output a run produced. The output is the part to weigh, the same way container logs are: a build prints whatever its steps echo — access tokens, deploy keys, the contents of a test fixture — and this returns it as the runner recorded it. It is also written by whoever opened the merge request that ran it, so it is the least trustworthy text the bridge can hand an agent.': '列出 CI 连接、其上的流水线与最近的运行，并读取某次运行产生的输出。输出是需要权衡的部分，和容器日志同理：构建会打印其步骤所回显的一切 —— 访问令牌、部署密钥、测试夹具的内容 —— 而这一项会按运行器记录的原样返回。它也是由发起那次运行的合并请求的人写入的，因此这是桥接交给代理的文本中最不可信的一类。',
  "Starts a pipeline run on the CI server, cancels one, or re-runs it. What that run then does is defined on the provider and not here: OpsMaxx cannot read the pipeline definition before it starts, and cannot see what it deploys or where. Stopping AI access takes away the agent's cancel along with everything else, so a run already accepted is then yours to stop — from the Stop button on that run in CI/CD, or in the provider. While the group's Confirm risky actions is on, starting, cancelling and re-running ask even when this is allow, and one approval never covers the next call; with it off in Auto mode, or in a Bypass session, a build starts unasked — except on a Protected workspace, and Ask first always asks.": '在 CI 服务器上启动一次流水线运行、取消一次运行或重新运行。那次运行随后做什么由服务商定义，而不在这里：OpsMaxx 无法在它开始之前读取流水线定义，也看不到它部署了什么、部署到哪里。关闭 AI 访问会连同其他一切一起收回代理的取消权限，因此已经被接受的运行就交给你来停止 —— 在 CI/CD 中该次运行上的停止按钮，或到服务商处操作。当该组的「确认风险操作」开启时，即使标为允许，启动、取消和重新运行也会询问，而且一次批准绝不含盖下一次调用；关闭后，在「自动」模式或「绕过」会话中，构建会不经询问直接开始 —— 但在「受保护」的工作区上例外，且「先询问」总是会询问。',
  'No AI Access': '禁止 AI 访问',

  // ─────────────────────────────────────────────────────────────────────────
  // 设置页正文（15 个分区）。行文案由 SettingSwitch / SettingRow 的 helper
  // 翻译，所以这一节是纯词条工作——加条目即生效，无需改代码。
  // 来源：npm run i18n:render 的真实渲染清单。
  // ─────────────────────────────────────────────────────────────────────────

  // 外观 / 通用
  'Restore defaults for this section.': '恢复本节默认值。',
  // 设置页里没有真实内容的 4 个分区（连接 / 语言 / SFTP / 通知）用的占位句。
  // 整句带占位符，否则 React 会把 {section} 渲染成独立文本节点，句子被拆开。
  'Configure {section} preferences for this workspace.': '配置本工作区的{section}偏好设置。',
  'Reset {section}': '重置{section}',
  'Nothing to reset — {section} has no saved settings yet.': '{section} 还没有可重置的保存设置。',
  'Every shortcut is back to its default.': '所有快捷键已恢复默认。',
  // 状态栏：版本行 tooltip 与更新 chip。都是模板串，占位符必须保留。
  'OpsMaxx v{version}{beta}.': 'OpsMaxx v{version}{beta}。',
  'OpsMaxx.': 'OpsMaxx。',
  ' (beta build)': ' （测试版）',
  'Update available': '有可用更新',
  'Downloading {percent}%': '正在下载 {percent}%',
  'Restart to update': '重启以更新',
  'Download v{version}': '下载 v{version}',
  'Checking for updates.': '正在检查更新。',
  'Version {version} is available.': '版本 {version} 已可用。',
  'Downloading version {version} — {percent}% done.': '正在下载版本 {version} —— 已完成 {percent}%。',
  'Version {version} has been downloaded and installs when you restart.': '版本 {version} 已下载，重启后自动安装。',
  'Version {version} is available, but this build cannot install it itself.': '版本 {version} 已可用，但当前构建无法自行安装。',
  'The last update check failed: {message}': '上次检查更新失败：{message}',
  'This is the latest version.': '已是最新版本。',
  'No update is waiting.': '当前没有待处理的更新。',
  'Click to open update settings.': '点击打开更新设置。',
  'Colour scheme': '配色方案',
  'Font size': '字号',
  'Font family': '字体',
  'Cursor blink': '光标闪烁',
  'Blink the terminal cursor.': '让终端光标闪烁。',
  'Always on': '始终启用',
  'Everywhere': '所有位置',
  'Immediately': '立即',
  'Until app exits': '直到应用退出',
  'system default': '系统默认',
  'S3-compatible storage': '兼容 S3 的存储',
  'Local directory': '本地目录',
  'Choose file…': '选择文件…',
  'How often': '检查频率',
  '1 min': '1 分钟',
  '2 min': '2 分钟',
  '5 min': '5 分钟',
  '15 min': '15 分钟',
  '2 per core': '每核 2 个',

  // 终端 / 编辑器 / 快捷键
  'Monospace font used in the terminal.': '终端使用的等宽字体。',
  'Font, cursor and scrollback behaviour.': '字体、光标与回滚行为。',
  'Close the pane when the shell exits': 'shell 退出时关闭该面板',
  'Open files externally by default': '默认用外部程序打开文件',
  'How remote files open from the Files view.': '从文件视图打开远程文件的方式。',
  'External editor command': '外部编辑器命令',
  'Shell integration': 'Shell 集成',
  'Click, then press keys': '点击后按下按键',
  'Click to move the cursor': '点击可移动光标',
  'This shortcut cannot be changed': '此快捷键不可更改',
  'Include hidden workspaces in Ctrl+1…9': '把隐藏的工作区纳入 Ctrl+1…9',
  'Switch to Workspace 1–9': '切换到工作区 1–9',
  // 快捷键页的注解（Command.hint）。键是源码里的原文，不带渲染时前缀的「· 」——
  // 那个分隔符留在 t() 外面，否则改一次提示语就多一个孤儿条目。
  'Plain Backspace never deletes.': '单独按 Backspace 永不删除。',
  'In a URL or value field, at the caret.': '在 URL 或值输入框中，作用于光标处。',
  'Only for workspaces that have a password set.': '仅对设置了密码的工作区生效。',
  'Secrets are masked.': '密钥类内容已遮盖。',
  'Ctrl+B is backward-char and the tmux prefix, so terminals need a second binding.':
    'Ctrl+B 在 shell 里是 backward-char，也是 tmux 的前缀键，所以终端需要另一个绑定。',
  'Ctrl+K is kill-line in a shell, so terminals need a second binding.':
    'Ctrl+K 在 shell 里是 kill-line，所以终端需要另一个绑定。',
  'In the HTTP client Ctrl+1…9 are request tabs, not workspaces.':
    '在 HTTP 客户端里，Ctrl+1…9 是请求标签页，不是工作区。',
  'Numbering follows the sidebar order. In the HTTP client these keys go to request tabs.':
    '编号跟随侧边栏顺序。在 HTTP 客户端里，这些按键作用于请求标签页。',
  'On a connected WebSocket it sends the message; it never disconnects.':
    '在已连接的 WebSocket 上，它发送消息；绝不会断开连接。',
  'Opens a shell on this machine, not on a server.': '在本机打开一个 shell，而不是在服务器上。',
  'Reconnects a fresh session on the same target; scrollback is not restored.':
    '在同一目标上重连一个新会话；回滚缓冲区不会恢复。',
  'The last tab, whatever the count — the same as every browser.':
    '最后一个标签页，无论有多少个 —— 与所有浏览器的行为一致。',
  'The shifted form of the same key, which is how "Ctrl +" is usually typed.':
    '同一个键的 Shift 形式，这也是输入 "Ctrl +" 时通常的按法。',
  'Tree, URL, request tabs, response. Needs fn on a Mac laptop.':
    '树、URL、请求标签页、响应。在 Mac 笔记本上需要按 fn。',
  'In the HTTP client this replaces {names}': '在 HTTP 客户端里，它会取代 {names}',
  'Shadowed in the HTTP client by {name}': '在 HTTP 客户端里被 {name} 遮蔽',
  '{name} uses the same keys — go to it': '{name} 使用了相同的按键 —— 前往查看',
  'Restore default ({keys})': '恢复默认（{keys}）',
  'Press keys…': '请按下按键…',
  'Find': '查找',
  'Find in Terminal': '在终端中查找',
  'Find in Terminal (alternate)': '在终端中查找（备用键）',
  'Tabs': '标签页',
  'Views': '视图',
  'Zoom In': '放大',
  'Zoom Out': '缩小',
  'Reset Zoom': '重置缩放',
  'Zoom In (alternate)': '放大（备用键）',
  'Next Tab': '下一个标签页',
  'Previous Tab': '上一个标签页',
  'Close Tab': '关闭标签页',
  'Duplicate Tab': '复制标签页',
  'Reopen Closed Tab': '重新打开已关闭的标签页',
  'Go to Tab 1': '跳到标签页 1',
  'Go to Tab 2': '跳到标签页 2',
  'Go to Tab 3': '跳到标签页 3',
  'Go to Tab 4': '跳到标签页 4',
  'Go to Tab 5': '跳到标签页 5',
  'Go to Tab 6': '跳到标签页 6',
  'Go to Tab 7': '跳到标签页 7',
  'Go to Tab 8': '跳到标签页 8',
  'Go to Last Tab': '跳到最后一个标签页',
  'New Request Tab': '新建请求标签页',
  'Close Request Tab': '关闭请求标签页',
  'Go to Request Tab 1': '跳到请求标签页 1',
  'Go to Request Tab 2': '跳到请求标签页 2',
  'Go to Request Tab 3': '跳到请求标签页 3',
  'Go to Request Tab 4': '跳到请求标签页 4',
  'Go to Request Tab 5': '跳到请求标签页 5',
  'Go to Request Tab 6': '跳到请求标签页 6',
  'Go to Request Tab 7': '跳到请求标签页 7',
  'Go to Request Tab 8': '跳到请求标签页 8',
  'Go to Last Request Tab': '跳到最后一个请求标签页',
  'Cancel Request': '取消请求',
  'Toggle Request': '折叠/展开请求',
  'Toggle Response': '折叠/展开响应',
  'Save Request': '保存请求',
  'Save Request As…': '请求另存为…',
  'Copy as cURL': '复制为 cURL',
  'Show Variable': '显示变量',
  'Delete Tree Row': '删除树中的行',
  'Undo Tree Delete': '撤销删除',
  'Copy (alternate)': '复制（备用键）',
  'Paste (alternate)': '粘贴（备用键）',
  'New Terminal': '新建终端',
  'New Local Terminal': '新建本地终端',
  'Focus URL': '聚焦地址栏',
  'Open Files': '打开文件',
  'Open Settings': '打开设置',
  'Open Fleet Monitor': '打开资产监控',
  'Command Palette': '命令面板',
  'Command Palette (in terminal)': '命令面板（终端内）',
  'Toggle Sidebar': '切换侧边栏',
  'Toggle Sidebar (in terminal)': '切换侧边栏（终端内）',
  'Split Right': '向右分屏',
  'Split Down': '向下分屏',
  'Next Region': '下一个区域',
  'Previous Region': '上一个区域',
  'New Server': '新建服务器',
  'New Workspace': '新建工作区',
  'Lock Workspace': '锁定工作区',
  'Start a build': '开始构建',
  'Duplicate': '复制一份',
  'Send test': '发送测试',
  'Test delivery': '测试投递',
  'Import a file': '导入文件',
  'Download backup': '下载备份',
  'Restore from backup': '从备份恢复',
  'Check for updates': '检查更新',
  'Copy diagnostics': '复制诊断信息',
  'Revoke a key': '吊销密钥',
  'Create token': '创建令牌',
  'Set up a vault': '设置保险库',
  'Delete all data': '删除所有数据',
  'Environment Picker': '环境选择器',
  'Side by Side / Stacked': '并排 / 堆叠',
  'In terminals': '终端内',
  'Outside terminals': '终端之外',

  // 安全 / 凭据 / 保险库
  'Diagnostics': '诊断',
  'Danger zone': '危险区域',
  'Credential storage': '凭据存储',
  'Credential storage and workspace locking.': '凭据存储与工作区锁定。',
  'Master password': '主密码',
  'Confirm passphrase': '确认口令',
  'Two-factor code': '双因素验证码',
  'Secure after inactivity': '闲置后自动加锁',
  'Ask for Touch ID when the vault is locked': '保险库锁定时要求 Touch ID',
  'Works without your master password': '无需主密码即可工作',
  'Nothing runs without your master password': '没有主密码什么都不会运行',
  'App palette': '应用调色板',
  'Import from another password manager': '从其他密码管理器导入',
  'No vault on this computer yet': '这台电脑上还没有保险库',
  'Security posture': '安全态势',
  'Trusted SSH host keys': '受信任的 SSH 主机密钥',
  'Allow adding and revoking keys on servers': '允许在服务器上添加和吊销密钥',
  'Config connection reuse and re-authentication policy.': '连接复用与重新认证策略。',
  'Connection reuse and re-authentication policy.': '连接复用与重新认证策略。',
  'Keep authenticated connection': '保持已认证的连接',
  'Let jobs keep running when the connection drops': '连接断开时让任务继续运行',
  'Allow this machine as a target': '允许把本机作为目标',
  'Shared connections': '共享连接',

  // SSH / SFTP
  'SSH agent': 'SSH 代理',
  'SFTP server': 'SFTP 服务器',
  'Let other tools use the SSH keys in your vault': '让其他工具使用你保险库里的 SSH 密钥',
  'Keys it can offer': '可以提供的密钥',
  'One per caller, sent as': '每个调用方一个，以如下方式发送',
  'API credential proxy': 'API 凭据代理',
  'Run the API credential proxy': '运行 API 凭据代理',

  // 监控 / 模块
  'Service checks': '服务检查',
  'Server services': '服务器服务',
  'Check servers in the background': '在后台检查服务器',
  'Record how large each database is': '记录每个数据库的大小',
  'Capacity trends': '容量趋势',
  'Live log tailing': '实时日志跟踪',
  'Run a command on many servers': '在多台服务器上执行命令',
  'Fleet-wide search': '全资产搜索',
  'Fleet keys and access': '资产密钥与访问',
  'Patch and update management': '补丁与更新管理',
  'Configuration drift': '配置漂移',
  'Scheduled jobs': '计划任务',
  'Network tools': '网络工具',
  'HTTP client': 'HTTP 客户端',
  'Local processes': '本地进程',
  'Main features': '主要功能',
  'Reading your estate': '读取你的资产',
  'Changing your estate': '变更你的资产',
  'What is it for': '用途',
  'Alert threshold': '告警阈值',
  'Recent calls': '最近调用',
  'Show monitor under the terminal': '在终端下方显示监控面板',
  'Show me what would be imported': '先看看会导入什么',

  // 备份与恢复 / 通知 / 反馈
  'Backup destinations': '备份目标',
  'Backup up to date': '备份是最新的',
  'Last exported never.': '上次导出：从未。',
  'No destinations yet': '还没有目标',
  'Nothing has come through yet.': '还没有收到任何内容。',
  'Passphrase used for that backup': '该备份使用的口令',
  'Backup passphrase (min 12 characters)': '备份口令（至少 12 个字符）',
  'Type the backup passphrase first': '请先输入备份口令',
  'Pick a passphrase of at least 12 characters first': '请先设置一个至少 12 个字符的口令',
  'A backup is your whole vault, wherever you send it': '备份就是整个保险库，无论你把它送到哪里',
  'Webhook URL': 'Webhook 地址',
  'Send alerts to a webhook': '把告警发送到 webhook',
  'Also send when it recovers': '恢复时也发送',
  'Add a URL below to enable this.': '在下方添加一个地址即可启用。',
  'Token name': '令牌名称',
  'Token end date (optional)': '令牌到期日（可选）',
  'What to include when you report a problem.': '反馈问题时包含哪些内容。',
  'Your addy relay': '你的 addy 中继',
  'Not listening. It binds 127.0.0.1 only.': '未监听。它只绑定 127.0.0.1。',
  'Send / Connect / Run': '发送 / 连接 / 运行',

  // ─────────────────────────────────────────────────────────────────────────
  // AI 与 MCP：能力表（shared/mcp.ts 的 AI_CAPABILITIES）、内建访问组名
  // （main/services/policyStore.ts）与访问组页的模板行。
  // ─────────────────────────────────────────────────────────────────────────

  'View server': '查看服务器',
  'Execute terminal commands': '执行终端命令',
  'Read files': '读取文件',
  'Write files': '写入文件',
  'SFTP download': 'SFTP 下载',
  'SFTP upload': 'SFTP 上传',
  'SSH tunnels': 'SSH 隧道',
  'Database access': '数据库访问',
  'Sudo / privilege escalation': 'sudo / 提权',
  'Server metrics, services & ports': '服务器指标、服务与端口',
  'Host inventory & pending security updates': '主机清单与待装安全更新',
  'Firewall rules: the addresses and ports this server accepts':
    '防火墙规则：此服务器接受的地址与端口',
  'Sudoers: who can become root on this server': 'Sudoers：谁能在这台服务器上成为 root',
  'Add, change and remove servers and databases in the workspace':
    '在工作区内添加、修改、移除服务器与数据库',
  'VPN & reverse proxies': 'VPN 与反向代理',
  'Containers and Kubernetes: what is running, and their logs':
    '容器与 Kubernetes：正在运行什么，以及它们的日志',
  'Containers and Kubernetes: start, stop, restart and drain':
    '容器与 Kubernetes：启动、停止、重启与排空',
  'Backups: whether they are running and when they last succeeded':
    '备份：是否在运行，以及上次成功的时间',
  'Fleet: read across many servers at once': '资产：一次跨多台服务器读取',
  'CI/CD: pipelines, runs and build output': 'CI/CD：流水线、运行记录与构建输出',
  'CI/CD: start, cancel and re-run pipelines': 'CI/CD：启动、取消与重新运行流水线',

  'Read Only': '只读',
  'Commands, no writes': '可执行命令，不可写入',
  'Read & Write': '读写',
  'Sudo Access': 'sudo 权限',
  'Full Access': '完全访问',

  'Read permission for {path}': '读取 {path} 的权限',
  'Write permission for {path}': '写入 {path} 的权限',
  'Protected from agents: {name}': '禁止代理访问：{name}',
  workspace: '工作区',

  'Save group': '保存组',
  'Local port': '本地端口',
  'Remove rule': '移除规则',
  'Compare all': '全部对照',
  'Path pattern': '路径模式',
  'Add path rule': '添加路径规则',
  'Expires after': '有效期',
  'Create session': '创建会话',
  'Create a session': '创建一个会话',
  'New AI agent session': '新建 AI 代理会话',
  'No sessions yet.': '还没有会话。',
  'Per-server overrides': '按服务器覆盖',
  'What counts as risky': '什么算有风险的操作',
  'Protected from agents': '禁止代理访问',
  'Confirm risky actions': '有风险的操作需确认',
  'Confirms risky actions': '有风险的操作会请求确认',
  'Enable AI & MCP access': '启用 AI 与 MCP 访问',
  'Authorization requests': '授权请求',
  'Connecting Claude Code': '正在连接 Claude Code',
  'No AI activity recorded yet.': '还没有记录任何 AI 活动。',
  'No servers in this workspace.': '此工作区中没有服务器。',
  'Nothing waiting on you right now.': '当前没有等待你处理的事项。',
  'No client is waiting to be authorized.': '没有客户端在等待授权。',
  // ─────────────────────────────────────────────────────────────────────────
  // 访问组卡片上的摘要句（components/ai/accessGroupSummary.ts）。
  //
  // 这里曾经放的是「整句」译文（`'Asks you first before using sudo.'`、`'Editing Read
  // Only'`），但摘要句是拿能力表实时拼出来的，句形随组的设置变化，整句词条永远对不上
  // —— 两条孤儿词条已删。改成「碎片 + 占位符」：动词、连接词、句框各成一条，标点归句框。
  //
  // PHRASING 里是小写的动词短语，能力表里是名词化标签，两者是**不同的键**：小写那条
  // 用来读成一句话（「可以运行命令」），大写那条是表头（「执行终端命令」），不能互换。
  // ─────────────────────────────────────────────────────────────────────────

  // PHRASING：动词（`Can {verbs}` / `Cannot {verbs}`）与动名词（`Asks you first before {gerunds}.`）
  'see server details': '查看服务器详情',
  'showing server details': '查看服务器详情',
  'run commands': '运行命令',
  'running commands': '运行命令',
  'read files': '读取文件',
  'reading files': '读取文件',
  'write files': '写入文件',
  'writing files': '写入文件',
  'download files': '下载文件',
  'downloading files': '下载文件',
  'upload files': '上传文件',
  'uploading files': '上传文件',
  'define and open SSH tunnels': '定义并打开 SSH 隧道',
  'defining and opening SSH tunnels': '定义并打开 SSH 隧道',
  'query databases': '查询数据库',
  'querying databases': '查询数据库',
  'use sudo': '使用 sudo',
  'using sudo': '使用 sudo',
  'list containers and read their logs': '列出容器并读取其日志',
  'reading containers': '读取容器',
  'start and stop containers': '启动和停止容器',
  'controlling containers': '控制容器',
  'read CI pipelines and build output': '读取 CI 流水线与构建输出',
  'reading CI pipelines and build output': '读取 CI 流水线与构建输出',
  'start and cancel CI pipelines': '启动和取消 CI 流水线',
  'starting and cancelling CI pipelines': '启动和取消 CI 流水线',
  'read across the fleet': '跨资产读取',
  'reading across the fleet': '跨资产读取',
  'see backup health': '查看备份健康状况',
  'reading backup health': '查看备份健康状况',
  'read server metrics': '读取服务器指标',
  'reading server metrics': '读取服务器指标',
  'read the server inventory and its pending security updates': '读取服务器清单及其待装安全更新',
  'reading the server inventory and its pending security updates': '读取服务器清单及其待装安全更新',
  'collect this server’s sudoers rules': '收集此服务器的 sudoers 规则',
  'collecting this server’s sudoers rules': '收集此服务器的 sudoers 规则',
  'collect this server’s firewall rule list': '收集此服务器的防火墙规则列表',
  'collecting this server’s firewall rule list': '收集此服务器的防火墙规则列表',
  'add, change and remove servers in the workspace': '在工作区中添加、更改和移除服务器',
  'adding, changing and removing servers in the workspace': '在工作区中添加、更改和移除服务器',
  'start and stop VPNs, and list reverse proxies': '启动和停止 VPN，并列出反向代理',
  'starting and stopping VPNs, and listing reverse proxies': '启动和停止 VPN，并列出反向代理',

  // 连接词。英文保留牛津逗号，所以「两项之间」与「多项末尾」是两条不同的键；
  // 中文用「、」分隔、「和」收尾，两条都映射到同一串，正好得到 `a、b和c`。
  '{a} and {b}': '{a}和{b}',
  '{a} or {b}': '{a}或{b}',
  '{a}, {b}': '{a}、{b}',
  '{a}, and {b}': '{a}和{b}',
  '{a}, or {b}': '{a}或{b}',

  // 句框
  'Can {verbs} without asking.': '可以{verbs}，无需询问。',
  'Asks you first before {gerunds}.': '{gerunds}前会先询问你。',
  'Cannot {verbs}.': '不能{verbs}。',
  'Allows nothing — every AI request against the server is refused.':
    '不授予任何权限 —— 对该服务器的所有 AI 请求都会被拒绝。',
  'Allows nothing except the file paths below — every other AI request against the server is refused.':
    '除下列文件路径外不授予任何权限 —— 对该服务器的其他 AI 请求都会被拒绝。',
  'Can do everything without asking — including {including}.':
    '可以不经询问执行任何操作 —— 包括{including}。',
  'Can do everything without asking except the file paths below — including {including}.':
    '除下列文件路径外，可以不经询问执行任何操作 —— 包括{including}。',
  'Can {verb} without asking': '可以{verb}，无需询问',
  'Asks you first before {gerund}': '{gerund}前会先询问你',
  'Cannot {verb}': '不能{verb}',
  '{base} — except {exceptions}.': '{base} —— 但{exceptions}。',

  // 路径规则被点名成例外时：`{base} —— 但 19 条路径规则会阻止它。`
  // 值开头的空格是给句框里的「但」「和」留的：英文键不能带（测试逐字断言英文），
  // 而中文在数字前需要一个空格，否则会读成「但19」。
  '{count} path rule that {verb}': ' {count} 条路径规则{verb}',
  '{count} path rules that {verb}': ' {count} 条路径规则{verb}',
  '{count} that {verb}': ' {count} 条{verb}',
  'allows it': '会允许它',
  'allow it': '会允许它',
  'asks you first': '会先询问你',
  'ask you first': '会先询问你',
  'blocks it': '会阻止它',
  'block it': '会阻止它',

  // 存储里是非法权限值时（手改过策略文件才会出现）
  '{label} ("{value}")': '{label}（"{value}"）',
  '{names} is set to a value OpsMaxx does not recognise, so the policy engine allows it. Set it again below.':
    '{names} 被设为一个 OpsMaxx 无法识别的值，因此策略引擎会放行。请在下方重新设置。',
  '{names} are set to values OpsMaxx does not recognise, so the policy engine allows them. Set them again below.':
    '{names} 被设为 OpsMaxx 无法识别的值，因此策略引擎会放行。请在下方重新设置。',

  // 「文件路径规则」那一行的摘要
  'No path rules — every file follows the read and write settings above.':
    '没有路径规则 —— 所有文件都遵循上方的读取与写入设置。',
  '{count} blocking access': '{count} 条阻止访问',
  '{count} asking first': '{count} 条先询问',
  ' — {parts}': ' —— {parts}',
  ' {count} grants more than the capabilities above, and the path rule wins.':
    '{count} 条比上方的能力更宽松，路径优先。',
  ' {count} grant more than the capabilities above, and the path rule wins.':
    '{count} 条比上方的能力更宽松，路径优先。',
  '{count} path rule': '{count} 条路径规则',
  '{count} path rules': '{count} 条路径规则',
  '{head}.{tail}': '{head}。{tail}',

  // 「什么算有风险的操作」——与 policyEngine 把哪些操作升级为 ASK 一一对应
  'Still confirms risky actions it allows — destructive commands, database writes, tunnels, server changes, VPNs and CI runs.':
    '对已放行的有风险操作仍会请求确认 —— 破坏性命令、数据库写入、隧道、服务器变更、VPN 与 CI 运行。',
  'destructive or elevated commands (rm -rf, mkfs, reboot, package installs, service restarts) — a destructive one also asks with the switch off unless Write files is Allow, and stopping or removing containers unless Container control is Allow':
    '破坏性或提权命令（rm -rf、mkfs、reboot、安装软件包、重启服务）—— 即使开关关闭，破坏性命令也会询问，除非「写入文件」为允许；停止或移除容器同理，除非「容器控制」为允许',
  'commands whose program is computed at run time (these also ask with the switch off, unless Sudo is Allow), and unshare -r':
    '程序在运行时才确定的命令（即使开关关闭也会询问，除非「sudo / 提权」为允许），以及 unshare -r',
  'database writes and schema changes': '数据库写入与表结构变更',
  'opening, defining or deleting SSH tunnels': '打开、定义或删除 SSH 隧道',
  'changing or removing saved servers': '更改或移除已保存的服务器',
  'starting a VPN, or stopping one other sessions depend on': '启动 VPN，或停止其他会话所依赖的 VPN',
  'starting, cancelling or re-running CI/CD pipelines': '启动、取消或重新运行 CI/CD 流水线',

  // 这一页的控制与提示。toast 只在操作后出现，渲染审计走不到，但它们是真实文案。
  'individually': '项可逐项设置',
  'Editing {name}': '正在编辑「{name}」',
  'Pick a group to edit': '选择一个组进行编辑',
  'Saved {name}': '已保存{name}',
  '{name} could not be deleted.': '无法删除{name}。',
  'Deleted {name}. Anything assigned to it is now No AI Access.':
    '已删除{name}。原本分配给它的对象现在都是「禁止 AI 访问」。',
  'Review assignments': '查看分配情况',
  '{name} was not deleted: {error}. It may reappear when OpsMaxx restarts.':
    '{name} 未能删除：{error}。OpsMaxx 重启后它可能会重新出现。',
  '{name} was not created: {error}': '{name} 未能创建：{error}',
  'Created {name}. It is not open yet — you have unsaved changes here.':
    '已创建{name}。它尚未打开 —— 你在这里有未保存的更改。',
  'Created {name}. Read what its card says it allows before you assign it to anything.':
    '已创建{name}。在把它分配给任何对象之前，先读一读它的卡片说它允许什么。',
  '{name} was not saved: {error}': '{name} 未能保存：{error}',
  'That change was not saved: {error}': '该更改未保存：{error}',
  'another group': '另一个组',

  // JSX 拆开的句子片段：键按实际边界取，中文按语序重写。内嵌的 <b>/<i> 之间由
  // JSX 补的空格会留在中文里（如「处于 自定义配置」），这是片段方案本身的代价 ——
  // 真正的解法是 <Trans> 式组件，见 CODEBUDDY.md。
  'Access groups are for when the predefined profiles do not fit: an agent on the':
    '预定义的配置不合适时，就该用访问组：处于',
  'profile does exactly what its group says, per capability, and a group assigned to a workspace or server restricts every agent there. Each card describes itself from its own settings. Pick one to change it, or create your own (Logs Only, Production Read Only, ...).':
    '配置的代理会严格按自己的能力设置行事，而分配给工作区或服务器的组会限制该处的所有代理。每张卡片都根据自身设置来描述自己。选一个来修改，或创建你自己的（例如「仅日志」「生产只读」……）。',
  "Nothing here is needed to give an agent access — a session's own access group is the grant, and a workspace with no assignment leaves it exactly as written. What an assignment does is hold a workspace below that grant, whatever group an agent was issued. A server with no override inherits its workspace's assignment.":
    '要授予代理访问权限，这里什么都不用设置 —— 会话自身的访问组就是授权，而未做分配的工作区则完全按访问组所写执行。分配的作用是让工作区低于该授权，无论代理拿到的是哪个组。没有覆盖设置的服务器会继承其工作区的分配。',
  'is the other optional restriction, for production: every agent is held at Ask first there, whatever its profile; Read only stays read only.':
    '是另一项可选的限制，用于生产环境：无论代理是什么配置，在那里一律先询问；只读仍然是只读。',
  'The card shows them, but nothing is stored until you save — the policy engine is still enforcing the old settings. Opening':
    '卡片会显示这些更改，但在你保存之前什么都没有写入 —— 策略引擎仍在执行旧设置。现在打开',
  'now discards them.': '将丢弃它们。',
  'Capabilities — set each of the': '能力 —— 这',
  'File path rules — {summary}': '文件路径规则 —— {summary}',
  'Access group for the Custom profile': '自定义配置所用的访问组',
  'Default profile for new agent sessions': '新代理会话的默认配置',
  'Default access group for this workspace': '此工作区的默认访问组',
  'Approval timeout': '审批超时',
  'The session stops working once this elapses.': '超过这个时间后会话将失效。',
  'Server & workspace assignment': '服务器与工作区指派',
  'Stop all AI access': '停止所有 AI 访问',
  '🚨 Stop all AI access': '🚨 停止所有 AI 访问',
  ALLOW: '允许',
  DENY: '拒绝',
  ASK: '询问',
  'Commands, no writes.' : '可执行命令，不可写入。',
  'Access Groups': '访问组',
  'Bridge status': '桥接状态',
  'Connect Codex': '连接 Codex',
  'Connect Claude Code': '连接 Claude Code',
  'Connect Claude Desktop': '连接 Claude Desktop',
  'Connect an agent': '连接一个代理',

  'Command Prompt': '命令提示符',
  'Windows PowerShell (default)': 'Windows PowerShell（默认）',
  'New local shell': '新建本地 shell',
  'Reverse proxies': '反向代理',
  'Active Sessions': '活动会话',
  'Active sessions': '活动会话',
  'Start recording': '开始录制',
  'Record what the app does': '录制应用的行为',
  '{count} traced events': '{count} 条追踪事件',
  'Pending approvals': '待决审批',
  'action(s) waiting on you': '个操作等待你处理',
  'connected agent session(s)': '个已连接的代理会话',
  'Nothing to monitor': '没有可监控的内容',
  'Nothing to operate on': '没有可运维的对象',
  'engine not running': '引擎未运行',
  'Both devices agree': '两台设备一致',
  'Search connections…': '搜索连接…',
  'Route: This machine': '路径：本机',
  'No database selected': '未选择数据库',
  'No servers yet': '还没有服务器',
  'No environment': '无环境',
  'Environment: No environment': '环境：无环境',
  'Environment (Ctrl+E)': '环境（Ctrl+E）',
  'Send a request': '发送请求',
  'This device joins it': '本设备加入该账户',
  'This is my first device': '这是我的第一台设备',
  'A second device pairs with it': '第二台设备与它配对',
  'I already use OpsMaxx on another machine': '我已经在另一台机器上使用 OpsMaxx',
  'My other devices are gone': '我的其他设备都没了',
  'About Sync & devices': '关于同步与设备',
  'An account on a relay': '中继上的账户',
  'no account on this device': '本设备上没有账户',
  'nothing has synced yet': '还没有任何内容同步过',
  'Save it and attach it': '保存后附带提交',
  'Confirm master password': '确认主密码',
  'Master password (min {count} characters)': '主密码（至少 {count} 个字符）',
  'Layout (panels and splits)': '布局（面板与分栏）',
  'Open tabs and recently closed': '打开的标签页与最近关闭',
  'New HTTP request (Ctrl+Shift+T)': '新建 HTTP 请求（Ctrl+Shift+T）',
  'Ctrl+Shift+T new tab · F6 move focus': 'Ctrl+Shift+T 新建标签页 · F6 切换焦点',
  'Which of these is this machine?': '哪一台是本机？',
  'Paste a URL or a curl command': '粘贴 URL 或 curl 命令',
  'Nothing can be said about this until sync runs.': '同步运行之前无法判断这一点。',
  'Add a database connection, then select it to run queries.': '添加一个数据库连接，然后选中它即可执行查询。',
  'Add a connection to get started, or import the ones you already have from ~/.ssh/config.':
    '添加一个连接即可开始，也可以从 ~/.ssh/config 导入你已有的连接。',
  'Add a server to start streaming live CPU, memory, disk and network metrics.':
    '添加一台服务器，即可开始接收实时的 CPU、内存、磁盘与网络指标。',
  'Add a server before running commands or installing updates across the estate.':
    '先添加一台服务器，才能对资产批量执行命令或安装更新。',
  'Create a secure SSH tunnel to forward a local or remote port through a server.':
    '创建一条安全的 SSH 隧道，通过服务器转发本地或远程端口。',
  'Requests leave from this machine or through any server’s SSH connection.':
    '请求从本机发出，或经由任一服务器的 SSH 连接发出。',
  'Nothing leaves this computer until you save the file and attach it yourself.':
    '在你亲自保存文件并附带提交之前，任何内容都不会离开这台电脑。',
  'Reproduce it — recording was on': '复现问题 —— 录制已开启',
  'Saving…': '正在保存…',
  'Collecting…': '正在收集…',
  'The report could not be collected.': '报告收集失败。',
  'The report could not be collected. Settings → Advanced has the version block to paste by hand.':
    '报告收集失败。可在「设置 → 高级」中找到版本信息块，手工粘贴。',
  'Attach the saved file to the issue — do not paste it.': '把保存的文件作为附件提交，不要直接粘贴内容。',
  'Report not saved — you cancelled the dialog.': '报告未保存 —— 你取消了保存对话框。',
  'Could not save the report: {error}': '无法保存报告：{error}',
  'Recording. Reproduce the problem, then press the bug button again.':
    '正在录制。请复现问题，然后再次点击反馈按钮。',

  // ─────────────────────────────────────────────────────────────────────────
  // 反馈报告三个步骤的正文：句子被 <em>/<strong>/<code> 打断，改用 <Trans>
  // （src/renderer/src/i18n/Trans.tsx）。键仍是英文原句，标记写成 {槽位名}，
  // 中文可以把槽位挪到自己的语序上 —— 这正是「拆成多段 t()」做不到的事。
  // 槽位里的词仍然是各自的词条（'is'、'Start recording'），只是位置由整句决定。
  // ─────────────────────────────────────────────────────────────────────────

  'is': '是',
  'hostnames, usernames, file paths and command text': '主机名、用户名、文件路径和命令文本',
  'A report without a recording says what this install {em} — versions, counts, which features are on — but nothing about what it did. For anything that fails, misbehaves or hangs, press {strong}, make the bug happen again, then press the bug button again. Or send what is below as it stands.':
    '没有录制的报告只能说明这个安装{em}什么 —— 版本、数量、开了哪些功能 —— 但不能说明它做了什么。遇到失败、异常或卡死的情况，请按{strong}，复现问题后再按一次反馈按钮。也可以直接提交下面的内容。',
  'The trace names the internal operations that ran and the errors they raised. Errors routinely carry {strong} from your machine and your servers. Passwords, keys and tokens are filtered out before anything is written; a hostname cannot be, because no rule tells one from an ordinary word. Read it, and delete any line you would rather not publish once you have attached it.':
    '这份记录会列出运行过的内部操作，以及它们抛出的错误。错误信息里经常带有{strong}，来自你的机器和你的服务器。密码、密钥和令牌在写入之前都会被过滤掉；主机名则不能，因为没有任何规则能把主机名和普通单词区分开。请先读一遍，把你不愿公开的行删掉，再附带提交。',
  '{strong} writes one text file and opens the issue form with your version and operating system already filled in. Drag the file into the issue — an attachment stays inert, while pasted text is rendered as Markdown and read by automation.':
    '{strong}会写一个文本文件，并打开问题表单，其中已经填好你的版本与操作系统。把该文件拖进问题里 —— 附件是惰性的，而粘贴的文本会被渲染成 Markdown，也会被自动化程序读取。',
  'Saved to {path}. The issue form is open in your browser — drag that file into it.':
    '已保存到{path}。问题表单已在你的浏览器中打开 —— 把该文件拖进去。',
  'Approve or deny actions as they come up — the AI waits for your answer.':
    '操作出现时逐条批准或拒绝 —— AI 会等待你的答复。',
  'What the agent may do, and how much it asks first. Change it any time under Active Sessions.':
    '代理可以做什么，以及事前需要征得多少同意。任何时候都可以在「活动会话」下修改。',
  "Point Claude Code, Codex or another MCP client at OpsMaxx's local MCP server with that token.":
    '把 Claude Code、Codex 或其他 MCP 客户端指向 OpsMaxx 的本地 MCP 服务器，并使用该令牌。',
  'Create an AI Agent session scoped to one or more workspaces with that profile, and copy its token.':
    '按该配置创建一个限定在一个或多个工作区内的 AI 代理会话，并复制其令牌。',
  'Both machines have to be open at the same time; one shows a code and both compare the same emoji.':
    '两台机器必须同时在线；其中一台显示验证码，两台比对同一组表情。',
  'Happens when the account is created, or when this device is paired with one that already has an account.':
    '账户创建时会发生这一步；本设备与一台已有账户的设备配对时也会。',
  'The sync engine is not running. Pairing and the account are unaffected; nothing is moving between devices.':
    '同步引擎未运行。配对与账户不受影响，但设备之间不会有任何数据流动。',
  'Joins the account that machine already has, by pairing with it. No invite, and nothing to ask anybody for.':
    '与该机器配对即可加入它已有的账户。不需要邀请，也不必向任何人索取。',
  'Nothing of mine is on this relay yet. Creates the account — the only step in the whole product that needs an invite.':
    '这个中继上还没有我的任何数据。此处会创建账户 —— 这是整个产品中唯一需要邀请的一步。',
  'Back in with the twelve words you wrote down. This is the only way in when there is no other machine left to pair with.':
    '用你抄下的十二个单词重新进入。当再没有其他机器可配对时，这是唯一的进入方式。',
  'Waiting for the device list from the relay. It arrives the next time this device reaches it — nothing is wrong with the account.':
    '正在等待中继返回设备列表。本设备下次连通时会收到 —— 账户没有问题。',
  'Pick a profile — Read only, Ask first, Auto (routine work runs, risky actions ask) or Bypass; or Custom, to use an access group instead.':
    '选择一个配置 —— 只读、先询问、自动（常规操作直接执行，有风险的操作先询问）或放行；也可以选「自定义」改用访问组。',
  'Turns on the bridge, creates a session across your workspaces and hands it to the client. The session does not expire — revoke it under Active Sessions.':
    '开启桥接，在你的工作区范围内创建一个会话并交给客户端。会话不会过期 —— 请在「活动会话」下撤销。',
  'Name the relay you run and create an account on it. The twelve-word recovery phrase is shown once, during this step, and nothing on this machine keeps a copy.':
    '为你自己运行的中继命名，并在其上创建账户。十二个单词的恢复短语只在这一步显示一次，本机不会保留副本。',
  'addy is a relay you run yourself. It carries your data between your devices and cannot read any of it — every object is sealed before it leaves, and the server holds no key.':
    'addy 是你自己运行的中继。它在你的设备之间搬运数据，却读不了其中任何内容 —— 每个对象在离开前就已封装，服务器不持有密钥。',
}

/**
 * 术语表——新增词条请沿用，避免同一个概念在不同页面出现两种叫法。
 *
 * ┌──────────────┬────────────────────┬────────────────────────────────────┐
 * │ 原文          │ 译法                │ 说明                                │
 * ├──────────────┼────────────────────┼────────────────────────────────────┤
 * │ estate       │ 资产                │ 用户纳管的那一整批服务器             │
 * │ workspace    │ 工作区              │                                    │
 * │ connection   │ 连接                │ 指一条已保存的服务器配置             │
 * │ session      │ 会话                │ 一个打开中的终端/连接实例            │
 * │ vault        │ 保险库              │ 加密的凭据库；不译作「金库」          │
 * │ tunnel       │ 隧道                │                                    │
 * │ fleet        │ 资产（同上）         │ Fleet Monitor → 资产总览             │
 * │ alert        │ 告警                │ 不译作「警报」                       │
 * │ approval     │ 审批 / 待决事项      │ AI 操作的放行请求                    │
 * │ backup       │ 备份                │                                    │
 * │ restore      │ 恢复                │ Backup & Restore → 备份与恢复        │
 * │ density      │ 布局密度            │ compact density → 紧凑布局           │
 * │ walkthrough  │ 新手引导            │                                    │
 * │ channel      │ 通道                │ 更新通道（稳定版/测试版）             │
 * │ Docker/K8s/  │ 保留原文             │ 专有名词，不译                       │
 * │ CI\/CD\/SSH\/ │                    │                                    │
 * │ SFTP\/MCP     │                    │                                    │
 * └──────────────┴────────────────────┴────────────────────────────────────┘
 */
