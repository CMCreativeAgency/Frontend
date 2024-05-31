'use client'
import { SharedServicesProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import clsx from 'clsx'
import ServicesItem from './item'
import Link from 'next/link'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
gsap.registerPlugin(ScrollTrigger)

function SharedServices({ data }: SharedServicesProps) {
  const { services } = data
  const [activeIndex, setActiveIndex] = useState(0)
  const lenis = useLenis()
  const stRef = useRef<any>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const itemsNode = gsap.utils.selector(itemsRef)
      const lineNode = gsap.utils.selector(lineRef)
      const items = itemsNode('li')
      const lines = lineNode('span')

      gsap.set(itemsRef.current, {
        height: items.length * 100 + 100 + 'vh',
      })

      items?.forEach((item, i) => {
        const tl = gsap.timeline()

        tl.set(lines[i], {
          top: 'unset',
          bottom: 0,
        })

        tl.to(lines[i], {
          height: '100%',
          ease: 'none',
        })

        stRef.current = ScrollTrigger.create({
          trigger: item,
          start: () => (i === 0 ? 'top top' : `top+=${(i - 1) * window.innerHeight} top`),
          end: () => (i === 0 ? 'bottom top' : `top+=${i * window.innerHeight} top`),
          scrub: 0,
          animation: tl,
          onEnter: () => {
            setActiveIndex(i)

            if (i !== 0) {
              lenis?.stop()

              gsap
                .to(items[i].firstChild, {
                  height: '100%',
                  duration: 1,
                  ease: 'power2.inOut',
                })
                .then(() => {
                  lenis?.start()
                })

              gsap.fromTo(
                items[i].firstChild?.firstChild!,
                {
                  y: '30%',
                },
                {
                  y: 0,
                  duration: 1,
                  ease: 'power2.inOut',
                }
              )
            }

            if (items[i - 1]) {
              gsap.to(lines[i - 1], {
                opacity: 0,
              })

              gsap.to(items[i - 1].firstChild, {
                y: '-30%',
                duration: 1,
                ease: 'power2.inOut',
              })
            }
          },
          onLeaveBack: () => {
            if (i !== 0) {
              gsap
                .to(items[i].firstChild, {
                  height: 0,
                  duration: 1,
                  ease: 'power2.inOut',
                })
                .then(() => {
                  lenis?.start()
                })

              gsap.to(items[i].firstChild?.firstChild!, {
                y: '30%',
                duration: 1,
                ease: 'power2.inOut',
              })
            }

            if (items[i - 1]) {
              setActiveIndex(i - 1)
              lenis?.stop()

              gsap.to(items[i - 1].firstChild, {
                y: 0,
                duration: 1,
                ease: 'power2.inOut',
              })

              gsap.to(lines[i - 1], {
                opacity: 1,
              })
            }
          },
        })
      })
    })

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section className={clsx(classes['services'], 'bg-black')}>
      <div className="wrapper white">
        <nav className={classes['services__nav']}>
          <div>
            <span className={classes['services__nav-line']} ref={lineRef}>
              {services.data?.map((el) => (
                <span key={el.id}></span>
              ))}
            </span>
          </div>
        </nav>

        <div className={classes['services__items']} ref={itemsRef}>
          <ul>
            {services.data?.map((service, i) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.attributes.slug!}`}
                  aria-label={service.attributes.title}
                  data-cursor="arrow"
                >
                  <ServicesItem
                    slug={service.attributes.slug}
                    title={service.attributes.title}
                    image={service.attributes.featuredImage}
                    active={i === activeIndex}
                    index={i}
                    total={services.data.length}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SharedServices
