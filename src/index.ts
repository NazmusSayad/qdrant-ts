import { embedder } from './core/embedder'
import { qrc } from './core/client'
import { env } from './core/env'

const result = await qrc.search(env.QDRANT_COLLECTION, {
  vector: await embedder('Bangladesh'),
  score_threshold: 0.5,
  limit: 2,
})

console.log(result)
