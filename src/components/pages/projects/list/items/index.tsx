'use client'
import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Link from 'next/link'
import ProjectItem from '@/components/articles/project'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/strapi/strapi-fetch'

interface ProjectsListItemsProps {
  items: {
    id: number
    slug: string
    title: string
    featuredImage: ImageProps
  }[]
}

function ProjectsListItems({ items }: ProjectsListItemsProps) {
  const [projects, setProjects] = useState(items)
  const searchParams = useSearchParams()

  async function updateProducts(params: any) {
    const { data } = await getProjects(params)
    setProjects(data)
  }

  useEffect(() => {
    if (!window) return

    const params = new URLSearchParams(searchParams.toString())
    const entries = Object.fromEntries(params.entries())

    updateProducts(entries)
  }, [searchParams])

  return (
    <div className={classes['list-items']}>
      {projects.length && (
        <ul>
          {projects?.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.slug}` as string} aria-label={project.title}>
                <ProjectItem image={project.featuredImage} title={project.title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProjectsListItems