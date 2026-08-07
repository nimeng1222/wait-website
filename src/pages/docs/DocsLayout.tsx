import { NavLink, Outlet } from 'react-router'
import { BookOpen, Rocket, Server, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const nav: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/docs/quickstart', label: '快速开始', icon: Rocket },
  { to: '/docs/agent', label: '安装 Agent', icon: Server },
  { to: '/docs/config', label: '配置参考', icon: BookOpen },
  { to: '/docs/maintenance', label: '升级与维护', icon: Wrench },
]

export function DocsLayout() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 hidden text-xs font-medium uppercase tracking-wider text-slate-500 lg:block">
            使用文档
          </p>
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-white ring-1 ring-inset ring-blue-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon size={15} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <article className="mt-8 min-w-0 lg:mt-0">
          <Outlet />
        </article>
      </div>
    </div>
  )
}
