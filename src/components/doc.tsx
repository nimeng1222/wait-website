import type { ReactNode } from 'react'

export function DocH1({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{children}</h1>
}

export function DocLead({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15px] leading-7 text-slate-400">{children}</p>
}

export function DocH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 border-b border-white/10 pb-2 text-lg font-semibold text-white">
      {children}
    </h2>
  )
}

export function DocH3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-[15px] font-semibold text-slate-100">{children}</h3>
}

export function DocP({ children }: { children: ReactNode }) {
  return <p className="my-3 text-[15px] leading-7 text-slate-300">{children}</p>
}

export function DocUl({ children }: { children: ReactNode }) {
  return (
    <ul className="my-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-slate-300 marker:text-slate-600">
      {children}
    </ul>
  )
}

export function DocOl({ children }: { children: ReactNode }) {
  return (
    <ol className="my-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-slate-300 marker:text-slate-600">
      {children}
    </ol>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-cyan-300">
      {children}
    </code>
  )
}

export function DocTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-2.5 align-top leading-6 text-slate-300">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm leading-6 text-blue-200/90">
      {children}
    </div>
  )
}
