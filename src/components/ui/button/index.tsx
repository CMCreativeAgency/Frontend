'use client'
import classes from './index.module.scss'
import { BaseSyntheticEvent, ReactNode, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  Icon?: ReactNode
  IconBefore?: ReactNode
  label?: string
  double?: string | boolean
  menuItem?: boolean
  className?: string
  children?: ReactNode
} & any

function Button({
  Icon,
  IconBefore,
  label,
  double,
  menuItem,
  className,
  children,
  ...props
}: ButtonProps) {
  const { href } = props
  const buttonRef = useRef()
  const pathname = usePathname()
  const content = children ?? label
  const ButtonElement = href ? Link : 'button'
  const isActive = menuItem && pathname === href && classes['active']

  const classNames = className
    ?.split(' ')
    .map((value: string) => (value.includes('button') ? classes[`${value}`] : value))

  function onClick(e: BaseSyntheticEvent) {
    // console.log(e);
    // if (ButtonElement !== 'button') {
    //   // preventing default link behaviour and fireing
    //   // custom event for page transition animations
    //   // setting class "transition" to prevent od
    //   // animation behaviour
    //   // document.documentElement.classList.add('transition')
    //   e.preventDefault()
    //   window.dispatchEvent(
    //     new CustomEvent('customRouteChange', {
    //       detail: { pathname: e.target.parentElement.pathname },
    //     })
    //   )
    // }
  }

  return (
    <ButtonElement
      ref={buttonRef}
      // onClick={onClick}
      aria-label={content && content}
      className={clsx(classNames, isActive)}
      {...props}
    >
      {IconBefore && <span className={classes['button__icon--before']}>{IconBefore}</span>}

      <span>
        <span className={classes['button__text']}>{content}</span>
        {double && (
          <span className={classes['button__text']}>
            {typeof double === 'string' ? double : content}
          </span>
        )}
      </span>

      {Icon && <span className={classes['button__icon']}>{Icon}</span>}
    </ButtonElement>
  )
}

export default Button
