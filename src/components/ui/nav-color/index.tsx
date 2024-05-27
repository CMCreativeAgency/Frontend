'use client'

import { useHeaderContext } from '@/lib/context/use-header'
import { useEffect } from 'react'

interface NavColorProps {
  color?: string
}

function NavColor({ color }: NavColorProps) {
  const { set, get }: any = useHeaderContext()

  useEffect(() => {
    set.color(color)
  }, [color])

  return <></>
}

export default NavColor
