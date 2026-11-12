import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o plugin uma única vez para o projeto inteiro.
gsap.registerPlugin(ScrollTrigger)

/** Media query usada em todas as animações: só anima quem não pediu menos movimento. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger }
