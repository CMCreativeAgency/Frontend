import gsap from 'gsap'

export default class PortfolioImagesTween {
  node: any
  params: any
  target: any

  constructor(element: HTMLElement, params: {}) {
    this.node = gsap.utils.selector(element)
    this.params = params
    this.target = this.params?.target ? this.node(this.params?.target) : element
  }

  prepare() {
    gsap.set(this.node('.overlay'), {
      top: 'unset',
      bottom: -1,
      height: '104%',
      width: '100%',
      overwrite: true,
      attr: { ['data-anim']: '' },
      backfaceVisibility: 'hidden',
    })

    gsap.set(this.node('picture'), {
      scale: 1.2,
      opacity: 0,
      overwrite: true,
      attr: { ['data-anim']: '' },
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    gsap.to(this.node('.overlay'), {
      height: '0%',
      delay: this.params.delay ?? 0,
      stagger: {
        each: -this.params.stagger ?? -0.1,
        from: 'end',
        ease: 'none',
      },
      duration: 1.4,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(this.node('picture'), {
      scale: 1,
      opacity: 1,
      delay: this.params.delay ?? 0,
      stagger: {
        each: -this.params.stagger ?? -0.1,
        from: 'end',
        ease: 'none',
      },
      duration: 1.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  onLeave() {}

  onEnterBack() {}

  onLeaveBack() {}
}

export function portfolioImagesOnExit(element: HTMLElement, params: any) {
  const node = gsap.utils.selector(element)
  const timeline = gsap.timeline()
  const overlay = node('.overlay')
  const picture = node('picture')

  gsap.set(overlay, {
    top: 0,
    left: 0,
    bottom: 'unset',
    height: '0',
    width: '100%',
    overwrite: true,
  })

  timeline?.to(overlay, {
    height: '104%',
    delay: params.delay || 0,
    stagger: {
      each: -0.065,
      from: 'end',
      ease: 'none',
    },
    duration: 1.4,
    ease: 'power3.inOut',
    overwrite: true,
  })

  timeline.to(
    picture,
    {
      // opacity: 0,
      scale: 1.2,
      delay: params.delay || 0,
      stagger: {
        each: -0.065,
        from: 'end',
        ease: 'none',
      },
      perspective: '1000px',
      duration: 1.4,
      ease: 'power3.inOut',
      overwrite: true,
    },
    '<'
  )

  return timeline
}
