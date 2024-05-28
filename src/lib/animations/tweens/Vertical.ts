import { gsap } from 'gsap/dist/gsap'

export default class VerticalTween {
  node: any
  params: any
  target: any

  constructor(element: HTMLElement, params: {}) {
    this.node = gsap.utils.selector(element)
    this.params = params
    this.target = this.params?.target
      ? Array.isArray(this.params?.target)
        ? this.params.target?.map((el: any) => this.node(el))
        : this.node(this.params?.target)
      : element
  }

  prepare() {
    gsap.set(this.target, {
      y: this.params.y || 40,
      opacity: this.params.opacity || 1,
      overwrite: true,
      attr: { ['data-anim']: '' },
      backfaceVisibility: 'hidden',
    })
  }

  onEnter() {
    return gsap.to(this.target, {
      y: this.params.to || 0,
      opacity: 1,
      delay: this.params.delay ?? 0,
      stagger: this.params.stagger ?? 0.1,
      duration: this.params.duration ?? 1.4,
      ease: this.params.scrub ? 'none' : 'power2.out',
      overwrite: true,
    })
  }

  onLeave() {
    gsap.set(this.target, {
      y: -50,
      opacity: 0,
      overwrite: true,
    })
  }

  onEnterBack() {
    return gsap.to(this.target, {
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

// export function upOnExit(element: any, params: any) {
//   const node = gsap.utils.selector(element)
//   const target = params?.target ? node(params.target) : element
//   const timeline = gsap.timeline()

//   timeline.to(target, {
//     y: -40,
//     opacity: 0,
//     delay: params?.delay || 0,
//     stagger: params?.stagger || 0.1,
//     duration: 1.4,
//     ease: 'power3.out',
//     overwrite: true,
//   })

//   return timeline
// }
