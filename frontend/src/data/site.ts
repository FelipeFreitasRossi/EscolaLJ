import type { SiteContent } from '../types/site'

/**
 * TODO o conteúdo da LJ fica neste arquivo.
 *
 * Regra do projeto: nada aqui é inventado. Tudo que está como `null`
 * precisa ser enviado/confirmado pela LJ; o site mostra um aviso no lugar.
 * As imagens ficam em `data/images.ts`.
 */
export const site: SiteContent = {
  name: 'Escola de Futebol LJ',
  city: 'São Carlos/SP',

  links: {
    linktree: 'https://linktr.ee/escoladefutebollj',
    website: 'https://www.escoladefutebollj.com.br/',
    whatsappNumber: null, // só números, com DDI e DDD. Ex.: '5516999999999'
    instagram: null,
    facebook: null,
  },

  about: {
    history: null,
    goals: null,
    methodology: null,
    highlights: null,
  },

  // Referências públicas citam estes dois bairros. Ainda falta confirmar
  // endereços e quantas quadras existem em cada unidade.
  units: [
    {
      id: 'jardim-ipanema',
      name: 'Jardim Ipanema',
      address: null,
      mapsQuery: 'Escola de Futebol LJ Jardim Ipanema São Carlos SP',
      description: null,
      courts: null,
      features: null,
      image: 'courtSociety',
    },
    {
      id: 'jardim-embare',
      name: 'Jardim Embaré',
      address: null,
      mapsQuery: 'Escola de Futebol LJ Jardim Embaré São Carlos SP',
      description: null,
      courts: null,
      features: null,
      image: 'courtIndoor',
    },
  ],

  school: {
    ageGroups: null,
    schedule: null,
  },

  booking: {
    cancellationPolicy: null,
    inPersonPaymentDeadline: null,
  },

  gallery: [
    { id: 'g1', category: 'Quadras', image: 'heroStadium' },
    { id: 'g2', category: 'Equipamentos', image: 'ballSpeed' },
    { id: 'g3', category: 'Treinos', image: 'trainingCones' },
    { id: 'g4', category: 'Quadras', image: 'courtIndoor' },
    { id: 'g5', category: 'Equipamentos', image: 'goalNet' },
    { id: 'g6', category: 'Quadras', image: 'courtSociety' },
    { id: 'g7', category: 'Treinos', image: 'trainingBalls' },
  ],
}

export const whatsappLink = (text?: string) =>
  site.links.whatsappNumber
    ? `https://wa.me/${site.links.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null

/** Melhor link de contato disponível no momento. */
export const primaryContactLink = whatsappLink() ?? site.links.linktree
