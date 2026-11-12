import { useRef } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { Pending } from '../components/ui/Pending'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useScrollFx } from '../hooks/useScrollFx'

// Rascunho baseado na LGPD (Lei 13.709/2018). Antes de publicar, a LJ deve revisar
// com um profissional jurídico e informar o contato do responsável pelos dados.
const sections = [
  {
    title: 'Quais dados coletamos',
    body: 'Para registrar uma reserva, pedimos nome, telefone e, se você quiser, e-mail. Também registramos a quadra, a data, o horário, o valor e o estado do pagamento. Dados de cartão não passam pelo nosso sistema: eles são tratados diretamente pelo provedor de pagamento.',
  },
  {
    title: 'Para que usamos',
    body: 'Usamos os dados apenas para registrar e confirmar sua reserva, falar com você sobre ela e cumprir obrigações legais. Não vendemos nem compartilhamos seus dados para publicidade.',
  },
  {
    title: 'Crianças e adolescentes',
    body: 'A escola atende menores de idade. Dados e imagens de crianças e adolescentes só são tratados com o consentimento de um dos pais ou responsável legal, e sempre no melhor interesse do menor.',
  },
  {
    title: 'Por quanto tempo guardamos',
    body: 'Guardamos os dados pelo tempo necessário para a finalidade da reserva e para cumprir obrigações legais. Depois disso, eles são excluídos ou anonimizados.',
  },
  {
    title: 'Seus direitos',
    body: 'Você pode pedir acesso, correção ou exclusão dos seus dados, além de informações sobre como eles são usados, entrando em contato com a LJ.',
  },
]

export function PrivacyPage() {
  const root = useRef<HTMLDivElement>(null)
  useScrollFx(root)
  usePageMeta('Política de privacidade', `Como a ${site.name} trata os dados pessoais.`)

  return (
    <div ref={root}>
      <PageHeader title={['Privacidade']} intro={`Como a ${site.name} trata seus dados pessoais, de acordo com a Lei Geral de Proteção de Dados (LGPD).`}>
        <Pending what="revisão jurídica deste texto e contato do responsável pelos dados" />
      </PageHeader>
      <section className="bg-paper py-[var(--space-section)] text-ink">
        <div className="container-lj max-w-3xl">
          {sections.map((s) => (
            <article key={s.title} data-reveal="up" className="border-t border-ink/15 py-8">
              <h2 className="display text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/75">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
