'use client'
import { MenuItemProps } from '@/lib/types/global'
import classes from './index.module.scss'
import Button from '@/components/ui/button'
import { VideoProps } from '@/lib/types/ui'
import Video from '@/components/ui/media/video'
import clsx from 'clsx'
import LogoImage from '@public/media/logo-color-big.png'
import Img from '@/components/ui/media/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FooterProps {
  menu: MenuItemProps[]
  socials: MenuItemProps[]
  legal: MenuItemProps[]
  copy: string
  footerHeadingTop: string
  footerHeadingBottom: string
  footerVideo: VideoProps
}

function Footer({
  menu,
  socials,
  legal,
  copy,
  footerHeadingTop,
  footerHeadingBottom,
  footerVideo,
}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)
  const footerWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function resizeHandler() {
      gsap.set(footerRef.current, {
        height: footerWrapperRef.current?.offsetHeight,
      })
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <footer
      className={classes['footer']}
      ref={footerRef}
      data-parallax="free"
      data-params={"{'y': '20%', 'target': '.footer__wrapper', 'mobile': false}"}
      data-end="bottom bottom"
    >
      <div className={clsx(classes['footer__wrapper'], 'footer__wrapper')} ref={footerWrapperRef}>
        <div className="wrapper white">
          <div className={classes['footer__menu']}>
            <ul>
              {menu?.map((item, i) => (
                <li key={item.id}>
                  <Button label={item.label} href={item.href} data-cursor="link" />
                </li>
              ))}
            </ul>
          </div>

          <div className={classes['footer__heading']}>
            <h2
              className="h1 upper"
              dangerouslySetInnerHTML={{ __html: `${footerHeadingTop}` }}
            ></h2>
            <h2
              className="h1 upper"
              dangerouslySetInnerHTML={{ __html: `${footerHeadingBottom}` }}
            ></h2>

            <Img
              fclass={clsx(classes['footer__logo'], 'footer__logo')}
              pclass="mw"
              src={LogoImage.src}
              width={LogoImage.width}
              height={LogoImage.height}
              priority={true}
            />
          </div>

          <div className={classes['footer__bottom']}>
            <ul>
              {socials?.map((item, i) => (
                <li key={item.id}>
                  <Button
                    className="button__brackets"
                    label={item.label}
                    href={item.href}
                    double={true}
                    data-cursor="link"
                  />
                </li>
              ))}
            </ul>

            <ul>
              {legal?.map((item, i) => (
                <li key={item.id}>
                  <Button
                    className="button__brackets"
                    label={item.label}
                    href={item.href}
                    double={true}
                    data-cursor="link"
                  />
                </li>
              ))}
            </ul>

            <p className="s upper">{copy}</p>
          </div>
        </div>
      </div>

      <Video
        figclass={clsx(classes['footer__video'], 'mw')}
        video={footerVideo}
        width="1440"
        height="900"
        loop={true}
        scroll={true}
        muted={true}
        autoPlay={true}
        playsInline={true}
      />
    </footer>
  )
}

export default Footer
