'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import classes from './index.module.scss'
import { GetSetProps, MenuItemProps } from '@/lib/types/global'
import Hamburger from '@/components/ui/hamburger'
import MegaMenu from './mega-menu'
import { useHeaderContext } from '@/lib/context/use-header'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useLoaderContext } from '@/lib/context/use-loader'
import Link from 'next/link'

interface HeaderProps {
  menu: MenuItemProps[]
  socials: MenuItemProps[]
  legal: MenuItemProps[]
  copy: string
}

function Header({ menu, socials, legal, copy }: HeaderProps) {
  const [menuState, setMenuState] = useState(false)
  const [color, setColor] = useState()
  const headerRef = useRef<HTMLElement>(null)
  const { get }: any = useHeaderContext()
  const pathname = usePathname()
  const to = useRef<any>()
  const { isLoaded }: any = useLoaderContext()

  useEffect(() => {
    setMenuState(false)
    setColor(get.color ? get.color : 'light')
  }, [pathname, get])

  useEffect(() => {
    if (menuState) {
      clearTimeout(to.current)
      headerRef.current?.classList.add('menu-open')
    } else {
      to.current = setTimeout(() => {
        headerRef.current?.classList.remove('menu-open')
      }, 1200)
    }
  }, [menuState])

  if (!isLoaded) return null

  return (
    <header className={classes[`header-${color}`]} ref={headerRef}>
      <div className="wrapper">
        <Link
          href={'/'}
          className={clsx(classes['header__logo'], classes[color!])}
          aria-label="logo"
        >
          <Image src={`/media/logo-color.png`} width={1} height={1} alt="logo" unoptimized={true} />
          <Image src={`/media/logo.png`} width={1} height={1} alt="logo" unoptimized={true} />
        </Link>

        <p className="caption">
          <span className="f-regular">Creative</span> agency
        </p>

        <Hamburger menuState={menuState} setMenuState={setMenuState} />
      </div>

      <MegaMenu
        state={menuState}
        setMenuState={setMenuState}
        menu={menu}
        socials={socials}
        legal={legal}
        copy={copy}
      />
    </header>
  )
}

export default Header
