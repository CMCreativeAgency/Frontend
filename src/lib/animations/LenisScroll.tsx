'use client'

import Lenis from '@studio-freight/lenis'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useLoaderContext } from '../context/use-loader'
import useDetectBackButton from '../hooks/use-backbutton'

// context
// ...
export const LenisScrollContext = createContext({})

interface LenisScrollProps {
  children: React.ReactNode
}

// provider
// ...
export default function LenisScrollProvider({ children }: LenisScrollProps) {
  const [lenis, setLenis] = useState<any>(null)
  const { isLoaded }: any = useLoaderContext()
  const isBack = useDetectBackButton()

  useEffect(() => {
    if (!isLoaded) {
      window.scrollTo(0, 0)
      return
    }
    document.documentElement.classList.remove('hidden')
    let mm = gsap.matchMedia()

    mm.add('(min-width: 1023.99px)', () => {
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        lerp: 0.1,
        // duration: 0.65,
        // easing: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
        // wheelMultiplier: 1.75,
        wheelMultiplier: 1.55,
        // normalizeWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      lenis.on('scroll', ScrollTrigger.update)

      const rafData = requestAnimationFrame(raf)

      setLenis(lenis)
      return () => cancelAnimationFrame(rafData)
    })

    return () => mm.revert()
  }, [isLoaded])

  useEffect(() => {
    if (isBack) {
      lenis?.scrollTo(0, {
        immediate: true,
      })
    }
  }, [isBack])

  const context = lenis

  return <LenisScrollContext.Provider value={context}>{children}</LenisScrollContext.Provider>
}

// use
// ...
export const useLenisContext = () => {
  return useContext(LenisScrollContext)
}
