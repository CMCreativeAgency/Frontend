import gsap from 'gsap'

export default class MediaParallax {
  node: any
  scale: number
  target: any

  constructor(element: HTMLElement, params: any) {
    this.node = gsap.utils.selector(element)
    this.scale = params?.scale || 1.2
    this.target = this.node('img').length ? this.node('img') : this.node('video')
  }

  prepare() {
    gsap.set(this.target, {
      transformOrigin: 'top center',
    })
  }

  animate(direction: string = 'y') {
    const elementOffset =
      direction === 'y' ? this.target[0].offsetHeight : this.target[0].offsetWidth
    const moveOffset = elementOffset * this.scale - elementOffset
    const tl = gsap.timeline()
    if (direction === 'x') {
      tl.fromTo(
        this.target,
        {
          x: -moveOffset / 2,
        },
        {
          x: moveOffset / 2,
          ease: 'linear',
        }
      )
    }
    if (direction === 'y') {
      tl.fromTo(
        this.target,
        {
          y: -moveOffset / 2,
        },
        {
          y: moveOffset / 2,
          ease: 'linear',
        }
      )
    }
    return tl
  }
}
