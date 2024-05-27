'use client'
import { useEffect, useRef } from 'react'
import classes from './index.module.scss'
import gsap from 'gsap'
import { useLenisContext } from '@/lib/animations/LenisScroll'

interface LoaderProps {
  setState: any
}

function Loader({ setState }: LoaderProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const tlRef = useRef(gsap.timeline({ paused: true }))
  const lenis = useLenisContext()

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      tlRef.current.to(numRef.current, {
        textContent: 100,
        snap: {
          textContent: 1,
        },
        delay: 0.4,
        duration: 2,
        ease: 'power2.inOut',
      })

      tlRef.current.to(wrapperRef.current, {
        yPercent: -100,
        duration: 0.8,
        opacity: 0,
        ease: 'power2.inOut',
      })

      tlRef.current.to(
        loaderRef.current,
        {
          height: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=.4'
      )

      tlRef.current.play().then(() => {
        setTimeout(() => {
          setState(true)
        }, 200)
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={classes['loader']} ref={loaderRef}>
      <span className="h1 f-regular">
        <span ref={wrapperRef}>
          <span ref={numRef}>0</span>%
        </span>
      </span>
    </div>
  )
}

export default Loader
