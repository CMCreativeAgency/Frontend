import gsap from 'gsap'

export default class ImagesTween {
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
      top: 0,
      width: '104%',
      height: '104%',
      overwrite: true,
      attr: { ['data-anim']: '' },
      backfaceVisibility: 'hidden',
    })

    gsap.set(this.node('picture'), {
      scale: 1.2,
      overwrite: true,
      attr: { ['data-anim']: '' },
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    gsap.to(this.node('.overlay'), {
      width: '0%',
      delay: this.params.delay ?? 0,
      stagger: {
        each: -this.params.stagger ?? -0.1,
        from: 'end',
        ease: 'none',
      },
      duration: this.params?.duration || 1.4,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(this.node('picture'), {
      scale: 1,
      delay: this.params.delay ?? 0,
      stagger: {
        each: -this.params.stagger ?? -0.1,
        from: 'end',
        ease: 'none',
      },
      duration: this.params?.duration || 1.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  onLeave() {}

  onEnterBack() {}

  onLeaveBack() {}
}

export function imagesOnExit(element: HTMLElement, params: any) {
  const node = gsap.utils.selector(element)
  const timeline = gsap.timeline()
  const overlay = node('.overlay')
  const picture = node('picture')

  gsap.set(overlay, {
    top: -1,
    bottom: -1,
    right: 'unset',
    left: -1,
    width: '0',
    height: '104%',
    overwrite: true,
  })

  timeline?.to(overlay, {
    width: '104%',
    delay: params?.delay || 0,
    stagger: {
      each: -0.065,
      from: 'end',
      ease: 'none',
    },
    duration: params?.duration || 1.4,
    ease: 'power3.inOut',
    overwrite: true,
  })

  timeline.to(
    picture,
    {
      scale: 1.2,
      delay: params.delay || 0,
      stagger: {
        each: -0.065,
        from: 'end',
        ease: 'none',
      },
      duration: params?.duration || 1.4,
      ease: 'power3.inOut',
      overwrite: true,
    },
    '<'
  )

  return timeline
}
