import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

const FAQS: { q: string; a: string }[] = [
  {
    q: '初始管理员账号密码在哪里？',
    a: '首次安装完成后会自动生成随机管理员账号密码。\n脚本安装：查看 `/opt/wait-monitor/data/initial-admin-credentials.json`。\n直接运行二进制时，请查看进程输出及当前数据目录中的同名文件。\n出于安全考虑，该文件在首次登录成功后会自动删除，请登录后立即修改密码。',
  },
  {
    q: '服务启动失败，提示 status=200/CHDIR 怎么办？',
    a: '这是旧版安装脚本遗留的目录权限问题，systemd 无法进入工作目录（CHDIR 失败），服务随之崩溃。\n修复方法：重新运行一键安装脚本，在交互菜单中选择「升级」，新版脚本会自动修正目录权限，完成自愈。\n升级会自动备份旧二进制、失败自动回滚，可放心执行。',
  },
  {
    q: '端口 25774 被占用，服务崩溃重启循环？',
    a: '端口冲突时服务会不断崩溃重启，属于预期表现。先用 `ss -ltnp | grep 25774` 确认占用进程。\n解决方式二选一：\n· 停掉占用 25774 端口的进程，然后 `sudo systemctl restart wait-monitor`；\n· 或设置环境变量 `WAIT_LISTEN` 改用其他端口（如 `WAIT_LISTEN=0.0.0.0:25775`），重启后生效。',
  },
  {
    q: 'Agent 一直离线，如何排查？',
    a: '按清单逐项检查：\n· 端口号：主控端口（默认 25774）是否在防火墙 / 安全组中放行；\n· token：节点 token 是否填写正确（在面板创建节点后获得）；\n· endpoint：`--endpoint` 地址是否正确、能否 `curl` 连通；\n· 网络：被控机到主控之间的网络连通性。\nAgent 内置指数退避重连，问题修复后会自动恢复上线，无需重装。',
  },
  {
    q: '如何修改监听端口？',
    a: '方式一：设置环境变量 `WAIT_LISTEN`，例如 `WAIT_LISTEN=0.0.0.0:25775`，然后重启服务。\n方式二：重新运行一键安装脚本，通过交互菜单调整。\n注意同步更新防火墙 / 安全组放行规则，以及 Agent 配置中的 `--endpoint` 地址。',
  },
  {
    q: '开启 CORS 后跨域请求全部被拒绝？',
    a: '这是预期行为：未设置 `WAIT_CORS_ALLOWLIST` 时，服务端拒绝所有跨域请求。\n需要跨域时，把允许的来源写入白名单，逗号分隔：\n`WAIT_CORS_ALLOWLIST="https://console.example.com,https://admin.example.com"`\n配置后重启服务生效。',
  },
  {
    q: '服务器没有公网 IP，怎么访问面板？',
    a: '使用内嵌的 Cloudflare Tunnel，无需单独安装 cloudflared：\n1. 在 Cloudflare Zero Trust 控制台创建 Tunnel，获取 token；\n2. 设置环境变量 `WAIT_ENABLE_CLOUDFLARED=1` 与 `WAIT_CLOUDFLARED_TOKEN=<你的token>`；\n3. 重启服务，通过 Cloudflare 分配的域名访问面板。',
  },
  {
    q: '卸载后数据还在吗？',
    a: '在。卸载默认保留数据目录 `/opt/wait-monitor/data`（含 SQLite 数据库），重新安装后数据可继续使用。\n卸载过程中脚本会提示是否删除数据目录，确认后才会清理；也可事后手动删除 `/opt/wait-monitor/data`。',
  },
  {
    q: '支持哪些操作系统和架构？',
    a: '服务端公开预编译包：Linux amd64 / arm64。\nAgent：Linux / Windows / macOS，资源占用极低。\n面板支持现代浏览器，提供中英双语与明暗两套主题。',
  },
  {
    q: '初始凭据文件会一直在吗？',
    a: '不会。`initial-admin-credentials.json` 在管理员首次登录成功后会自动删除，避免凭据长期落盘。\n请务必在首次登录后立即修改密码。',
  },
  {
    q: '如何固定安装指定版本？',
    a: '安装 / 升级前设置环境变量 `WAIT_MAIN_RELEASE_VERSION` 指定版本号：\n`export WAIT_MAIN_RELEASE_VERSION=vX.Y.Z`\n然后正常执行一键安装脚本即可。不设置时默认安装最新版本。',
  },
  {
    q: '安装的二进制可信吗？如何校验？',
    a: '可信。安装脚本下载二进制后会进行两重校验：\n1. 对照发布页的 `SHA256SUMS` 做 SHA-256 完整性校验；\n2. 使用脚本内置的固定公钥（pinned key）对签名做 ECDSA 验签。\n任何一步校验失败都会拒绝安装，确保被篡改的二进制无法进入系统。',
  },
]

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((p, i) =>
    p.length > 1 && p.startsWith('`') && p.endsWith('`') ? (
      <code
        key={i}
        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12.5px] text-cyan-300"
      >
        {p.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

export function Faq() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<number | null>(0)

  const filtered = useMemo(() => {
    const kw = query.trim().toLowerCase()
    if (!kw) return FAQS.map((f, i) => ({ ...f, idx: i }))
    return FAQS.map((f, i) => ({ ...f, idx: i })).filter(
      (f) => f.q.toLowerCase().includes(kw) || f.a.toLowerCase().includes(kw),
    )
  }, [query])

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">常见问题</h1>
        <p className="mt-3 text-[15px] text-slate-400">
          安装、部署与使用中的高频问题。找不到答案？到{' '}
          <a
            href="https://github.com/nimeng1222/wait-release/issues"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            GitHub Issues
          </a>{' '}
          提问。
        </p>
      </div>

      <div className="relative mt-8">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索问题，如：端口、token、CORS…"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
        />
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            没有匹配的问题，换个关键词试试。
          </p>
        )}
        {filtered.map((f) => {
          const isOpen = open === f.idx
          return (
            <div
              key={f.idx}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen ? 'border-blue-500/30 bg-white/[0.06]' : 'border-white/10 bg-white/5'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`text-[15px] font-medium ${isOpen ? 'text-white' : 'text-slate-200'}`}>
                  {f.q}
                </span>
                <ChevronDown
                  size={17}
                  className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 px-5 pb-5 text-sm leading-7 text-slate-400">
                    {f.a.split('\n').map((line, i) => (
                      <p key={i}>{renderInline(line)}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
