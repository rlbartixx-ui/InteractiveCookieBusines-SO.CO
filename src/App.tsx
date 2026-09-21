import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MarqueeTicker } from './components/layout/MarqueeTicker'

import { HeroSection } from './features/hero/HeroSection'
import { StatsSection } from './features/stats/StatsSection'
import { MenuSection } from './features/menu/MenuSection'
import { ProcessSection } from './features/process/ProcessSection'
import { StorySection } from './features/story/StorySection'
import { TestimonialsSection } from './features/testimonials/TestimonialsSection'
import { OrderCtaSection } from './features/order/OrderCtaSection'
import { NewsletterSection } from './features/newsletter/NewsletterSection'

import { PRODUCTS } from './data/products'
import type { Product } from './types'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0])

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C1A0E] font-body overflow-x-hidden">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
        />
        <MarqueeTicker />
        <StatsSection />
        <MenuSection onSelectProduct={setSelectedProduct} />
        <ProcessSection />
        <StorySection />
        <TestimonialsSection />
        <OrderCtaSection />
        <NewsletterSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}
