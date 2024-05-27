'use client'
import classes from './index.module.scss'
import ArrowRight from '@/components/svg/arrows/ArrowRight'
import Button from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BaseSyntheticEvent, useRef } from 'react'

interface MegaMenuItemProps {
  href: string
  label: string
  index: number
  setMenuState: any
}

function MegaMenuItem({ href, label, index, setMenuState }: MegaMenuItemProps) {
  const to = useRef<any>()
  const clickTO = useRef<any>()
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === href && true

  function onMouseEnter(e: BaseSyntheticEvent) {
    clearTimeout(to.current)
    e.target.classList.add('hover')
  }

  function onMouseLeave(e: BaseSyntheticEvent) {
    to.current = setTimeout(() => {
      e.target.classList.remove('hover')
    }, 200)
  }

  function onClick(e: BaseSyntheticEvent) {
    e.preventDefault()
    setMenuState(false)
    clearTimeout(clickTO.current)

    clickTO.current = setTimeout(() => {
      router.push(href)
    }, 1000)
  }

  return (
    <Link
      href={href as string}
      className={clsx(classes['mega-menu-item'], isActive && classes['active'])}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-cursor="link"
    >
      <p>(0{index + 1})</p>
      <span className={classes['mega-menu-item__label']}>
        <p className="upper">{label}</p>
        <p className="upper f-regular">{label}</p>
      </span>

      <span className={classes['mega-menu-item__arrow']}>
        <ArrowRight />
      </span>

      <span className={classes['mega-menu-item__line']}></span>
    </Link>
  )
}

export default MegaMenuItem
