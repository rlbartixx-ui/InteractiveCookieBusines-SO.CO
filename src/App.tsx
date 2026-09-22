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
import { SoundPill } from './features/audio/SoundPill'

import { PRODUCTS } from './data/products'
import type { Product } from './types'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0])

  return (
    <div className="min-h-screen bg-[#FFF7E4] text-[#3A2A20] font-body overflow-x-hidden">
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

      {/* Floating ASMR Bakery Sound Pill */}
      <SoundPill />
    </div>
  )
}
