import { AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { DevStatus } from '../components/DevStatus'
import { MobileTabBar } from '../components/layout/MobileTabBar'
import { PageTransition } from '../components/layout/PageTransition'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ScrollTrigger } from '../lib/gsap'

export function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="app-shell">
      <a
        href="#conteudo"
        className="sr-only z-[100] rounded-full bg-flame px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            requestAnimationFrame(() => ScrollTrigger.refresh())
          }}
        >
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <MobileTabBar />
      {import.meta.env.DEV && <DevStatus />}
    </div>
  )
}
