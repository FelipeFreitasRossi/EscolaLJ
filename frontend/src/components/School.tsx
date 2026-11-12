import { site } from '../data/site'
import { Pending } from './Pending'

const columns = [
  { title: 'Categorias e idades', items: site.school.ageGroups, pending: 'faixas etárias atendidas' },
  { title: 'Treinamentos', items: site.school.training, pending: 'dias, horários e formato dos treinos' },
  { title: 'Diferenciais', items: site.school.highlights, pending: 'diferenciais da escola' },
]

export function School() {
  return (
    <section id="escola" className="mown-grass py-24 text-line md:py-36">
      <div className="container-lj">
        <h2 className="display max-w-4xl text-[clamp(3rem,8vw,7rem)]">Escola de futebol</h2>
        <p className="mt-6 max-w-xl text-lg text-line/80">
          Formação esportiva para quem quer aprender, evoluir e jogar em equipe.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {columns.map((col) => (
            <div key={col.title} className="border-t-2 border-line/80 pt-6">
              <h3 className="display text-4xl">{col.title}</h3>
              {col.items ? (
                <ul className="mt-5 space-y-2 text-lg text-line/85">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5">
                  <Pending tone="dark" what={col.pending} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
