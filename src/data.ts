export type BookData = {
  title: string
  author: string
  description: string
}

export type VectorPoint = {
  id: string
  vector: number[]
  payload: BookData
}

export const bookData: BookData[] = [
  {
    title: 'A Golden Age',
    author: 'Tahmima Anam',
    description:
      'A novel set in Bangladesh during the 1971 war of independence, following a family navigating conflict and survival.',
  },
  {
    title: 'To Live',
    author: 'Yu Hua',
    description:
      "A Chinese novel tracing one man's life through decades of upheaval and social change.",
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description:
      'A Russian epic about families and history during the Napoleonic wars.',
  },
  {
    title: 'Jane Eyre',
    author: 'Charlotte Bronte',
    description:
      "A British novel about an orphaned girl's resilience and moral independence in 19th century England.",
  },
  {
    title: 'Cry, the Beloved Country',
    author: 'Alan Paton',
    description:
      "A South African novel exploring a country's divisions through a father's search for his son.",
  },
]
