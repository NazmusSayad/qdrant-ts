import { bookData, VectorPoint } from './data'
import { embedder } from './core/embedder'
import { env } from './core/env'
import { qrc } from './core/client'

if (!(await qrc.collectionExists(env.QDRANT_COLLECTION))) {
  console.log(`> Creating collection ${env.QDRANT_COLLECTION}`)
  await qrc.createCollection(env.QDRANT_COLLECTION, {
    vectors: { size: env.EMBEDDER_VECTOR_SIZE, distance: 'Cosine' },
    timeout: Infinity,
  })
}

const points: VectorPoint[] = []

for (const payload of bookData) {
  const text = `${payload.title}. ${payload.author}. ${payload.description}`

  const vector = await embedder(text)
  console.log(`> Vector generated for ${payload.title}`)

  const id = crypto.randomUUID()
  points.push({ id, payload, vector })
}

await qrc.upsert(env.QDRANT_COLLECTION, { points })
console.log(`> Upserted ${points.length} points`)
