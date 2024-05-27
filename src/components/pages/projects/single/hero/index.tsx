'use client'
import Img from '@/components/ui/media/image'
import classes from './index.module.scss'
import { ProjectHeroProps } from '@/lib/types/pages'
import Button from '@/components/ui/button'
import Line from '@/components/ui/line'

function ProjectHero({ data }: ProjectHeroProps) {
  const { heading, image, featuredImage, url } = data

  return (
    <section className={classes['hero']}>
      <Img
        imageData={image ? image : featuredImage}
        pclass="mw"
        aspect="55.55"
        aspectMobile="167.44"
      />

      <div className="wrapper">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>

        {url && (
          <Button
            href={url}
            label="visit site"
            target="_blank"
            double={true}
            className="button__brackets"
          />
        )}

        <Line className="orange" />
      </div>
    </section>
  )
}

export default ProjectHero
