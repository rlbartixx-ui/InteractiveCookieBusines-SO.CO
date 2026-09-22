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
        className="fixed inset-0 bg-[#3A2A20]/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - Responsive Bottom-Sheet on Mobile, Centered Dossier on Desktop */}
      <div
        className="relative bg-[#FFF7E4] border border-[#E7D7BE] w-full max-w-4xl lg:max-w-5xl max-h-[90vh] sm:max-h-[88vh] overflow-y-auto rounded-t-xl sm:rounded-sm shadow-2xl z-10 no-scrollbar touch-scroll"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        {/* Mobile drag handle bar */}
        <div className="sm:hidden w-12 h-1 bg-[#E7D7BE] rounded-full mx-auto mt-2.5 mb-1" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFF7E4]/95 backdrop-blur border border-[#E7D7BE] flex items-center justify-center text-[#3A2A20] hover:bg-[#3A2A20] hover:text-[#FFF7E4] transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-0 md:min-h-[500px]">
          {/* Left Column: Cookie Photography */}
          <div className="md:col-span-5 relative h-48 sm:h-64 md:h-auto overflow-hidden bg-[#F6ECD4]">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 rounded-xs bg-[#3A2A20] text-[#FFF7E4] px-3 py-1 text-[0.62rem] tracking-widest uppercase shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right Column: Tasting Notes, Sommelier Pairing & Allergens */}
          <div className="md:col-span-7 p-5 sm:p-7 md:p-9 flex flex-col justify-between">
            <div>
              {/* Header & Price with safety margin away from close button */}
              <div className="flex items-baseline justify-between gap-4 mb-2 pb-3 border-b border-[#E7D7BE]/60 pr-12 sm:pr-16">
                <div className="min-w-0">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#E07A3C] font-semibold block mb-0.5">
                    Signature Cookie
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-[#3A2A20] truncate">
                    {product.name}
                  </h3>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-[0.6rem] uppercase tracking-wider text-[#7C604D] font-semibold">
                    Price
                  </span>
                  <span className="font-display text-xl sm:text-2xl md:text-3xl text-[#3A2A20] font-medium leading-none">
                    {product.price}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#7C604D] leading-relaxed mb-5 mt-2">
                {product.desc}
              </p>

              {/* Sensory Tasting Profile & Sommelier Pairing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                {/* Sensory Profile Progress Bars */}
                <div className="bg-[#F6ECD4]/60 p-3.5 sm:p-4 rounded-xs border border-[#E7D7BE]/70">
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#7C604D] mb-2.5 font-semibold">
                    Sensory Profile
                  </p>
                  <div className="space-y-2">
                    {profileAttributes.map(attr => (
                      <div key={attr.label}>
                        <div className="flex justify-between text-[0.72rem] text-[#3A2A20] mb-0.5">
                          <span>{attr.label}</span>
                          <span className="text-[#7C604D] font-mono font-medium">{attr.value}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#E7D7BE]/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E07A3C] rounded-full transition-all duration-500"
                            style={{ width: `${(attr.value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drink Pairing */}
                <div className="p-3.5 sm:p-4 bg-[#FFF7E4] border border-[#E7D7BE]/80 border-l-2 border-l-[#E07A3C] rounded-r-xs flex flex-col justify-between">
                  <div>
                    <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#7C604D] font-semibold mb-1">
                      Drink Pairing
                    </p>
                    <p className="font-medium text-xs sm:text-sm text-[#3A2A20] mb-1">
                      {product.pairing.beverage}
                    </p>
                    <p className="text-[0.72rem] text-[#7C604D] italic leading-relaxed line-clamp-3">
                      "{product.pairing.tastingNotes}"
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E7D7BE]/40 text-[0.65rem] text-[#7C604D]">
                    Best served warm (10s in oven)
                  </div>
                </div>
              </div>

              {/* Baker's Notes & Allergens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#7C604D] font-semibold mb-1">
                    Freshness &amp; Warming
                  </p>
                  <p className="text-[0.72rem] text-[#7C604D] leading-relaxed">
                    Baked with real butter in small daily batches. Warm for 10 seconds in an oven for a soft center and rich buttery aroma.
                  </p>
                </div>

                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#7C604D] font-semibold mb-1">
                    Allergen Guide
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.allergens.map(allergen => (
                      <span
                        key={allergen}
                        className="px-2 py-0.5 rounded-xs bg-[#E7D7BE]/50 text-[#3A2A20] text-[0.68rem] font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-[#E7D7BE]">
              <button
                onClick={() => {
                  onInspect3D(product)
                  onClose()
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#3A2A20] text-[#FFF7E4] py-3 text-[0.72rem] tracking-widest uppercase font-medium hover:bg-[#E07A3C] hover:text-[#FFF7E4] transition-all cursor-pointer shadow-sm"
              >
                <span>View in Showcase</span>
                <span>→</span>
              </button>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-sm border border-[#E7D7BE] bg-[#FFF7E4] text-[#3A2A20] px-6 py-3 text-[0.72rem] tracking-widest uppercase font-medium hover:border-[#3A2A20] hover:bg-[#F6ECD4] transition-all text-center"
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
