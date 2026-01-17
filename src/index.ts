import { embedder } from './core/embedder'
import { qcREST } from './core/client'
import { env } from './core/env'

const result = await qcREST.search(env.QDRANT_COLLECTION, {
  vector: await embedder('wars'),
  limit: 10,
  score_threshold: 0.25,
  with_payload: true,
})

for (const { payload, score } of result) {
  console.log({ payload, score })
}
