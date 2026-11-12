import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow } from './Icons'

type Variant = 'flame' | 'light' | 'outline' | 'dark'

const styles: Record<Variant, string> = {
  flame: 'bg-flame-grad text-ink shadow-[0_10px_30px_-10px_rgb(255_106_19/0.7)]',
  light: 'bg-paper text-ink',
  outline: 'border border-paper/35 text-paper hover:border-paper',
  dark: 'bg-ink text-paper',
}

interface ButtonProps {
  to: string
  variant?: Variant
  children: ReactNode
  arrow?: boolean
  className?: string
}

/**
 * Botão-link. Rotas internas usam o React Router (sem recarregar a página);
 * endereços externos abrem em nova aba.
 * Microinteração: a seta desliza e o fundo "varre" no hover.
 */
export function Button({ to, variant = 'flame', children, arrow = false, className = '' }: ButtonProps) {
  const cls = `group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 font-semibold transition-[transform,border-color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] ${styles[variant]} ${className}`
  const content = (
    <>
      <span className="absolute inset-0 -translate-x-[101%] skew-x-[-10deg] bg-white/20 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" aria-hidden="true" />
      <span className="relative">{children}</span>
      {arrow && <IconArrow className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  )
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {content}
    </Link>
  )
}
