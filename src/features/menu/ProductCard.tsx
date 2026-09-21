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
      className={`group relative cursor-pointer reveal reveal-delay-${index + 1
        } ${visible ? 'visible' : ''} rounded-sm overflow-hidden border border-[#D9CFC7]/80 bg-[#F9F8F6] bakery-card-shadow-hover flex flex-col justify-between`}
    >
      {/* Top Media Container */}
      <div className="overflow-hidden aspect-square relative bg-[#EFE9E3]">
        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-3.5 left-3.5 z-10 rounded-xs bg-[#2C1A0E] text-[#F9F8F6] px-2.5 py-1 text-[0.62rem] tracking-widest uppercase font-medium shadow-sm">
            {product.tag}
          </div>
        )}

        {/* 3D badge */}
        <div className="absolute top-3.5 right-3.5 z-10 rounded-full bg-[#F9F8F6]/90 backdrop-blur-sm px-2.5 py-0.5 text-[0.6rem] tracking-wider uppercase text-[#8B6F5C] border border-[#D9CFC7]/60 shadow-xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          <span>3D</span>
        </div>

        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />

        {/* Touch & hover backdrop highlight */}
        <div className="absolute inset-0 bg-[#2C1A0E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <span className="bg-[#F9F8F6] text-[#2C1A0E] text-[0.68rem] uppercase tracking-widest font-semibold px-4 py-2 rounded-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Tasting Notes →
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-baseline justify-between mb-1.5 gap-2">
            <h3 className="font-display text-lg sm:text-xl font-light leading-snug group-hover:text-[#8B6F5C] transition-colors text-[#2C1A0E]">
              {product.name}
            </h3>
            <span className="font-display text-base sm:text-lg text-[#2C1A0E] font-medium shrink-0">
              {product.price}
            </span>
          </div>

          <p className="text-[0.8rem] text-[#8B6F5C] leading-relaxed line-clamp-2 mb-3">
            {product.desc}
          </p>
        </div>

        {/* Sommelier Drink Pairing & Details Footer */}
        <div className="pt-3 border-t border-[#D9CFC7]/60 flex items-center justify-between text-[0.7rem] text-[#8B6F5C] gap-2">
          <span className="truncate italic flex items-center gap-1" title={product.pairing.beverage}>
            <span>Pair:</span>
            <span className="text-[#2C1A0E] truncate">{product.pairing.beverage}</span>
          </span>
          <span className="font-semibold text-[#2C1A0E] shrink-0 group-hover:translate-x-0.5 transition-transform">
            View →
          </span>
        </div>
      </div>
    </div>
  )
}
