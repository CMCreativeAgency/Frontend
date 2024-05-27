'use client'
import localFont from 'next/font/local'

const GinqailFontRegular = localFont({
  src: '../../../../public/fonts/GinqailFontRegular.woff2',
  variable: '--font-regular',
  preload: true,
})

const NeueHaasDisplayRoman = localFont({
  src: '../../../../public/fonts/NeueHaasDisplay-Roman.woff2',
  variable: '--font-roman',
  preload: true,
})

const NeueHaasDisplayMedium = localFont({
  src: '../../../../public/fonts/NeueHaasDisplay-Medium.woff2',
  variable: '--font-medium',
  preload: true,
})

function FontsLocal() {
  return (
    <style jsx global>
      {`
        :root {
          --font-regular: ${GinqailFontRegular.style.fontFamily};
          --font-roman: ${NeueHaasDisplayRoman.style.fontFamily};
          --font-medium: ${NeueHaasDisplayMedium.style.fontFamily};
        }
      `}
    </style>
  )
}

export default FontsLocal
