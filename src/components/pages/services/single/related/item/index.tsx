'use client'
import { ImageProps } from '@/lib/types/ui'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'

type RelatedItemProps = {
  title?: string
  slug?: string
  image?: ImageProps
} & any

function RelatedItem({ title, image, slug, ...props }: RelatedItemProps) {
  const [isClicked, setIsClicked] = useState(false)
  const lineRef = useRef<HTMLSpanElement>(null)
  const interval = useRef<any>()
  const tl = useRef<any>(
    gsap.timeline({
      paused: true,
    })
  )
  const intervalCount = useRef<number>(0)
  const router = useRouter()
  const { device }: any = useBreakpointsContext()

  // function clickHandler(e: any) {
  //   e.preventDefault()
  //   return
  //   if (isClicked) setIsClicked(true)

  //   gsap.to(lineRef.current, {
  //     width: '100%',
  //     duration: 1,
  //     ease: 'power2.inOut',
  //   })

  //   setTimeout(() => {
  //     router.replace(slug)
  //   }, 1000)
  // }

  useEffect(() => {
    tl.current.to(lineRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push(slug)
      },
    })
  }, [])

  function onHoldHandler() {
    tl.current.pause().play()
  }

  function onReleaseHandler() {
    clearInterval(interval.current)

    if (intervalCount.current < 100) {
      tl.current.pause().reverse()
    }
  }

  return (
    <button
      aria-label={title}
      onClick={device === 'mobile' ? onHoldHandler : null}
      onMouseUp={device === 'desktop' ? onReleaseHandler : null}
      onMouseDown={device === 'desktop' ? onHoldHandler : null}
      {...props}
    >
      <div className={classes['related-item']}>
        <Img aspect="110" pclass="mw" imageData={image} />
        <h3 className="xl f-roman upper">{title}</h3>

        <span className={classes['related-item__line']}>
          <span ref={lineRef}></span>
        </span>
      </div>
    </button>
  )
}

export default RelatedItem
