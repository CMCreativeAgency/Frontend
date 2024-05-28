'use client'
import { PostHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function PostHero({ data }: PostHeroProps) {
  const { heading, readtime, publishedAt, image, categories } = data
  const router = useRouter()
  const date = new Date(publishedAt!).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className={classes['hero']}>
      <div className="wrapper">
        <Button
          label="go back"
          className="button__brackets"
          double={true}
          onClick={() => router.back()}
          data-enter={`{'tween': 'y', 'opacity': '0', 'delay': 0.1}`}
        />

        <div className={classes['hero__content']}>
          <h1
            className="upper"
            dangerouslySetInnerHTML={{ __html: `${heading}` }}
            data-enter={`{'tween': 'y', 'opacity': '0', 'delay': 0.1}`}
          ></h1>

          <div
            className={classes['hero__info']}
            data-enter={`{'tween': 'y', 'target': ['button', 'p'], 'opacity': '0', 'stagger':'0.05', 'delay': 0.25}`}
          >
            <div className={classes['hero__categories']}>
              {categories?.data?.map((cats) => (
                <Button className="m" key={cats.id} label={cats?.attributes?.title} />
              ))}
            </div>

            <p className="m upper">{date}</p>
            <p className="m upper">{readtime}</p>
          </div>
        </div>
      </div>

      <Img
        priority={true}
        imageData={image}
        pclass="mw-m"
        aspectMobile={100}
        parallax="media"
        anim={`{'tween': 'y', 'opacity': '0', 'delay': 0.4}`}
      />
    </section>
  )
}

export default PostHero
