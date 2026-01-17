import z from 'zod'
import { config } from 'dotenv'

config({ quiet: true })

const envSchema = z.object({
  QDRANT_URL: z.string(),
  QDRANT_COLLECTION: z.string(),
  EMBEDDER_VECTOR_SIZE: z.coerce.number(),
})

export const env = envSchema.parse(process.env)
