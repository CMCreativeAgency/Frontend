'use client'
import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPosts } from '@/lib/strapi/strapi-fetch'
import PostItem from '@/components/articles/post'
import { useAnimationsContext } from '@/lib/animations/Animations'

interface NewsListItemsProps {
  items: {
    id: number
    slug: string
    title: string
    featuredImage: ImageProps
    categories: any
  }[]
}

function NewsListItems({ items }: NewsListItemsProps) {
  const [posts, setPosts] = useState(items)
  const searchParams = useSearchParams()
  const { refresh } = useAnimationsContext()

  async function updatePosts(params: any) {
    const { data } = await getPosts(params)
    setPosts(data)

    setTimeout(() => {
      refresh()
    }, 200)
  }

  useEffect(() => {
    if (!window) return

    const params = new URLSearchParams(searchParams.toString())
    const entries = Object.fromEntries(params.entries())

    updatePosts(entries)
  }, [searchParams])

  return (
    <div className={classes['list-items']} data-enter={`{'tween': 'opacity', 'delay': '.4'}`}>
      {posts.length && (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}` as string} aria-label={post.title}>
                <PostItem
                  title={post.title}
                  image={post.featuredImage}
                  categories={post?.categories}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NewsListItems
