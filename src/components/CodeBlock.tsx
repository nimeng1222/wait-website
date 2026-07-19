import { CopyButton } from './CopyButton'

export function CodeBlock({ code, title = '终端' }: { code: string; title?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b1120]">
      <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-2">
        <span className="truncate text-xs text-slate-500">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}
