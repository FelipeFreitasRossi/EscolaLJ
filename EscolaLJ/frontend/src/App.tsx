import { useEffect, useState } from 'react'
import { api } from './services/api'
import type { HealthResponse } from './types/api'

// Tela provisória: só confirma que frontend e backend estão conversando.
// A landing page de verdade começa na Fase 4.

const dbLabel: Record<HealthResponse['database'], string> = {
  connected: 'Conectado',
  not_configured: 'Ainda não configurado',
  error: 'Erro de conexão',
}

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.health().then(setHealth).catch((e: Error) => setError(e.message))
  }, [])

  return (
    <main className="min-h-dvh bg-ink text-chalk flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-chalk/50">Ambiente de desenvolvimento</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight">
          Escola LJ
        </h1>

        <dl className="mt-10 divide-y divide-chalk/10 border-y border-chalk/10 text-sm">
          <Row label="Frontend (React + Vite)" value="Rodando" ok />
          <Row
            label="Backend (FastAPI)"
            value={error ? 'Sem resposta' : health ? 'Rodando' : 'Verificando…'}
            ok={!!health}
            fail={!!error}
          />
          <Row
            label="Banco (MongoDB Atlas)"
            value={health ? dbLabel[health.database] : '—'}
            ok={health?.database === 'connected'}
            fail={health?.database === 'error'}
          />
        </dl>

        {error && (
          <p className="mt-6 text-sm text-red-400">
            O backend não respondeu. Confira se o segundo terminal está rodando
            <code className="mx-1 rounded bg-chalk/10 px-1.5 py-0.5">uvicorn app.main:app --reload</code>.
          </p>
        )}
      </div>
    </main>
  )
}

function Row({ label, value, ok, fail }: { label: string; value: string; ok?: boolean; fail?: boolean }) {
  const dot = fail ? 'bg-red-500' : ok ? 'bg-pitch' : 'bg-chalk/30'
  return (
    <div className="flex items-center justify-between py-4">
      <dt className="text-chalk/70">{label}</dt>
      <dd className="flex items-center gap-2 font-medium">
        <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
        {value}
      </dd>
    </div>
  )
}
