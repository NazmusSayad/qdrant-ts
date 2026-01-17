import { spawnSync } from 'child_process'
import z from 'zod'
import { env } from './env'

const vectorSchema = z.array(z.number()).length(env.EMBEDDER_VECTOR_SIZE)

export async function embedder(
  text: string
): Promise<z.infer<typeof vectorSchema>> {
  const result = spawnSync('python', ['./src/vector.py', text])
  if (result.status !== 0) {
    throw new Error(result.stderr.toString())
  }

  const data = JSON.parse(result.stdout.toString())
  if (data.error) {
    throw new Error(data.error)
  }

  return vectorSchema.parse(data.vector)
}
