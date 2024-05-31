// 'use client'
// // hooks/useDisableBackButton.js
// import { useEffect, useRef, useState } from 'react'
// import { usePathname, useRouter } from 'next/navigation'

// const useDisableBackButton = () => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const prevPathname = useRef<any>(null)
//   const [pageChanged, setPageChanged] = useState(false)

//   useEffect(() => {
//     const handleBeforeUnload = (event: any) => {
//       if (event.currentTarget.performance.navigation.type !== 1) {
//         event.preventDefault()
//         event.returnValue = '' // Chrome requires returnValue to be set
//       }
//     }

//     const handlePopState = () => {
//       // Push a new state to the history stack, effectively preventing back navigation
//       history.pushState(null, '', pathname)
//       if (prevPathname.current) {
//         router.push(prevPathname.current)
//       }
//     }

//     // Add event listeners
//     window.addEventListener('beforeunload', handleBeforeUnload)
//     window.addEventListener('popstate', handlePopState)

//     // Initialize history state
//     history.pushState(null, '', pathname)

//     setPageChanged(true)
//     return () => {
//       // Remove event listeners on cleanup
//       prevPathname.current = pathname
//       window.removeEventListener('beforeunload', handleBeforeUnload)
//       window.removeEventListener('popstate', handlePopState)
//     }
//   }, [pathname])
// }

// export default useDisableBackButton
