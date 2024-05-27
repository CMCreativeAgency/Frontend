import gsap from 'gsap'

export default class FreeParallax {
  node: any
  params: any
  target: any
  origin: any

  constructor(element: HTMLElement, params: any) {
    this.node = gsap.utils.selector(element)
    this.params = params
    this.target = params.target ? this.node(params.target) : element
  }

  prepare() {
    this.origin = `${this.params.x === 0 ? 'center' : this.params.x < 0 ? 'left' : 'right'} ${
      this.params.y === 0 ? 'center' : this.params.y < 0 ? 'bottom' : 'top'
    }`

    gsap.set(this.target, {
      transformOrigin: this.origin,
    })
  }

  animate() {
    const tl = gsap.timeline()


    tl.fromTo(
      this.target,
      {
        y: this.params.y ? this.params.y : 0,
        x: this.params.x ? this.params.x : 0,
        z: this.params.y ? this.params.z : 0,
      },
      {
        y: this.params.full ? -this.params.y : 0,
        x: this.params.full ? -this.params.x : 0,
        z: this.params.full ? -this.params.z : 0,
        ease: 'none',
      }
    )

    return tl
  }
}

// prepare() {
//   this.x = this.dataset.x;
//   this.y = this.dataset.y;
//   this.z = this.dataset.z;

//   if (this.x === 'full') this.x = this.element.offsetWidth * 1.5;

//   this.origin = `${this.x === 0 ? 'center' : this.x < 0 ? 'left' : 'right'} ${
//     this.y === 0 ? 'center' : this.y < 0 ? 'bottom' : 'top'
//   }`;

//   gsap.set(this.targets, {
//     transformOrigin: this.origin,
//   });
// }

// anim() {
//   const tl = gsap.timeline();

//   tl.fromTo(
//     this.targets,
//     {
//       y: this.y ? this.y : 0,
//       x: this.x ? -this.x : 0,
//       z: this.z ?? 0,
//     },
//     {
//       y: this.y ? -this.y : 0,
//       x: this.x ? 0: 0,
//       z: this.z ?? 0,
//       ease: 'none',
//     }
//   );

//   return tl;
// }
