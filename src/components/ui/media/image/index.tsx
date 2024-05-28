'use client'
import { aspectHandler } from '@/lib/helpers/functions'
import { ImageProps } from '@/lib/types/ui'
import Image from 'next/image'

// declare global {
//   interface Window {
//     imagesLoaded: number;
//   }
// }

type ImgProps = {
  path?: string
  onlyImage?: boolean
  children?: React.ReactNode
  imageData?: ImageProps
  parallax?: string
  aspect?: string
  fclass?: string
  pclass?: string
  onClick?: () => any
  className?: string
  figcaption?: string
  aspectMobile?: string
  anim?: any
  params?: any
} & any

function Img({
  anim,
  aspect,
  fclass,
  pclass,
  imageData,
  children,
  parallax,
  params,
  figcaption,
  className,
  onlyImage,
  aspectMobile,
  onClick,
  ...props
}: ImgProps) {
  const image = imageData?.data?.attributes
  const width = image?.width || props.width
  const height = image?.height || props.height
  const aspectRatio = aspect ? aspect : ((height / width) * 100).toFixed(1)

  const aspectRatios: {
    [name: string]: string | undefined
  } = {
    '--aspect': aspectRatio && `${aspectRatio}%`,
    '--aspectMobile': aspectMobile && `${aspectMobile}%`,
  }

  const activeAspect = aspectHandler(aspectRatios)

  if (onlyImage) {
    return (
      <Image
        src={`http://localhost:1337${image?.url}` || 'http://via.placeholder.com/50x50'}
        alt={image?.name || 'image'}
        quality="95"
        width={image?.width || 1}
        height={image?.height || 1}
        className={className}
        {...props}
      />
    )
  }

  return (
    <>
      <figure
        className={fclass}
        onClick={onClick}
        data-parallax={parallax}
        data-enter={anim}
        data-params={params}
      >
        <picture className={pclass} style={activeAspect}>
          <Image
            src={`http://localhost:1337${image?.url}` || 'http://via.placeholder.com/50x50'}
            alt={image?.name || 'image'}
            quality="95"
            width={image?.width || 1}
            height={image?.height || 1}
            className={className}
            {...props}
          />
          {children}
        </picture>
        {figcaption && <figcaption>{figcaption}</figcaption>}
      </figure>
    </>
  )
}

export default Img
