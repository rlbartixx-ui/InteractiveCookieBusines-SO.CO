export type DietaryCategory =
  | 'all'
  | 'bestseller'
  | 'new'
  | 'nut-free'
  | 'gluten-friendly'

export interface Cookie3DVisuals {
  crustColor: string
  innerColor: string
  topColor: string
  centerColor: string
  ringColor: string
  chipColor: string
  chipBaseColor: string
  accentDotColor: string
  roughness: number
  wobbleFactor: number
  speed: number
}

export interface FlavorProfile {
  sweetness: number   // 1 - 5
  chewiness: number   // 1 - 5
  richness: number    // 1 - 5
  saltiness: number   // 1 - 5
}

export interface DrinkPairing {
  beverage: string
  tastingNotes: string
}

export interface Product {
  id: number
  slug: string
  name: string
  desc: string
  price: string
  tag?: string
  dietary: DietaryCategory[]
  img: string
  bg: string
  visuals: Cookie3DVisuals
  profile: FlavorProfile
  pairing: DrinkPairing
  ingredients: string[]
  allergens: string[]
}

export interface ProcessStep {
  step: string
  title: string
  desc: string
}

export interface Testimonial {
  quote: string
  name: string
  title: string
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface NavItem {
  label: string
  href: string
}
