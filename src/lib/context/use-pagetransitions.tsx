'use client'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const PageTransitionContext = createContext({})

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransitionProvider({ children }: PageTransitionProps) {
  const [routeChanged, setRouteChanged] = useState<any>(false)
  const pathname = usePathname()
  const to = useRef<any>()

  useEffect(() => {
    clearTimeout(to.current)

    to.current = setTimeout(() => {
      window.scrollTo(0, 0)
      setRouteChanged(pathname)
    }, 100)
  }, [pathname])

  const context = {
    routeChanged,
  }

  return <PageTransitionContext.Provider value={context}>{children}</PageTransitionContext.Provider>
}

export const usePageTransitionContext = () => {
  return useContext(PageTransitionContext)
}
