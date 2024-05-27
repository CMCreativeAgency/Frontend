'use client'
import { useEffect, useRef, useState } from 'react'
import GoogleTagManager from './gtm'
import CookieBot from './cookiebot'

function ThirdParty() {
  const [isLoaded, setIsLoaded] = useState(false)
  const to = useRef<any>()

  useEffect(() => {
    const eventHandler = () => {
      clearTimeout(to.current)
      setIsLoaded(true)
    }

    to.current = setTimeout(() => setIsLoaded(true), 3500)

    document.addEventListener('scroll', eventHandler)
    document.addEventListener('mousemove', eventHandler)
    document.addEventListener('touchstart', eventHandler)

    return () => {
      document.removeEventListener('scroll', eventHandler)
      document.removeEventListener('mousemove', eventHandler)
      document.removeEventListener('touchstart', eventHandler)
    }
  }, [])

  if (!isLoaded) return null

  return (
    <>
      <CookieBot />
      <GoogleTagManager />
    </>
  )
}

export default ThirdParty
