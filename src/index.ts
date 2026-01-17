import { embedder } from './core/embedder'
import { qrc } from './core/client'
import { env } from './core/env'

const result = await qrc.search(env.QDRANT_COLLECTION, {
  vector: await embedder('Bangladesh'),
  limit: 10,
})

console.log(result)
