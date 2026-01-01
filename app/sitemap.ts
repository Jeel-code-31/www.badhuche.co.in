import { MetadataRoute } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectsQuery, pressQuery, awardsQuery } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const [projects, press, awards] = await Promise.all([
     sanityFetch<{ slug?: { current: string } }[]>({ query: projectsQuery }).catch(() => []),
     sanityFetch<{ slug?: { current: string } }[]>({ query: pressQuery }).catch(() => []),
     sanityFetch<{ slug?: { current: string } }[]>({ query: awardsQuery }).catch(() => []),
   
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/works",
    "/gallery",
    "/recognition",
    "/faq",
    "/process",
    "/contact",
    "/studio",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  const projectRoutes =
    projects?.filter((p) => p.slug?.current).map((p) => ({
      url: `${baseUrl}/works/${p.slug!.current}`,
      lastModified: new Date(),
    })) || []

  const pressRoutes =
    press?.filter((p) => p.slug?.current).map((p) => ({
      url: `${baseUrl}/recognition`,
      lastModified: new Date(),
    })) || []

  const awardRoutes =
    awards?.filter((p) => p.slug?.current).map((p) => ({
      url: `${baseUrl}/recognition`,
      lastModified: new Date(),
    })) || []

  return [...staticRoutes, ...projectRoutes, ...pressRoutes, ...awardRoutes]
}



