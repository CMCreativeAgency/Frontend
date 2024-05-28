import { GivebackHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function GivebackHero({ data }: GivebackHeroProps) {
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
        <p data-enter={`{'tween': 'opacity', 'delay': '.25'}`}>{subhead}</p>
        <h2
          className="xl f-roman"
          dangerouslySetInnerHTML={{ __html: `${content}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.35}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>
      </div>
    </section>
  )
}

export default GivebackHero
