import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { site } from '../data/site'
import { ButtonLink } from './ButtonLink'
import { PhotoSlot } from './PhotoSlot'
import { PitchLines } from './PitchLines'

const headline = ['O jogo', 'começa', 'aqui.']

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)
    mm.add(MOTION_OK, () => {
      // O momento de abertura: a cal risca o meio-campo enquanto o título sobe.
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-pitch] > *', { strokeDashoffset: 1, duration: 1.6, stagger: 0.15, ease: 'power2.inOut' })
        .from('[data-line]', { yPercent: 110, duration: 1, stagger: 0.1 }, 0.2)
        .from('[data-fade]', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.8)

      // Parallax leve da foto de fundo.
      gsap.to('[data-hero-bg]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="topo"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-turf text-line"
    >
      <div data-hero-bg className="absolute inset-0 -z-20 scale-110">
        <PhotoSlot src={site.heroPhoto} alt="Quadra da Escola de Futebol LJ" label="hero (foto ou vídeo da quadra)" priority />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-turf via-turf/60 to-turf/20" />

      <PitchLines className="pointer-events-none absolute -right-[20vmin] top-1/2 -z-10 h-[110vmin] w-[110vmin] -translate-y-1/2 stroke-line/35 [stroke-dasharray:1] [stroke-width:2]" />

      <div className="container-lj pb-14 pt-32 md:pb-20">
        <h1 className="display text-[clamp(4.5rem,17vw,14rem)]">
          {headline.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-fade className="max-w-md text-lg text-line/85 md:text-xl">
            Escola de futebol e locação de quadras em {site.city}.
          </p>
          <div data-fade className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reservas" variant="card">
              Reservar uma quadra
            </ButtonLink>
            <ButtonLink href="#sobre" variant="outline-light">
              Conheça a LJ
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
