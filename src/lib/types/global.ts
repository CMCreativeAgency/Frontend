import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type GetSetProps<T> = {
  set: {
    [name: string]: (param: any) => any
  }
  get: {
    [name: string]: T
  }
}

export type MenuItemProps = {
  id: number
  href?: string
  label: string
  target?: string | null
}

export type Menus = {
  id: number
  title?: string
  items: [MenuItemProps]
}

// For pages with nested layouts
// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout: (page: ReactElement) => ReactNode
// }

// export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
//   Component: NextPageWithLayout<P, IP>
// }
