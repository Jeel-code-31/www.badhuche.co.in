import { Marquee } from "@/components/marquee"
import { ProjectCard } from "@/components/project-card"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { TextReveal } from "@/components/text-reveal"
import { StatsCounter } from "@/components/stats-counter"
import { MagneticButton } from "@/components/magnetic-button"
import { SplitText } from "@/components/split-text"
import { ImageReveal } from "@/components/image-reveal"
import { MagneticText } from "@/components/magnetic-text"
import { ScrollWeightText } from "@/components/scroll-weight-text"
import { GradientButton } from "@/components/gradient-button"
import { TextureOverlay } from "@/components/texture-overlay"
import { ScrollParticles } from "@/components/scroll-particles"
import { ProcessSection } from "@/components/process-section"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { homepageQuery, featuredProjectsQuery } from "@/sanity/lib/queries"
import type { Homepage, Project } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Badhuche Art Studio - Iconic Cultural Sculptures & Public Art',
  description: 'Award-winning sculpture studio creating monumental public artworks, cultural landmarks, and commissioned sculptures across India.',
  openGraph: {
    title: 'Badhuche Art Studio',
    description: 'Creating iconic cultural landmarks through sculpture',
    type: 'website',
  },
}

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  // Fetch homepage data and featured projects from CMS
  const [homepage, featuredProjects] = await Promise.all([
    sanityFetch<Homepage>({
      query: homepageQuery,
      tags: ["homepage"],
      preview: isEnabled,
    }).catch(() => null),
    sanityFetch<Project[]>({
      query: featuredProjectsQuery,
      tags: ["project"],
      preview: isEnabled,
    }).catch(() => []),
  ])

  // Default content if CMS data not available
  const heroSubtitle = homepage?.heroSubtitle || "Monumental Artistic Works & Public Installations"
  const heroImage = homepage?.heroImage
    ? ((urlFor(homepage.heroImage as any) as any)?.width(1200).height(1500).url() || "/ayodhya.jpg")
    : "/ayodhya.jpg"
  const stats = homepage?.stats || [
    { _key: "1", value: "50", suffix: "+", label: "Monumental Projects Completed" },
    { _key: "2", value: "4", suffix: "+", label: "Countries Across Globe" },
    { _key: "3", value: "440", suffix: " ft", label: "Largest Installation Size" },
    { _key: "4", value: "15", suffix: " tons", label: "Heaviest Bronze Sculpture" },
  ]

  // Convert CMS projects to ProjectCard format
  const projects = featuredProjects.slice(0, 16).map((project, index) => ({
    title: project.title,
    number: String(index + 1).padStart(2, "0"),
    image: project.heroImage ? ((urlFor(project.heroImage as any) as any)?.width(800).height(1000).url() || "/ayodhya.jpg") : "/ayodhya.jpg",
    href: `/works/${project.slug.current}`,
    size: (["large", "medium", "small"][index % 3] as "large" | "medium" | "small"),
    description: project.excerpt || "",
  }))

  // Split title into words for animation
  return (
    <main className="min-h-screen">
      <ScrollParticles />
      {/* Hero Section - Optimized for Mobile */}
      <section
        className="relative min-h-screen w-full overflow-hidden
            px-4 sm:px-6 md:px-10
            pt-36 sm:pt-40
            flex items-center
            bg-cover bg-top"
        style={{ backgroundImage: `url(${heroImage})` }}
      >

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Texture overlay */}
        <TextureOverlay
          texture="paper"
          opacity={0.12}
          blendMode="multiply"
        />

        {/* Content Layer */}
        <div className="h-25 sm:h-36 lg:h-44 mt-30 mt-30 sm:mt-45" />
        <div className="relative z-10 max-w-[1500px] mx-auto w-full">
          <div className="max-w-[1000px]">

            {/* Heading text of hero section */}
            <div className="mt-25 sm:mt-45 md:mt-36 lg:mt-44">
              <TextReveal delay={80}>
                <span className="text-shimmar stroke-text text-3xl md:text-4xl lg:text-5xl">
                  SHAPING'S ICONIC <br /> CULTURAL LANDMARKS
                </span>
              </TextReveal>

              <div className="oh-semibold text-xl sm:text-base md:text-4xl max-w-[1200px] mb-5 sm:mb-5 leading-relaxed">
                <p className="oh-semibold text-5xl md:text-5xl leading-relaxed">
                  <MagneticText
                    className="mt-2 text-base sm:text-lg text-white/100 max-w-lg block"
                    activeColor="#da951e"
                  >
                    {heroSubtitle}
                  </MagneticText>

                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <TextReveal delay={300}>
              <div className="mt-14">
                <ScrollIndicator />
              </div>
            </TextReveal>
          </div>
        </div>
      </section>


      {/* Introduction */}
      <section className="relative  md:px-8 min-h-[95vh] flex items-center overflow-hidden">
        <TextureOverlay texture="paper" blendMode="multiply" />
        <div className="max-w-[1300px] mx-auto text-center relative z-10 w-full">
          <ScrollWeightText className="oh-body text-sm sm:text-base md:text-3xl max-w-[1000px] mx-auto leading-relaxed">
            <TextReveal delay={50}>
              <p className="oh-semibold text-xl md:text-3xl leading-relaxed">
                We are a collective of master{" "}
                <span className="gradient-terracotta font-semibold">artisans, sculptors, and visionary designers </span>
                creating large-scale public art that celebrates{" "}
                <span className="gradient-gold font-semibold">heritage, inspires communities,</span> and defines{" "}
                <span className="text-shimmer font-bold">architectural spaces for generations.</span>
              </p>
            </TextReveal>
          </ScrollWeightText>
        </div>
      </section>


      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="relative px-6 md:px-10 py-16 overflow-hidden">
          <TextureOverlay texture="canvas" opacity={0.1} blendMode="soft-light" />
          <div className="max-w-[1600px] mx-auto relative z-10">
            <StatsCounter stats={stats} />
          </div>
        </section>
      )}

      {/* Selected Works */}
      {projects?.length > 0 && (
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-[1400px] mx-auto">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 sm:gap-12 mb-12 sm:mb-16">
              <TextReveal>
                <MagneticText className="oh-label text-sm sm:text-base" activeColor="#c2542d">
                  (Selected Works)
                </MagneticText>
              </TextReveal>
              <MagneticButton href="/works">
                <span className="oh-label text-sm sm:text-base text-[#C2542D] opacity-80 hover:opacity-100 transition-opacity duration-300 link-underline min-h-[44px] flex items-center">
                  (View All Works)
                </span>
              </MagneticButton>
            </div>

            {/* Asymmetric masonry grid - Mobile optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-13 md:grid-cols-12 gap-x-6 gap-y-20 sm:gap-y-24 md:gap-x-6 md:gap-y-28">

              {/* Row 1 */}
              {projects[0] && (
                <div className="col-span-12 md:col-span-5 md:-mt-12">
                  <ProjectCard {...projects[0]} size="medium" />
                </div>
              )}
              {projects[1] && (
                <div className="col-span-12 md:col-span-6 md:pt-20">
                  <ProjectCard {...projects[1]} size="medium" />
                </div>
              )}

              {/* Row 2 */}
              {projects[2] && (
                <div className="col-span-12 md:col-span-5 md:-mt-16">
                  <ProjectCard {...projects[2]} size="large" />
                </div>
              )}
              {projects[3] && (
                <div className="col-span-12 md:col-span-7 md:pt-16">
                  <ProjectCard {...projects[3]} size="medium" />
                </div>
              )}

              {/* Row 3 */}
              {projects[4] && (
                <div className="col-span-12 md:col-span-7 md:-mt-2">
                  <ProjectCard {...projects[4]} size="medium" />
                </div>
              )}
              {projects[5] && (
                <div className="col-span-12 md:col-span-5 md:pt-12">
                  <ProjectCard {...projects[5]} size="large" />
                </div>
              )}
              {projects[6] && (
                <div className="col-span-12 md:col-span-4 md:-mt-12">
                  <ProjectCard {...projects[6]} size="large" />
                </div>
              )}

              {/* Row 4 */}
              {projects[7] && (
                <div className="col-span-12 md:col-span-3 md:pt-8">
                  <ProjectCard {...projects[7]} size="large" />
                </div>
              )}
              {projects[8] && (
                <div className="col-span-12 md:col-span-6">
                  <ProjectCard {...projects[8]} size="large" />
                </div>
              )}
              {projects[9] && (
                <div className="col-span-12 md:col-span-3 md:pt-24">
                  <ProjectCard {...projects[9]} size="small" />
                </div>
              )}

              {/* Row 5 */}
              {projects[10] && (
                <div className="col-span-12 md:col-span-6 md:-mt-20">
                  <ProjectCard {...projects[10]} size="medium" />
                </div>
              )}
              {projects[11] && (
                <div className="col-span-12 md:col-span-6 md:pt-12">
                  <ProjectCard {...projects[11]} size="medium" />
                </div>
              )}

              {/* Row 6 */}
              {projects[12] && (
                <div className="col-span-12 md:col-span-8 md:-mt-8">
                  <ProjectCard {...projects[12]} size="large" />
                </div>
              )}
              {projects[13] && (
                <div className="col-span-12 md:col-span-4 md:pt-16">
                  <ProjectCard {...projects[13]} size="small" />
                </div>
              )}

              {/* Row 7 */}
              {projects[14] && (
                <div className="col-span-12 md:col-span-5">
                  <ProjectCard {...projects[14]} size="medium" />
                </div>
              )}
              {projects[15] && (
                <div className="col-span-12 md:col-span-7 md:-mt-16">
                  <ProjectCard {...projects[15]} size="large" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Marquee */}
      <section className="pt-10 pb-30 overflow-hidden">
        <Marquee />
      </section>

      {/* Process Section */}
      <section className="relative px-6 md:px-5 py-0 overflow-hidden mb-20">
        <TextureOverlay texture="paper" opacity={0.12} blendMode="multiply" />
        <div className="relative z-10">
          <ProcessSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 md:px-10 py-20 pt-2 pb-20 overflow-hidden">
        <TextureOverlay texture="marble" opacity={0.12} blendMode="multiply" />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <TextReveal>
            <ScrollWeightText className="oh-headline text-3xl md:text-5xl mb-6">
              {homepage?.ctaTitle || "Ready to Create Something Monumental?"}
            </ScrollWeightText>
          </TextReveal>
          <TextReveal delay={100}>
            <p className="oh-body text-2xl md:text-xl mb-10 max-w-[600px] mx-auto">
              {homepage?.ctaDescription ||
                "Let's discuss how we can bring your vision to life through monumental art that defines spaces and inspires communities."}
            </p>
          </TextReveal>
          <TextReveal delay={200}>
            <GradientButton
              href="/contact"
              texture="gold-leaf"
              gradient="linear-gradient(135deg, #1A1815 0%, #c2542d 50%, #b8963f 100%)"
              className="min-h-[48px] min-w-[220px] sm:min-w-[240px] mx-auto"
            >
              <span className="tracking-[0.16em]">Start a Commission</span>
              <span className="w-2 h-2 rounded-full bg-[#FAF7F2]" />
            </GradientButton>
          </TextReveal>
        </div>
      </section>
    </main>
  )
}
