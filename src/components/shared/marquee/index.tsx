'use client'
import classes from './index.module.scss'
import { SharedMarqueeProps } from '@/lib/types/pages'
import ScrollingText from '@/components/ui/scrolling-text'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

function SharedMarquee({ data }: SharedMarqueeProps) {
  const { content, parallax } = data
  const [refEl, setRefEl] = useState<HTMLDivElement | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setRefEl(ref.current)
    }
  }, [ref.current])

  return (
    <section className={clsx(classes['marquee'], parallax && classes['parallax'])} ref={ref}>
      <div className="wrapper">
        <ScrollingText
          trigger={refEl}
          className="display f-medium upper"
          text={content!}
          speed={1.5}
          velocity={true}
          dangerously={true}
        />
        <ScrollingText
          trigger={refEl}
          text={content!}
          speed={1.5}
          reversed={true}
          dangerously={true}
          velocity={true}
          className="display f-medium upper"
        />
      </div>
    </section>
  )
}

export default SharedMarquee
