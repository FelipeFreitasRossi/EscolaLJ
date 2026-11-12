import type { HealthResponse } from '../types/api'

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`/api${path}`)
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao chamar ${path}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  health: () => request<HealthResponse>('/health'),
}
