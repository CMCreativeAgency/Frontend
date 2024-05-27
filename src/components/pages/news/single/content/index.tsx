'use client'
import { PostContentProps } from '@/lib/types/pages'
import classes from './index.module.scss'

function PostContent({ data }: PostContentProps) {
  const { content } = data

  return (
    <section className={classes['content']}>
      <div className="wrapper">
        <div
          className={classes['content__data']}
          dangerouslySetInnerHTML={{ __html: `${content}` }}
        ></div>
      </div>
    </section>
  )
}

export default PostContent
