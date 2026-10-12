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
