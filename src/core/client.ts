import { QdrantClient } from '@qdrant/js-client-rest'
import { env } from './env'

export const qrc = new QdrantClient({
  url: env.QDRANT_URL,
  maxConnections: Infinity,
  timeout: Infinity,
})
