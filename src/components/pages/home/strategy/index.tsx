'use client'
import clsx from 'clsx'
import classes from './index.module.scss'
import { HomeStrategyProps } from '@/lib/types/pages'
import Line from '@/components/ui/line'

function HomeStrategy({ data }: HomeStrategyProps) {
  const { heading, content } = data

  return (
    <section className={clsx(classes['strategy'], 'bg-black', 'white')}>
      <div className="wrapper">
        <h2
          className="upper"
          dangerouslySetInnerHTML={{
            __html: `${heading}`,
          }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>
        <p>{content}</p>

        <Line className="orange" />
      </div>
    </section>
  )
}

export default HomeStrategy
