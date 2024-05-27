'use client'
import clsx from 'clsx'
import classes from './index.module.scss'
import { MenuItemProps } from '@/lib/types/global'
import Button from '@/components/ui/button'
import MegaMenuItem from './item'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MegaMenuProps {
  state: boolean
  setMenuState: any
  menu: MenuItemProps[]
  socials: MenuItemProps[]
  legal: MenuItemProps[]
  copy: string
}

function MegaMenu({ state, menu, socials, legal, copy, setMenuState }: MegaMenuProps) {
  const tlRef = useRef<any>()
  const tlExitRef = useRef<any>()
  const ref = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLUListElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const itemsNode = gsap.utils.selector(itemsRef)
      const items = itemsNode('li span:first-of-type')
      const lines = itemsNode('li span:last-of-type')
      const tl = gsap.timeline({ paused: true })

      tl.to(ref.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'expo.inOut',
      })

      tl.fromTo(
        items,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=.7'
      )

      tl.fromTo(
        lines,
        {
          left: 0,
          right: 'unset',
          width: 0,
        },
        {
          width: '100%',
          stagger: 0.06,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        '<'
      )

      tlRef.current = tl
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    state ? tlRef.current.play(0) : tlRef.current.reverse()
  }, [state])

  return (
    <nav className={clsx(classes['mega-menu'], state && classes['active'], 'white')} ref={ref}>
      <div className="wrapper">
        <div className={classes['mega-menu__nav']}>
          <ul ref={itemsRef}>
            {menu?.map((item, i) => (
              <li key={item.id}>
                <MegaMenuItem
                  label={item.label}
                  href={item.href as string}
                  index={i}
                  setMenuState={setMenuState}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={classes['mega-menu__socials']}>
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
        </div>
        <div className={classes['mega-menu__legal']}>
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
        </div>

        <p className="s upper">{copy}</p>
      </div>
    </nav>
  )
}

export default MegaMenu
