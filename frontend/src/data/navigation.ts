import type { ComponentType, SVGProps } from 'react'
import { IconCalendar, IconChat, IconCourt, IconHome, IconShield } from '../components/ui/Icons'

export interface NavItem {
  to: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Links do header no desktop. */
export const desktopNav = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/quadras', label: 'Quadras' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/contato', label: 'Contato' },
]

/** Itens da barra inferior no celular (Reservas fica no centro, em destaque). */
export const mobileNav: NavItem[] = [
  { to: '/', label: 'Início', icon: IconHome },
  { to: '/sobre', label: 'Sobre', icon: IconShield },
  { to: '/reservas', label: 'Reservar', icon: IconCalendar },
  { to: '/quadras', label: 'Quadras', icon: IconCourt },
  { to: '/contato', label: 'Contato', icon: IconChat },
]

export const footerNav = [
  ...desktopNav,
  { to: '/reservas', label: 'Reservas' },
  { to: '/perguntas-frequentes', label: 'Perguntas frequentes' },
  { to: '/privacidade', label: 'Política de privacidade' },
]
