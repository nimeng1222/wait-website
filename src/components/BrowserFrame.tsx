export function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl shadow-blue-950/50">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-slate-500 sm:block">
          http://your-server:25774
        </span>
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  )
}
