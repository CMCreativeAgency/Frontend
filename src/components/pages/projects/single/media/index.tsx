'use client'
import { ProjectMediaProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Video from '@/components/ui/media/video'
import Img from '@/components/ui/media/image'

function ProjectMedia({ data }: ProjectMediaProps) {
  const { video, image } = data

  return (
    <section className={classes['media']}>
      <div className="wrapper">
        {video && !image?.data && (
          <Video
            video={video}
            figclass="mw-m"
            aspect="58.8"
            aspectMobile="120.7"
            controls={true}
            playsInline={true}
            muted={true}
            parallax="media"
          />
        )}
        {image && !video?.data && <Img imageData={image} pclass="mw" parallax="media" />}
      </div>
    </section>
  )
}

export default ProjectMedia
