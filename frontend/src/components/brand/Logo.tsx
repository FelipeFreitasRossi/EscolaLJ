import { useId } from 'react'
import { Link } from 'react-router-dom'

type SymbolVariant = 'color' | 'white' | 'black'

/**
 * Símbolo provisório da LJ: escudo inclinado 10° (velocidade), monograma LJ em
 * espaço negativo e uma bola saindo da curva do J. Arquivos estáticos em /public/brand.
 */
export function LogoSymbol({ variant = 'color', className = 'h-10 w-10' }: { variant?: SymbolVariant; className?: string }) {
  const gradId = useId()
  const shield = variant === 'color' ? `url(#${gradId})` : variant === 'white' ? '#FFFFFF' : '#050506'
  const mark = variant === 'black' ? '#FFFFFF' : '#050506'
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {variant === 'color' && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFB21E" />
            <stop offset="0.55" stopColor="#FF6A13" />
            <stop offset="1" stopColor="#E8420A" />
          </linearGradient>
        </defs>
      )}
      <g transform="translate(6 0) skewX(-10)">
        <path d="M8 4H52V34C52 46 42 54 30 60C18 54 8 46 8 34Z" fill={shield} />
        <g fill="none" stroke={mark} strokeWidth="6.5" strokeLinejoin="miter" strokeMiterlimit="10">
          <path d="M17.5 12V35.5H29" />
          <path d="M38 12V35A9.5 9.5 0 0 1 28.5 44.5H25" />
        </g>
        <circle cx="19.5" cy="44.5" r="3.6" fill={mark} />
      </g>
    </svg>
  )
}

/** Logo completa: símbolo + nome. `compact` mostra só o símbolo (mobile). */
export function Logo({ compact = false, tone = 'dark' }: { compact?: boolean; tone?: 'dark' | 'light' }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Escola de Futebol LJ, página inicial">
      <LogoSymbol className="h-11 w-11 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-105" />
      {!compact && (
        <span className={`font-display text-[1.05rem] font-extrabold uppercase leading-[0.95] tracking-wide ${tone === 'dark' ? 'text-paper' : 'text-ink'}`}>
          Escola de
          <br />
          Futebol LJ
        </span>
      )}
    </Link>
  )
}
