import { ContactCareersProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Button from '@/components/ui/button'

function ContactCareers({ data }: ContactCareersProps) {
  const { heading, content, button } = data

  return (
    <section className={classes['careers']}>
      <div className="wrapper">
        <h2
          className="upper"
          dangerouslySetInnerHTML={{ __html: `${heading}` }}
          data-enter={`{'tween': 'title', 'target': '.lines', 'delay': 0.1}`}
          data-split={`{'type': 'lines', 'wrapper': 'lines'}`}
        ></h2>

        <div className={classes['careers__content']}>
          <p className="xl">{content}</p>
          <Button label={button?.label} href={button?.href} className="xl orange" />
        </div>
      </div>
    </section>
  )
}

export default ContactCareers
