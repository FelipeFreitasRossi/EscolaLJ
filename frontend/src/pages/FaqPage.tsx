import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { Button } from '../components/ui/Button'
import { IconPlus } from '../components/ui/Icons'
import { PageHeader } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

// Só entram respostas sobre como o site funciona ou informações confirmadas.
// O que depende de regra da LJ aparece como pendente.
const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'Preciso criar uma conta para reservar?',
    a: 'Não. Para reservar, você informa apenas os dados necessários para a LJ identificar a reserva e falar com você.',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Você pode pagar online (Pix ou cartão, quando o pagamento online estiver ativo) ou na unidade. No pagamento na unidade, a reserva fica aguardando pagamento até a equipe confirmar o recebimento.',
  },
  {
    q: 'Como sei se minha reserva está confirmada?',
    a: 'Cada reserva mostra seu estado: aguardando pagamento ou confirmada. Ela só aparece como confirmada depois que o pagamento é aprovado ou recebido pela equipe.',
  },
  {
    q: 'Posso cancelar ou remarcar uma reserva?',
    a: site.booking.cancellationPolicy ?? <Pending what="regras de cancelamento e remarcação" />,
  },
  {
    q: 'Quais idades a escola de futebol atende?',
    a: site.school.ageGroups ? site.school.ageGroups.join(', ') : <Pending what="faixas etárias das turmas" />,
  },
  {
    q: 'Onde ficam as unidades?',
    a: (
      <>
        A LJ tem unidades nos bairros {site.units.map((u) => u.name).join(' e ')}, em {site.city}.
        {site.units.some((u) => !u.address) && <Pending what="endereços completos" className="mt-4" />}
      </>
    ),
  },
]

export function FaqPage() {
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(0)
  useScrollFx(root)
  usePageMeta('Perguntas frequentes', 'Dúvidas sobre reservas, pagamento e a escola de futebol da LJ.')

  return (
    <div ref={root}>
      <PageHeader title={['Perguntas', 'frequentes']} />
      <section className="bg-ink pb-[var(--space-section)]">
        <div className="container-lj max-w-4xl">
          <ul className="border-t border-graphite-2">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} data-reveal="up" className="border-b border-graphite-2">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-semibold transition-colors hover:text-flame md:text-2xl"
                    >
                      {f.q}
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-45 border-transparent bg-flame text-ink' : 'border-paper/25'}`}>
                        <IconPlus className="h-5 w-5" />
                      </span>
                    </button>
                  </h2>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="max-w-[62ch] pb-7 text-lg text-paper/75">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
          <div data-reveal="up" className="mt-12 flex flex-wrap items-center gap-4">
            <p className="text-paper/70">Não encontrou sua dúvida?</p>
            <Button to="/contato" variant="outline" arrow>
              Fale com a LJ
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
