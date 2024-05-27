'use client'
import { GivebackHistoryProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import Link from 'next/link'

function GivebackHistory({ data }: GivebackHistoryProps) {
  const { heading, subhead, content, image, url } = data

  return (
    <section className={classes['history']}>
      <div className="wrapper">
        <h2
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>

        <Link
          href={url!}
          aria-label={url}
          className={classes['history__image']}
          data-cursor="external"
          data-cursor-color="#FF5500"
        >
          <Img pclass="mw" imageData={image} />
        </Link>

        <div className={classes['history__content']}>
          <h3
            className="xl f-roman"
            data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.2}`}
            data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
          >
            {subhead}
          </h3>
          <p>{content}</p>
        </div>
      </div>
    </section>
  )
}

export default GivebackHistory
