import { bookData } from './data'
import { embedder } from './core/embedder'
import { env } from './core/env'
import { qrc } from './core/client'

await qrc.deleteCollection(env.QDRANT_COLLECTION)
await qrc.createCollection(env.QDRANT_COLLECTION, {
  vectors: { size: env.EMBEDDER_VECTOR_SIZE, distance: 'Cosine' },
})

for (const payload of bookData) {
  const text = `${payload.title}. ${payload.author}. ${payload.description}`

  const vector = await embedder(text)
  console.log(`> Vector generated for ${payload.title}`)

  const id = crypto.randomUUID()
  await qrc.upsert(env.QDRANT_COLLECTION, {
    wait: true,
    points: [{ id, payload, vector }],
  })

  console.log(`> Upserted ${payload.title}`)
}
