import { ProjectsHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function ProjectsHero({ data }: ProjectsHeroProps) {
  const { heading, content } = data

  return (
    <section className={classes['hero']}>
      <div className="wrapper white">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>
        <p data-enter={`{'tween': 'opacity', 'delay': '.25'}`}>{content}</p>
      </div>
    </section>
  )
}

export default ProjectsHero
