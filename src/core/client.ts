import { QdrantClient as QdrantClientGRPC } from '@qdrant/js-client-grpc'
import { QdrantClient as QdrantClientREST } from '@qdrant/js-client-rest'
import { env } from './env'

export const qcGRPC = new QdrantClientGRPC({
  url: env.QDRANT_URL,
})

export const qcREST = new QdrantClientREST({
  url: env.QDRANT_URL,
})
