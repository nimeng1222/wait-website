import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { DocsLayout } from '@/pages/docs/DocsLayout'
import { Quickstart } from '@/pages/docs/Quickstart'
import { AgentGuide } from '@/pages/docs/AgentGuide'
import { ConfigRef } from '@/pages/docs/ConfigRef'
import { Maintenance } from '@/pages/docs/Maintenance'
import { Faq } from '@/pages/Faq'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Navigate to="/docs/quickstart" replace />} />
              <Route path="quickstart" element={<Quickstart />} />
              <Route path="agent" element={<AgentGuide />} />
              <Route path="config" element={<ConfigRef />} />
              <Route path="maintenance" element={<Maintenance />} />
            </Route>
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
