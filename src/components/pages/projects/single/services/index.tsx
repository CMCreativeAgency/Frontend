'use client'
import { ProjectServicesProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'

function ProjectServices({ data }: ProjectServicesProps) {
  const { title, items, image } = data

  return (
    <section className={classes['services']}>
      <div className="wrapper white">
        <p className="m upper f-medium">{title}</p>

        <ul>
          {items?.map((item) => (
            <li key={item.id}>
              <h2 className="xl f-roman">{item?.content}</h2>
            </li>
          ))}
        </ul>

        {image && <Img imageData={image} pclass="mw-m" aspectMobile={157.3} parallax="media" />}
      </div>
    </section>
  )
}

export default ProjectServices
