'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface ScrollRefresherProps {
  children: React.ReactNode
}

function ScrollRefresher({ children }: ScrollRefresherProps) {
  const pathname = usePathname()
  const to = useRef<any>()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
    })
  }, [pathname])

  return <>{children}</>
}

export default ScrollRefresher
