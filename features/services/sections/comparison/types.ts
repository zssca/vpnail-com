export type ComparisonService = {
  name: string
  price: string
  duration: string
  features: string[]
}

export type ComparisonCategory = {
  name: string
  services: ComparisonService[]
}

export type ComparisonData = {
  title: string
  description: string
  categories: ComparisonCategory[]
}
