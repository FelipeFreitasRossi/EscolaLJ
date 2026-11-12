import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { site } from '../data/site'
import { PhotoSlot } from './PhotoSlot'

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)
    // Só no desktop e para quem aceita animação: a seção fica fixa e as fotos
    // deslizam na horizontal conforme o scroll. No celular, é um carrossel com o dedo.
    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      const el = track.current
      if (!el) return
      const distance = () => el.scrollWidth - window.innerWidth
      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="galeria" className="overflow-hidden bg-line py-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-lj">
        <h2 className="display text-[clamp(3rem,8vw,7rem)]">Galeria</h2>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:px-10 lg:mt-12 lg:w-max lg:snap-none lg:overflow-visible lg:gap-6 lg:pb-0"
      >
        {site.gallery.map((item) => (
          <li
            key={item.id}
            className={`h-[55vh] max-h-[560px] shrink-0 snap-start overflow-hidden rounded-lg ${
              item.wide ? 'w-[85vw] lg:w-[48vw]' : 'w-[70vw] lg:w-[30vw]'
            }`}
          >
            <PhotoSlot src={item.src} alt={item.label} label={item.label.toLowerCase()} />
          </li>
        ))}
      </ul>
    </section>
  )
}
