import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
  
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // Prevent accidental unpublishing of documents
    actions: (input) =>
      input.filter(({ action }) => action !== 'unpublish'),
  },
})
