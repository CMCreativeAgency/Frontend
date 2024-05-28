import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import ScrollingText from '@/components/ui/scrolling-text'
import clsx from 'clsx'
import { useRef } from 'react'

interface ServicesItemProps {
  slug?: string
  title?: string
  image?: ImageProps
  active?: boolean
  index?: number
  total?: number
}

function ServicesItem({ slug, title, image, active, index, total }: ServicesItemProps) {
  const ref = useRef<HTMLElement>(null)

  return (
    <article className={clsx(classes['services-item'], 'white')} ref={ref}>
      <h2>
        <span>
          0<span>{(index || 0) + 1}</span>
        </span>
        /<span className="f-regular">{`${total}`.padStart(2, '0')}</span>
      </h2>

      <Img pclass="mw" imageData={image} />

      <ScrollingText
        text={title!}
        speed={2}
        className="upper display f-medium"
        scroll={false}
        paused={!active}
        // velocity={true}
      />
    </article>
  )
}

export default ServicesItem
