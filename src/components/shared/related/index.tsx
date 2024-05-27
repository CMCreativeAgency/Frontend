'use client'
import { SharedRelatedProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import RelatedItem from '@/components/pages/services/single/related/item'
import { usePathname } from 'next/navigation'
import Line from '@/components/ui/line'

function SharedRelated({ data }: SharedRelatedProps) {
  const { heading, project, post, theme } = data
  const related = project ? project : post
  const pathname = usePathname()
  const currentPath = pathname.split('/')[1]

  return (
    <section className={classes[`related-${theme}`]}>
      <div className="wrapper">
        <Line className="orange" />

        <h2 className="h1 upper">{heading}</h2>

        <RelatedItem
          slug={`${related?.data.attributes.slug}`}
          title={related?.data.attributes.title}
          image={related?.data.attributes.featuredImage}
          data-cursor={theme === 'light' ? 'arrow-dark' : 'arrow'}
          data-cursor-color={theme === 'light' ? '#000' : '#fff'}
        />
      </div>
    </section>
  )
}

export default SharedRelated
