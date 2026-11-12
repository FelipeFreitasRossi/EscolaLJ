import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { HealthResponse } from '../types/api'

/** Indicador que só aparece em desenvolvimento: mostra se a API e o banco respondem. */
export function DevStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    api.health().then(setHealth).catch(() => setFailed(true))
  }, [])

  const apiDot = failed ? 'bg-red-500' : health ? 'bg-green-500' : 'bg-gray-400'
  const dbDot = health?.database === 'connected' ? 'bg-green-500' : health?.database === 'error' ? 'bg-red-500' : 'bg-gray-400'

  return (
    <div className="fixed bottom-[var(--tabbar-space)] left-3 z-[60] lg:bottom-3 flex gap-3 rounded-full bg-ink/85 px-3 py-1.5 text-xs text-paper">
      <span className="flex items-center gap-1.5"><i className={`h-2 w-2 rounded-full ${apiDot}`} />API</span>
      <span className="flex items-center gap-1.5"><i className={`h-2 w-2 rounded-full ${dbDot}`} />Banco</span>
    </div>
  )
}
