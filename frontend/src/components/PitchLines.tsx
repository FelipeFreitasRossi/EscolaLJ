/**
 * Linhas do meio-campo (linha divisória, círculo central e marca do centro).
 * `pathLength="1"` permite ao GSAP "riscar" cada linha de 0 a 100%.
 */
export function PitchLines({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      data-pitch
      className={className}
    >
      <line x1="300" y1="0" x2="300" y2="600" pathLength={1} />
      <circle cx="300" cy="300" r="150" pathLength={1} />
      <circle cx="300" cy="300" r="6" pathLength={1} />
    </svg>
  )
}
