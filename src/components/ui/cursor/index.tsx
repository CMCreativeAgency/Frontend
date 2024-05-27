'use client'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import classes from './index.module.scss'
import clsx from 'clsx'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import gsap from 'gsap'
import ArrowRight from '@/components/svg/arrows/ArrowRight'
import IconDrag from '@/components/svg/drag'
import Marquee from '@/lib/animations/components/marquee'
import ScrollingText from '../scrolling-text'
import IconExternal from '@/components/svg/external'

function Cursor() {
  const [cursorClass, setCursorClass] = useState<string | undefined>(undefined)
  const [text, setText] = useState<string | undefined>(undefined)
  const currentEl = useRef()
  const cursorRef = useRef<HTMLSpanElement>(null)
  const cursorOuterRef = useRef<HTMLSpanElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { device }: any = useBreakpointsContext()

  useEffect(() => {
    if (device === 'mobile') return
    let cursorReferecne = cursorRef.current!
    let cursorOuterReference = cursorOuterRef.current!

    const onScroll = (e: any) => {
      let element = document.elementFromPoint(mouse.current.x, mouse.current.y)
      if (!element) return

      ctx.render(element)
    }

    const ctx = gsap.context((self) => {
      self.add('render', (e: any) => {
        let cursor = e.dataset.cursor ?? false

        if (cursor) {
          let cursorText = e.dataset.cursorText
          let cursorColor = e.dataset.cursorColor

          if (cursor === 'link' && !currentEl.current) {
            setCursorClass('link')
            currentEl.current = e

            gsap.to(cursorOuterReference, {
              scale: 0.5,
              ease: 'power2.inOut',
              duration: 0.3,
            })
          }

          if (cursor === 'marquee' && !currentEl.current) {
            setCursorClass('marquee')
            setText(cursorText)
            currentEl.current = e

            gsap.to(cursorOuterReference, {
              scale: 2,
              ease: 'power2.inOut',
              background: cursorColor || null,
              duration: 0.3,
            })
          }

          if (
            (cursor === 'arrow' ||
              cursor === 'drag' ||
              cursor === 'text' ||
              cursor === 'external' ||
              cursor === 'arrow-dark') &&
            !currentEl.current
          ) {
            setText(cursorText)
            setCursorClass(cursor)
            currentEl.current = e

            gsap.to(cursorOuterReference, {
              scale: e.dataset.cursorScale || 1,
              background: cursorColor || null,
              ease: 'power2.inOut',
              duration: 0.3,
            })

            gsap.to(cursorReferecne, {
              opacity: 1,
              scale: 1,
              ease: 'power2.inOut',
              duration: 1,
            })
          }

          if (cursor === 'magnetic' && !currentEl.current) {
            // currentEl.current = e
            // cursorReferecne.innerText = cursorText
            // gsap.to(cursorOuterReference, {
            //   scale: 1,
            //   ease: 'power2.inOut',
            //   duration: 0.3,
            // })
            // gsap.to(cursorReferecne, {
            //   opacity: 1,
            //   scale: 1,
            //   ease: 'power2.inOut',
            //   duration: 1,
            // })
          }
        } else {
          // gsap.to(cursorReferecne, {
          //   opacity: 0,
          //   scale: 0,
          //   ease: 'power2.out',
          //   duration: 1,
          // })

          gsap.to(cursorOuterReference, {
            scale: 0.3,
            ease: 'power2.out',
            background: '#fff',
            duration: 0.3,
          })

          setText(undefined)
          setCursorClass(undefined)
          currentEl.current = undefined
          // cursorReferecne.innerText = ''
        }
      })
    })

    const onPointerMove = (e: any) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      const cursorMove = (el: any, pos: any, dur: any) => {
        return gsap.quickTo(el, pos, {
          duration: dur,
          ease: 'power2',
          force3D: true,
        })
      }

      const cursorX = cursorMove(cursorReferecne, 'x', 0.3)
      const cursorY = cursorMove(cursorReferecne, 'y', 0.3)

      const cursorOuterX = cursorMove(cursorOuterReference, 'x', 0.35)
      const cursorOuterY = cursorMove(cursorOuterReference, 'y', 0.35)

      cursorX(mouse.current.x - cursorReferecne.offsetWidth / 2)
      cursorY(mouse.current.y - cursorReferecne.offsetHeight / 2)

      cursorOuterX(mouse.current.x - cursorOuterReference.offsetWidth / 2)
      cursorOuterY(mouse.current.y - cursorOuterReference.offsetHeight / 2)

      ctx.render(e.target)
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      gsap.killTweensOf(cursorReferecne)
      ctx.kill()
    }
  }, [device])
  return (
    <>
      <span
        className={clsx(classes['cursor'], cursorClass && classes[cursorClass])}
        ref={cursorRef}
      >
        {(cursorClass === 'arrow' || cursorClass === 'arrow-dark') && (
          <span className={classes[`cursor-${cursorClass}`]}>
            <ArrowRight />
          </span>
        )}
        {cursorClass === 'external' && (
          <span className={classes['cursor-external']}>
            <IconExternal />
          </span>
        )}
        {cursorClass === 'drag' && (
          <span className={classes['cursor-drag']}>
            <IconDrag />
          </span>
        )}
        {cursorClass === 'text' && (
          <span className={classes['cursor-text']}>
            <p>{text}</p>
          </span>
        )}
      </span>
      <span
        className={clsx(classes['cursor-outer'], cursorClass && classes[cursorClass])}
        ref={cursorOuterRef}
      >
        {cursorClass === 'marquee' && text && (
          <ScrollingText speed={0.5} text={text} className="p" scroll={false} />
        )}
      </span>
    </>
  )
}

export default Cursor
