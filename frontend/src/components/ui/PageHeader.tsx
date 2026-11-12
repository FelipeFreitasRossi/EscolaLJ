import type { ReactNode } from 'react'
import type { ImageKey } from '../../data/images'
import { Picture } from './Picture'

interface PageHeaderProps {
  title: string[]
  intro?: ReactNode
  image?: ImageKey
  children?: ReactNode
}

/**
 * Topo das páginas internas: título gigante em linhas que sobem em sequência,
 * foto com recorte inclinado e parallax, fundo noturno com granulação.
 */
export function PageHeader({ title, intro, image, children }: PageHeaderProps) {
  return (
    <section className="grain bg-night relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* linhas de velocidade decorativas */}
      <div aria-hidden="true" className="absolute -top-10 right-[8%] z-0 flex h-[130%] gap-3 opacity-40">
        <span className="bg-flame-grad h-full w-1 skew-x-[-10deg]" />
        <span className="h-full w-px skew-x-[-10deg] bg-paper/30" />
      </div>

      <div className={`container-lj relative z-[2] grid items-end gap-12 ${image ? 'lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-7' : 'max-w-4xl'}>
          <h1 data-reveal="lines" className="display text-[clamp(4rem,13vw,10.5rem)]">
            {title.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>
          {intro && (
            <div data-reveal="up" className="mt-8 max-w-[58ch] text-lg text-paper/75 md:text-xl">
              {intro}
            </div>
          )}
          {children && <div data-reveal="up" className="mt-8">{children}</div>}
        </div>

        {image && (
          <div data-reveal="clip" className="lg:col-span-5">
            <Picture image={image} parallax className="clip-slant aspect-[4/3] lg:aspect-[4/5]" priority />
          </div>
        )}
      </div>
    </section>
  )
}

/** Título de seção: sem rótulos decorativos, só o título e, opcionalmente, um texto curto. */
export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 data-reveal="lines" className={`display text-[clamp(3rem,8vw,6.5rem)] ${className}`}>
      {(Array.isArray(children) ? children : [children]).map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <span className="block">{line}</span>
        </span>
      ))}
    </h2>
  )
}
