import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../context/use-isomorphic-layout-effect'
import gsap from 'gsap'
import _SplitText from 'gsap/SplitText'
import { usePathname } from 'next/navigation'

interface SplitTextProps {
  children: React.ReactElement
  type: string
  wrapper?: string
}

function SplitText({ children, type, wrapper }: SplitTextProps) {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>()

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(_SplitText)

    const ctx = gsap.context(() => {
      const split = new _SplitText(ref.current!, {
        type: type,
        tag: 'span',
        linesClass: wrapper ? 'lines-wrapper' : 'lines',
        wordsClass: wrapper ? 'words-wrapper' : 'words',
        charsClass: wrapper ? 'chars-wrapper' : 'chars',
      }) as any

      if (wrapper) {
        new _SplitText(split[type]!, {
          type: wrapper,
          tag: 'span',
          linesClass: 'lines',
          wordsClass: 'words',
          charsClass: 'chars',
        })
      }
    })

    return () => ctx.revert()
  }, [pathname])

  return React.cloneElement(children, { ref })
}

export default SplitText
