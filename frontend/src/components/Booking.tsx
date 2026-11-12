import { primaryContactLink } from '../data/site'
import { ButtonLink } from './ButtonLink'

// Os passos são o fluxo real que o sistema de reservas (Fase 6) vai seguir.
const steps = [
  { title: 'Escolha a quadra', text: 'Selecione a unidade e a quadra que você quer.' },
  { title: 'Veja os horários', text: 'Confira os horários livres e o preço de cada um.' },
  { title: 'Confirme', text: 'Informe seus dados e pague online ou na unidade.' },
]

export function Booking() {
  return (
    <section id="reservas" className="bg-card py-24 text-ink md:py-36">
      <div className="container-lj">
        <h2 className="display text-[clamp(3.5rem,12vw,11rem)]">
          Reserve
          <br />
          sua quadra
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-5">
              <span className="font-display text-5xl font-black" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-1 text-ink/75">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={primaryContactLink} variant="ink">
            Falar com a LJ para reservar
          </ButtonLink>
          <p className="text-ink/70">A reserva direto pelo site está chegando.</p>
        </div>
      </div>
    </section>
  )
}
