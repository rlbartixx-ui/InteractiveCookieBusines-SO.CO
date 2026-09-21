import { useReveal } from '../../hooks/useReveal'
import { PRODUCTS } from '../../data/products'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ProductCard } from './ProductCard'

export function MenuSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="menu" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className={`reveal mb-14 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="The Menu">
            <div className="flex items-end justify-between flex-wrap gap-4">
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
          </SectionHeading>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
