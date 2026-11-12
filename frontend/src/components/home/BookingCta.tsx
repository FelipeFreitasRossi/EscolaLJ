import { Button } from '../ui/Button'
import { Picture } from '../ui/Picture'

// Os passos são o fluxo real que o sistema de reservas segue.
const steps = ['Escolha a quadra e a data', 'Veja os horários livres e o preço', 'Confirme e pague online ou na unidade']

/** Chamada para reserva: bloco em gradiente com borda superior inclinada e a bola "saindo" da caixa. */
export function BookingCta() {
  return (
    <section className="relative overflow-hidden bg-ink pt-10">
      <div className="bg-flame-grad relative text-ink [clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)]">
        <div className="container-lj grid items-center gap-10 pt-24 pb-20 lg:grid-cols-12 lg:pt-32 lg:pb-28">
          <div className="lg:col-span-7">
            <h2 data-reveal="lines" className="display text-[clamp(4rem,13vw,10rem)]">
              <span className="block overflow-hidden pb-[0.05em]"><span className="block">Reserve</span></span>
              <span className="block overflow-hidden pb-[0.05em]"><span className="block">sua quadra</span></span>
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s} data-reveal="up" className="border-t-2 border-ink/80 pt-4">
                  <span className="display text-4xl">{i + 1}</span>
                  <p className="mt-1 font-medium text-ink/80">{s}</p>
                </li>
              ))}
            </ol>
            <div data-reveal="up" className="mt-10">
              <Button to="/reservas" variant="dark" arrow>
                Ir para reservas
              </Button>
            </div>
          </div>
          <div data-reveal="up" className="lg:col-span-5">
            <Picture
              image="ballSpeed"
              className="mx-auto aspect-[4/5] max-w-md rotate-3 rounded-[var(--radius-lg)] shadow-[var(--shadow-deep)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
