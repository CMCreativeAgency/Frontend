export type ButtonProps = {
  id: number
  label: string
  href?: string
  class?: string
  target?: string
}

export interface ContactItemProps extends ButtonProps {
  title: string
}

export type ImagesProps = {
  data?: ImageProps[]
}

export type ImageProps = {
  data?: {
    id: number
    attributes: {
      url?: string
      name?: string
      width?: number
      height?: number
      alternativeText?: string
    }
  }
}

export type VideoProps = {
  data: {
    id: number
    attributes: {
      url: string
      name: string
      width: number
      height: number
      alternativeText: string
    }
  }
}

export type VideoElementProps = {
  lazy: boolean
  children?: React.ReactNode
  playButton?: boolean
  controls?: boolean
  video: VideoProps
  className?: string
  aspect?: string | number | undefined
  aspectMobile?: string | number | undefined
  figclass?: string
} & any

export type InputProps = {
  id: number
  placeholder?: string
  error: string | undefined
  type: string
  name: string
  required?: boolean
}

export type FormProps = {
  id: number
  heading?: string
  form: {
    title?: string
    input: InputProps[]
    submit: ButtonProps
  }
}

export type TextProps = {
  id: number
  text: string
}
