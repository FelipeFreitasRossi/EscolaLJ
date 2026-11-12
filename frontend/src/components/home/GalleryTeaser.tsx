import { Link } from 'react-router-dom'
import { SectionTitle } from '../ui/PageHeader'
import { Picture } from '../ui/Picture'

/** Prévia da galeria em grid assimétrico (alturas e larguras diferentes). */
export function GalleryTeaser() {
  return (
    <section className="section bg-ink">
      <div className="container-lj">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle>{['Galeria']}</SectionTitle>
          <Link data-reveal="up" to="/galeria" className="link-grow self-start pb-1 text-lg font-semibold md:self-end">
            Abrir galeria
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          <div data-reveal="clip" className="col-span-2 md:col-span-7 md:row-span-2">
            <Picture image="courtIndoor" parallax className="h-full min-h-[260px] rounded-[var(--radius-lg)]" />
          </div>
          <div data-reveal="clip" className="md:col-span-5">
            <Picture image="courtSociety" className="aspect-[4/3] h-full rounded-[var(--radius-lg)]" />
          </div>
          <div data-reveal="clip" className="md:col-span-5">
            <Picture image="ballSpeed" className="aspect-[4/3] h-full rounded-[var(--radius-lg)]" imgClassName="object-[50%_55%]" />
          </div>
        </div>
      </div>
    </section>
  )
}
