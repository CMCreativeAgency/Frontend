import { getProjectCategories, getProjects } from '@/lib/strapi/strapi-fetch'
import classes from './index.module.scss'
import ProjectsListNav from './nav'
import ProjectsListItems from './items'

async function ProjectsList() {
  const { data: projects } = await getProjects()
  const { data: categories } = await getProjectCategories()

  return (
    <section className={classes['list']}>
      <div className="wrapper">
        <ProjectsListNav categories={categories} />
        <ProjectsListItems items={projects} />
      </div>
    </section>
  )
}

export default ProjectsList
