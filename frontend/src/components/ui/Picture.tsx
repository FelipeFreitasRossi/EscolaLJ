import { images, type ImageKey } from '../../data/images'

interface PictureProps {
  image: ImageKey
  className?: string
  imgClassName?: string
  priority?: boolean
  /** Esconde o selo (ex.: miniaturas muito pequenas). */
  hideBadge?: boolean
  parallax?: boolean
}

/**
 * Imagem padrão do site. Mostra o selo "Imagem ilustrativa" enquanto a foto
 * não for oficial, e reserva o espaço (width/height) para não "pular" a página.
 */
export function Picture({ image, className = '', imgClassName = '', priority = false, hideBadge = false, parallax = false }: PictureProps) {
  const asset = images[image]
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`}>
      <img
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        data-parallax-img={parallax ? '' : undefined}
        className={`h-full w-full object-cover ${parallax ? 'scale-[1.15]' : ''} ${imgClassName}`}
      />
      {asset.demo && !hideBadge && (
        <span className="glass absolute top-3 left-[calc(7%+0.25rem)] z-[2] rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-paper/85">
          Imagem ilustrativa
        </span>
      )}
    </div>
  )
}
