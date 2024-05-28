'use client'
import classes from './index.module.scss'
import { useSearchParams } from 'next/navigation'
import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import clsx from 'clsx'
import Line from '@/components/ui/line'

interface ProjectsListNav {
  categories?: {
    id: number
    slug: string
    title: string
    projects: any
  }[]
}

function ProjectsListNav({ categories }: ProjectsListNav) {
  const [filterState, setFiltersState] = useState<boolean>(false)
  const { device }: any = useBreakpointsContext()
  const searchParams = useSearchParams()
  const listRef = useRef<HTMLUListElement>(null)

  const activeCategories = categories?.reduce(
    (prev: any, next: any) => (next.projects.data.length ? [...prev, next] : prev),
    []
  )
  const projectsCount = activeCategories?.reduce(
    (prev: any, next: any) => +prev + +next.projects.data.length,
    0
  )

  const stringQueryHandler = useCallback(
    (e: BaseSyntheticEvent, name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const paramsArray = params.get(name)?.split(',') || []
      const buttons = listRef.current?.querySelectorAll('button')

      if (value === '') {
        buttons?.forEach((button) => button.classList.remove('active'))
        e.target.classList.add('active')
        params.delete(name)
        window.history.pushState(null, '', `?${params.toString()}`)
        return
      }

      buttons![0].classList.remove('active')

      if (value && paramsArray?.includes(value)) {
        paramsArray.splice(paramsArray.indexOf(value), 1)
        e.target.classList.remove('active')
      } else {
        paramsArray?.push(value)
        e.target.classList.add('active')
      }

      if (!paramsArray.length) {
        buttons?.forEach((button) => button.classList.remove('active'))
        buttons![0].classList.add('active')
        params.delete(name)
        window.history.pushState(null, '', `?${params.toString()}`)
        return
      }

      params.set(name, paramsArray?.join(',')!)
      window.history.pushState(null, '', `?${params.toString()}`)
    },
    [searchParams]
  )

  return (
    <div className={classes['list-nav']} data-enter={`{'tween': 'opacity', 'delay': '.3'}`}>
      {device === 'mobile' && (
        <button
          className={clsx('p', filterState && classes['active'])}
          type="button"
          aria-label="Filter"
          onClick={() => setFiltersState(!filterState)}
        >
          Filter
        </button>
      )}

      <ul className={clsx(filterState && classes['active'])} ref={listRef}>
        <li>
          <button
            className="p active"
            type="button"
            data-cursor="link"
            aria-label="show all"
            onClick={(e: any) => {
              stringQueryHandler(e, 'categories', '')
            }}
          >
            {`Show All (${projectsCount})`}
          </button>
        </li>
        {activeCategories?.map((category: any) => (
          <li key={category.id}>
            <button
              className="p"
              type="button"
              data-cursor="link"
              aria-label={category?.title}
              onClick={(e) => {
                stringQueryHandler(e, 'categories', category.slug)
              }}
            >
              {`${category?.title} (${category?.projects?.data.length})`}
            </button>
          </li>
        ))}
      </ul>

      <Line className="orange" />
    </div>
  )
}

export default ProjectsListNav
