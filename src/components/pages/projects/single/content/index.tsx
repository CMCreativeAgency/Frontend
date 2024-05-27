'use client'
import { ProjectContentProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function ProjectContent({ data }: ProjectContentProps) {
  const { items } = data

  return (
    <section className={classes['content']}>
      <div className="wrapper">
        <ul style={{ height: items?.length * 100 + 50 + 'vh' }}>
          {items?.map((item, i) => (
            <li
              key={item.id}
              style={{ top: i !== 0 ? i * 80 : 0, background: item.background, color: item.color }}
            >
              <div className={classes['content__item']}>
                <h2 className="upper">{item?.heading}</h2>
                <p className="xl" dangerouslySetInnerHTML={{ __html: `${item?.content}` }}></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProjectContent
