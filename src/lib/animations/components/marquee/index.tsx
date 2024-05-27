'use client'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import classes from './index.module.scss'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface MarqueeProps {
  items: any[]
}

function Marquee({ items }: MarqueeProps) {
  const tl = useRef(
    gsap.timeline({
      repeat: -1,
      paused: true,
      defaults: {
        delay: 1,
        duration: 1.2,
        ease: 'expo.inOut',
      },
    })
  )
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const nodeScope = gsap.utils.selector(ref)

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('span') as any

      elements.forEach((el: any, i: number) => {
        let distance = (i + 1) * -100
        tl.current.to(ref.current, { yPercent: distance })
      })

      ref.current!.append(elements[0].cloneNode(true))

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: () => `bottom top-=100%`,
        onEnter: () => tl.current.play(),
        onLeave: () => tl.current.pause(),
        onEnterBack: () => tl.current.play(),
        onLeaveBack: () => tl.current.pause(),
      })
    }, ref)

    return () => {
      ctx.revert()
      const elements = nodeScope('span')
      elements[elements.length - 1].remove()
    }
  }, [])

  return (
    <span className={classes['marquee']}>
      <span ref={ref}>
        {items && (
          <>
            {items.map((item, i) => (
              <span key={i}>{item.text}</span>
            ))}
          </>
        )}
      </span>
    </span>
  )
}

export default Marquee
