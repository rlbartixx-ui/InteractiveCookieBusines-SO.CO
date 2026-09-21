export interface Product {
  id: number
  name: string
  desc: string
  price: string
  tag?: string
  img: string
  bg: string
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
