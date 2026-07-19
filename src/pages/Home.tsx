import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BellRing,
  Database,
  Feather,
  Package,
  Radar,
  ShieldCheck,
  Terminal,
  Wallet,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BrowserFrame } from '@/components/BrowserFrame'
import { CodeBlock } from '@/components/CodeBlock'
import { GithubIcon } from '@/components/GithubIcon'

const INSTALL_CMD =
  'curl -fsSL https://raw.githubusercontent.com/nimeng1222/wait-release/main/install-wait.sh -o install-wait.sh && sudo bash install-wait.sh'
const AGENT_CMD =
  'curl -fsSL https://raw.githubusercontent.com/nimeng1222/wait-release/main/install-agent.sh -o install-agent.sh && sudo bash install-agent.sh --endpoint "https://<主控地址>" --token "<节点token>"'

const shot = (name: string) => `${import.meta.env.BASE_URL}screenshots/${name}`

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Activity,
    title: '实时监控',
    desc: '服务端主动推送，秒级刷新 CPU、内存、磁盘与流量，无需手动刷新页面。',
  },
  {
    icon: Terminal,
    title: '远程终端',
    desc: '浏览器内直连服务器 Shell，支持断线重连与剪贴板，随时随地处理故障。',
  },
  {
    icon: BellRing,
    title: '告警通知',
    desc: '节点离线、负载过高、服务到期续费，异常发生第一时间推送提醒。',
  },
  {
    icon: Wallet,
    title: '账单管理',
    desc: '记录价格与付款周期，自动计算剩余价值，续费提醒不再靠记忆。',
  },
  {
    icon: Radar,
    title: 'Ping 拨测',
    desc: 'ICMP / TCP / HTTP 三种拨测方式，网络质量图表直观呈现链路状态。',
  },
  {
    icon: ShieldCheck,
    title: '安装安全',
    desc: '安装包经过 SHA-256 校验与 ECDSA 签名验证，验签失败拒绝安装。',
  },
]

const highlights: { icon: LucideIcon; text: string }[] = [
  { icon: Package, text: 'Go 单二进制' },
  { icon: Database, text: 'SQLite 零依赖' },
  { icon: ShieldCheck, text: 'ECDSA 签名安装' },
  { icon: Feather, text: 'Agent 低占用' },
  { icon: Zap, text: '秒级推送' },
]

export function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                开源 · 自托管 · 轻量
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                你的服务器，
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  一目了然
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-7 text-slate-400">
                wait-monitor 是轻量级自托管服务器监控系统：Go 单二进制服务端 +
                低占用探针 Agent，实时监控、远程终端、告警通知、账单管理，一个面板全部搞定。
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
                >
                  快速开始
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="https://github.com/nimeng1222/wait-monitor"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
              </div>
              <div className="mt-8">
                <CodeBlock code={INSTALL_CMD} title="一行命令，完成服务端安装" />
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-600/25 via-blue-500/10 to-cyan-400/20 blur-2xl" />
              <div className="relative">
                <BrowserFrame src={shot('dashboard-dark.png')} alt="wait-monitor 深色主题仪表盘截图" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技术亮点条 */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 sm:px-6">
          {highlights.map((h) => (
            <div key={h.text} className="flex items-center gap-2 text-sm text-slate-400">
              <h.icon size={16} className="text-cyan-400" />
              {h.text}
            </div>
          ))}
        </div>
      </section>

      {/* 特性网格 */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            一个面板，管好所有服务器
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-7 text-slate-400">
            从监控到运维再到账单，覆盖个人与小型团队管理多台服务器的日常需求。
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-500/20 text-cyan-300">
                  <f.icon size={19} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 三步上手 */}
      <section className="border-y border-white/5 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            三步上手
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-7 text-slate-400">
            从安装到看到第一台服务器的实时数据，只需要几分钟。
          </p>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className="min-w-0 rounded-xl border border-white/10 bg-ink-950/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  1
                </span>
                <h3 className="text-[15px] font-semibold text-white">安装服务端</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                单二进制 + 内嵌前端 + SQLite，零外部依赖。安装脚本自动完成部署并托管到 systemd。
              </p>
              <CodeBlock code={INSTALL_CMD} title="install-wait.sh" />
            </div>
            <div className="min-w-0 rounded-xl border border-white/10 bg-ink-950/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  2
                </span>
                <h3 className="text-[15px] font-semibold text-white">创建节点</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                访问 <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs text-cyan-300">http://&lt;服务器IP&gt;:25774</code>{' '}
                登录面板（初始账号密码见安装输出），创建节点并复制节点 token。
              </p>
              <div className="my-4 rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-500">
                面板 → 节点管理 → 新建节点 → 复制 token
              </div>
            </div>
            <div className="min-w-0 rounded-xl border border-white/10 bg-ink-950/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  3
                </span>
                <h3 className="text-[15px] font-semibold text-white">安装 Agent</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                在被控机上运行安装脚本，填入主控地址与 token，数秒内即可在面板看到实时数据。
              </p>
              <CodeBlock code={AGENT_CMD} title="install-agent.sh" />
            </div>
          </div>
        </div>
      </section>

      {/* 截图展示 */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              精心打磨的仪表盘
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-7 text-slate-400">
              卡片与表格双视图、中英双语、明暗两套主题，数据密度与可读性兼得。
            </p>
            <div className="mt-6 inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
              {(
                [
                  { key: 'dark', label: '深色主题' },
                  { key: 'light', label: '浅色主题' },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTheme(t.key)}
                  className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
                    theme === t.key ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative mt-8 w-full max-w-5xl">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-cyan-400/15 blur-2xl" />
              <div className="relative">
                <BrowserFrame
                  src={shot(theme === 'dark' ? 'dashboard-dark.png' : 'dashboard-light.png')}
                  alt={
                    theme === 'dark'
                      ? 'wait-monitor 深色主题仪表盘截图'
                      : 'wait-monitor 浅色主题仪表盘截图'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 收尾 */}
      <section className="border-t border-white/5 bg-gradient-to-b from-blue-600/10 to-transparent py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            现在开始监控你的服务器
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-slate-400">
            开源免费，数据完全掌握在自己手里。
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              阅读使用文档
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
            >
              常见问题
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
