import { createClient } from "@sanity/client"
import "server-only"

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || "production"
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01"
const useCdn = process.env.NODE_ENV === "production"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
  perspective: "previewDrafts",
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}



