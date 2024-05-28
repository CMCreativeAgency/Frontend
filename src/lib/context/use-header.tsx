'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'
import { useLoaderContext } from './use-loader'

export const HeaderContext = createContext({})

interface HeaderProps {
  children: React.ReactNode
}

export default function HeaderProvider({ children }: HeaderProps) {
  // const [headerOnScroll, setHeaderOnScroll] = useState(false)
  // const [height, setHeight] = useState<number | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const { isLoaded }: any = useLoaderContext()

  useIsomorphicLayoutEffect(() => {
    const header = document.querySelector('header')

    if (!header) return

    let headerHeight = header.offsetHeight
    let prevScroll: any
    let currScroll: any

    // setHeight(headerHeight)
    const scrollHandler = () => {
      currScroll = window.pageYOffset

      if (currScroll > headerHeight) {
        header.classList.add('scroll')

        if (!header.classList.contains('anim')) {
          setTimeout(() => {
            header.classList.add('anim')
          }, 100)
        }
      }

      if (prevScroll > currScroll) {
        header.classList.add('up')
        // setHeaderOnScroll(true)
      } else {
        if (prevScroll !== currScroll) {
          header.classList.remove('up')
          // setHeaderOnScroll(false)
        }
      }

      if (currScroll === 0) {
        header.classList.remove('scroll')
        header.classList.remove('anim')
        header.classList.remove('up')
        // setHeaderOnScroll(false)
      }

      prevScroll = currScroll
    }

    scrollHandler()
    window.addEventListener('touchmove', scrollHandler)
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('wheel', scrollHandler)

    return () => {
      window.removeEventListener('touchmove', scrollHandler)
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('wheel', scrollHandler)
    }
  }, [isLoaded])

  const context = {
    set: {
      color: setColor,
    },
    get: {
      color,
    },
  }

  return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>
}

export const useHeaderContext = () => {
  return useContext(HeaderContext)
}
