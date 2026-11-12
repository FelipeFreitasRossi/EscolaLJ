import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import { PageHeader, SectionTitle } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { Picture } from '../components/ui/Picture'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

const topics = [
  { title: 'História', text: site.about.history, pending: 'quando e como a escola começou' },
  { title: 'Objetivos', text: site.about.goals, pending: 'objetivos da escola com os alunos' },
  { title: 'Metodologia', text: site.about.methodology, pending: 'como os treinos são organizados' },
]

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null)
  useScrollFx(root)
  usePageMeta('Sobre', 'Conheça a Escola de Futebol LJ, de São Carlos/SP.')

  return (
    <div ref={root}>
      <PageHeader
        title={['Sobre', 'a LJ']}
        image="trainingCones"
        intro={`A ${site.name} é uma escola de futebol de ${site.city}, com unidades nos bairros ${site.units.map((u) => u.name).join(' e ')}.`}
      />

      {/* História, objetivos e metodologia: linhas editoriais com título à esquerda */}
      <section className="section bg-paper text-ink">
        <div className="container-lj">
          {topics.map((t) => (
            <div key={t.title} data-reveal="up" className="grid gap-6 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
              <h2 className="display text-5xl md:col-span-4 md:text-6xl">{t.title}</h2>
              <div className="max-w-[62ch] text-lg leading-relaxed text-ink/75 md:col-span-8">
                {t.text ? <p>{t.text}</p> : <Pending tone="light" what={t.pending} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais em fundo escuro com foto vertical */}
      <section className="section grain bg-night relative">
        <div className="container-lj relative z-[2] grid items-center gap-12 lg:grid-cols-12">
          <div data-reveal="clip" className="lg:col-span-5">
            <Picture image="goalNet" parallax className="clip-slant aspect-[4/5]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionTitle>{['Diferenciais']}</SectionTitle>
            {site.about.highlights ? (
              <ul className="mt-10 space-y-4">
                {site.about.highlights.map((h) => (
                  <li key={h} data-reveal="up" className="flex gap-4 border-b border-graphite-2 pb-4 text-xl">
                    <span className="bg-flame-grad mt-2 h-2.5 w-2.5 shrink-0 skew-x-[-10deg]" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending what="o que diferencia a LJ de outras escolas" className="mt-10" />
            )}
          </div>
        </div>
      </section>

      {/* Estrutura: leva para a página de quadras */}
      <section className="section bg-ink">
        <div className="container-lj grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionTitle>{['Estrutura']}</SectionTitle>
            <p data-reveal="up" className="mt-6 max-w-[52ch] text-lg text-paper/75">
              Conheça as unidades {site.units.map((u) => u.name).join(' e ')} e veja como reservar um horário.
            </p>
          </div>
          <div data-reveal="up" className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button to="/quadras" arrow>
              Ver quadras
            </Button>
            <Button to="/galeria" variant="outline">
              Ver galeria
            </Button>
          </div>
        </div>
        <div className="container-lj mt-14 grid grid-cols-2 gap-3 md:gap-5">
          <div data-reveal="clip"><Picture image="courtSociety" className="aspect-[4/3] rounded-[var(--radius-lg)]" /></div>
          <div data-reveal="clip" className="md:mt-16"><Picture image="courtIndoor" className="aspect-[4/3] rounded-[var(--radius-lg)]" /></div>
        </div>
      </section>
    </div>
  )
}
