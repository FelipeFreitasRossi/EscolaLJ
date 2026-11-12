import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export const navItems = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#estrutura', label: 'Unidades' },
  { href: '#escola', label: 'Escola' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]

export function Logo() {
  return (
    <a href="#topo" className="flex items-center gap-3" aria-label="Escola de Futebol LJ, voltar ao início">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-card font-display text-2xl font-black text-ink">
        LJ
      </span>
      <span className="hidden font-display text-lg font-extrabold uppercase leading-none sm:block">
        Escola de
        <br />
        Futebol LJ
      </span>
    </a>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile: trava o scroll da página e fecha com Esc.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-line transition-colors duration-300 ${
        scrolled || open ? 'bg-turf/95 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-lj flex h-18 items-center justify-between">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-medium text-line/80 transition-colors hover:text-card">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reservas"
            className="hidden min-h-11 items-center rounded-full bg-card px-5 font-semibold text-ink transition-colors hover:bg-line sm:inline-flex"
          >
            Reservar quadra
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-6 bg-line transition-transform ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-line transition-transform ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            className="fixed inset-x-0 top-18 bottom-0 bg-turf lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="container-lj flex flex-col gap-2 pt-8">
              {[...navItems, { href: '#reservas', label: 'Reservar quadra' }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`display block py-2 text-6xl ${item.href === '#reservas' ? 'text-card' : ''}`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
