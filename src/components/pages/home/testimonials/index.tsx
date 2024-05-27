'use client'
import { HomeTestimonialsProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

function HomeTestimonials({ data }: HomeTestimonialsProps) {
  const { heading, items } = data
  const { device }: any = useBreakpointsContext()

  return (
    <section className={classes['testimonials']}>
      <div className="wrapper">
        <h2
          className="upper center"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>

        <div className={classes['testimonials__items']}>
          {items && (
            <Swiper
              modules={[FreeMode]}
              freeMode={{
                enabled: true,
                momentumBounce: false,
                momentumRatio: 1.2,
                momentumVelocityRatio: 0.7,
                sticky: true,
              }}
              speed={600}
              slidesPerView={device === 'desktop' ? 2.05 : 1}
              wrapperTag="ul"
              // centeredSlides={true}
              loop={true}
              initialSlide={device === 'desktop' ? 1 : 1}
            >
              {items?.map((item) => (
                <SwiperSlide key={item.id} tag="li" data-cursor="drag" data-cursor-color="#FF5500">
                  <div className={classes['testimonials__item']}>
                    <p>{item.content}</p>

                    <div className={classes['testimonials__item-authro']}>
                      <p className="m upper f-medium">{item.name}</p>
                      <p className="m orange upper f-medium">{item.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonials
