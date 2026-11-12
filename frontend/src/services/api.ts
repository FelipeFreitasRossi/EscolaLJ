import type { HealthResponse } from '../types/api'
import type { Court } from '../types/booking'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`/api${path}`, init)
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor.')
  }
  if (!response.ok) {
    throw new ApiError(response.status, `Erro ${response.status} ao chamar ${path}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  health: () => request<HealthResponse>('/health'),
  courts: () => request<Court[]>('/courts'),
}
