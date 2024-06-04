'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'

const useDetectBackButton = () => {
  const lenis = useLenis()
  const pathname = usePathname()
  const historyRef = useRef<string[]>([])

  useEffect(() => {
    const currentPath = pathname
    const history = historyRef.current

    if (history.length > 0) {
      const previousPath = history[history.length - 1]

      if (currentPath === previousPath) {
        // Ignore if the path hasn't changed
        return
      }

      if (history.includes(currentPath)) {
        // Backward navigation

        history.pop()
      } else {
        // Forward navigation
        history.push(currentPath)
      }
    } else {
      // Initial load
      history.push(currentPath)
    }

    historyRef.current = history
  }, [pathname])
}

export default useDetectBackButton
