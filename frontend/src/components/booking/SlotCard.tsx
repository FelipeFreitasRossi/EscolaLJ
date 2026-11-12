import type { ReactNode } from 'react'
import type { SlotStatus } from '../../types/booking'

export const slotLabels: Record<SlotStatus, string> = {
  available: 'Disponível',
  selected: 'Selecionado',
  booked: 'Ocupado',
  blocked: 'Indisponível',
  pending_payment: 'Aguardando pagamento',
  confirmed: 'Confirmado',
}

const styles: Record<SlotStatus, string> = {
  available: 'border-paper/20 bg-graphite hover:-translate-y-0.5 hover:border-flame/70 cursor-pointer',
  selected: 'border-transparent bg-flame-grad text-ink shadow-[0_12px_30px_-12px_rgb(255_106_19/0.9)] -translate-y-0.5',
  booked: 'border-graphite-2 bg-carbon text-paper/35 line-through decoration-paper/30',
  blocked: 'border-dashed border-graphite-2 bg-transparent text-paper/30 [background-image:repeating-linear-gradient(-45deg,transparent_0_8px,rgb(255_255_255/0.04)_8px_16px)]',
  pending_payment: 'border-amber/50 bg-amber/10 text-amber',
  confirmed: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
}

const dots: Record<SlotStatus, string> = {
  available: 'bg-paper/60',
  selected: 'bg-ink',
  booked: 'bg-paper/25',
  blocked: 'bg-transparent border border-paper/30',
  pending_payment: 'bg-amber animate-pulse',
  confirmed: 'bg-emerald-400',
}

interface SlotCardProps {
  status: SlotStatus
  title: ReactNode
  detail?: ReactNode
  onClick?: () => void
}

/** Card de horário. O mesmo componente vai mostrar os horários reais vindos da API. */
export function SlotCard({ status, title, detail, onClick }: SlotCardProps) {
  const interactive = Boolean(onClick) && (status === 'available' || status === 'selected')
  const cls = `flex w-full flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all duration-300 ease-[var(--ease-out-expo)] ${styles[status]}`
  const content = (
    <>
      <span className="flex items-center gap-2 text-xs font-semibold">
        <span className={`h-2 w-2 rounded-full ${dots[status]}`} />
        {slotLabels[status]}
      </span>
      <span className="font-display text-2xl font-extrabold uppercase">{title}</span>
      {detail && <span className="text-sm opacity-80">{detail}</span>}
    </>
  )
  if (interactive) {
    return (
      <button type="button" onClick={onClick} aria-pressed={status === 'selected'} className={cls}>
        {content}
      </button>
    )
  }
  return <div className={cls}>{content}</div>
}
