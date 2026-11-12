import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1] as const

/**
 * Transição entre páginas: uma "cortina" inclinada na cor de destaque varre a
 * tela da esquerda para a direita, cobrindo a página que sai e revelando a nova.
 * Com "reduzir movimento" ativado, vira um simples fade.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div initial="enter" animate="show" exit="leave">
      <motion.div
        variants={{
          enter: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] } },
          leave: { opacity: 0, transition: { duration: 0.2, delay: 0.2 } },
        }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="bg-flame-grad pointer-events-none fixed inset-y-0 -left-[10vw] z-[90] w-[120vw] skew-x-[-10deg]"
        variants={{
          enter: { scaleX: 1, originX: 1 },
          show: { scaleX: 0, originX: 1, transition: { duration: 0.6, ease } },
          leave: { scaleX: 1, originX: 0, transition: { duration: 0.45, ease } },
        }}
      />
    </motion.div>
  )
}
