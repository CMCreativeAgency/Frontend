import { ServicesHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Line from '@/components/ui/line'

function ServicesHero({ data }: ServicesHeroProps) {
  const { heading, subhead, content } = data

  return (
    <section className={classes['hero']}>
      <div className="wrapper">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>
        <p>{subhead}</p>
        <h2
          className="xl f-roman"
          dangerouslySetInnerHTML={{ __html: `${content}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.3}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>
        <Line className="orange" />
      </div>
    </section>
  )
}

export default ServicesHero
