import json
import sys
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-large-en-v1.5")

text = " ".join(sys.argv[1:])

if not text:
  print(json.dumps({"error": "No text provided"}))
  sys.exit(1)

vector = model.encode(text, normalize_embeddings=True)

print(json.dumps({
    "vector": vector.tolist(),
    "dimension": len(vector)
}))
