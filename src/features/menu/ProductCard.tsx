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
        } ${visible ? 'visible' : ''} rounded-sm overflow-hidden border border-[#E7D7BE] bg-[#FFF7E4] bakery-card-shadow-hover flex flex-col justify-between`}
    >
      {/* Top Media Container */}
      <div className="overflow-hidden aspect-square relative bg-[#F6ECD4]">
        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-3.5 left-3.5 z-10 rounded-xs bg-[#3A2A20] text-[#FFF7E4] px-2.5 py-1 text-[0.62rem] tracking-widest uppercase font-medium shadow-sm">
            {product.tag}
          </div>
        )}

        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />

        {/* Touch & hover backdrop highlight */}
        <div className="absolute inset-0 bg-[#3A2A20]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <span className="bg-[#FFF7E4] text-[#3A2A20] text-[0.68rem] uppercase tracking-widest font-semibold px-4 py-2 rounded-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Tasting Notes →
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-baseline justify-between mb-1.5 gap-2">
            <h3 className="font-display text-lg sm:text-xl font-light leading-snug group-hover:text-[#E07A3C] transition-colors text-[#3A2A20]">
              {product.name}
            </h3>
            <span className="font-display text-base sm:text-lg text-[#3A2A20] font-medium shrink-0">
              {product.price}
            </span>
          </div>

          <p className="text-[0.8rem] text-[#7C604D] leading-relaxed line-clamp-2 mb-3">
            {product.desc}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-[#E7D7BE] flex items-center justify-between text-[0.72rem] text-[#7C604D]">
          <span className="text-[0.65rem] tracking-wider uppercase text-[#7C604D]/80 font-medium">
            Handcrafted
          </span>
          <span className="font-semibold text-[#3A2A20] group-hover:text-[#E07A3C] group-hover:translate-x-0.5 transition-all flex items-center gap-1">
            <span>View Details</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  )
}
