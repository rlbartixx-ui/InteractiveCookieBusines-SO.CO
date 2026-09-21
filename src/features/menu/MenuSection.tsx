import { useState, useMemo } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { PRODUCTS } from '../../data/products'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import type { Product, DietaryCategory } from '../../types'

const FILTER_TABS: { label: string; value: DietaryCategory }[] = [
  { label: 'All Flavors', value: 'all' },
  { label: 'Bestsellers', value: 'bestseller' },
  { label: 'New Flavor', value: 'new' },
  { label: 'Nut-Free', value: 'nut-free' },
]

interface MenuSectionProps {
  onSelectProduct: (product: Product) => void
}

export function MenuSection({ onSelectProduct }: MenuSectionProps) {
  const { ref, visible } = useReveal()
  const [activeFilter, setActiveFilter] = useState<DietaryCategory>('all')
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return PRODUCTS
    return PRODUCTS.filter(p => p.dietary.includes(activeFilter))
  }, [activeFilter])

  const handleInspect3D = (product: Product) => {
    onSelectProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="menu" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className={`reveal mb-12 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="The Menu">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-tight">
                Each one a <em className="italic">story.</em>
              </h2>
              <a
                href="#order"
                className="text-[0.75rem] tracking-widest uppercase text-[#8B6F5C] border-b border-[#D9CFC7] hover:border-[#C9B59C] hover:text-[#2C1A0E] transition-all pb-0.5"
              >
                Order All →
              </a>
            </div>

            {/* Dietary & Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#D9CFC7]/50">
              {FILTER_TABS.map(tab => {
                const isActive = activeFilter === tab.value
                const count =
                  tab.value === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter(p => p.dietary.includes(tab.value)).length

                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
                    className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${isActive
                      ? 'bg-[#2C1A0E] text-[#F9F8F6] shadow-sm'
                      : 'bg-[#EFE9E3] text-[#8B6F5C] hover:bg-[#D9CFC7] hover:text-[#2C1A0E]'
                      }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-2 text-[0.65rem] opacity-60">({count})</span>
                  </button>
                )
              })}
            </div>
          </SectionHeading>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              visible={visible}
              onSelect={p => setModalProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Tasting Notes & Details Modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onInspect3D={handleInspect3D}
      />
    </section>
  )
}
