import { useEffect } from 'react'

function CookieBot() {
  const CBID = 'c4095e82-716f-44bc-8223-f0264950811a'

  useEffect(() => {
    let script = document.createElement('script')
    script.setAttribute('data-blockingmode', 'manual')
    script.setAttribute('data-cbid', CBID)
    script.type = 'text/javascript'
    script.src = `https://consent.cookiebot.com/uc.js`

    document.head.prepend(script)
  }, [])

  return null
}

export default CookieBot
