'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const useDetectBackButton = (): boolean => {
  const pathname = usePathname()
  const historyRef = useRef<string[]>([])
  const [isBack, setIsBack] = useState(false)

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
        setIsBack(true)
        history.pop()
      } else {
        // Forward navigation
        setIsBack(false)
        history.push(currentPath)
      }
    } else {
      // Initial load
      history.push(currentPath)
    }

    historyRef.current = history
  }, [pathname])

  return isBack
}

export default useDetectBackButton
