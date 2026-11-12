/** Estados de um horário, exatamente como o backend vai devolver. */
export type SlotStatus = 'available' | 'selected' | 'booked' | 'blocked' | 'pending_payment' | 'confirmed'

export interface Court {
  id: string
  name: string
  unit_id: string
}
