import { useRef } from 'react'
import { Activities } from '../components/home/Activities'
import { BookingCta } from '../components/home/BookingCta'
import { CourtsHighlight } from '../components/home/CourtsHighlight'
import { GalleryTeaser } from '../components/home/GalleryTeaser'
import { HomeHero } from '../components/home/HomeHero'
import { Intro } from '../components/home/Intro'
import { Ticker } from '../components/home/Ticker'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

// Depoimentos não entram enquanto não houver depoimentos reais de alunos/clientes.
export function HomePage() {
  const root = useRef<HTMLDivElement>(null)
  useScrollFx(root)
  usePageMeta('', 'Escola de futebol e locação de quadras em São Carlos/SP. Conheça as unidades da LJ e reserve sua quadra.')

  return (
    <div ref={root}>
      <HomeHero />
      <Ticker />
      <Intro />
      <CourtsHighlight />
      <Activities />
      <GalleryTeaser />
      <BookingCta />
    </div>
  )
}
