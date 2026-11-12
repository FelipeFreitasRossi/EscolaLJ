import { site } from '../../data/site'
import { LogoSymbol } from '../brand/Logo'

const words = ['Escola de futebol', 'Locação de quadras', site.city, ...site.units.map((u) => u.name)]

/** Faixa inclinada que corre na horizontal, em loop. Para quem prefere menos movimento, fica parada. */
export function Ticker() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="display whitespace-nowrap text-4xl md:text-6xl">{w}</span>
          <LogoSymbol variant="black" className="h-8 w-8 md:h-11 md:w-11" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="bg-flame-grad -mx-4 flex -rotate-2 py-4 text-ink shadow-[var(--shadow-deep)] md:py-5">
        <div className="flex w-max animate-marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}
