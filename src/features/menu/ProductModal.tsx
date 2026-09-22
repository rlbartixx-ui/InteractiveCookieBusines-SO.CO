import { useEffect } from 'react'
import type { Product } from '../../types'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onInspect3D: (product: Product) => void
}

export function ProductModal({ product, onClose, onInspect3D }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (product) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onClose])

  if (!product) return null

  const profileAttributes = [
    { label: 'Sweetness', value: product.profile.sweetness },
    { label: 'Chewiness', value: product.profile.chewiness },
    { label: 'Richness', value: product.profile.richness },
    { label: 'Salt Balance', value: product.profile.saltiness },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C1A0E]/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - Responsive Bottom-Sheet on Mobile, Centered Dossier on Desktop */}
      <div
        className="relative bg-[#F9F8F6] border border-[#D9CFC7] w-full max-w-4xl lg:max-w-5xl max-h-[90vh] sm:max-h-[88vh] overflow-y-auto rounded-t-xl sm:rounded-sm shadow-2xl z-10 no-scrollbar touch-scroll"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        {/* Mobile drag handle bar */}
        <div className="sm:hidden w-12 h-1 bg-[#D9CFC7] rounded-full mx-auto mt-2.5 mb-1" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F9F8F6]/95 backdrop-blur border border-[#D9CFC7] flex items-center justify-center text-[#2C1A0E] hover:bg-[#2C1A0E] hover:text-[#F9F8F6] transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-0 md:min-h-[500px]">
          {/* Left Column: Cookie Photography */}
          <div className="md:col-span-5 relative h-48 sm:h-64 md:h-auto overflow-hidden bg-[#EFE9E3]">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 rounded-xs bg-[#2C1A0E] text-[#F9F8F6] px-3 py-1 text-[0.62rem] tracking-widest uppercase shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right Column: Tasting Notes, Sommelier Pairing & Allergens */}
          <div className="md:col-span-7 p-5 sm:p-7 md:p-9 flex flex-col justify-between">
            <div>
              {/* Header & Price with safety margin away from close button */}
              <div className="flex items-baseline justify-between gap-4 mb-2 pb-3 border-b border-[#D9CFC7]/60 pr-12 sm:pr-16">
                <div className="min-w-0">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#C9B59C] font-semibold block mb-0.5">
                    Signature Cookie
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-[#2C1A0E] truncate">
                    {product.name}
                  </h3>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-[0.6rem] uppercase tracking-wider text-[#8B6F5C] font-semibold">
                    Price
                  </span>
                  <span className="font-display text-xl sm:text-2xl md:text-3xl text-[#2C1A0E] font-medium leading-none">
                    {product.price}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#8B6F5C] leading-relaxed mb-5 mt-2">
                {product.desc}
              </p>

              {/* Sensory Tasting Profile & Sommelier Pairing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                {/* Sensory Profile Progress Bars */}
                <div className="bg-[#EFE9E3]/60 p-3.5 sm:p-4 rounded-xs border border-[#D9CFC7]/70">
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B6F5C] mb-2.5 font-semibold">
                    Sensory Profile
                  </p>
                  <div className="space-y-2">
                    {profileAttributes.map(attr => (
                      <div key={attr.label}>
                        <div className="flex justify-between text-[0.72rem] text-[#2C1A0E] mb-0.5">
                          <span>{attr.label}</span>
                          <span className="text-[#8B6F5C] font-mono font-medium">{attr.value}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#D9CFC7]/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2C1A0E] rounded-full transition-all duration-500"
                            style={{ width: `${(attr.value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drink Pairing */}
                <div className="p-3.5 sm:p-4 bg-[#F9F8F6] border border-[#D9CFC7]/80 border-l-2 border-l-[#2C1A0E] rounded-r-xs flex flex-col justify-between">
                  <div>
                    <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-1">
                      Drink Pairing
                    </p>
                    <p className="font-medium text-xs sm:text-sm text-[#2C1A0E] mb-1">
                      {product.pairing.beverage}
                    </p>
                    <p className="text-[0.72rem] text-[#8B6F5C] italic leading-relaxed line-clamp-3">
                      "{product.pairing.tastingNotes}"
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#D9CFC7]/40 text-[0.65rem] text-[#8B6F5C]">
                    Best served warm (10s in oven)
                  </div>
                </div>
              </div>

              {/* Baker's Notes & Allergens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-1">
                    Freshness &amp; Warming
                  </p>
                  <p className="text-[0.72rem] text-[#8B6F5C] leading-relaxed">
                    Baked with real butter in small daily batches. Warm for 10 seconds in an oven for a soft center and rich buttery aroma.
                  </p>
                </div>

                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-1">
                    Allergen Guide
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.allergens.map(allergen => (
                      <span
                        key={allergen}
                        className="px-2 py-0.5 rounded-xs bg-[#D9CFC7]/50 text-[#2C1A0E] text-[0.68rem] font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-[#D9CFC7]">
              <button
                onClick={() => {
                  onInspect3D(product)
                  onClose()
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] py-3 text-[0.72rem] tracking-widest uppercase font-medium hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all cursor-pointer shadow-sm"
              >
                <span>Inspect in 3D Live</span>
                <span>→</span>
              </button>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-sm border border-[#D9CFC7] bg-[#F9F8F6] text-[#2C1A0E] px-6 py-3 text-[0.72rem] tracking-widest uppercase font-medium hover:border-[#2C1A0E] hover:bg-[#EFE9E3] transition-all text-center"
              >
                Add to Box Configurator
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
