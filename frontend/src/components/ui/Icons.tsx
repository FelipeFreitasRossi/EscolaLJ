import type { SVGProps } from 'react'

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const IconHome = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9v11h13V9" /><path d="M10 20v-6h4v6" /></svg>
)
export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 4h14v7c0 5-3.5 8-7 9.5C8.5 19 5 16 5 11V4Z" /><path d="M12 8v6" /><path d="M9 11h6" /></svg>
)
export const IconCourt = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M12 5v14" /><circle cx="12" cy="12" r="2.6" /><path d="M3 9.5h2.5v5H3M21 9.5h-2.5v5H21" /></svg>
)
export const IconCalendar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></svg>
)
export const IconChat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z" /></svg>
)
export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const IconPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
export const IconClose = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const IconPlus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
)
