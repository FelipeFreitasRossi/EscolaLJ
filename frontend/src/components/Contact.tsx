import { site } from '../data/site'
import { Pending } from './Pending'

const channels = [
  { label: 'WhatsApp', href: site.links.whatsapp },
  { label: 'Instagram', href: site.links.instagram },
  { label: 'Facebook', href: site.links.facebook },
  { label: 'Todos os links', href: site.links.linktree },
  { label: 'Site atual', href: site.links.website },
]

const mapQuery = encodeURIComponent(`${site.name}, ${site.city}`)

export function Contact() {
  return (
    <section id="contato" className="py-24 md:py-36">
      <div className="container-lj grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 className="display text-[clamp(3rem,8vw,7rem)]">Contato</h2>

          <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {channels.map((c) => (
              <li key={c.label} className="flex min-h-16 items-center justify-between gap-4 py-3">
                <span className="text-lg font-semibold">{c.label}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-ink px-4 py-1.5 font-medium transition-colors hover:bg-ink hover:text-line"
                  >
                    Abrir
                  </a>
                ) : (
                  <span className="text-sm text-ink/50">Aguardando link oficial</span>
                )}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-xl font-semibold">Endereços</h3>
          <ul className="mt-4 space-y-4">
            {site.units.map((u) => (
              <li key={u.id}>
                <p className="font-medium">Unidade {u.name}</p>
                {u.address ? <p className="text-ink/70">{u.address}</p> : <Pending what="endereço completo" />}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-h-[420px] overflow-hidden rounded-lg bg-turf lg:col-span-7">
          <iframe
            title={`Mapa: ${site.name}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
