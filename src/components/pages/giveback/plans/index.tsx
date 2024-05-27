import Img from '@/components/ui/media/image'
import classes from './index.module.scss'
import { GivebackPlansProps } from '@/lib/types/pages'

function GivebackPlans({ data }: GivebackPlansProps) {
  const { heading, content, image } = data

  return (
    <section className={classes['plans']}>
      <Img pclass="mw" imageData={image} parallax="media" />

      <div className="wrapper">
        <h2 className="upper" dangerouslySetInnerHTML={{ __html: `${heading}` }}></h2>
        <p>{content}</p>
      </div>
    </section>
  )
}

export default GivebackPlans
