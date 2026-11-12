interface PendingProps {
  /** O que falta a LJ enviar, em linguagem simples. */
  what: string
  tone?: 'dark' | 'light'
  className?: string
}

/** Marca, de forma visível, um conteúdo que ainda não foi confirmado pela LJ. */
export function Pending({ what, tone = 'dark', className = '' }: PendingProps) {
  const colors = tone === 'dark' ? 'border-paper/20 text-steel' : 'border-ink/20 text-ink/55'
  return (
    <p className={`flex items-start gap-2.5 rounded-xl border border-dashed px-4 py-3 text-sm ${colors} ${className}`}>
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden="true" />
      <span>Aguardando informação oficial da LJ: {what}.</span>
    </p>
  )
}
