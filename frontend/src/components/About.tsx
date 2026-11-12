import { site } from '../data/site'
import { Pending } from './Pending'
import { PhotoSlot } from './PhotoSlot'

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-36">
      <div className="container-lj grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 className="display text-[clamp(3rem,8vw,7rem)]">
            Uma escola de futebol em São Carlos
          </h2>
          <div className="mt-10 max-w-[60ch] text-lg leading-relaxed text-ink/80">
            {site.about ? (
              site.about.split('\n\n').map((p) => <p key={p.slice(0, 24)} className="mb-5">{p}</p>)
            ) : (
              <Pending what="história, proposta e trajetória da LJ" />
            )}
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-lg lg:col-span-5 lg:mt-24">
          <PhotoSlot src={site.aboutPhoto} alt="Treino na Escola de Futebol LJ" label="treino ou equipe da LJ" />
        </div>
      </div>
    </section>
  )
}
