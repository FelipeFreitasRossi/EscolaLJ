import { Button } from '../ui/Button'
import { SectionTitle } from '../ui/PageHeader'
import { Pending } from '../ui/Pending'
import { Picture } from '../ui/Picture'

/** Modalidades: dois painéis de tamanhos diferentes (7/5), cada um com sua foto. */
export function Activities() {
  return (
    <section className="section bg-carbon">
      <div className="container-lj">
        <SectionTitle>{['Modalidades']}</SectionTitle>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <article data-reveal="up" className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-graphite lg:col-span-7">
            <Picture image="trainingCones" parallax className="aspect-[16/10]" />
            <div className="p-6 md:p-10">
              <h3 className="display text-5xl md:text-6xl">Escola de futebol</h3>
              <p className="mt-4 max-w-[52ch] text-lg text-paper/75">
                Formação esportiva com treinos orientados para crianças e jovens.
              </p>
              <Pending what="faixas etárias, dias e horários das turmas" className="mt-6" />
            </div>
          </article>

          <article
            data-reveal="up"
            className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-flame-grad text-ink lg:col-span-5"
          >
            <div className="p-6 md:p-10">
              <h3 className="display text-5xl md:text-6xl">Locação de quadras</h3>
              <p className="mt-4 max-w-[40ch] text-lg text-ink/80">
                Reserve um horário para jogar com seus amigos, seu time ou sua empresa.
              </p>
              <Button to="/reservas" variant="dark" arrow className="mt-8">
                Ver como reservar
              </Button>
            </div>
            <Picture image="goalNet" className="clip-slant mt-auto aspect-[4/3] lg:aspect-auto lg:flex-1" />
          </article>
        </div>
      </div>
    </section>
  )
}
