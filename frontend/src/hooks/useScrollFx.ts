import { useLayoutEffect, type RefObject } from 'react'
import { gsap, MOTION_OK, ScrollTrigger } from '../lib/gsap'

/**
 * Efeitos de scroll de uma página, ligados por atributos no HTML:
 *
 *   data-reveal="up"     → o bloco sobe e aparece ao entrar na tela
 *   data-reveal="clip"   → a imagem é revelada por um recorte inclinado
 *   data-reveal="lines"  → cada filho direto (linha do título) sobe em sequência
 *   data-parallax-img    → a foto se move mais devagar que a página
 *
 * Tudo é desligado para quem pediu "reduzir movimento" no sistema.
 */
export function useScrollFx(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)

    mm.add(MOTION_OK, () => {
      const q = (sel: string) => (root.current ? Array.from(root.current.querySelectorAll<HTMLElement>(sel)) : [])

      const ups = q('[data-reveal="up"]')
      gsap.set(ups, { opacity: 0 })
      ScrollTrigger.batch(ups, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out' }),
      })

      q('[data-reveal="clip"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.3,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          },
        )
      })

      q('[data-reveal="lines"]').forEach((el) => {
        gsap.from(el.children, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })

      q('[data-parallax-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })

    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
