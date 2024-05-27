'use client'
import { useEffect, useRef } from 'react'
import classes from './index.module.scss'

function CookieBotDeclaration() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return
    const script = document.createElement('script')
    script.async = true
    script.id = 'CookieDeclaration'
    script.type = 'text/javascript'
    script.src = 'https://consent.cookiebot.com/c4095e82-716f-44bc-8223-f0264950811a/cd.js'

    wrapperRef.current.appendChild(script)
  }, [])

  return (
    <section className={classes['cookiebot-declaration']}>
      <div className="wrapper" ref={wrapperRef}></div>
    </section>
  )
}

export default CookieBotDeclaration
