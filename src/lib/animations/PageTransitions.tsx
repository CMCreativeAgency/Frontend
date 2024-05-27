// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { upOnExit } from './tweens/Up'
// import { imagesOnExit } from './tweens/loader/Images'
// import gsap from 'gsap'
// import { usePathname, useRouter } from 'next/navigation'
// import { downOnExit } from './tweens/Down'
// import { leftOnExit } from './tweens/Left'
// import { rightOnExit } from './tweens/Right'
// import { lineOnExit } from './tweens/Line'
// import { opacityOnExit } from './tweens/Opacity'
// import { portfolioImagesOnExit } from './tweens/PortfolioImages'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// interface PageTransitionsProps {
//   children: React.ReactNode
// }

// // declaring tyoe for custom events
// // ...
// declare global {
//   interface GlobalEventHandlersEventMap {
//     customRouteChange: any
//   }
// }

// // tweens declaration
// // ...
// const Tweens: any = {
//   // up: upOnExit,
//   // down: downOnExit,
//   // left: leftOnExit,
//   // right: rightOnExit,
//   // line: lineOnExit,
//   // opacity: opacityOnExit,
//   // images: imagesOnExit,
//   // portfolioImages: portfolioImagesOnExit,
// }

// export default function PageTransitions({ children }: PageTransitionsProps) {
//   const [isTransition, setIsTransition] = useState(false)
//   // const timeline = useRef(gsap.timeline({ paused: true }))
//   // const timeout = useRef(0)
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     // function exitAnimations(path?: string) {
//     //   const animations = gsap.utils.toArray(['.inView[data-exit]', '[data-prevent]'])

//     //   animations.forEach((animEl: any, i: number) => {
//     //     const exitAnim = JSON.parse(animEl.dataset?.exit.replaceAll("'", '"'))
//     //     const prevent = animEl.dataset?.prevent

//     //     if (
//     //       (prevent && path?.includes(prevent)) ||
//     //       (prevent?.includes('!') && !path?.includes(prevent.split('!')[1]))
//     //     )
//     //       return

//     //     const exitTween = new Tweens[exitAnim.tween](animEl, exitAnim)
//     //     const exitDuration = exitTween.duration()

//     //     timeout.current = exitDuration > timeout.current ? exitDuration : timeout.current
//     //     timeline.current.add(exitTween, i > 0 ? '<' : '')
//     //   })
//     // }

//     function customRouteChange(e: any) {
//       const path = e.detail.pathname
//       ScrollTrigger.getAll().forEach((st: any) => st.kill())

//       // timeline.current.clear()
//       // timeout.current = 0

//       // exitAnimations(path)

//       // timeline.current.play()

//       // const to = timeout.current * 1000 - 500

//       setTimeout(
//         () => {
//           // setIsTransition(true)
//           router.push(path)
//         },
//         1000
//         // to < 1000 ? 1200 : to
//       )
//     }

//     window.addEventListener('customRouteChange', customRouteChange)
//     return () => window.removeEventListener('customRouteChange', customRouteChange)
//   }, [])

//   useEffect(() => {
//     if (isTransition) {
//       setTimeout(() => {
//         setIsTransition(false)
//         document.documentElement.classList.remove('transition')
//       }, 100)
//     }
//   }, [pathname])

//   return (
//     <>
//       {children}
//       {isTransition && <span className="transition-overlay"></span>}
//     </>
//   )
// }
