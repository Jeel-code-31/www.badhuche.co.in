import { draftMode } from "next/headers"
import { TextReveal } from "@/components/text-reveal"
import { WorksFilters } from "@/components/works-filters"
import { WorksGrid } from "@/components/works-grid"
import { TextureOverlay } from "@/components/texture-overlay"
import { CursorTrail } from "@/components/cursor-trail"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectsQuery, projectsByTypeQuery, categoriesQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Project, Category } from "@/sanity/lib/types"
import type { Metadata } from 'next'
 
type Props = {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: 'Our Works - Sculpture Projects | Badhuche Art Studio',
  description: 'Browse our collection of completed sculpture projects including monuments, installations, murals, and memorials.',
}
export default async function WorksPage({ searchParams }: Props) {
  const { isEnabled } = await draftMode()
  const params = await searchParams
  const categorySlug = params.category
  
  // Fetch categories and projects
  const [categories, projects] = await Promise.all([
    sanityFetch<Category[]>({
      query: categoriesQuery,
      tags: ["category"],
      preview: isEnabled,
    }).catch(() => []),
    categorySlug
      ? sanityFetch<Project[]>({
          query: projectsByTypeQuery,
          params: { categorySlug },
          tags: ["project"],
          preview: isEnabled,
        }).catch(() => [])
      : sanityFetch<Project[]>({
          query: projectsQuery,
          tags: ["project"],
          preview: isEnabled,
        }).catch(() => []),
  ])

  const mapped = projects.map((proj, idx) => ({
    title: proj.title || "Untitled Project",
    number: String(idx + 1).padStart(2, "0"),
    image: proj.heroImage ? ((urlFor(proj.heroImage as any) as any)?.width(800).height(1000).url() || "/placeholder.jpg") : "/placeholder.jpg",
    href: proj.slug?.current ? `/works/${proj.slug.current}` : "#",
    size: "medium" as const,
    description: proj.excerpt || "",
  }))

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23c2542d' stop-opacity='0.15'/%3E%3Cstop stop-color='%23b8963f' stop-opacity='0.12' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 120h240M120 0v240' stroke='url(%23g)' stroke-width='1' stroke-dasharray='6 10'/%3E%3C/svg%3E\")",
          backgroundSize: "240px 240px",
        }}
      />
      <CursorTrail />
      <section className="relative px-4 sm:px-6 md:px-10 pt-24 sm:pt-32 pb-8 sm:pb-10 overflow-hidden">
        <TextureOverlay texture="paper" opacity={0.12} blendMode="multiply" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <TextReveal>
            <h1 className="oh-headline text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-10 sm:mb-10">Our Works</h1>
          </TextReveal>
          <TextReveal delay={50}>
            <p className="oh-body text-sm sm:text-base md:text-lg max-w-[650px] mb-8 sm:mb-10 leading-relaxed">
              A curated selection of our monumental installations and public artworks. Each commission blends cultural
              research, material mastery, and architectural integration.
            </p>
          </TextReveal>
          
          {/* Filters */}
          <WorksFilters categories={categories} />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 md:px-10 
  pt-5 sm:pt-5 md:pt-6 
  pb-20 sm:pb-28 md:pb-32 
  overflow-hidden">

        <TextureOverlay texture="canvas" opacity={0.08} blendMode="soft-light" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          {mapped.length === 0 ? (
            <div className="text-center py-16 sm:py-20 text-[#6B6560]">
              <p className="oh-body text-base sm:text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <WorksGrid projects={mapped} />
          )}
        </div>
      </section>
    </main>
  )
}
