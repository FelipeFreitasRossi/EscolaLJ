import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mobileNav } from '../../data/navigation'

/**
 * Barra de navegação flutuante do celular.
 * - Vidro fosco (glassmorphism) com borda discreta.
 * - Respeita a área segura do iPhone (env(safe-area-inset-bottom)).
 * - O espaço que ela ocupa é reservado pela classe .app-shell, então nada fica escondido.
 * - "Reservar" fica no centro, em destaque.
 */
export function MobileTabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-3 z-50 lg:hidden"
      style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <ul className="glass mx-auto flex h-[var(--tabbar-h)] max-w-md items-stretch justify-between rounded-[22px] px-1.5 shadow-[var(--shadow-deep)]">
        {mobileNav.map(({ to, label, icon: Icon }) => {
          const featured = to === '/reservas'
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={to === '/'}
                className="relative flex h-full flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-semibold tracking-wide"
              >
                {({ isActive }) => (
                  <>
                    {isActive && !featured && (
                      <motion.span
                        layoutId="tab-active"
                        className="absolute inset-x-1 inset-y-1.5 rounded-2xl bg-paper/[0.09]"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                    {featured ? (
                      <span
                        className={`bg-flame-grad relative -mt-1 grid h-10 w-10 place-items-center rounded-full text-ink shadow-[0_8px_20px_-6px_rgb(255_106_19/0.8)] transition-transform ${
                          isActive ? 'scale-110' : ''
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    ) : (
                      <Icon
                        className={`relative h-[22px] w-[22px] transition-colors ${isActive ? 'text-flame' : 'text-paper/60'}`}
                      />
                    )}
                    <span className={`relative transition-colors ${isActive ? 'text-paper' : 'text-paper/55'}`}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
