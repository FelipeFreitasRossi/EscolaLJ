import { useEffect, useRef, useState } from 'react'
import { SlotCard } from '../components/booking/SlotCard'
import { Button } from '../components/ui/Button'
import { PageHeader, SectionTitle } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { primaryContactLink, site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'
import { api, ApiError } from '../services/api'
import type { Court, SlotStatus } from '../types/booking'

const flow = [
  'Selecione a quadra',
  'Escolha a data',
  'Veja os horários livres',
  'Escolha um horário',
  'Informe seus dados',
  'Escolha como pagar',
  'Confirme',
]

const legend: { status: SlotStatus; detail: string }[] = [
  { status: 'available', detail: 'Pode ser escolhido' },
  { status: 'selected', detail: 'Sua escolha atual' },
  { status: 'booked', detail: 'Já reservado por alguém' },
  { status: 'blocked', detail: 'Fechado pela administração' },
  { status: 'pending_payment', detail: 'Reservado, pagamento em aberto' },
  { status: 'confirmed', detail: 'Pagamento recebido' },
]

type SystemState = { kind: 'loading' } | { kind: 'offline' } | { kind: 'not_ready' } | { kind: 'ready'; courts: Court[] }

export function BookingPage() {
  const root = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<SystemState>({ kind: 'loading' })
  useScrollFx(root)
  usePageMeta('Reservas', 'Reserve uma quadra da Escola de Futebol LJ em São Carlos/SP.')

  // O estado mostrado vem do backend: nada de horários inventados.
  useEffect(() => {
    api
      .courts()
      .then((courts) => setState({ kind: 'ready', courts }))
      .catch((e: unknown) => setState(e instanceof ApiError && e.status === 404 ? { kind: 'not_ready' } : { kind: 'offline' }))
  }, [])

  return (
    <div ref={root}>
      <PageHeader title={['Reserve', 'sua quadra']} intro="Escolha a quadra, a data e o horário, e pague online ou na unidade. Sem precisar criar conta." />

      <section className="section bg-ink pt-0">
        <div className="container-lj">
          <div data-reveal="up" className="glass rounded-[var(--radius-lg)] p-6 md:p-10">
            <SystemStatus state={state} />
          </div>
        </div>
      </section>

      <section className="section bg-carbon">
        <div className="container-lj">
          <SectionTitle>{['Como funciona']}</SectionTitle>
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {flow.map((step, i) => (
              <li key={step} data-reveal="up" className="relative overflow-hidden rounded-2xl border border-graphite-2 bg-graphite p-5">
                <span className="display text-flame-grad text-5xl">{i + 1}</span>
                <p className="mt-3 font-semibold leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="container-lj grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle>{['Estados dos', 'horários']}</SectionTitle>
            <p data-reveal="up" className="mt-6 max-w-[44ch] text-lg text-paper/70">
              No calendário, cada horário mostra a situação real informada pelo sistema da LJ.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:col-span-7">
            {legend.map((l) => (
              <div key={l.status} data-reveal="up">
                <SlotCard status={l.status} title={slotTitle(l.status)} detail={l.detail} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-carbon">
        <div className="container-lj">
          <SectionTitle>{['Pagamento']}</SectionTitle>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article data-reveal="up" className="rounded-[var(--radius-lg)] border border-graphite-2 bg-graphite p-7 md:p-10">
              <h3 className="display text-4xl">Online</h3>
              <p className="mt-3 text-paper/75">Pix ou cartão por um provedor de pagamento seguro. A reserva é confirmada automaticamente quando o pagamento é aprovado.</p>
              <p className="mt-6 inline-flex rounded-full border border-paper/20 px-3 py-1 text-sm text-steel">Em ativação</p>
            </article>
            <article data-reveal="up" className="rounded-[var(--radius-lg)] border border-graphite-2 bg-graphite p-7 md:p-10">
              <h3 className="display text-4xl">Na unidade</h3>
              <p className="mt-3 text-paper/75">Sua reserva fica registrada como aguardando pagamento até a equipe da LJ confirmar o recebimento.</p>
              {site.booking.inPersonPaymentDeadline ? (
                <p className="mt-6 text-paper/75">Prazo: {site.booking.inPersonPaymentDeadline}</p>
              ) : (
                <Pending what="prazo para pagamento na unidade" className="mt-6" />
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

function slotTitle(status: SlotStatus) {
  return { available: 'Livre', selected: 'Escolhido', booked: 'Ocupado', blocked: 'Fechado', pending_payment: 'Pendente', confirmed: 'Pago' }[status]
}

function SystemStatus({ state }: { state: SystemState }) {
  if (state.kind === 'loading') {
    return <p className="animate-pulse text-steel">Consultando as quadras disponíveis…</p>
  }
  if (state.kind === 'ready' && state.courts.length > 0) {
    // O fluxo completo (calendário, horários, dados e pagamento) entra na próxima etapa.
    return (
      <div>
        <h2 className="display text-4xl">Quadras disponíveis</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {state.courts.map((c) => (
            <li key={c.id} className="rounded-2xl border border-graphite-2 bg-graphite p-5 font-semibold">{c.name}</li>
          ))}
        </ul>
      </div>
    )
  }
  const message =
    state.kind === 'ready'
      ? 'Nenhuma quadra foi cadastrada ainda pela administração.'
      : state.kind === 'not_ready'
        ? 'A reserva direto pelo site está sendo implantada.'
        : 'Não foi possível consultar os horários agora.'
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="display text-4xl md:text-5xl">{message}</h2>
        <p className="mt-3 text-paper/70">Enquanto isso, fale com a equipe da LJ para reservar seu horário.</p>
      </div>
      <Button to={primaryContactLink} arrow className="shrink-0">
        Falar com a LJ
      </Button>
    </div>
  )
}
