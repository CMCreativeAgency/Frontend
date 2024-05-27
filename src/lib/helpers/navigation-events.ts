'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useIsomorphicLayoutEffect } from '../context/use-isomorphic-layout-effect'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    document.fonts.ready.finally(() => {
      ScrollTrigger?.refresh(true)
    })
  }, [pathname, searchParams])

  return null
}
