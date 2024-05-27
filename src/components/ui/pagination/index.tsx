'use client'
import clsx from 'clsx'
import classes from './index.module.scss'
import { useEffect, useState } from 'react'

interface PaginationProps {
  count: number
  active?: number
}

function Pagination({ count, active }: PaginationProps) {
  const [arrayCount, setArrayCount] = useState<any>([])

  useEffect(() => {
    setArrayCount(Array.from(Array(count).keys()))
  }, [count, active])

  return (
    <span className={classes['pagination']}>
      {arrayCount.map((num: number) => (
        <span key={num} data-id={num} className={clsx(active === num && classes['active'])}></span>
      ))}
    </span>
  )
}

export default Pagination
