import "server-only"
import { client, previewClient } from "./client"
import type { QueryParams } from "next-sanity"

/**
 * Fetch data from Sanity with optional preview mode
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  preview = false,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  preview?: boolean
}): Promise<QueryResponse> {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isPreview = preview || isDevelopment

  const activeClient = isPreview ? previewClient : client

  return activeClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: isPreview ? 0 : 3600, // No cache in preview, 1 hour cache in production
      tags,
    },
  })
}

/**
 * Helper to create cache tags for on-demand revalidation
 */
export function createCacheTags(type: string, id?: string) {
  const tags = [type]
  if (id) {
    tags.push(`${type}:${id}`)
  }
  return tags
}

