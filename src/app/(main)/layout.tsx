import { getLayout } from '@/lib/strapi/strapi-fetch'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import HeaderProvider from '@/lib/context/use-header'
import BreakpointsContextProvider from '@/lib/context/use-breakpoints'
import LenisScrollProvider from '@/lib/animations/LenisScroll'
import Cursor from '@/components/ui/cursor'
import { AnimationsProvider } from '@/lib/animations/Animations'
import LoaderContextProvider from '@/lib/context/use-loader'
import ScrollToTop from '@/components/ui/scroll-to-top'

async function MainLayout({ children }: { children: any }) {
  const { data: layoutData } = await getLayout()

  return (
    <>
      <Cursor />
      <BreakpointsContextProvider>
        <LoaderContextProvider>
          <LenisScrollProvider>
            <HeaderProvider>
              <Header
                menu={layoutData.menu}
                socials={layoutData.socials}
                legal={layoutData.legal}
                copy={layoutData.copyright}
              />
              <AnimationsProvider>
                <main>
                  {children}
                  <Footer
                    menu={layoutData.menu}
                    socials={layoutData.socials}
                    legal={layoutData.legal}
                    copy={layoutData.copyright}
                    footerHeadingTop={layoutData.footerHeadingTop}
                    footerHeadingBottom={layoutData.footerHeadingBottom}
                    footerVideo={layoutData.footerVideo}
                  />
                </main>
              </AnimationsProvider>
            </HeaderProvider>
          </LenisScrollProvider>
        </LoaderContextProvider>
      </BreakpointsContextProvider>
    </>
  )
}

// export const dynamic = 'force-dynamic'
export default MainLayout
