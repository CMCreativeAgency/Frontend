import classes from './index.module.scss'
import { NewsHeroProps } from '@/lib/types/pages'

function NewsHero({ data }: NewsHeroProps) {
  const { heading, content } = data

  return (
    <section className={classes['hero']}>
      <div className="wrapper">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>
        <p>{content}</p>
      </div>
    </section>
  )
}

export default NewsHero
