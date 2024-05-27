import { ButtonProps, ImageProps, ImagesProps, TextProps, VideoProps } from './ui'
import { type } from 'os'

// export type PageProps<T> = {
//   id: number
//   title: string
//   slug: string
//   blocks: T
// }

export type NotFoundProps = {
  data: {
    heading: string
    content: string
    button: ButtonProps
  }
}

export type HomeHeroProps = {
  data: {
    heading?: string
    content?: string
    video?: VideoProps
  }
}

export type HomeProjectsProps = {
  data: {
    heading?: string
    content?: string
    projects?: {
      data: ProjectItemProps[]
    }
    button?: ButtonProps
  }
}

export type HomeStrategyProps = {
  data: {
    heading?: string
    content?: string
  }
}

export type HomeTestimonialsProps = {
  data: {
    heading?: string
    items?: {
      id: number
      content?: string
      name?: string
      role?: string
    }[]
  }
}

export type ProjectItemProps = {
  id: number
  attributes: {
    title?: string
    slug?: string
    featuredImage: ImageProps
  }
}

export type AboutHeroProps = {
  data: {
    heading?: string
    images?: {
      data: {
        id: number
        attributes: {
          url?: string
          name?: string
          width?: number
          height?: number
          alternativeText?: string
        }
      }[]
    }
  }
}

export type AboutIntroProps = {
  data: {
    video?: VideoProps
    poster?: ImageProps
    content?: string
  }
}

export type AboutSolutionsProps = {
  data: {
    heading?: string
    content?: string
    image?: ImageProps
  }
}

export type AboutLimitsProps = {
  data: {
    heading?: string
    subhead?: string
    content?: string
  }
}

export type ServicesHeroProps = {
  data: {
    heading?: string
    subhead?: string
    content?: string
  }
}

export type ServiceHeroProps = {
  data: {
    heading?: string
    subhead?: string
    content?: string
    featuredImage?: ImageProps
  }
}

export type ServiceInfoProps = {
  data: {
    items: {
      id: number
      heading?: string
      content?: string
    }[]
    image: ImageProps
  }
}

export type ServiceRelatedProps = {
  data: {
    heading?: string
    projects?: {
      data: ProjectItemProps[]
    }
  }
}

export type ServiceCTAProps = {
  data: {
    heading?: string
    content?: string
    button?: ButtonProps
    email?: ButtonProps
    socials?: ButtonProps[]
  }
}

export type GivebackHeroProps = {
  data: {
    heading?: string
    subhead?: string
    content?: string
  }
}

export type GivebackHistoryProps = {
  data: {
    heading?: string
    subhead?: string
    content?: string
    image?: ImageProps
    url?: string
  }
}

export type GivebackPlansProps = {
  data: {
    heading?: string
    content?: string
    image?: ImageProps
  }
}

export type ProjectsHeroProps = {
  data: {
    heading?: string
    content?: string
  }
}

export type ProjectHeroProps = {
  data: {
    url?: string
    heading?: string
    image?: ImageProps
    featuredImage?: ImageProps
  }
}

export type ProjectServicesProps = {
  data: {
    title?: string
    items?: {
      id: number
      content?: string
    }[]
    image?: ImageProps
  }
}

export type ProjectContentProps = {
  data: {
    items: {
      id: number
      heading?: string
      content?: string
      color?: string
      background?: string
    }[]
  }
}

export type ProjectMediaProps = {
  data: {
    video?: VideoProps
    image?: ImageProps
  }
}

export type SharedMarqueeProps = {
  data: {
    content?: string
    parallax?: boolean
  }
}

export type SharedServicesProps = {
  data: {
    services: {
      data: ProjectItemProps[]
    }
  }
}

export type SharedCTAProps = {
  data: {
    heading?: string
    content?: string
    button?: ButtonProps
    theme?: string
  }
}

export type SharedRelatedProps = {
  data: {
    heading?: string
    project?: {
      data: ProjectItemProps
    }
    post?: {
      data: ProjectItemProps
    }
    theme?: string
  }
}

export type NewsHeroProps = {
  data: {
    heading?: string
    content?: string
  }
}

export type PostHeroProps = {
  data: {
    heading?: string
    readtime?: string
    publishedAt?: string
    image?: ImageProps
    categories?: {
      data: {
        id: number
        attributes?: {
          title?: string
          slug?: string
        }
      }[]
    }
  }
}

export type PostContentProps = {
  data: {
    content?: any
  }
}

export type ContactHeroProps = {
  data: {
    heading?: string
    content?: string
  }
}

export type ContactFormProps = {
  data: {
    heading?: string
    subhead?: string
    button?: ButtonProps
    socials?: ButtonProps[]
    content?: string
    video?: VideoProps
    form?: {
      data?: {
        attributes?: {
          title?: string
          slug?: string
          fields?: any
        }
      }
    }
  }
}

export type ContactCareersProps = {
  data: {
    heading?: string
    content?: string
    button?: ButtonProps
  }
}

export type PageProps = {
  params: {
    slug: string
  }
}
