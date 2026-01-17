import { bookData } from './data'
import { embedder } from './core/embedder'
import { env } from './core/env'
import { qcGRPC } from './core/client'

const collectionsApi = qcGRPC.api('collections')
const pointsApi = qcGRPC.api('points')

await collectionsApi.delete({ collectionName: env.QDRANT_COLLECTION })
await collectionsApi.create({
  collectionName: env.QDRANT_COLLECTION,
  vectorsConfig: {
    config: {
      case: 'params',
      value: {
        size: BigInt(env.EMBEDDER_VECTOR_SIZE),
        distance: 1,
      },
    },
  },
})

for (const payload of bookData) {
  const text = `${payload.title}. ${payload.author}. ${payload.description}`

  const vector = await embedder(text)
  console.log(`> Generated vector for ${payload.title} #${vector.length}`)

  const id = crypto.randomUUID()
  await pointsApi.upsert({
    collectionName: env.QDRANT_COLLECTION,
    wait: true,
    points: [
      {
        id: { pointIdOptions: { case: 'uuid', value: id } },
        payload: {
          title: { kind: { case: 'stringValue', value: payload.title } },
          author: { kind: { case: 'stringValue', value: payload.author } },
          description: {
            kind: { case: 'stringValue', value: payload.description },
          },
        },
        vectors: {
          vectorsOptions: {
            case: 'vector',
            value: { vector: { case: 'dense', value: { data: vector } } },
          },
        },
      },
    ],
  })

  console.log(`> Upserted ${id} #${vector.length}`)
}
