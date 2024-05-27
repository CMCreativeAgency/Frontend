import { AboutLimitsProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function AboutLimits({ data }: AboutLimitsProps) {
  const { heading, content, subhead } = data

  return (
    <section className={classes['limits']}>
      <div className="wrapper">
        <h2
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>
        <h2
          className="upper orange f-regular"
          dangerouslySetInnerHTML={{ __html: `${subhead}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.3}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>
        <p>{content}</p>
      </div>
    </section>
  )
}

export default AboutLimits
