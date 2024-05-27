'use client'
import { SharedCTAProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Img from '@/components/ui/media/image'
import LogoImage from '@public/media/logo-color-big.png'
import Link from 'next/link'
import Button from '@/components/ui/button'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'
import ScrollingText from '@/components/ui/scrolling-text'

function SharedCTA({ data }: SharedCTAProps) {
  const { heading, content, button, theme } = data
  const { device }: any = useBreakpointsContext()

  return (
    <section className={classes[`cta-${theme}`]}>
      <div className="wrapper center">
        <Link
          href={button?.href || ''}
          className={classes['cta__content']}
          data-cursor="marquee"
          data-cursor-color={theme === 'dark' ? '#fff' : '#000'}
          data-cursor-text={button?.label}
        >
          <h2 className="h1 upper" dangerouslySetInnerHTML={{ __html: `${heading}` }}></h2>
          <p className="">{content}</p>

          {device === 'mobile' && (
            <div className={classes['cta__scrolling']}>
              <ScrollingText speed={0.2} count={5} className="p upper" text={button?.label!} />
            </div>
          )}

          <Img
            fclass={classes['cta__logo']}
            pclass="mw"
            src={LogoImage.src}
            width={LogoImage.width}
            height={LogoImage.height}
            parallax="free"
            params={"{'y': 150, 'target': 'picture', 'full': 'true'}"}
          />
        </Link>
      </div>
    </section>
  )
}

export default SharedCTA
