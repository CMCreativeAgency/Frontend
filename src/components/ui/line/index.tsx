import clsx from 'clsx'
import classes from './index.module.scss'

interface LineProps {
  className?: string
}

function Line({ className }: LineProps) {
  return (
    <span
      className={clsx(className, classes['line'])}
      data-enter={`{'tween': 'fill', 'target': 'span', 'scrub': true}`}
    >
      <span></span>
    </span>
  )
}

export default Line
