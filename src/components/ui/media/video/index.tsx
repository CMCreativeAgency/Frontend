import classes from './index.module.scss'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoElementProps } from '@/lib/types/ui'
import { useIsomorphicLayoutEffect } from '@/lib/context/use-isomorphic-layout-effect'
import clsx from 'clsx'
import { aspectHandler } from '@/lib/helpers/functions'
import IconReplay from '@/components/svg/replay'
import IconAudio from '@/components/svg/audio'
import IconAudioActive from '@/components/svg/audio-active'

function Video({
  lazy,
  video,
  aspect,
  figclass,
  scroll,
  parallax,
  children,
  controls,
  playButton,
  aspectMobile,
  ...props
}: VideoElementProps) {
  const [isMuted, setIsMuted] = useState(true)
  const videoData = video.data.attributes
  const width = videoData.width || props.width
  const height = videoData.height || props.height
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const aspectRatio = aspect ? aspect : ((height / width) * 100).toFixed(1)

  const aspectRatios: {
    [name: string]: string | undefined
  } = {
    '--aspect': aspectRatio && `${aspectRatio}%`,
    '--aspectMobile': aspectMobile && `${aspectMobile}%`,
  }

  const activeAspect = aspectHandler(aspectRatios)

  useIsomorphicLayoutEffect(() => {
    if (!videoRef.current?.src || scroll) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom -100%',
        onEnter: () => {
          videoRef.current?.play()
        },
        onLeave: () => {
          videoRef.current?.pause()
        },
        onEnterBack: () => {
          videoRef.current?.play()
        },
        onLeaveBack: () => {
          videoRef.current?.pause()
        },
      })
    })

    return () => ctx.revert()
  }, [videoRef.current?.src])

  function replayVideo() {
    videoRef.current!.currentTime = 0
    videoRef.current!.play()
  }

  function muteVideo() {
    videoRef.current!.muted = !videoRef.current!.muted
    setIsMuted(videoRef.current!.muted)
  }

  return (
    <figure
      className={clsx(classes['video'], figclass)}
      style={activeAspect}
      ref={ref}
      data-parallax={parallax}
    >
      <video ref={videoRef} src={`http://localhost:1337${videoData?.url}`} {...props}></video>

      {children && <figcaption>{children}</figcaption>}
      {controls && (
        <div className={classes['video__controls']}>
          <button type="button" aria-label="video replay" onClick={replayVideo}>
            <IconReplay />
          </button>

          <button type="button" aria-label="video mute" onClick={muteVideo}>
            {isMuted ? <IconAudio /> : <IconAudioActive />}
          </button>
        </div>
      )}
    </figure>
  )
}

export default Video
