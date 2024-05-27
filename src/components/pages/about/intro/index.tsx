'use client'
import { AboutIntroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Video from '@/components/ui/media/video'
import Line from '@/components/ui/line'

function AboutIntro({ data }: AboutIntroProps) {
  const { content, video, poster } = data

  return (
    <section className={classes['intro']}>
      <div className="wrapper">
        <Video
          video={video}
          aspect={58.8}
          aspectMobile={168.6}
          figclass="mw-m"
          playsInline={true}
          muted={true}
          controls={true}
          parallax="media"
        />

        <h2
          className="orange f-roman"
          data-start="top center"
          data-end="75% center"
          data-split={`{'type': 'words'}`}
          data-enter={`{'tween': 'text-fill', 'target': '.words', 'scrub': true}`}
          dangerouslySetInnerHTML={{__html: `${content}`}}
        >
        </h2>

        <Line className="orange" />
      </div>
    </section>
  )
}

export default AboutIntro
