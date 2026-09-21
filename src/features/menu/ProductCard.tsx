import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
  index: number
  visible: boolean
  onSelect: (product: Product) => void
}

export function ProductCard({ product, index, visible, onSelect }: ProductCardProps) {
  return (
    <div
      onClick={() => onSelect(product)}
      className={`group relative cursor-pointer reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''
        } transition-all duration-300 hover:-translate-y-1.5`}
      style={{ backgroundColor: product.bg }}
    >
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3 py-1 text-[0.65rem] tracking-widest uppercase">
          {product.tag}
        </div>
      )}

      {/* 3D badge */}
      <div className="absolute top-4 right-4 z-10 rounded-full bg-[#F9F8F6]/80 backdrop-blur-sm px-2.5 py-0.5 text-[0.6rem] tracking-widest uppercase text-[#8B6F5C] opacity-0 group-hover:opacity-100 transition-opacity">
        3D View
      </div>

      <div className="overflow-hidden aspect-square relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#2C1A0E]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-[#F9F8F6] text-[#2C1A0E] text-[0.7rem] uppercase tracking-widest px-4 py-2 rounded-sm shadow-md">
            Tasting Notes
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-display text-xl font-light leading-snug group-hover:text-[#8B6F5C] transition-colors">
            {product.name}
          </h3>
          <span className="font-display text-lg text-[#2C1A0E] shrink-0 font-medium">
            {product.price}
          </span>
        </div>

        <p className="text-[0.82rem] text-[#8B6F5C] leading-relaxed line-clamp-2">
          {product.desc}
        </p>

        <div className="mt-3 pt-3 border-t border-[#D9CFC7]/60 flex items-center justify-between text-[0.7rem] text-[#8B6F5C] gap-2">
          <span className="italic truncate" title={product.pairing.beverage}>
            {product.pairing.beverage}
          </span>
          <span className="font-display text-[#2C1A0E] shrink-0 font-medium group-hover:translate-x-1 transition-transform">
            Details →
          </span>
        </div>
      </div>
    </div>
  )
}
