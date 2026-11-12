import { site } from '../data/site'
import { Logo, navItems } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-turf text-line">
      <div className="container-lj grid gap-12 pt-20 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-line/70">
            Escola de futebol e locação de quadras em {site.city}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="space-y-3">
            {[...navItems, { href: '#reservas', label: 'Reservar quadra' }].map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-line/80 transition-colors hover:text-card">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <a href={site.links.linktree} target="_blank" rel="noopener noreferrer" className="block text-line/80 hover:text-card">
            Todos os links da LJ
          </a>
          <a href={site.links.website} target="_blank" rel="noopener noreferrer" className="block text-line/80 hover:text-card">
            Site atual
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display mt-16 -mb-[0.18em] select-none text-center text-[38vw] text-turf-2"
      >
        LJ
      </p>

      <div className="border-t border-line/15">
        <p className="container-lj py-6 text-sm text-line/60">
          © {new Date().getFullYear()} {site.name}. {site.city}.
        </p>
      </div>
    </footer>
  )
}
