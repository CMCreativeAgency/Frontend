'use client'
import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'

interface ProjectItemProps {
  image: ImageProps
  title: string | undefined
}

function ProjectItem({ image, title }: ProjectItemProps) {
  return (
    <article className={classes['project-item']} data-cursor="arrow">
      <Img fclass="img-mask" pclass="mw" imageData={image} aspect="100" />
      {title && <h3>{title}</h3>}
    </article>
  )
}

export default ProjectItem
