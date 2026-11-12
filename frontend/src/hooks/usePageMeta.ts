import { useEffect } from 'react'

/** Define o título da aba e a descrição de cada página (SEO). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Escola de Futebol LJ` : 'Escola de Futebol LJ | São Carlos/SP'
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
