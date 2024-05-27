// import type { Metadata, ResolvingMetadata } from 'next'

import ServiceCTA from '@/components/pages/services/single/cta'
import ServiceHero from '@/components/pages/services/single/hero'
import ServiceInfo from '@/components/pages/services/single/info'
import ServiceRelated from '@/components/pages/services/single/related'
import NavColor from '@/components/ui/nav-color'
import { getServices } from '@/lib/strapi/strapi-fetch'
import { PageProps } from '@/lib/types/pages'

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

const components: any = {
  'service-hero': ServiceHero,
  'service-info': ServiceInfo,
  'service-related': ServiceRelated,
  'service-cta': ServiceCTA,
}

async function Page({ params }: PageProps) {
  const { data, meta } = await getServices(params.slug)

  return (
    <>
      <NavColor color={data.navColor} />

      {Object.keys(data.blocks)?.map((val, i) => {
        const value = val.split(':')[1]

        if (value === 'hero') {
          data.blocks[val].featuredImage = data?.featuredImage
        }

        const Component = components[`service-${value}`]
        if (Component) return <Component key={i} data={data.blocks[val]} />
      })}
    </>
  )
}

export const dynamic = 'force-dynamic'
export default Page
