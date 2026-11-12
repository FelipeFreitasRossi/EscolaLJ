import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { site } from '../data/site'
import { ButtonLink } from './ButtonLink'
import { Pending } from './Pending'
import { PhotoSlot } from './PhotoSlot'

export function Units() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)
    mm.add(MOTION_OK, () => {
      // Cada foto "abre" de baixo para cima quando entra na tela.
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="estrutura" className="bg-ink py-24 text-line md:py-36">
      <div className="container-lj">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,8vw,7rem)]">Unidades</h2>
          <Pending tone="dark" what="endereços e quantidade de quadras em cada unidade" />
        </div>

        <ul className="mt-16 flex flex-col gap-20 md:gap-28">
          {site.units.map((unit, i) => (
            <li key={unit.id} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
              <div
                data-reveal
                className={`aspect-[16/10] overflow-hidden rounded-lg lg:col-span-8 ${i % 2 ? 'lg:order-2 lg:col-start-5 lg:row-start-1' : ''}`}
              >
                <PhotoSlot src={unit.photo} alt={`Unidade ${unit.name}`} label={`unidade ${unit.name}`} />
              </div>

              <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}>
                <h3 className="display text-6xl md:text-7xl">{unit.name}</h3>
                <div className="mt-5 space-y-4 text-line/75">
                  {unit.address ? <p className="text-lg">{unit.address}</p> : <Pending tone="dark" what="endereço" />}
                  {unit.description && <p>{unit.description}</p>}
                </div>
                <ButtonLink href="#reservas" variant="outline-light" className="mt-8">
                  Consultar disponibilidade
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
