'use client'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any
  }
}

function GoogleTagManager() {
  const pathname = usePathname()
  const ID = 'GTM-PDZ2LVGH'

  useEffect(() => {
    const mainDataLayer = {
      event: 'pageview',
      url: location.href,
      path: pathname,
      page_title: document.title,
      hostname: location.hostname,
      path_query: pathname,
    }

    window.onload = () => window.dataLayer?.push({ ...mainDataLayer })

    gtmVirtualPageView(mainDataLayer)
  }, [pathname])

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${ID}');
        `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: ` 
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=${ID}"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            }}></iframe>`,
        }}
      ></noscript>
    </>
  )
}

export default GoogleTagManager

export const gtmVirtualPageView = (rest: any) => {
  window.dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  })
}
