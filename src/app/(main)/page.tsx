// import type { Metadata, ResolvingMetadata } from 'next'

import { getPage } from '@/lib/strapi/strapi-fetch'

import HomeHero from '@/components/pages/home/hero'
import HomeStrategy from '@/components/pages/home/strategy'
import HomeProjects from '@/components/pages/home/projects'
import HomeTestimonials from '@/components/pages/home/testimonials'

import SharedMarquee from '@/components/shared/marquee'
import SharedServices from '@/components/shared/services'
import SharedCTA from '@/components/shared/cta'
import NavColor from '@/components/ui/nav-color'

const components: any = {
  hero: HomeHero,
  strategy: HomeStrategy,
  projects: HomeProjects,
  marquee: SharedMarquee,
  services: SharedServices,
  testimonials: HomeTestimonials,
  cta: SharedCTA,
}

// type Props = {
//   params: { id: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { data } = await getSEO('home')

//   return {
//     metadataBase: process.env?.NEXT_PUBLIC_URL ? new URL(process.env?.NEXT_PUBLIC_URL) : null,
//     title: data?.seo?.metaTitle || null,
//     robots: data?.seo?.metaRobots || null,
//     keywords: data?.seo?.keywords || null,
//     openGraph: {
//       images: data?.seo?.metaImage || null,
//     },
//     description: data?.seo?.metaDescription || null,
//   }
// }

async function Home() {
  const { data, meta } = await getPage('home')

  return (
    <>
      <NavColor color={data.navColor} />

      {Object.keys(data.blocks).map((val, i) => {
        const value = val.split(':')[1]
        const Component = components[value]
        if (Component) return <Component key={i} data={data.blocks[val]} />
      })}
    </>
  )
}

export const dynamic = 'force-dynamic'
export default Home
