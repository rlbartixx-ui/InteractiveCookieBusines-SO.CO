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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C1A0E]/65 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - Stretched wider */}
      <div
        className="relative bg-[#F9F8F6] border border-[#D9CFC7] w-full max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl z-10"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F9F8F6]/90 backdrop-blur border border-[#D9CFC7] flex items-center justify-center text-[#2C1A0E] hover:bg-[#2C1A0E] hover:text-[#F9F8F6] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
          {/* Left Column: Photography & Craft Badges */}
          <div className="md:col-span-5 relative aspect-square md:aspect-auto overflow-hidden bg-[#EFE9E3] min-h-[320px] md:min-h-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-5 left-5 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3.5 py-1 text-[0.65rem] tracking-widest uppercase shadow-sm">
                {product.tag}
              </span>
            )}
            <div className="absolute bottom-5 left-5 right-5 bg-[#F9F8F6]/92 backdrop-blur-md p-4 rounded-sm border border-[#D9CFC7]/70">
              <p className="text-[0.65rem] tracking-widest uppercase text-[#8B6F5C] font-semibold">
                Artisanal Batch Bake
              </p>
              <p className="font-display italic text-sm text-[#2C1A0E] mt-0.5">
                Hand-folded dough with browned butter &amp; flaky fleur de sel
              </p>
            </div>
          </div>

          {/* Right Column: Details, Tasting Profile & Sommelier Pairing */}
          <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Header & Price */}
              <div className="flex items-baseline justify-between gap-4 mb-2 pb-3 border-b border-[#D9CFC7]/60">
                <div>
                  <span className="text-[0.68rem] tracking-[0.25em] uppercase text-[#C9B59C] font-semibold block mb-1">
                    Signature Cookie
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-light text-[#2C1A0E]">
                    {product.name}
                  </h3>
                </div>
                <span className="font-display text-2xl sm:text-3xl text-[#2C1A0E] font-medium shrink-0">
                  {product.price}
                </span>
              </div>

              <p className="text-sm sm:text-[0.95rem] text-[#8B6F5C] leading-relaxed mb-6 mt-3">
                {product.desc}
              </p>

              {/* Grid of Tasting Notes & Pairing for wider balance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Sensory Tasting Profile */}
                <div className="bg-[#EFE9E3]/60 p-4 rounded-sm border border-[#D9CFC7]/60 flex flex-col justify-between">
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#8B6F5C] mb-3 font-semibold">
                    Sensory Profile
                  </p>
                  <div className="space-y-2.5">
                    {profileAttributes.map(attr => (
                      <div key={attr.label}>
                        <div className="flex justify-between text-xs text-[#2C1A0E] mb-1">
                          <span>{attr.label}</span>
                          <span className="text-[#8B6F5C] font-mono font-medium">{attr.value}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#D9CFC7]/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2C1A0E] rounded-full transition-all duration-500"
                            style={{ width: `${(attr.value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sommelier Drink Pairing */}
                <div className="p-4 bg-[#F9F8F6] border border-[#D9CFC7]/70 border-l-3 border-l-[#2C1A0E] rounded-r-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-1">
                      Sommelier Pairing
                    </p>
                    <p className="font-medium text-sm text-[#2C1A0E] mb-1.5">
                      {product.pairing.beverage}
                    </p>
                    <p className="text-xs text-[#8B6F5C] italic leading-relaxed">
                      "{product.pairing.tastingNotes}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#D9CFC7]/40 text-[0.7rem] text-[#8B6F5C]">
                    Best served warm (10s in oven)
                  </div>
                </div>
              </div>

              {/* Ingredients & Allergens in columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-2">
                    Key Ingredients
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.slice(0, 4).map(ing => (
                      <span
                        key={ing}
                        className="px-2.5 py-1 rounded-sm bg-[#EFE9E3] text-[#2C1A0E] text-[0.72rem]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold mb-2">
                    Allergen Guide
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map(allergen => (
                      <span
                        key={allergen}
                        className="px-2.5 py-1 rounded-sm bg-[#D9CFC7]/50 text-[#2C1A0E] text-[0.72rem] font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-[#D9CFC7]">
              <button
                onClick={() => {
                  onInspect3D(product)
                  onClose()
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] py-3.5 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all cursor-pointer shadow-sm"
              >
                <span>Inspect in 3D Live</span>
                <span>✦</span>
              </button>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-sm border border-[#D9CFC7] text-[#2C1A0E] px-8 py-3.5 text-[0.75rem] tracking-widest uppercase hover:border-[#2C1A0E] hover:bg-[#EFE9E3] transition-all"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
