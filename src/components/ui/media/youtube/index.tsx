// import classes from "./YoutubeVideo.module.scss";
// import YouTubePlayer from "yt-player";
// import { useEffect, useRef, useState } from "react";
// import IconPlay from "@components/svg/Play";
// import Image from "next/image";
// import clsx from "clsx";

// interface YouTubePlayerProps {
//   children?: React.ReactNode;
//   className?: string;
//   aspect?: string | number | undefined;
//   width?: string | number | 1;
//   height?: string | number | 1;
//   button?: boolean;
//   videoID?: string;
//   poster?: boolean;
//   setActiveID?: () => any;
// }

// function YoutubePlayer({
//   children,
//   aspect,
//   width,
//   height,
//   button,
//   poster,
//   videoID,
//   className,
// }: YouTubePlayerProps) {
//   // iframe allow options: accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture
//   const [video, setVideo] = useState<any>();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const figureRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const posterData =
//     poster && `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
//   const src = `https://www.youtube.com/embed/${videoID}`;

//   useEffect(() => {
//     if (video) return;
//     let to: any;

//     let yt = new YouTubePlayer(videoRef.current!, {
//       autoplay: true,
//       controls: true,
//       related: false,
//       captions: false,
//       fullscreen: true,
//       annotations: false,
//       modestBranding: false,
//     });

//     setVideo(yt);

//     yt.load(videoID!, true, 1);
//     setIsLoaded(true);

//     yt.on("ended", () => {
//       setIsPlaying(false);
//     });

//     yt.on("paused", () => {
//       to = setTimeout(() => {
//         setIsPlaying(false);
//       }, 200);
//     });

//     yt.on("timeupdate", (seconds) => {
//       clearTimeout(to);
//     });
//   }, []);

//   function preloadHandler() {
//     if (!isLoaded) {
//       setIsLoaded(true);
//       video.load(videoID, false, 1);
//     }
//   }

//   function playHandler() {
//     if (!isPlaying) {
//       setTimeout(() => {
//         setIsPlaying(true);
//         video.play();
//       }, 600);
//     }
//   }

//   return (
//     <figure
//       className={clsx(
//         className,
//         classes["yt-player"],
//         isPlaying && classes["play"]
//       )}
//       style={{
//         ["--aspect" as any]: `${aspect}%`,
//       }}
//       ref={figureRef}
//       // onMouseEnter={preloadHandler}
//     >
//       <video width={width} height={height} ref={videoRef} />

//       {posterData && (
//         <Image
//           width="1"
//           height="1"
//           alt="poster"
//           src={posterData}
//           unoptimized={true}
//           onClick={playHandler}
//         />
//       )}
//       {button && (
//         <button
//           type="button"
//           className={classes["yt-player__button"]}
//           aria-label="youtube play button"
//           onClick={playHandler}
//         >
//           <span>
//             <IconPlay />
//           </span>
//         </button>
//       )}

//       {children}
//     </figure>
//   );
// }

// export default YoutubePlayer;
