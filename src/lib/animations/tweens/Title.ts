import gsap from 'gsap'

export default class TitleTween {
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
      y: '100%',
      opacity: 1,
      rotate: '8deg',
      overwrite: true,
      transformOrigin: 'left center',
    })
  }

  onEnter() {
    gsap.to(this.target!, {
      y: 0,
      delay: this.params.delay ?? 0,
      rotate: 0,
      stagger: this.params.stagger ?? 0.15,
      duration: 1.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  onLeave() {
    gsap.set(this.target, {
      y: -50,
      opacity: 0,
      rotate: 0,
      overwrite: true,
    })
  }

  onEnterBack() {
    gsap.to(this.target, {
      y: 0,
      opacity: 1,
      delay: this.params.delay ?? 0,
      stagger: this.params.stagger ?? 0.1,
      duration: this.params.duration ?? 0.8,
      ease: this.params.scrub ? 'none' : 'power2.out',
      overwrite: true,
    })
  }

  onLeaveBack() {
    this.prepare()
  }
}

// export function downOnExit(element: HTMLElement, params: any) {
//   const node = gsap.utils.selector(element)
//   const target = params?.target ? node(params.target) : element
//   const tl = gsap.timeline()

//   tl.to(target!, {
//     y: 60,
//     opacity: 0,
//     duration: 1.4,
//     ease: 'power3.out',
//   })

//   return tl
// }
