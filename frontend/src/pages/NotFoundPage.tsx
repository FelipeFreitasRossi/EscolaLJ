import { LogoSymbol } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Página não encontrada')
  return (
    <section className="grain bg-night relative flex min-h-[80svh] items-center pt-24">
      <div className="container-lj relative z-[2]">
        <LogoSymbol className="h-16 w-16" />
        <h1 className="display mt-8 text-[clamp(4rem,14vw,11rem)]">Bola fora</h1>
        <p className="mt-6 max-w-md text-lg text-paper/75">Esta página não existe ou mudou de endereço.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" arrow>Voltar ao início</Button>
          <Button to="/reservas" variant="outline">Reservar quadra</Button>
        </div>
      </div>
    </section>
  )
}
