'use client'
import classes from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ServiceRelatedProps } from '@/lib/types/pages'
import RelatedItem from './item'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import Link from 'next/link'
import IconChevronRight from '@/components/svg/arrows/ChevronRight'
import { Navigation } from 'swiper/modules'

function ServiceRelated({ data }: ServiceRelatedProps) {
  const { heading, projects } = data
  const { device }: any = useBreakpointsContext()

  return (
    <section className={classes['related']}>
      <div className="wrapper">
        <h2 className="upper" dangerouslySetInnerHTML={{ __html: `${heading}` }}></h2>

        <div className={classes['related__items-wrapper']}>
          {device === 'desktop' && (
            <div className={classes['swiper-controls']}>
              <button type="button" aria-label="swiper prev" className="swiper-prev">
                <IconChevronRight />
              </button>
              <button type="button" aria-label="swiper next" className="swiper-next">
                <IconChevronRight />
              </button>
            </div>
          )}

          {projects && (
            <Swiper
              modules={[Navigation]}
              slidesPerView={device === 'desktop' ? 1.5 : 1}
              wrapperTag="ul"
              navigation={{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
              }}
              className={classes['related__items']}
            >
              {projects.data?.map(({ id, attributes: project }) => (
                <SwiperSlide key={id} tag="li">
                  <RelatedItem
                    title={project.title}
                    slug={`/projects/${project.slug}`}
                    image={project.featuredImage}
                    data-cursor="arrow"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  )
}

export default ServiceRelated
