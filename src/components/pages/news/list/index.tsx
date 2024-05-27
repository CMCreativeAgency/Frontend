import { getCategories, getPosts } from '@/lib/strapi/strapi-fetch'
import classes from './index.module.scss'
import NewsListItems from './items'
import NewsListNav from './nav'

async function NewsList() {
  const { data: posts } = await getPosts()
  const { data: categories } = await getCategories()

  return (
    <section className={classes['list']}>
      <div className="wrapper">
        <NewsListNav categories={categories} />
        <NewsListItems items={posts} />
      </div>
    </section>
  )
}

export default NewsList
