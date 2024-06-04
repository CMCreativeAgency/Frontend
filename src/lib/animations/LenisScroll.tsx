'use client'
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface LenisScrollProps {
  children: React.ReactNode
}

function LenisScrollProvider({ children }: LenisScrollProps) {
  const lenisRef = useRef<any>()

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })
  // const lenis = useLenis()
  // const pathname = usePathname()

  // useEffect(() => {
  //   if (lenis?.isStopped) lenis.start()
  // }, [pathname])

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  )
}

export default LenisScrollProvider

// import Lenis from 'lenis'
// import { createContext, useContext, useEffect, useRef, useState } from 'react'
// import gsap from 'gsap'
// import ScrollTrigger from 'gsap/dist/ScrollTrigger'
// import { useLoaderContext } from '../context/use-loader'

// // context
// // ...
// export const LenisScrollContext = createContext({})

// interface LenisScrollProps {
//   children: React.ReactNode
// }

// // provider
// // ...
// export default function LenisScrollProvider({ children }: LenisScrollProps) {
//   const [lenis, setLenis] = useState<any>(null)
//   const { isLoaded }: any = useLoaderContext()

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger)

//     if (!isLoaded) {
//       window.scrollTo(0, 0)
//       return
//     }

//     const l = new Lenis({
//       lerp: 0.08,
//       wheelMultiplier: 1.55,
//     })

//     l.on('scroll', ScrollTrigger.update)

//     gsap.ticker.add((time) => {
//       l.raf(time * 1000)
//     })

//     gsap.ticker.lagSmoothing(0)

//     setLenis(l)

//     return () => {
//       lenis?.destroy()
//       setLenis(null)
//     }
//   }, [isLoaded])

//   const context = lenis

//   return <LenisScrollContext.Provider value={context}>{children}</LenisScrollContext.Provider>
// }

// // use
// // ...
// export const useLenisContext = () => {
//   return useContext(LenisScrollContext)
// }
