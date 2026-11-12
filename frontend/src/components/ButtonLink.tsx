import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'card' | 'outline-light' | 'outline-dark' | 'ink'

const styles: Record<Variant, string> = {
  card: 'bg-card text-ink hover:bg-line',
  'outline-light': 'border-2 border-line text-line hover:bg-line hover:text-ink',
  'outline-dark': 'border-2 border-ink text-ink hover:bg-ink hover:text-line',
  ink: 'bg-ink text-line hover:bg-turf',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

export function ButtonLink({ variant = 'card', className = '', children, ...props }: ButtonLinkProps) {
  const external = props.href?.startsWith('http')
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 font-semibold transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
