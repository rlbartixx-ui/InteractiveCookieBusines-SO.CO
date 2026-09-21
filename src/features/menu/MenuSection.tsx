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
    <section id="menu" className="py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div ref={ref} className={`reveal mb-10 sm:mb-14 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="The Artisan Menu">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6 sm:mb-8">
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-light leading-tight text-[#2C1A0E]">
                Each one a <em className="italic text-[#C9B59C]">story.</em>
              </h2>
              <a
                href="#order"
                className="text-[0.72rem] tracking-[0.18em] uppercase text-[#8B6F5C] border-b border-[#D9CFC7] hover:border-[#2C1A0E] hover:text-[#2C1A0E] transition-all pb-0.5 font-medium"
              >
                Curate a Custom Box →
              </a>
            </div>

            {/* Dietary & Category Filter Chips with mobile touch slider */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar touch-scroll py-1.5 border-t border-[#D9CFC7]/60 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
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
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${isActive
                        ? 'bg-[#2C1A0E] text-[#F9F8F6] shadow-sm ring-1 ring-[#C9B59C]/40'
                        : 'bg-[#EFE9E3]/70 text-[#8B6F5C] hover:bg-[#EFE9E3] hover:text-[#2C1A0E] border border-[#D9CFC7]/60'
                      }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1.5 text-[0.68rem] opacity-65">({count})</span>
                  </button>
                )
              })}
            </div>
            <p className="text-[0.65rem] text-[#8B6F5C]/80 mt-2 flex items-center justify-between sm:hidden">
              <span>Tap any cookie for flavor dossier</span>
              <span>← Scroll filters →</span>
            </p>
          </SectionHeading>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
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
