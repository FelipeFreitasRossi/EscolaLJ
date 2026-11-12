import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../../lib/gsap'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Picture } from '../ui/Picture'

const headline = ['O jogo', 'começa', 'aqui.']

export function HomeHero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)
    mm.add(MOTION_OK, () => {
      // Abertura cinematográfica: a foto "acende" e aproxima, as linhas de
      // velocidade descem, o título sobe linha a linha e o resto aparece em sequência.
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('[data-hero-img]', { scale: 1.35, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 2.2, ease: 'power3.out' })
        .from('[data-hero-bar]', { scaleY: 0, transformOrigin: 'top', duration: 1.2, stagger: 0.08 }, 0.3)
        .from('[data-hero-line]', { yPercent: 115, duration: 1.2, stagger: 0.1 }, 0.45)
        .from('[data-hero-fade]', { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, 1.0)

      // Durante o scroll: a foto desce mais devagar e o título se afasta.
      gsap.to('[data-hero-img]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-title]', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="grain relative flex min-h-[640px] flex-col justify-end overflow-hidden bg-ink h-svh">
      <div data-hero-img className="absolute inset-0 z-0 scale-110">
        <Picture image="heroStadium" priority className="h-full w-full" hideBadge />
      </div>
      {/* camadas de luz e sombra para dar profundidade e legibilidade */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute -right-40 -top-40 z-0 h-[600px] w-[600px] rounded-full bg-flame/25 blur-[140px]" />

      {/* linhas de velocidade inclinadas, como o escudo */}
      <div aria-hidden="true" className="absolute inset-y-0 right-[12%] z-[1] hidden gap-4 md:flex">
        <span data-hero-bar className="bg-flame-grad h-full w-2 skew-x-[-10deg]" />
        <span data-hero-bar className="h-full w-0.5 skew-x-[-10deg] bg-paper/40" />
        <span data-hero-bar className="h-full w-0.5 skew-x-[-10deg] bg-paper/15" />
      </div>

      <div className="container-lj relative z-[2] pb-12 md:pb-16">
        <h1 data-hero-title className="display text-[clamp(4.6rem,18vw,15.5rem)]">
          {headline.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-md text-lg text-paper/80 md:text-xl">
            Escola de futebol e locação de quadras em {site.city}.
          </p>
          <div data-hero-fade className="flex flex-col gap-3 sm:flex-row">
            <Button to="/reservas" arrow>
              Reservar uma quadra
            </Button>
            <Button to="/sobre" variant="outline">
              Conheça a LJ
            </Button>
          </div>
        </div>

        <div data-hero-fade className="mt-10 flex items-center justify-between border-t border-paper/15 pt-5 text-sm text-paper/55">
          <span>Imagem ilustrativa</span>
          <span className="flex items-center gap-3">
            Role para descobrir
            <span className="relative block h-8 w-px overflow-hidden bg-paper/20">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-flame" />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
