import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || "production"

const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null

export function urlFor(source: Image | null | undefined) {
  if (!builder || !source) return ""
  return builder.image(source)
}
