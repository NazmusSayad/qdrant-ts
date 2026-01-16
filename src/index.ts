import { QdrantClient } from '@qdrant/js-client-rest'

const client = new QdrantClient({
  url: 'http://localhost:6333',
})

await client.recreateCollection('docs', {
  vectors: {
    size: 384,
    distance: 'Cosine',
  },
})

await client.upsert('docs', {
  points: [
    {
      id: 1,
      vector: Array(384).fill(0.01),
      payload: {
        text: 'Qdrant is a vector database',
        source: 'local',
      },
    },
    {
      id: 2,
      vector: Array(384).fill(0.02),
      payload: {
        text: 'TypeScript works well with Qdrant',
      },
    },
  ],
})

const result = await client.search('docs', {
  vector: Array(384).fill(0.015),
  limit: 3,
})

console.log(result)
