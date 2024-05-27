import { ReactElement } from 'react'

export type AnimationPresetsProps = {
  [name: string]: () => any
}

export type AnimationProps = {
  children: ReactElement
  target?: string
  tween: string
  exitTween?: string
  delay?: number
  duration?: number
  stagger?:
    | {
        each: number
        from: string
        ease: string
      }
    | number
  start?: string
  end?: string
  split?: {
    type: string
    wrapper: string
  }
}

export type TweenProps = {
  [name: string]: new (
    target?: string,
    delay?: number,
    stagger?:
      | {
          each: number
          from: string
          ease: string
        }
      | number,
    duration?: number
  ) => any
}
