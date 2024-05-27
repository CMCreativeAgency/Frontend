import { ContactHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function ContactHero({ data }: ContactHeroProps) {
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
        <p
          className="xl"
          dangerouslySetInnerHTML={{ __html: `${content}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.3}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></p>
      </div>
    </section>
  )
}

export default ContactHero
