/**
 * Imagens do site.
 *
 * As imagens "demo" foram geradas por código apenas para demonstração.
 * Elas NÃO mostram as instalações nem os alunos da LJ, e o site exibe o
 * selo "Imagem ilustrativa" sobre elas.
 *
 * Para trocar por uma foto oficial:
 *   1. Coloque o arquivo em  frontend/public/images/oficiais/
 *   2. Troque o `src` aqui, ajuste `width`/`height` e mude `demo` para false.
 * Fotos de menores de idade só com autorização dos responsáveis.
 */

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  demo: boolean
}

const demo = (file: string, alt: string, width: number, height: number): ImageAsset => ({
  src: `/images/demo/${file}`,
  alt,
  width,
  height,
  demo: true,
})

export const images = {
  heroStadium: demo('hero-estadio-noite.webp', 'Campo de futebol iluminado por refletores à noite', 1920, 1080),
  courtSociety: demo('quadra-society-noite.webp', 'Campo society com alambrado e refletores', 1600, 1000),
  courtIndoor: demo('quadra-coberta.webp', 'Quadra coberta com iluminação no teto', 1600, 1000),
  ballSpeed: demo('bola-velocidade.webp', 'Bola de futebol em movimento', 960, 1200),
  trainingCones: demo('treino-cones.webp', 'Cones de treino sobre a grama ao entardecer', 1600, 1067),
  goalNet: demo('rede-gol.webp', 'Rede do gol iluminada por trás', 960, 1200),
  trainingBalls: demo('bolas-treino.webp', 'Bolas de treino espalhadas pelo gramado', 1600, 1000),
} satisfies Record<string, ImageAsset>

export type ImageKey = keyof typeof images
