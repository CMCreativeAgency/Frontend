// 'use client'

// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { usePathname } from 'next/navigation'
// import { useEffect, useRef, useState } from 'react'

// function ScrollToTop({ children }: any) {
//   const [newChildren, setNewChildren] = useState<React.ReactNode>(null)
//   const [overlay, setOverlay] = useState(false)
//   const pathname = usePathname()
//   const to = useRef<any>()

//   useEffect(() => {
//     clearTimeout(to.current)
//     setOverlay(true)

//     to.current = setTimeout(() => {
//       lenis?.scrollTo(0, {
//         immediate: true,
//       })
//       window.scrollTo(0, 0)
//       setNewChildren(children)
//       ScrollTrigger.refresh()
//       setOverlay(false)
//     }, 100)
//   }, [pathname])

//   return (
//     <>
//       {/* {overlay && <span className="overlay"></span>} */}
//       {newChildren}
//     </>
//   )
// }

// export default ScrollToTop
