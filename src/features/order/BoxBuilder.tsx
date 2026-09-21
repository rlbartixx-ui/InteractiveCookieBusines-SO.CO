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

  const currentConfig = BOX_OPTIONS.find(b => b.capacity === selectedCapacity) || BOX_OPTIONS[1]

  // Add flavor to box
  const handleAddProduct = (product: Product) => {
    if (boxItems.length < selectedCapacity) {
      setBoxItems(prev => [...prev, product])
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

    return `S.O Co. Custom Cookie Box Order:
Box Size: ${currentConfig.label} (${boxItems.length}/${selectedCapacity} items)
Flavors Selected:
${itemsList}

Estimated Total: ₱${total}
Preferred Pickup: [Please specify Date & Time, Tue-Sun 8am-2pm]
Name: [Your Name]`
  }

  const handleCopyOrder = () => {
    const text = generateSummaryText()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="bg-[#F9F8F6] border border-[#D9CFC7] rounded-sm p-4 sm:p-7 md:p-9 shadow-xl max-w-4xl mx-auto text-left">
      {/* Step 1: Select Box Size */}
      <div className="mb-7">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#8B6F5C] font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#2C1A0E] text-[#F9F8F6] inline-flex items-center justify-center text-[0.62rem]">
              1
            </span>
            Choose Your Box Size
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuickFill}
              className="text-xs text-[#8B6F5C] hover:text-[#2C1A0E] underline cursor-pointer"
            >
              Fill with Chef's Assortment
            </button>
            <span className="text-[#D9CFC7]">·</span>
            <button
              onClick={handleClearBox}
              className="text-xs text-[#8B6F5C] hover:text-red-700 cursor-pointer"
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
                  ? 'border-[#2C1A0E] bg-[#EFE9E3]/70 ring-1 ring-[#2C1A0E] shadow-sm'
                  : 'border-[#D9CFC7] bg-[#F9F8F6] hover:bg-[#EFE9E3]/40'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-lg font-medium text-[#2C1A0E]">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#2C1A0E]" />
                    )}
                  </div>
                  <span className="inline-block text-[0.65rem] tracking-wider uppercase font-semibold text-[#8B6F5C] bg-[#E2D9CE]/60 px-2 py-0.5 rounded-sm">
                    {opt.tag}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Visual Box Tray */}
      <div className="mb-7 bg-[#EFE9E3]/50 p-4 sm:p-5 rounded-sm border border-[#D9CFC7]/70">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#8B6F5C] font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#2C1A0E] text-[#F9F8F6] inline-flex items-center justify-center text-[0.62rem]">
              2
            </span>
            Box Slots ({boxItems.length} of {selectedCapacity} filled)
          </p>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isFull
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
              }`}
          >
            {isFull ? 'Box Complete' : `${remainingSlots} slots remaining`}
          </span>
        </div>

        {/* Visual Slots Grid */}
        <div className="grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
          {Array.from({ length: selectedCapacity }).map((_, index) => {
            const item = boxItems[index]
            if (item) {
              return (
                <div
                  key={index}
                  className="relative group bg-[#F9F8F6] border border-[#D9CFC7] p-2 rounded-sm flex flex-col items-center text-center shadow-xs transition-transform duration-200 hover:scale-102"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#D9CFC7]/80 mb-1"
                  />
                  <p className="text-[0.7rem] font-medium text-[#2C1A0E] leading-tight line-clamp-1">
                    {item.name}
                  </p>
                  <span className="text-[0.65rem] text-[#8B6F5C]">{item.price}</span>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#2C1A0E] text-[#F9F8F6] rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100 cursor-pointer shadow-sm"
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
                className="border-2 border-dashed border-[#D9CFC7] rounded-sm p-3 min-h-[96px] flex flex-col items-center justify-center text-center text-[#8B6F5C]/60"
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
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#8B6F5C] font-semibold flex items-center gap-2 mb-3">
          <span className="w-5 h-5 rounded-full bg-[#2C1A0E] text-[#F9F8F6] inline-flex items-center justify-center text-[0.62rem]">
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
                className="flex items-center justify-between p-2.5 rounded-sm bg-[#EFE9E3]/40 border border-[#D9CFC7]/70 hover:bg-[#EFE9E3]/70 transition-colors"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#D9CFC7]"
                  />
                  <div className="truncate">
                    <p className="font-display text-sm text-[#2C1A0E] truncate font-medium">
                      {product.name}
                    </p>
                    <p className="text-[0.7rem] text-[#8B6F5C]">{product.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {countInBox > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#2C1A0E] text-[#F9F8F6] text-[0.65rem] flex items-center justify-center font-bold">
                      {countInBox}
                    </span>
                  )}
                  <button
                    disabled={isFull}
                    onClick={() => handleAddProduct(product)}
                    className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-medium cursor-pointer transition-all ${isFull
                      ? 'opacity-40 bg-[#D9CFC7] text-[#8B6F5C] cursor-not-allowed'
                      : 'bg-[#2C1A0E] text-[#F9F8F6] hover:bg-[#C9B59C] hover:text-[#2C1A0E]'
                      }`}
                  >
                    ＋ Add
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Order Summary & Dispatch Action Bar */}
      <div className="pt-5 border-t border-[#D9CFC7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5">
        <div className="w-full md:w-auto">
          <div className="flex items-baseline gap-3">
            <span className="text-xs uppercase tracking-widest text-[#8B6F5C] font-semibold">
              Box Total:
            </span>
            <span className="font-display text-2xl sm:text-3xl font-medium text-[#2C1A0E]">
              ₱{total}
            </span>
          </div>
          <p className="text-[0.7rem] text-[#8B6F5C] mt-0.5">
            {boxItems.length} of {selectedCapacity} items selected · Fresh baked to order
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Copy Order Summary Button */}
          <button
            onClick={handleCopyOrder}
            disabled={boxItems.length === 0}
            className="px-4 sm:px-5 py-3 rounded-sm border border-[#D9CFC7] bg-[#F9F8F6] text-[#2C1A0E] text-[0.72rem] tracking-wider sm:tracking-widest uppercase font-medium hover:bg-[#EFE9E3] hover:border-[#2C1A0E] transition-all cursor-pointer text-center"
          >
            {copied ? 'Order Copied' : 'Copy Order Text'}
          </button>

          {/* Send via Instagram DM */}
          <a
            href="https://www.instagram.com/s.ocookieco/"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] text-[0.72rem] tracking-wider sm:tracking-widest uppercase font-medium hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all shadow-md cursor-pointer text-center ${boxItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
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
