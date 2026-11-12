import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconArrow, IconClose } from '../components/ui/Icons'
import { PageHeader } from '../components/ui/PageHeader'
import { images } from '../data/images'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'
import type { GalleryCategory } from '../types/site'

const categories: ('Todas' | GalleryCategory)[] = ['Todas', 'Quadras', 'Treinos', 'Equipamentos']

// Padrão de tamanhos que se repete e deixa o grid assimétrico.
const spans = ['md:col-span-7 md:row-span-2', 'md:col-span-5', 'md:col-span-5', 'md:col-span-4', 'md:col-span-8', 'md:col-span-6', 'md:col-span-6']

export function GalleryPage() {
  const root = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<(typeof categories)[number]>('Todas')
  const [open, setOpen] = useState<number | null>(null)
  useScrollFx(root)
  usePageMeta('Galeria', 'Galeria de fotos da Escola de Futebol LJ.')

  const items = site.gallery.filter((g) => filter === 'Todas' || g.category === filter)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const current = open !== null ? items[open] : null

  return (
    <div ref={root}>
      <PageHeader title={['Galeria']} intro="Quadras, treinos e o dia a dia da LJ. As imagens atuais são ilustrativas e serão substituídas por fotos oficiais." />

      <section className="bg-ink pb-[var(--space-section)]">
        <div className="container-lj">
          <div role="tablist" aria-label="Categorias" className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 font-semibold transition-colors ${filter === c ? 'text-ink' : 'text-paper/70 hover:text-paper'}`}
              >
                {filter === c && <motion.span layoutId="gallery-filter" className="bg-flame-grad absolute inset-0 rounded-full" transition={{ type: 'spring', stiffness: 450, damping: 36 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-8 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-12 md:gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => {
                const asset = images[item.image]
                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`${i === 0 ? 'col-span-2 row-span-2' : ''} ${spans[i % spans.length]}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-lg)] bg-graphite"
                      aria-label={`Ampliar: ${asset.alt}`}
                    >
                      <motion.img
                        layoutId={`photo-${item.id}`}
                        src={asset.src}
                        alt={asset.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute bottom-4 left-4 translate-y-2 text-left text-sm font-semibold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.category}
                        {asset.demo && <span className="block text-xs font-normal text-paper/60">Imagem ilustrativa</span>}
                      </span>
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={images[current.image].alt}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.img
              layoutId={`photo-${current.id}`}
              src={images[current.image].src}
              alt={images[current.image].alt}
              className="max-h-[78svh] max-w-full rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-deep)]"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} className="glass grid h-12 w-12 place-items-center rounded-full" aria-label="Foto anterior">
                <IconArrow className="h-5 w-5 rotate-180" />
              </button>
              <p className="glass rounded-full px-4 py-2.5 text-sm">
                {current.category}
                {images[current.image].demo && ' · ilustrativa'}
              </p>
              <button type="button" onClick={() => step(1)} className="glass grid h-12 w-12 place-items-center rounded-full" aria-label="Próxima foto">
                <IconArrow className="h-5 w-5" />
              </button>
            </div>
            <button type="button" onClick={close} className="glass absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full" aria-label="Fechar">
              <IconClose className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
