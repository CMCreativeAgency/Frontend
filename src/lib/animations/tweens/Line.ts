import gsap from 'gsap'

export default class LineTween {
  node: any
  params: any
  target: any

  constructor(element: HTMLElement, params: {}) {
    this.node = gsap.utils.selector(element)
    this.params = params
    this.target = this.params?.target ? this.node(this.params?.target) : element
  }

  prepare() {
    gsap.set(this.target!, {
      width: 0,
      opacity: 0,
      overwrite: true,
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    gsap.to(this.target!, {
      width: '100%',
      opacity: 1,
      delay: this.params.delay ?? 0,
      stagger: this.params.stagger ?? 0.1,
      duration: 1.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  onLeave() {}

  onEnterBack() {}

  onLeaveBack() {}
}

export function lineOnExit(element: HTMLElement, params: any) {
  const node = gsap.utils.selector(element)
  const target = params?.target ? node(params.target) : element
  const tl = gsap.timeline()

  tl.set(target!, {
    left: 'unset',
    right: 0,
  })

  tl.to(target!, {
    width: '0%',
    opacity: 0,
    delay: 0,
    stagger: 0.1,
    duration: 1.4,
    ease: 'power3.out',
  })

  return tl
}
