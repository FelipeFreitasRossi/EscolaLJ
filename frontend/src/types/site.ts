import type { ImageKey } from '../data/images'

// "null" significa: informação ainda não confirmada pela LJ.
// A interface mostra um aviso "Aguardando informação oficial" no lugar.

export interface Unit {
  id: string
  name: string
  address: string | null
  mapsQuery: string
  description: string | null
  courts: string[] | null
  features: string[] | null
  image: ImageKey
}

export interface GalleryItem {
  id: string
  category: GalleryCategory
  image: ImageKey
}

export type GalleryCategory = 'Quadras' | 'Treinos' | 'Equipamentos'

export interface SiteContent {
  name: string
  city: string
  links: {
    linktree: string
    website: string
    whatsappNumber: string | null
    instagram: string | null
    facebook: string | null
  }
  about: {
    history: string | null
    goals: string | null
    methodology: string | null
    highlights: string[] | null
  }
  units: Unit[]
  school: {
    ageGroups: string[] | null
    schedule: string | null
  }
  booking: {
    cancellationPolicy: string | null
    inPersonPaymentDeadline: string | null
  }
  gallery: GalleryItem[]
}
