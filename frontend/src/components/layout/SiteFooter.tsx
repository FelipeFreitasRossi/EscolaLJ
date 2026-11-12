import { Link } from 'react-router-dom'
import { footerNav } from '../../data/navigation'
import { site, whatsappLink } from '../../data/site'
import { LogoSymbol } from '../brand/Logo'

export function SiteFooter() {
  const socials = [
    { label: 'WhatsApp', href: whatsappLink() },
    { label: 'Instagram', href: site.links.instagram },
    { label: 'Facebook', href: site.links.facebook },
    { label: 'Todos os links', href: site.links.linktree },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  return (
    <footer className="grain relative overflow-hidden border-t border-graphite-2 bg-carbon">
      <div className="container-lj relative z-[2] grid gap-12 pt-20 pb-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <LogoSymbol className="h-16 w-16" />
          <p className="display mt-6 text-5xl md:text-6xl">
            Escola de
            <br />
            Futebol LJ
          </p>
          <p className="mt-4 max-w-xs text-steel">Escola de futebol e locação de quadras em {site.city}.</p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-4">
          <h2 className="mb-4 font-semibold text-paper">Navegação</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-grow text-steel transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-semibold text-paper">Redes e contato</h2>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-grow text-steel transition-colors hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monograma gigante vazado, cortado pela base */}
      <p
        aria-hidden="true"
        className="display pointer-events-none relative z-[2] -mb-[0.2em] select-none text-center text-[42vw] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.09)] lg:text-[30vw]"
      >
        LJ
      </p>

      <div className="relative z-[2] border-t border-graphite-2">
        <div className="container-lj flex flex-col gap-2 py-6 text-sm text-steel md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {site.city}.</p>
          <p>Imagens e logo provisórias, criadas para demonstração.</p>
        </div>
      </div>
    </footer>
  )
}
