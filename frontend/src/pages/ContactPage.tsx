import { useRef, useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { IconArrow, IconPin } from '../components/ui/Icons'
import { PageHeader, SectionTitle } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { site, whatsappLink } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

export function ContactPage() {
  const root = useRef<HTMLDivElement>(null)
  useScrollFx(root)
  usePageMeta('Contato', 'Fale com a Escola de Futebol LJ: WhatsApp, redes sociais e endereços.')

  const channels = [
    { label: 'WhatsApp', href: whatsappLink(), note: 'Resposta pela equipe da LJ' },
    { label: 'Instagram', href: site.links.instagram, note: 'Fotos e novidades' },
    { label: 'Facebook', href: site.links.facebook, note: 'Eventos e avisos' },
    { label: 'Todos os links', href: site.links.linktree, note: 'Linktree oficial' },
  ]

  return (
    <div ref={root}>
      <PageHeader title={['Fale com', 'a LJ']} intro="Tire dúvidas sobre a escola, horários das turmas ou locação de quadras." />

      <section className="bg-ink pb-[var(--space-section)]">
        <div className="container-lj grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) =>
            c.href ? (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal="up"
                className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-graphite-2 bg-graphite p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-flame/60"
              >
                <span className="bg-flame-grad absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <p className="display text-4xl">{c.label}</p>
                <p className="mt-2 text-steel">{c.note}</p>
                <IconArrow className="mt-6 h-5 w-5 -rotate-45 text-flame transition-transform duration-500 group-hover:rotate-0" />
              </a>
            ) : (
              <div key={c.label} data-reveal="up" className="rounded-[var(--radius-lg)] border border-dashed border-graphite-2 p-6">
                <p className="display text-4xl text-paper/50">{c.label}</p>
                <p className="mt-2 text-sm text-steel">Aguardando link oficial da LJ.</p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="section bg-carbon">
        <div className="container-lj grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle>{['Mande uma', 'mensagem']}</SectionTitle>
            <p data-reveal="up" className="mt-6 text-paper/70">
              O formulário monta a mensagem e abre o WhatsApp da LJ. Seus dados não ficam salvos no site.
            </p>
          </div>
          <div data-reveal="up" className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="container-lj">
          <SectionTitle>{['Endereços']}</SectionTitle>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {site.units.map((u) => (
              <article key={u.id} data-reveal="up" className="overflow-hidden rounded-[var(--radius-lg)] border border-graphite-2 bg-graphite">
                <iframe
                  title={`Mapa da unidade ${u.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(u.mapsQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 grayscale-[0.6] invert-[0.9] hue-rotate-180"
                />
                <div className="p-6">
                  <p className="flex items-center gap-2 text-steel"><IconPin className="h-4 w-4 text-flame" /> Unidade</p>
                  <h3 className="display mt-2 text-5xl">{u.name}</h3>
                  {u.address ? <p className="mt-3 text-lg">{u.address}</p> : <Pending what="endereço completo" className="mt-4" />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

type Field = 'name' | 'topic' | 'message'
const topics = ['Escola de futebol', 'Locação de quadra', 'Outro assunto']

function ContactForm() {
  const [values, setValues] = useState({ name: '', topic: topics[0], message: '' })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const errors: Partial<Record<Field, string>> = {}
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (values.message.trim().length < 10) errors.message = 'Escreva pelo menos 10 caracteres.'
  const available = Boolean(site.links.whatsappNumber)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, message: true })
    if (Object.keys(errors).length || !available) return
    const link = whatsappLink(`Olá! Sou ${values.name.trim()}.\nAssunto: ${values.topic}\n\n${values.message.trim()}`)
    if (link) window.open(link, '_blank', 'noopener')
  }

  const fieldCls = (f: Field) =>
    `w-full rounded-xl border bg-ink/60 px-4 py-3.5 text-paper outline-none transition-colors placeholder:text-steel focus:border-flame ${
      touched[f] && errors[f] ? 'border-red-400' : touched[f] ? 'border-emerald-400/60' : 'border-graphite-2'
    }`

  return (
    <form noValidate onSubmit={submit} className="grid gap-5">
      <label className="grid gap-2">
        <span className="font-semibold">Nome</span>
        <input
          className={fieldCls('name')}
          value={values.name}
          autoComplete="name"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          onBlur={() => setTouched({ ...touched, name: true })}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby="erro-nome"
        />
        {touched.name && errors.name && <span id="erro-nome" className="text-sm text-red-400">{errors.name}</span>}
      </label>

      <fieldset className="grid gap-2">
        <legend className="mb-2 font-semibold">Assunto</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${values.topic === t ? 'border-flame bg-flame/15 text-paper' : 'border-graphite-2 text-paper/70 hover:border-paper/40'}`}>
              <input type="radio" name="topic" value={t} checked={values.topic === t} onChange={() => setValues({ ...values, topic: t })} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="font-semibold">Mensagem</span>
        <textarea
          rows={5}
          className={`${fieldCls('message')} resize-y`}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          onBlur={() => setTouched({ ...touched, message: true })}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby="erro-mensagem"
        />
        {touched.message && errors.message && <span id="erro-mensagem" className="text-sm text-red-400">{errors.message}</span>}
      </label>

      {available ? (
        <button type="submit" className="bg-flame-grad inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-semibold text-ink transition-transform active:scale-[0.97] sm:justify-self-start">
          Enviar pelo WhatsApp <IconArrow className="h-4 w-4" />
        </button>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-graphite-2 px-7 font-semibold text-steel">
            Enviar pelo WhatsApp
          </button>
          <p className="text-sm text-steel">Disponível assim que o número oficial for cadastrado.</p>
        </div>
      )}
      {!available && (
        <Button to={site.links.linktree} variant="outline" className="sm:justify-self-start">
          Ver contatos da LJ
        </Button>
      )}
    </form>
  )
}
