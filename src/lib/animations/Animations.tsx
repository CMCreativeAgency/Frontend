'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '../context/use-isomorphic-layout-effect'

import { TweenProps } from '../types/animations'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import VerticalTween from './tweens/Vertical'
import { usePathname } from 'next/navigation'
import { gsapSplit } from './gsap/gsap-split'
import MediaParallax from './parallax/MediaParallax'
import FreeParallax from './parallax/FreeParallax'
import FillTween from './tweens/Fill'
import TextFillTween from './tweens/TextFill'
import TitleTween from './tweens/Title'
import { useLoaderContext } from '../context/use-loader'
import TweenOpacity from './tweens/Opacity'
import { useBreakpointsContext } from '../context/use-breakpoints'

interface AnimationsProps {
  children: React.ReactElement
}

export const AnimationsContext = createContext({
  refresh: () => {},
  initAnimations: (elements: any, tween: string) => {},
  parallaxAnimations: (elements: any) => {},
})

// parallax declaration
// ...
const Parallaxes: any = {
  media: MediaParallax,
  free: FreeParallax,
}

// tweens declaration
// ...
const Tweens: any = {
  y: VerticalTween,
  fill: FillTween,
  'text-fill': TextFillTween,
  title: TitleTween,
  // down: DownTween,
  // left: LeftTween,
  // right: RightTween,
  // line: LineTween,
  opacity: TweenOpacity,
  // images: ImagesTween,
  // portfolioImages: PortfolioImagesTween,
}

export function AnimationsProvider({ children }: AnimationsProps) {
  const prevPathname = useRef<string>()
  const ref = useRef()
  const pathname = usePathname()
  const { device }: any = useBreakpointsContext()
  const { isLoaded }: any = useLoaderContext()

  // init animations
  // ...
  function initAnimations(elements: any, tween?: string) {
    return gsap.context(() => {
      elements.forEach((animEl: any) => {
        // - {'tween': 'example', 'target': '', 'delay': 0.0, 'stagger': 0.0, 'duration': 0}
        // parsing enter animations
        const enterAnim =
          animEl.dataset?.enter && JSON.parse(animEl.dataset?.enter.replaceAll("'", '"'))
        const start = animEl.dataset?.start
        const end = animEl.dataset?.end
        const splitAnim =
          animEl.dataset?.split && JSON.parse(animEl.dataset?.split.replaceAll("'", '"'))
        const prevent = animEl.dataset?.prevent

        if (prevent) {
          if (
            prevPathname.current?.includes(prevent) ||
            (prevPathname.current &&
              prevent?.includes('!') &&
              !prevPathname.current?.includes(prevent.split('!')[1]))
          ) {
            return
          }
        }

        // split element
        if (splitAnim) gsapSplit(animEl, splitAnim.type, splitAnim?.wrapper)

        const tweenClass = new Tweens[tween || enterAnim.tween](animEl, enterAnim)
        const scrub = enterAnim.scrub

        // prepare animations
        tweenClass.prepare()

        document.documentElement.classList.remove('loader')

        // scrolltrigger
        ScrollTrigger.create({
          trigger: animEl,
          start: start ? start : 'top bottom',
          end: end ? end : 'bottom -5%',
          // toggleClass: 'inView',
          // markers: true,
          scrub: scrub && 0,
          animation: scrub && tweenClass.onEnter(),
          onEnter: () => !scrub && tweenClass.onEnter(),
          onLeave: () => !scrub && tweenClass.onLeave(),
          onEnterBack: () => !scrub && tweenClass.onEnterBack(),
          onLeaveBack: () => !scrub && tweenClass.onLeaveBack(),
        })
      })
    }, ref)
  }

  // parallax anmations
  // ...
  function parallaxAnimations(elements: any[]) {
    return gsap.context(() => {
      elements.forEach((element: any) => {
        const parallax = element.dataset.parallax
        const params =
          element.dataset.params && JSON.parse(element.dataset?.params.replaceAll("'", '"'))
        const direction = parallax.split(',')[1]
        const tween = new Parallaxes[parallax.split(',')[0]](element, params)
        const start = element.dataset?.start
        const end = element.dataset?.end

        if (params?.mobile === false && device === 'mobile') return

        tween.prepare()

        document.documentElement.classList.remove('loader')

        ScrollTrigger.create({
          trigger: element,
          start: start ? start : 'top bottom',
          end: end ? end : 'bottom top',
          animation: tween.animate(direction),
          scrub: 0,
        })
      })
    })
  }

  // refresh scrolltrigger
  // ...
  function refresh() {
    ScrollTrigger.refresh()
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!isLoaded) return

    const animElements = gsap.utils.toArray(['[data-enter]'])
    const parallaxElements = gsap.utils.toArray(['[data-parallax]'])

    const parallaxCtx = parallaxAnimations(parallaxElements)
    const animCtx = initAnimations(animElements)

    return () => {
      parallaxCtx.revert()
      animCtx.revert()
    }
  }, [pathname, isLoaded, device])

  useEffect(() => {
    function customRouteChange() {
      prevPathname.current = pathname
    }

    window.addEventListener('customRouteChange', customRouteChange)
    return () => window.removeEventListener('customRouteChange', customRouteChange)
  }, [pathname])

  const context = {
    refresh: refresh,
    initAnimations: initAnimations,
    parallaxAnimations: parallaxAnimations,
  }

  return (
    <AnimationsContext.Provider value={context}>
      {React.cloneElement(children, { ref })}
    </AnimationsContext.Provider>
  )
}

export const useAnimationsContext = () => {
  return useContext(AnimationsContext)
}
