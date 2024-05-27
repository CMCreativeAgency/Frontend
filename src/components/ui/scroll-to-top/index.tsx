'use client'

import { useLenisContext } from '@/lib/animations/LenisScroll'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

function ScrollToTop({ children }: any) {
  const [newChildren, setNewChildren] = useState<React.ReactNode>(null)
  const lenis: any = useLenisContext()
  const pathname = usePathname()
  const to = useRef<any>()

  useEffect(() => {
    clearTimeout(to.current)

    to.current = setTimeout(() => {
      lenis?.scrollTo(0, {
        immediate: true,
      })
      window.scrollTo(0, 0)
      setNewChildren(children)
      ScrollTrigger.refresh()
    }, 100)
  }, [pathname])

  return <>{newChildren}</>
}

export default ScrollToTop
