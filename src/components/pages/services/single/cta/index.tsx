'use client'
import { ServiceCTAProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Link from 'next/link'
import Button from '@/components/ui/button'
import ScrollingText from '@/components/ui/scrolling-text'
import { useBreakpointsContext } from '@/lib/context/use-breakpoints'

function ServiceCTA({ data }: ServiceCTAProps) {
  const { heading, content, button, email, socials } = data
  const { device }: any = useBreakpointsContext()

  return (
    <section className={classes['cta']}>
      <div className="wrapper">
        {device === 'desktop' && (
          <Link
            aria-label="contact"
            href={button?.href!}
            data-cursor="text"
            data-cursor-text="contact"
            data-cursor-scale="3.21"
          >
            <h2
              className="display upper h1m"
              dangerouslySetInnerHTML={{ __html: `${heading}` }}
            ></h2>
          </Link>
        )}

        {device === 'mobile' && (
          <>
            <h2
              className="display upper h1m"
              dangerouslySetInnerHTML={{ __html: `${heading}` }}
            ></h2>
            <Link aria-label="contact" href={button?.href!} className={classes['cta__button']}>
              <ScrollingText speed={0.2} count={5} className="p upper" text={button?.label!} />
            </Link>
          </>
        )}

        <div className={classes['cta__info']}>
          <p className="l">{content}</p>

          <div className={classes['cta__email']}>
            <p className="m o5">{email?.label}</p>

            <Link className="l" href={`mailto: ${email?.href}`}>
              {email?.href}
            </Link>
          </div>

          <ul>
            {socials?.map((item, i) => (
              <li key={item.id}>
                <Button
                  className="button__brackets"
                  label={item.label}
                  href={item.href}
                  double={true}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ServiceCTA
