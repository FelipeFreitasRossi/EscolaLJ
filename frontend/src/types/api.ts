// Espelha o schema HealthResponse do backend (app/schemas/health.py).
export interface HealthResponse {
  status: 'ok'
  app: string
  environment: string
  database: 'connected' | 'not_configured' | 'error'
}
