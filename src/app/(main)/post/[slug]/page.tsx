// import type { Metadata, ResolvingMetadata } from 'next'

import PostContent from '@/components/pages/news/single/content'
import PostHero from '@/components/pages/news/single/hero'
import SharedRelated from '@/components/shared/related'
import NavColor from '@/components/ui/nav-color'
import { getPost } from '@/lib/strapi/strapi-fetch'
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
  'post-hero': PostHero,
  'post-content': PostContent,
  related: SharedRelated,
}

async function SinglePost({ params }: PageProps) {
  const { data, meta } = await getPost(params.slug)

  return (
    <>
      <NavColor color={data?.navColor} />

      {Object.keys(data?.blocks)?.map((val, i) => {
        const value = val.split(':')[1]
        let Component

        if (value === 'hero') {
          data.blocks[val].publishedAt = data?.publishedAt
          data.blocks[val].categories = data?.categories
        }

        if (value !== 'related') {
          Component = components[`post-${value}`]
        } else {
          Component = components[value]
        }

        if (Component) return <Component key={i} data={data.blocks[val]} />
      })}
    </>
  )
}

export const dynamic = 'force-dynamic'
export default SinglePost
