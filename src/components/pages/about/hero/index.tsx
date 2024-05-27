'use client'
import { AboutHeroProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLoaderContext } from '@/lib/context/use-loader'

function AboutHero({ data }: AboutHeroProps) {
  const { heading, images } = data
  const imagesRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const { isLoaded }: any = useLoaderContext()

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const imagesNode = gsap.utils.selector(imagesRef)
      const images = imagesNode('figure')
      const tl = gsap.timeline()
      const entryTl = gsap.timeline()
      const masterTL = gsap.timeline({ paused: true })

      tl.from(images, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        rotate: 0,
        stagger: 0.025,
        duration: 1,
        ease: 'expo.inOut',
      })

      entryTl.to(images, {
        opacity: 1,
        rotate: (i) => (i % 2 ? '2deg' : '-2deg'),
        stagger: 0.2,
        duration: 0.1,
        ease: 'expo',
      })

      masterTL.add(entryTl)
      masterTL.add(tl, '-=.4')

      masterTL.play()

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0,
        animation: gsap.to(imagesRef.current, {
          width: '80%',
          height: '80%',
          ease: 'none',
        }),
      })
    })

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section className={classes['hero']} ref={ref}>
      <div className="wrapper">
        <h1
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h1>

        <div className={classes['hero__images']} ref={imagesRef}>
          {images && (
            <>
              {images?.data?.map(
                (image, i) =>
                  i < 9 && <Img key={image.id} pclass="mw" imageData={{ data: image }} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutHero
