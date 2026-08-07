import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { GithubIcon } from './GithubIcon'

const links = [
  { to: '/', label: '首页' },
  { to: '/docs', label: '使用文档' },
  { to: '/faq', label: '常见问题' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo size={30} />
          <span className="text-[15px] font-semibold tracking-tight text-white">wait-monitor</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/nimeng1222/wait-release"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:bg-white/10"
          >
            <GithubIcon size={15} />
            GitHub
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-4 py-3 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/nimeng1222/wait-release"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200"
            >
              <GithubIcon size={15} />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
