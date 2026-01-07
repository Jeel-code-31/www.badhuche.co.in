import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { PortableTextRenderer } from "@/components/portable-text"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectBySlugQuery, featuredProjectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

type Project = {
  title: string
  slug?: { current: string }
  heroImage?: any
  heroVideo?: string
  gallery?: any[]
  excerpt?: string
  overview?: any[]
  challenge?: any[]
  solution?: any[]
  location?: string
  year?: string
  materials?: string[]
  services?: string[]
  credits?: { name?: string; role?: string; organization?: string }[]
  awards?: { title?: string; year?: number; organization?: string; link?: string }[]
}
async function getProject(slug: string, preview: boolean) {
  return sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
    preview,
  })
}

async function getRelated(currentSlug: string | undefined, preview: boolean) {
  const featured = await sanityFetch<Project[]>({
    query: featuredProjectsQuery,
    tags: ["project"],
    preview,
  })
  return featured.filter((p) => p.slug?.current !== currentSlug).slice(0, 3)
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const project = await getProject(slug, isEnabled)
  if (!project) return notFound()

  const related = await getRelated(project.slug?.current, isEnabled)

  const heroUrl = ((urlFor(project.heroImage as any) as any)?.width(1600).height(1000).url()) || null

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1815]">
      <section className="pt-28 pb-16 px-5 md:px-4">
        <div className="max-w-[1200px] mx-auto">
          <p className="oh-label mb-4">(Project)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-4 text-[#1A1815]">{project.title}</h1>
          <p className="oh-body text-lg max-w-3xl">{project.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#4a4640]">
            {project.location && <span>Location: {project.location}</span>}
            {project.year && <span>Year: {project.year}</span>}
            {project.materials?.length ? <span>Materials: {project.materials.join(", ")}</span> : null}
            {project.services?.length ? <span>Services: {project.services.join(", ")}</span> : null}
          </div>
        </div>
      </section>
      {heroUrl && (
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-full mx-auto relative">
            <Image
              src={heroUrl}
              alt={project.title}
              width={1600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </section>

      )}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1000px] mx-auto space-y-10">
          {project.credits?.length ? (
            <div>
              <p className="oh-label mb-3">(Credits)</p>
              <div className="grid md:grid-cols-2 gap-3">
                {project.credits.map((c, idx) => (
                  <div key={idx} className="oh-body text-sm">
                    <span className="font-semibold">{c.name}</span>
                    {c.role ? ` — ${c.role}` : ""} {c.organization ? `, ${c.organization}` : ""}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.awards?.length ? (
            <div>
              <p className="oh-label mb-3">(Recognition)</p>
              <ul className="space-y-2">
                {project.awards.map((a, idx) => (
                  <li key={idx} className="oh-body text-sm">
                    {a.title} {a.organization ? `— ${a.organization}` : ""} {a.year ? `(${a.year})` : ""}{" "}
                    {a.link ? (
                      <a href={a.link} className="text-[#C2542D] underline" target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {project.gallery?.length ? (
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="oh-label mb-4">(Gallery)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => {
                const imgUrl = ((urlFor(img as any) as any)?.width(1200).height(900).url()) || null
                if (!imgUrl) return null
                return (
                  <div key={idx} className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image src={imgUrl} alt={img?.alt || project.title} fill className="object-cover" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

    </main>
  )
}

