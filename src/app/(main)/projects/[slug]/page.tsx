// import type { Metadata, ResolvingMetadata } from 'next'

import ProjectContent from '@/components/pages/projects/single/content'
import ProjectHero from '@/components/pages/projects/single/hero'
import ProjectMedia from '@/components/pages/projects/single/media'
import ProjectServices from '@/components/pages/projects/single/services'
import SharedCTA from '@/components/shared/cta'
import SharedRelated from '@/components/shared/related'
import NavColor from '@/components/ui/nav-color'
import { getProject } from '@/lib/strapi/strapi-fetch'
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
  'project-hero': ProjectHero,
  'project-services': ProjectServices,
  'project-content': ProjectContent,
  'project-media': ProjectMedia,
  cta: SharedCTA,
  related: SharedRelated,
}

async function SingleProject({ params }: PageProps) {
  const { data, meta } = await getProject(params.slug)

  return (
    <>
      <NavColor color={data.navColor} />

      {Object.keys(data.blocks)?.map((val, i) => {
        const value = val.split(':')[1]
        let Component

        if (value === 'hero') {
          data.blocks[val].featuredImage = data?.featuredImage
          data.blocks[val].url = data?.url
        }

        if (value !== 'cta' && value !== 'related') {
          Component = components[`project-${value}`]
        } else {
          Component = components[value]
        }

        if (Component) return <Component key={i} data={data.blocks[val]} />
      })}
    </>
  )
}

export const dynamic = 'force-dynamic'
export default SingleProject
