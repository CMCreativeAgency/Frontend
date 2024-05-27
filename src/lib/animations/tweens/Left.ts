import gsap from 'gsap'

export default class LeftTween {
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
      x: 60,
      opacity: 0,
      overwrite: true,
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    gsap.to(this.target!, {
      x: 0,
      opacity: 1,
      delay: this.params.delay ?? 0,
      stagger: {
        each: this.params.stagger ?? 0.1,
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

export function leftOnExit(element: HTMLElement, params: any) {
  const node = gsap.utils.selector(element)
  const target = params?.target ? node(params.target) : element
  const tl = gsap.timeline()

  tl.to(target!, {
    x: -60,
    opacity: 0,
    delay: params.delay || 0,
    stagger: params.stagger || 0.1,
    duration: 1.4,
    ease: 'power3.inOut',
    overwrite: true
  })

  return tl
}
