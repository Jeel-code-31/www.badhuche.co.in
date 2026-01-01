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
   fallback?: QueryResponse
}): Promise<QueryResponse> {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isPreview = preview || isDevelopment

  const activeClient = isPreview ? previewClient : client

    try {
return await activeClient.fetch<QueryResponse>(query, params, {
  next: {revalidate:isPreview?0:60, tags},
})
}
catch (err) {
console.warn("sanityFetch error:", err)
}
    const requestsSingle = String(query).includes("[0]") || /\bfirst\(/i.test(String(query))
/**
 * Helper to create cache tags for on-demand revalidation
 */
    if (typeof ({} as QueryResponse) === 'object') {
        if (arguments[0] && (arguments[0] as any).fallback !== undefined) {
             return (arguments[0] as any).fallback
      }
    }
    return (requestsSingle ? (null as any) : ([]) as any) as QueryResponse
  }


