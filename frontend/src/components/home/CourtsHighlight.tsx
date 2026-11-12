import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { IconArrow, IconPin } from '../ui/Icons'
import { SectionTitle } from '../ui/PageHeader'
import { Picture } from '../ui/Picture'

/** Destaque das unidades: dois cards altos, o segundo deslocado para baixo (composição em degrau). */
export function CourtsHighlight() {
  return (
    <section className="section grain relative bg-ink">
      <div className="container-lj relative z-[2]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle>{['Onde a', 'bola rola']}</SectionTitle>
          <Link data-reveal="up" to="/quadras" className="link-grow self-start pb-1 text-lg font-semibold md:self-end">
            Ver todas as quadras
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-10">
          {site.units.map((unit, i) => (
            <Link
              key={unit.id}
              to={`/quadras#${unit.id}`}
              data-reveal="up"
              className={`group relative block overflow-hidden rounded-[var(--radius-lg)] ${i % 2 ? 'md:mt-28' : ''}`}
            >
              <Picture
                image={unit.image}
                className="aspect-[4/5]"
                imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="flex items-center gap-1.5 text-sm text-paper/70">
                    <IconPin className="h-4 w-4 text-flame" /> Unidade
                  </p>
                  <h3 className="display mt-2 text-5xl md:text-7xl">{unit.name}</h3>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-paper/30 transition-all duration-500 group-hover:border-transparent group-hover:bg-flame group-hover:text-ink">
                  <IconArrow className="h-5 w-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
