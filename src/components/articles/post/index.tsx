'use client'
import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import Button from '@/components/ui/button'

interface PostItemProps {
  title?: string
  image?: ImageProps
  categories?: {
    data: {
      id: number
      attributes?: {
        title?: string
        slug?: string
      }
    }[]
  }
}

function PostItem({ title, image, categories }: PostItemProps) {
  return (
    <article className={classes['post-item']} data-cursor="arrow">
      <Img pclass="mw" fclass="img-mask" imageData={image} aspect="100" />

      <div className={classes['post-item__categories']}>
        {categories?.data?.map((cats) => (
          <Button key={cats.id} label={cats?.attributes?.title} />
        ))}
      </div>

      <h2 className="xl">{title}</h2>
    </article>
  )
}

export default PostItem
