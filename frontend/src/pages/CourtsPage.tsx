import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { IconPin } from '../components/ui/Icons'
import { PageHeader } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { Picture } from '../components/ui/Picture'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

export function CourtsPage() {
  const root = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()
  useScrollFx(root)
  usePageMeta('Quadras', 'Unidades e quadras da Escola de Futebol LJ em São Carlos/SP.')

  // Vindo da Home com #jardim-ipanema, rola até a unidade certa depois da transição.
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 700)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <div ref={root}>
      <PageHeader
        title={['Nossas', 'quadras']}
        image="courtIndoor"
        intro="Veja onde ficam as unidades da LJ e escolha onde quer jogar."
      >
        <Pending what="quantas quadras existem em cada unidade e o tipo de cada uma" />
      </PageHeader>

      {site.units.map((unit, i) => (
        <section key={unit.id} id={unit.id} className={`section ${i % 2 ? 'bg-carbon' : 'bg-ink'}`}>
          <div className="container-lj grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div data-reveal="clip" className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <Picture image={unit.image} parallax className={`${i % 2 ? 'clip-slant-r' : 'clip-slant'} aspect-[16/11]`} />
            </div>

            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
              <p data-reveal="up" className="flex items-center gap-2 text-steel">
                <IconPin className="h-4 w-4 text-flame" /> Unidade
              </p>
              <h2 data-reveal="lines" className="display mt-3 text-[clamp(3.5rem,9vw,6.5rem)]">
                <span className="block overflow-hidden pb-[0.05em]"><span className="block">{unit.name}</span></span>
              </h2>

              <dl data-reveal="up" className="mt-8 divide-y divide-graphite-2 border-y border-graphite-2">
                <Row label="Endereço">{unit.address ?? <span className="text-steel">A confirmar</span>}</Row>
                <Row label="Quadras">{unit.courts ? unit.courts.join(', ') : <span className="text-steel">A confirmar</span>}</Row>
                <Row label="Estrutura">{unit.features ? unit.features.join(', ') : <span className="text-steel">A confirmar</span>}</Row>
                <Row label="Disponibilidade">Consulte os horários livres na página de reservas</Row>
              </dl>
              {unit.description && <p data-reveal="up" className="mt-6 text-lg text-paper/75">{unit.description}</p>}

              <div data-reveal="up" className="mt-8 flex flex-wrap gap-3">
                <Button to={`/reservas?unidade=${unit.id}`} arrow>
                  Reservar nesta unidade
                </Button>
                <Button to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.mapsQuery)}`} variant="outline">
                  Abrir no mapa
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-4 py-4">
      <dt className="text-steel">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  )
}
