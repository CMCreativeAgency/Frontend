// import type { Metadata, ResolvingMetadata } from 'next'

import AboutHero from '@/components/pages/about/hero'
import AboutIntro from '@/components/pages/about/intro'
import AboutLimits from '@/components/pages/about/limits'
import AboutSolutions from '@/components/pages/about/solutions'
import ContactCareers from '@/components/pages/contact/careers'
import ContactForm from '@/components/pages/contact/form'
import ContactHero from '@/components/pages/contact/hero'
import GivebackHero from '@/components/pages/giveback/hero'
import GivebackHistory from '@/components/pages/giveback/history'
import GivebackPlans from '@/components/pages/giveback/plans'
import NewsHero from '@/components/pages/news/hero'
import NewsList from '@/components/pages/news/list'
import ProjectsHero from '@/components/pages/projects/hero'
import ProjectsList from '@/components/pages/projects/list'
import ServicesHero from '@/components/pages/services/hero'
import SharedCTA from '@/components/shared/cta'
import SharedMarquee from '@/components/shared/marquee'
import SharedServices from '@/components/shared/services'
import NavColor from '@/components/ui/nav-color'
import { getPage } from '@/lib/strapi/strapi-fetch'
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
  'about-hero': AboutHero,
  'about-intro': AboutIntro,
  'about-solutions': AboutSolutions,
  'about-limits': AboutLimits,
  'services-hero': ServicesHero,
  marquee: SharedMarquee,
  services: SharedServices,
  cta: SharedCTA,
  'giveback-hero': GivebackHero,
  'giveback-history': GivebackHistory,
  'giveback-plans': GivebackPlans,
  'projects-hero': ProjectsHero,
  'projects-list': ProjectsList,
  'news-hero': NewsHero,
  'news-list': NewsList,
  'contact-hero': ContactHero,
  'contact-form': ContactForm,
  'contact-careers': ContactCareers,
}

async function Page({ params }: PageProps) {
  const { data, meta } = await getPage(params.slug)

  return (
    <>
      <NavColor color={data.navColor} />

      {Object.keys(data.blocks)?.map((val, i) => {
        const value = val.split(':')[1]
        let Component

        if (value !== 'marquee' && value !== 'services' && value !== 'cta') {
          Component = components[`${params.slug}-${value}`]
        } else {
          Component = components[value]
        }

        if (Component) return <Component key={i} data={data.blocks[val]} />
      })}
    </>
  )
}

export const dynamic = 'force-dynamic'
export default Page
