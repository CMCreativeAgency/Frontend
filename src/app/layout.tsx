import '@/styles/critical.scss'

import { Metadata } from 'next'
import FontsLocal from '@/components/ui/fonts'

export const metadata: Metadata = {
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        href: '/favicon/favicon-16x16.png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        href: '/favicon/favicon-32x32.png',
      },
      {
        url: '/favicon/favicon-192x192.png',
        href: '/favicon/apple-touch-icon.png',
      },
    ],
  },
}

function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className='loader hidden'>
      <body>
        <FontsLocal />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
