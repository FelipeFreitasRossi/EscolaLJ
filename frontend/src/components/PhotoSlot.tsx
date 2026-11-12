interface PhotoSlotProps {
  /** Caminho da foto oficial. Sem ele, mostra a grama em faixas com o nome da foto esperada. */
  src?: string
  alt: string
  label: string
  className?: string
  /** true só para a foto do topo da página (carrega primeiro). */
  priority?: boolean
}

export function PhotoSlot({ src, alt, label, className = '', priority = false }: PhotoSlotProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto oficial: ${label}`}
      className={`mown-grass relative h-full w-full overflow-hidden ${className}`}
    >
      <span className="absolute bottom-4 left-4 rounded-full border border-line/40 px-3 py-1 text-sm text-line/80">
        Foto oficial: {label}
      </span>
    </div>
  )
}
