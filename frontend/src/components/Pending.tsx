interface PendingProps {
  /** O que falta a LJ enviar, em linguagem simples. */
  what: string
  tone?: 'light' | 'dark'
}

/** Marca, de forma visível, um conteúdo que ainda não foi confirmado pela LJ. */
export function Pending({ what, tone = 'light' }: PendingProps) {
  const colors =
    tone === 'dark' ? 'border-line/30 text-line/60' : 'border-ink/25 text-ink/55'
  return (
    <p className={`inline-block rounded-md border border-dashed px-3 py-2 text-sm ${colors}`}>
      Aguardando informação oficial: {what}
    </p>
  )
}
