import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { SectionTitle } from '../ui/PageHeader'
import { Pending } from '../ui/Pending'
import { Picture } from '../ui/Picture'

/** Apresentação da LJ — seção clara, composição assimétrica com foto larga sobreposta. */
export function Intro() {
  return (
    <section className="section relative overflow-hidden bg-paper text-ink">
      {/* círculo central do campo, como marca d'água */}
      <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute -left-40 top-10 h-[620px] w-[620px] text-ink/[0.05]">
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="200" cy="200" r="6" fill="currentColor" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div className="container-lj relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionTitle>{['Futebol para', 'aprender, treinar', 'e jogar.']}</SectionTitle>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-5">
          <div data-reveal="up" className="text-lg leading-relaxed text-ink/75">
            {site.about.history ? <p>{site.about.history}</p> : <Pending tone="light" what="apresentação e história da escola" />}
          </div>
          <div data-reveal="up">
            <Button to="/sobre" variant="dark" arrow>
              Conheça a LJ
            </Button>
          </div>
        </div>
      </div>

      <div className="container-lj relative mt-16 md:mt-24">
        <div data-reveal="clip" className="relative">
          <Picture image="trainingBalls" parallax className="clip-slant-r aspect-[16/10] md:aspect-[21/9]" />
        </div>
      </div>
    </section>
  )
}
