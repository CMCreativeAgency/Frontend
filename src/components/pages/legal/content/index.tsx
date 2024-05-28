import classes from './index.module.scss'

interface LegaLContentProps {
  data: {
    heading?: string
    content?: string
  }
}

function LegalContent({ data }: LegaLContentProps) {
  const { heading, content } = data

  return (
    <section className={classes['content']}>
      <div className="wrapper">
        <h1 className='f-roman'>{heading}</h1>

        <div className={classes["content__text"]} dangerouslySetInnerHTML={{ __html: `${content}` }}></div>
      </div>
    </section>
  )
}

export default LegalContent
