import { Logo } from './Logo'
import { GithubIcon } from './GithubIcon'

const repos = [
  { name: 'wait-release', desc: '安装脚本与下载', href: 'https://github.com/nimeng1222/wait-release' },
  { name: 'Releases', desc: '已签名发布包', href: 'https://github.com/nimeng1222/wait-release/releases' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="text-sm font-semibold text-white">wait-monitor</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              轻量级自托管服务器监控系统。Go 单二进制 + SQLite，零外部依赖，五分钟完成部署。
            </p>
            <a
              href="https://github.com/nimeng1222/wait-release"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <GithubIcon size={14} />
              github.com/nimeng1222/wait-release
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">仓库</h3>
            <ul className="mt-3 space-y-2">
              {repos.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {r.name}
                    <span className="ml-2 text-xs text-slate-600">{r.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">速查</h3>
            <ul className="mt-3 space-y-2 font-mono text-[13px] text-slate-400">
              <li>端口 25774</li>
              <li>/opt/wait-monitor</li>
              <li>/opt/wait-monitor/data</li>
              <li className="font-sans text-sm text-slate-500">License：MIT</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-xs text-slate-600">
          © {new Date().getFullYear()} wait-monitor · 基于 MIT 协议开源
        </div>
      </div>
    </footer>
  )
}
