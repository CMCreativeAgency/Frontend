'use client'
import { ServiceInfoProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import { useLenisContext } from '@/lib/animations/LenisScroll'

function ServiceInfo({ data }: ServiceInfoProps) {
  const { items, image } = data
  const ref = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLSpanElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const { device }: any = useBreakpointsContext()
  const lenis: any = useLenisContext()

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const ctx = gsap.context(() => {
      const linesNode = gsap.utils.selector(linesRef)
      const itemsNode = gsap.utils.selector(itemsRef)
      const lines = linesNode('span')
      const items = itemsNode('li')

      gsap.set([itemsRef.current, ref.current], {
        height: items.length * 100 + 100 + 'dvh',
      })

      items?.forEach((item, i) => {
        const tl = gsap.timeline()
        const title = item.querySelector('h2')
        const p = item.querySelector('p')

        const titleSplited = new SplitText(title, {
          type: 'lines',
          linesClass: 'lines-wrapper',
        })
        const pSplited = new SplitText(p, {
          type: 'lines',
          linesClass: 'lines-wrapper',
        })

        new SplitText(titleSplited.lines, {
          type: 'lines',
          linesClass: 'lines',
        })

        new SplitText(pSplited.lines, {
          type: 'lines',
          linesClass: 'lines',
        })

        tl.set(lines[i], {
          top: 'unset',
          bottom: 0,
        })

        tl.to(lines[i], {
          height: device === 'desktop' ? '100%' : 1,
          width: device === 'mobile' ? '100%' : 1,
          ease: 'none',
        })

        const allLines = item.querySelectorAll('.lines')

        if (i !== 0) {
          gsap.set(allLines, {
            y: '100%',
          })
        }

        ScrollTrigger.create({
          trigger: item,
          scrub: 0,
          start: () => (i === 0 ? 'top top' : `top+=${(i - 1) * window.innerHeight} top`),
          end: () => (i === 0 ? 'bottom top' : `top+=${i * window.innerHeight} top`),
          animation: tl,
          onLeaveBack: () => {
            if (i !== 0) {
              gsap
                .fromTo(
                  allLines,
                  {
                    y: 0,
                  },
                  {
                    y: '100%',
                    duration: 0.8,
                    ease: 'power2.inOut',
                  }
                )
                .then(() => {
                  lenis?.start()
                })
            }

            if (items[i - 1]) {
              lenis?.stop()
              const targets = items[i - 1].querySelectorAll('.lines')

              gsap
                .fromTo(
                  targets,
                  {
                    y: '-100%',
                  },
                  {
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                  }
                )
                .then(() => {
                  lenis?.start()
                })

              gsap.to(lines[i - 1], {
                opacity: 1,
              })
            }
          },
          onEnter: () => {
            if (i !== 0) {
              gsap.fromTo(
                allLines,
                {
                  y: '100%',
                },
                {
                  y: 0,
                  stagger: 0.1,
                  duration: 0.8,
                  ease: 'power2.inOut',
                }
              )
            }

            if (items[i - 1]) {
              const targets = items[i - 1].querySelectorAll('.lines')
              lenis?.stop()

              gsap
                .fromTo(
                  targets,
                  {
                    y: 0,
                  },
                  {
                    y: '-100%',
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.inOut',
                  }
                )
                .then(() => {
                  lenis?.start()
                })

              gsap.to(lines[i - 1], {
                opacity: 0,
              })
            }
          },
        })
      })
    })

    return () => ctx.revert()
  }, [device])

  return (
    <section className={classes['info']} ref={ref}>
      <Img imageData={image} pclass="mw" />

      <div className="wrapper white">
        <div className={classes['info__nav']}>
          <div>
            <span ref={linesRef}>
              {items?.map((item, i) => (
                <span key={item.id}></span>
              ))}
            </span>
          </div>
        </div>

        <div className={classes['info__items']} ref={itemsRef}>
          {items && (
            <ul>
              {items?.map((item, i) => (
                <li key={item.id}>
                  <div className={classes['info__item']}>
                    <h2
                      className="upper"
                      dangerouslySetInnerHTML={{ __html: `${item?.heading}` }}
                    ></h2>
                    <p>{item?.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default ServiceInfo
