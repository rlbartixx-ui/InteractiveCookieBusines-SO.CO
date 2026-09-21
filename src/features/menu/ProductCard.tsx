import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
  index: number
  visible: boolean
}

export function ProductCard({ product, index, visible }: ProductCardProps) {
  return (
    <div
      className={`group relative cursor-pointer reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''
        }`}
      style={{ backgroundColor: product.bg }}
    >
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3 py-1 text-[0.65rem] tracking-widest uppercase">
          {product.tag}
        </div>
      )}

      <div className="overflow-hidden aspect-square">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-display text-xl font-light leading-snug">{product.name}</h3>
          <span className="font-display text-lg text-[#C9B59C] shrink-0">{product.price}</span>
        </div>
        <p className="text-[0.82rem] text-[#8B6F5C] leading-relaxed">{product.desc}</p>
      </div>
    </div>
  )
}
