'use client'
import { HomeHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Video from '@/components/ui/media/video'
import Img from '@/components/ui/media/image'
import LogoImage from '@public/media/logo-color-big.png'
import clsx from 'clsx'

function HomeHero({ data }: HomeHeroProps) {
  const { heading, content, video } = data

  return (
    <section className={classes['hero']}>
      <div className="wrapper white">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{
            __html: `${heading}`,
          }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>

        <p data-enter={`{'tween': 'opacity', 'delay': '.4'}`}>{content}</p>
      </div>

      <div className={classes['hero__image']} data-enter={`{'tween': 'opacity', 'delay': '.8'}`}>
        <Img
          pclass="mw"
          src={LogoImage.src}
          width={LogoImage.width}
          height={LogoImage.height}
          priority={true}
          anim={"{ 'tween': 'y', 'y': '40%', 'to': '-100%', 'scrub': true }"}
        />
      </div>

      <Video
        figclass={clsx(classes['hero__video'], 'mw')}
        video={video}
        width="1440"
        height="900"
        loop={true}
        muted={true}
        autoPlay={true}
        playsInline={true}
      />
    </section>
  )
}

export default HomeHero
