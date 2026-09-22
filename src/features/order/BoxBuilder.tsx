import { useState } from 'react'
import { PRODUCTS } from '../../data/products'
import type { Product } from '../../types'

export type BoxCapacity = 4 | 6 | 12

interface BoxConfig {
  capacity: BoxCapacity
  label: string
  tag: string
}

const BOX_OPTIONS: BoxConfig[] = [
  { capacity: 4, label: '4-Pack Sampler', tag: 'Personal Box' },
  { capacity: 6, label: '6-Pack Box', tag: 'Half Dozen' },
  { capacity: 12, label: 'Party Dozen (12)', tag: 'Full Dozen' },
]

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 25
}

interface BoxBuilderProps {
  onInspectProduct?: (product: Product) => void
}

export function BoxBuilder({ onInspectProduct }: BoxBuilderProps) {
  const [selectedCapacity, setSelectedCapacity] = useState<BoxCapacity>(6)
  const [boxItems, setBoxItems] = useState<Product[]>([
    PRODUCTS[0], // Chocolate Chip
    PRODUCTS[0],
    PRODUCTS[1], // Velvet Crush
    PRODUCTS[2], // Midnight Bite
    PRODUCTS[3], // Matcha Muse
    PRODUCTS[4], // Golden Drip
  ])
  const [copied, setCopied] = useState(false)
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null)
  const [animatingId, setAnimatingId] = useState<number | null>(null)

  const currentConfig = BOX_OPTIONS.find(b => b.capacity === selectedCapacity) || BOX_OPTIONS[1]

  // Add flavor to box
  const handleAddProduct = (product: Product) => {
    if (boxItems.length < selectedCapacity) {
      const newIndex = boxItems.length
      setBoxItems(prev => [...prev, product])
      setLastAddedIndex(newIndex)
      setAnimatingId(product.id)
      setTimeout(() => {
        setLastAddedIndex(null)
        setAnimatingId(null)
      }, 700)
    }
  }

  // Remove flavor at index
  const handleRemoveItem = (index: number) => {
    setBoxItems(prev => prev.filter((_, i) => i !== index))
  }

  // Change box capacity
  const handleSelectCapacity = (cap: BoxCapacity) => {
    setSelectedCapacity(cap)
    if (boxItems.length > cap) {
      setBoxItems(prev => prev.slice(0, cap))
    }
  }

  // Quick fill with bestsellers
  const handleQuickFill = () => {
    const filled: Product[] = []
    for (let i = 0; i < selectedCapacity; i++) {
      filled.push(PRODUCTS[i % PRODUCTS.length])
    }
    setBoxItems(filled)
    setLastAddedIndex(selectedCapacity - 1)
    setTimeout(() => setLastAddedIndex(null), 700)
  }

  // Reset / clear box
  const handleClearBox = () => {
    setBoxItems([])
  }

  // Price calculations
  const total = boxItems.reduce((acc, item) => acc + parsePrice(item.price), 0)
  const isFull = boxItems.length === selectedCapacity
  const remainingSlots = selectedCapacity - boxItems.length

  // Generate order summary text
  const generateSummaryText = () => {
    const counts: Record<string, { count: number; price: string }> = {}
    boxItems.forEach(p => {
      if (!counts[p.name]) counts[p.name] = { count: 0, price: p.price }
      counts[p.name].count += 1
    })

    const itemsList = Object.entries(counts)
      .map(([name, data]) => `• ${data.count}x ${name} (${data.price})`)
      .join('\n')

    return `S.O Cookie Co. Custom Cookie Box Order:
Box Size: ${currentConfig.label} (${boxItems.length}/${selectedCapacity} items)
Flavors Selected:
${itemsList}

Estimated Total: ₱${total}
Pickup Point: NCF Liboton Gate (Designated pickup point, message for availability)
Preferred Date & Time: [Please specify]
Customer Name: [Your Name]`
  }

  const handleCopyOrder = () => {
    const text = generateSummaryText()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="bg-[#FFF7E4] border border-[#E7D7BE] rounded-sm p-4 sm:p-7 md:p-9 shadow-xl max-w-4xl mx-auto text-left">
      {/* Step 1: Select Box Size */}
      <div className="mb-7">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#7C604D] font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#3A2A20] text-[#FFF7E4] inline-flex items-center justify-center text-[0.62rem]">
              1
            </span>
            Choose Your Box Size
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuickFill}
              className="text-xs text-[#7C604D] hover:text-[#E07A3C] underline cursor-pointer"
            >
              Fill with Chef's Assortment
            </button>
            <span className="text-[#E7D7BE]">·</span>
            <button
              onClick={handleClearBox}
              className="text-xs text-[#7C604D] hover:text-red-700 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Box Size Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BOX_OPTIONS.map(opt => {
            const isSelected = selectedCapacity === opt.capacity
            return (
              <button
                key={opt.capacity}
                onClick={() => handleSelectCapacity(opt.capacity)}
                className={`p-3.5 sm:p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between relative ${isSelected
                  ? 'border-[#3A2A20] bg-[#F6ECD4] ring-1 ring-[#3A2A20] shadow-sm'
                  : 'border-[#E7D7BE] bg-[#FFF7E4] hover:bg-[#F6ECD4]/60'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-lg font-medium text-[#3A2A20]">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#3A2A20]" />
                    )}
                  </div>
                  <span className="inline-block text-[0.65rem] tracking-wider uppercase font-semibold text-[#7C604D] bg-[#E7D7BE]/40 px-2 py-0.5 rounded-sm">
                    {opt.tag}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Visual Box Tray */}
      <div className="mb-7 bg-[#F6ECD4]/50 p-4 sm:p-5 rounded-sm border border-[#E7D7BE]/70">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#7C604D] font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#3A2A20] text-[#FFF7E4] inline-flex items-center justify-center text-[0.62rem]">
              2
            </span>
            Box Slots ({boxItems.length} of {selectedCapacity} filled)
          </p>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full transition-all duration-300 ${isFull
              ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-400/50 shadow-sm'
              : 'bg-amber-100 text-amber-900'
              }`}
          >
            {isFull ? 'Box Complete!' : `${remainingSlots} slots remaining`}
          </span>
        </div>

        {/* Visual Slots Grid */}
        <div className="grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
          {Array.from({ length: selectedCapacity }).map((_, index) => {
            const item = boxItems[index]
            const isJustAdded = index === lastAddedIndex

            if (item) {
              return (
                <div
                  key={index}
                  style={
                    isJustAdded
                      ? { animation: 'cookieDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both' }
                      : undefined
                  }
                  className="relative group bg-[#FFF7E4] border border-[#E7D7BE] p-2 rounded-sm flex flex-col items-center text-center shadow-xs transition-transform duration-200 hover:scale-102"
                >
                  {/* Floating +1 Micro-badge on addition */}
                  {isJustAdded && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#3A2A20] text-[#FFF7E4] text-[0.6rem] font-bold shadow-md pointer-events-none z-20 whitespace-nowrap"
                      style={{ animation: 'badgeFloat 0.75s ease-out forwards' }}
                    >
                      +1 Added
                    </span>
                  )}

                  <div className="relative">
                    {/* Golden Drop Ripple Ring */}
                    {isJustAdded && (
                      <span
                        className="absolute inset-0 rounded-full border-2 border-[#F6C453] pointer-events-none z-10"
                        style={{ animation: 'cookieRipple 0.65s ease-out forwards' }}
                      />
                    )}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#E7D7BE]/80 mb-1"
                    />
                  </div>

                  <p className="text-[0.7rem] font-medium text-[#3A2A20] leading-tight line-clamp-1">
                    {item.name}
                  </p>
                  <span className="text-[0.65rem] text-[#7C604D]">{item.price}</span>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#3A2A20] text-[#FFF7E4] rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#E07A3C] cursor-pointer shadow-sm active:scale-90 transition-transform"
                    aria-label={`Remove ${item.name} from slot ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              )
            }
            return (
              <div
                key={index}
                className="border-2 border-dashed border-[#E7D7BE] rounded-sm p-3 min-h-[96px] flex flex-col items-center justify-center text-center text-[#7C604D]/60"
              >
                <span className="text-base sm:text-lg mb-0.5">＋</span>
                <span className="text-[0.65rem] uppercase tracking-wider">Slot {index + 1}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Step 3: Flavor Picker */}
      <div className="mb-7">
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#7C604D] font-semibold flex items-center gap-2 mb-3">
          <span className="w-5 h-5 rounded-full bg-[#3A2A20] text-[#FFF7E4] inline-flex items-center justify-center text-[0.62rem]">
            3
          </span>
          Tap to Add Flavors to Your Box
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRODUCTS.map(product => {
            const countInBox = boxItems.filter(p => p.id === product.id).length
            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-2.5 rounded-sm bg-[#F6ECD4]/40 border border-[#E7D7BE]/70 hover:bg-[#F6ECD4]/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#E7D7BE]"
                  />
                  <div className="truncate">
                    <p className="font-display text-sm text-[#3A2A20] truncate font-medium">
                      {product.name}
                    </p>
                    <p className="text-[0.7rem] text-[#7C604D]">{product.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {countInBox > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#3A2A20] text-[#FFF7E4] text-[0.65rem] flex items-center justify-center font-bold">
                      {countInBox}
                    </span>
                  )}
                  <button
                    disabled={isFull}
                    onClick={() => handleAddProduct(product)}
                    className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-medium cursor-pointer transition-all active:scale-90 flex items-center gap-1 ${isFull
                      ? 'opacity-40 bg-[#E7D7BE] text-[#7C604D] cursor-not-allowed'
                      : animatingId === product.id
                        ? 'bg-[#F6C453] text-[#3A2A20] scale-95 shadow-inner'
                        : 'bg-[#3A2A20] text-[#FFF7E4] hover:bg-[#E07A3C]'
                      }`}
                  >
                    {animatingId === product.id ? '✓ Added' : '＋ Add'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Order Summary & Dispatch Action Bar */}
      <div className="pt-5 border-t border-[#E7D7BE] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5">
        <div className="w-full md:w-auto">
          <div className="flex items-baseline gap-3">
            <span className="text-xs uppercase tracking-widest text-[#7C604D] font-semibold">
              Box Total:
            </span>
            <span className="font-display text-2xl sm:text-3xl font-medium text-[#3A2A20]">
              ₱{total}
            </span>
          </div>
          <p className="text-[0.7rem] text-[#7C604D] mt-0.5">
            {boxItems.length} of {selectedCapacity} items selected · Fresh baked to order
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Copy Order Summary Button */}
          <button
            onClick={handleCopyOrder}
            disabled={boxItems.length === 0}
            className="px-4 sm:px-5 py-3 rounded-sm border border-[#E7D7BE] bg-[#FFF7E4] text-[#3A2A20] text-[0.72rem] tracking-wider sm:tracking-widest uppercase font-medium hover:bg-[#F6ECD4] hover:border-[#3A2A20] transition-all cursor-pointer text-center"
          >
            {copied ? 'Order Copied' : 'Copy Order Text'}
          </button>

          {/* Send via Instagram DM */}
          <a
            href="https://www.instagram.com/s.ocookieco/"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-sm bg-[#E07A3C] text-[#FFF7E4] text-[0.72rem] tracking-wider sm:tracking-widest uppercase font-semibold hover:bg-[#3A2A20] transition-all shadow-md cursor-pointer text-center ${boxItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
              }`}
          >
            <span>Send Order via Instagram</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
