'use client'
import { AboutSolutionsProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'

function AboutSolutions({ data }: AboutSolutionsProps) {
  const { heading, content, image } = data

  return (
    <section className={classes['solutions']}>
      <div className="wrapper">
        <h2
          className="upper"
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.2}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
        ></h2>

        <div className={classes['solutions__content']}>
          <p
            className="xl"
            dangerouslySetInnerHTML={{ __html: `${content}` }}
            data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.3}`}
            data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
          ></p>

          <Img imageData={image} pclass="mw" parallax="media" />
        </div>
      </div>
    </section>
  )
}

export default AboutSolutions
