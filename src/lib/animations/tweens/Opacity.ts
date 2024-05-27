import gsap from 'gsap'

export default class TweenOpacity {
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
      y: 50,
      opacity: 0,
      overwrite: true,
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    gsap.to(this.target!, {
      y: 0,
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

// export function opacityOnExit(element: HTMLElement, params: any) {
//   const node = gsap.utils.selector(element)
//   const target = params?.target ? node(params.target) : element
//   const tl = gsap.timeline()

//   tl.to(target!, {
//     opacity: 0,
//     delay: 0,
//     stagger: 0.1,
//     duration: 1.4,
//     ease: 'power3.out',
//   })

//   return tl
// }
