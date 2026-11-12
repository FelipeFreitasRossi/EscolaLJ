import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { desktopNav } from '../../data/navigation'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'

/**
 * Header: transparente sobre o topo da página, vidro escuro depois de rolar.
 * Esconde ao rolar para baixo e volta ao rolar para cima (como em grandes sites esportivos).
 * No celular mostra só a logo; a navegação fica na barra inferior.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 320 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setHidden(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}
    >
      <div className="container-lj flex h-18 items-center justify-between lg:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {desktopNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block px-4 py-2 font-medium transition-colors ${isActive ? 'text-paper' : 'text-paper/65 hover:text-paper'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="bg-flame-grad absolute inset-x-4 -bottom-0.5 h-[3px] skew-x-[-20deg] rounded-full"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button to="/reservas" arrow>
            Reservar quadra
          </Button>
        </div>
      </div>
    </header>
  )
}
