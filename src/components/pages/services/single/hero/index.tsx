import { ServiceHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import Line from '@/components/ui/line'

function ServiceHero({ data }: ServiceHeroProps) {
  const { heading, subhead, content, featuredImage } = data

  return (
    <section className={classes['hero']}>
      <Img imageData={featuredImage} pclass="mw-m" aspectMobile="167.4" />

      <div className="wrapper">
        <h1 className="upper" dangerouslySetInnerHTML={{ __html: `${heading}` }}></h1>

        <Line className="orange" />

        <div className={classes['hero__content']}>
          <p className="upper m f-medium">{subhead}</p>

          <h2 className="xl f-roman" dangerouslySetInnerHTML={{ __html: `${content}` }}></h2>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero
