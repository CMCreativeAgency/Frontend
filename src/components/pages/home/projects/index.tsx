'use client'
import clsx from 'clsx'
import classes from './index.module.scss'
import { HomeProjectsProps } from '@/lib/types/pages'
import Link from 'next/link'
import ProjectItem from '@/components/articles/project'
import Button from '@/components/ui/button'

function HomeProjects({ data }: HomeProjectsProps) {
  const { heading, content, projects, button } = data

  return (
    <section className={clsx(classes['projects'], 'bg-black', 'white')}>
      <div className="wrapper">
        <div className={classes['projects__content']}>
          <h2
            className="upper"
            dangerouslySetInnerHTML={{ __html: `${heading}` }}
            data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
            data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
          ></h2>
          <p>{content}</p>
        </div>

        <div className={classes['projects__items']}>
          {projects?.data && (
            <ul>
              {projects.data.map((item, i) => (
                <li
                  key={item.id}
                  data-enter={`{'tween': 'y', 'target': 'a', 'y': '20%', 'opacity': '0', 'delay': ${
                    i % 2 ? '0.3' : '0.2'
                  }, 'duration': '.6'}`}
                >
                  <Link
                    href={`/projects/${item.attributes.slug}` as string}
                    aria-label={item.attributes.title}
                  >
                    <ProjectItem
                      image={item.attributes.featuredImage}
                      title={item.attributes.title}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Button
            double={true}
            href={button?.href}
            label={button?.label}
            className="button__brackets"
            data-cursor="link"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeProjects
