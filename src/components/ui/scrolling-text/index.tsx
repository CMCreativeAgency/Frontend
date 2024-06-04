'use client'
import classes from './index.module.scss'
import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { horizontalLoop } from '@/lib/animations/helpers/horizontal-loop'
import clsx from 'clsx'

interface ScrollingTextProps {
  text: string
  count?: number
  speed?: number
  index?: number
  reversed?: boolean
  velocity?: boolean
  className?: string
  dangerously?: boolean
  trigger?: any
  scroll?: boolean
  paused?: boolean
}

function ScrollingText({
  text,
  speed,
  count,
  index,
  reversed,
  velocity,
  className,
  dangerously,
  scroll = true,
  trigger,
  paused,
}: ScrollingTextProps) {
  const countArr = useRef(Array.from({ length: count || 3 }, (v, i) => i))
  const ref = useRef<HTMLDivElement>(null)
  const st = useRef<any>()
  const tlRef = useRef<any>()
  const toRef = useRef<any>()
  const clamp = gsap.utils.clamp(-30, 30)
  const mapper = gsap.utils.mapRange(-30, 30, -30, 30)

  useLayoutEffect(() => {
    let to: any
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const targets = ref.current?.children

      const tl = horizontalLoop(targets, {
        repeat: -1,
        reversed: reversed,
        speed: speed || 0.5,
      })

      tlRef.current = tl

      if (scroll) {
        tl.pause()
        st.current = gsap.timeline({
          scrollTrigger: {
            trigger: trigger || ref.current,
            start: () => 'top bottom',
            end: () => 'bottom top',
            onEnter: () => {
              reversed ? tl.reverse() : tl.play()
            },
            onLeave: () => {
              tl.pause()
            },
            onEnterBack: () => {
              reversed ? tl.reverse() : tl.play()
            },
            onLeaveBack: () => {
              tl.pause()
            },
          },
        })

        setTimeout(() => {
          st.current?.scrollTrigger?.refresh()
        }, 200)
      }

      return () => st.current?.revert()
    })

    function resizeHandler() {
      clearTimeout(to)
      to = setTimeout(() => {
        st.current?.scrollTrigger?.refresh()
      }, 100)
    }

    window.addEventListener('resize', resizeHandler)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', resizeHandler)
    }
  }, [trigger])

  useEffect(() => {
    if (paused) {
      toRef.current = setTimeout(() => {
        tlRef.current.pause()
      }, 600)
    } else {
      clearTimeout(toRef.current)
      tlRef.current.play()
    }

    if (velocity && !paused) {
      ScrollTrigger.create({
        scrub: 0,
        onUpdate: (self) => {
          let speed = clamp(mapper(self.getVelocity() / 100)).toFixed(2)
          tlRef.current.timeScale(+speed * (reversed ? 1 : -1))

          gsap.to(tlRef.current, {
            timeScale: reversed ? 1 : -1,
            duration: 0.8,
            overwrite: true,
            ease: 'none',
          })
        },
      })
    }

    return () => {
      clearTimeout(toRef.current)
    }
  }, [paused])

  return (
    <div className={clsx(classes['scrolling-text'], className)} ref={ref}>
      {countArr.current.map((x, i) => (
        <>
          {!dangerously && <h2 key={i}>{text}</h2>}
          {dangerously && <h2 key={i + 1} dangerouslySetInnerHTML={{ __html: `${text}` }}></h2>}
        </>
      ))}
    </div>
  )
}

export default ScrollingText
