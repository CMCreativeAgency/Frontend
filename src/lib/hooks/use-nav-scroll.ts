import { useEffect } from 'react'

export function useNavScroll(headerRef: any) {
  useEffect(() => {
    if (!headerRef) return
    let headerHeight = headerRef.current.offsetHeight
    let prevScroll: any
    let currScroll: any

    const scrollHandler = () => {
      currScroll = window.pageYOffset

      if (currScroll > headerHeight) {
        headerRef.current.classList.add('scroll')

        if (!headerRef.current.classList.contains('anim')) {
          setTimeout(() => {
            headerRef.current.classList.add('anim')
          }, 100)
        }
      }

      if (prevScroll > currScroll) {
        headerRef.current.classList.add('up')
      } else {
        if (prevScroll !== currScroll) {
          headerRef.current.classList.remove('up')
        }
      }

      if (currScroll === 0) {
        headerRef.current.classList.remove('scroll')
        headerRef.current.classList.remove('anim')
        headerRef.current.classList.remove('up')
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
  }, [headerRef])
}
