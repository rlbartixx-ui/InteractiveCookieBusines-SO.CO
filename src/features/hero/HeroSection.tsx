import { useState, useRef, useCallback } from 'react'
import { CookieScene } from '../../components/3d/CookieScene'
import { PRODUCTS } from '../../data/products'
import type { Product } from '../../types'

interface HeroSectionProps {
  selectedProduct: Product
  onSelectProduct: (product: Product) => void
}

export function HeroSection({ selectedProduct, onSelectProduct }: HeroSectionProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isInspectMode, setIsInspectMode] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const mouse3d = useRef<[number, number]>([0, 0])

  // Mouse drag side-scroll state & refs
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasMoved = useRef(false)

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    isDragging.current = true
    setIsGrabbing(true)
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeftStart.current = sliderRef.current.scrollLeft
    hasMoved.current = false
  }

  const handleSliderMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    if (Math.abs(walk) > 4) {
      hasMoved.current = true
    }
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleSliderMouseUp = () => {
    isDragging.current = false
    setIsGrabbing(false)
  }

  const handleSliderMouseLeave = () => {
    isDragging.current = false
    setIsGrabbing(false)
  }

  const handleSliderWheel = (e: React.WheelEvent) => {
    if (!sliderRef.current) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      sliderRef.current.scrollLeft += e.deltaY * 0.8
    }
  }

  const handleFlavorClick = (product: Product) => {
    if (hasMoved.current) return
    onSelectProduct(product)
  }

  const scrollSlider = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    mouse3d.current = [
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    ]
  }, [])

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20"
    >
      {/* Ambient glow following mouse (subtle on desktop, hidden on touch) */}
      <div
        className="hidden md:block absolute pointer-events-none rounded-full opacity-35 blur-[140px] transition-[left,top] duration-75 ease-out"
        style={{
          width: 640,
          height: 640,
          background: 'radial-gradient(circle, #C9B59C 0%, transparent 65%)',
          left: mouse.x - 320,
          top: mouse.y - 320,
        }}
      />

      {/* Decorative warm background glow blobs */}
      <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-[#EFE9E3] opacity-45 translate-x-1/4 -translate-y-1/4 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#EFE9E3] opacity-40 -translate-x-1/3 translate-y-1/3 pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-5 md:gap-y-6 items-center w-full relative z-10">
        {/* Editorial Headline & Copy */}
        <div className="order-1 md:col-start-1 md:row-start-1" style={{ animation: 'fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both' }}>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#EFE9E3]/90 border border-[#D9CFC7]/70 text-[#8B6F5C] mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B59C]" />
            <span className="text-[0.65rem] tracking-[0.22em] uppercase font-semibold">
              Home-Based · Naga City
            </span>
          </div>

          {/* Fluid Typography Heading */}
          <h1 className="font-display text-[clamp(2.4rem,6vw,5.8rem)] font-light leading-[0.96] tracking-tight mb-4 sm:mb-6 text-[#2C1A0E]">
            Baked with<br />
            <span className="italic text-[#C9B59C] relative inline-block font-normal">
              real butter.
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-[#C9B59C]/40"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </span>
          </h1>

          <p className="text-[#8B6F5C] text-[0.9rem] sm:text-[1rem] md:text-[1.05rem] leading-relaxed max-w-[460px] font-normal">
            Every S.O Cookie Co. cookie is mixed in small batches with real butter, rested to develop flavor, and baked fresh in Naga City. Quality cookies at an accessible local price.
          </p>
        </div>

        {/* Interactive 3D Cookie Canvas */}
        <div
          className="order-2 md:col-start-2 md:row-start-1 md:row-span-4 relative flex flex-col justify-center items-center w-full my-1 md:my-0 overflow-hidden sm:overflow-visible"
          style={{ animation: 'scaleIn 1s cubic-bezier(0.22,1,0.36,1) both 0.15s' }}
        >
          {/* Subtle spinning decorative ring (safely scaled to avoid mobile/tablet overflow) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 320 320"
              className="w-[260px] h-[260px] min-[400px]:w-[290px] min-[400px]:h-[290px] sm:w-[340px] sm:h-[340px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] spin-slow opacity-25"
            >
              <circle
                cx="160"
                cy="160"
                r="154"
                fill="none"
                stroke="#C9B59C"
                strokeWidth="0.8"
                strokeDasharray="4 10"
              />
            </svg>
          </div>

          {/* Fluid Responsive 3D Canvas Box */}
          <div className="relative w-full max-w-[260px] min-[400px]:max-w-[290px] sm:max-w-[340px] md:max-w-[350px] lg:max-w-[420px] xl:max-w-[480px] aspect-square mx-auto">
            <CookieScene
              mouse={mouse3d}
              visuals={selectedProduct.visuals}
              isInspectMode={isInspectMode}
            />
          </div>

          {/* 360° Inspect Badge & Instructions */}
          <div className="mt-2.5 sm:mt-4 flex flex-col items-center gap-1 z-20">
            <button
              onClick={() => setIsInspectMode(prev => !prev)}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[0.68rem] sm:text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${isInspectMode
                ? 'bg-[#2C1A0E] text-[#F9F8F6] ring-2 ring-[#C9B59C]'
                : 'bg-[#F9F8F6] border border-[#D9CFC7] text-[#8B6F5C] hover:border-[#2C1A0E] hover:text-[#2C1A0E]'
                }`}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-500 ${isInspectMode ? 'rotate-180 text-[#C9B59C]' : ''
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isInspectMode ? 'Exit 360° View' : '360° Interactive View'}</span>
            </button>

            <span className="text-[0.65rem] sm:text-[0.68rem] text-[#8B6F5C] tracking-wide text-center">
              {isInspectMode
                ? 'Drag to rotate · Pinch or scroll to zoom'
                : 'Interactive · Moves with cursor and touch'}
            </span>
          </div>
        </div>

        {/* Interactive 3D Flavor Switcher with mouse drag & touch side-scroll */}
        <div className="order-3 md:col-start-1 md:row-start-2 bg-[#EFE9E3]/50 p-3 sm:p-4 rounded-md border border-[#D9CFC7]/60">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#8B6F5C] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              Live 3D Cookie:
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-xs font-display italic text-[#2C1A0E]">
                {selectedProduct.name} · <span className="font-semibold text-[#8B6F5C]">{selectedProduct.price}</span>
              </span>
              {/* Arrow navigation shortcuts */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollSlider(-160)}
                  aria-label="Scroll flavors left"
                  className="w-5 h-5 rounded-full bg-[#F9F8F6] border border-[#D9CFC7] flex items-center justify-center text-[0.65rem] text-[#8B6F5C] hover:text-[#2C1A0E] hover:border-[#2C1A0E] transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(160)}
                  aria-label="Scroll flavors right"
                  className="w-5 h-5 rounded-full bg-[#F9F8F6] border border-[#D9CFC7] flex items-center justify-center text-[0.65rem] text-[#8B6F5C] hover:text-[#2C1A0E] hover:border-[#2C1A0E] transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal touch + mouse drag side-scrollable pill strip */}
          <div
            ref={sliderRef}
            onMouseDown={handleSliderMouseDown}
            onMouseMove={handleSliderMouseMove}
            onMouseUp={handleSliderMouseUp}
            onMouseLeave={handleSliderMouseLeave}
            onWheel={handleSliderWheel}
            className={`flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar touch-scroll py-1 -mx-1 px-1 pr-10 select-none ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
              }`}
          >
            {PRODUCTS.map(product => {
              const isActive = product.id === selectedProduct.id
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleFlavorClick(product)}
                  className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all duration-300 ${isActive
                    ? 'bg-[#2C1A0E] text-[#F9F8F6] shadow-sm scale-102 ring-1 ring-[#C9B59C]/50'
                    : 'bg-[#F9F8F6] text-[#8B6F5C] hover:bg-[#F9F8F6]/90 hover:text-[#2C1A0E] border border-[#D9CFC7]/70'
                    } ${isGrabbing ? 'cursor-grabbing' : 'cursor-pointer'}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10 shrink-0"
                    style={{ backgroundColor: product.visuals.topColor }}
                  />
                  <span className="whitespace-nowrap">{product.name}</span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-1 text-[0.65rem] text-[#8B6F5C]/80 mt-2">
            <span>Hold &amp; drag left/right to browse all flavors</span>
            <span className="text-[0.62rem] opacity-75">All 5 flavors</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="order-4 md:col-start-1 md:row-start-3 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-3 sm:gap-4">
          <a
            href="#order"
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-6 lg:px-7 py-3.5 lg:py-4 text-[0.72rem] lg:text-[0.75rem] tracking-[0.14em] uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300 shadow-md font-medium text-center"
          >
            <span>Build Your Custom Box</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-sm border border-[#D9CFC7] bg-[#F9F8F6]/60 text-[#2C1A0E] px-5 lg:px-6 py-3.5 lg:py-4 text-[0.72rem] lg:text-[0.75rem] tracking-[0.14em] uppercase hover:border-[#2C1A0E] hover:bg-[#EFE9E3] transition-all duration-200 text-center font-medium"
          >
            Explore 5 Flavors
          </a>
        </div>

        {/* Artisanal Trust Chips */}
        <div className="order-5 md:col-start-1 md:row-start-4 pt-5 md:pt-6 border-t border-[#D9CFC7]/60 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#2C1A0E]">Real Butter</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#8B6F5C]">Baked With Care</p>
          </div>
          <div className="border-x border-[#D9CFC7]/60 px-1 sm:px-2">
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#2C1A0E]">Small Batch</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#8B6F5C]">Dough Rested</p>
          </div>
          <div>
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#2C1A0E]">Naga City</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#8B6F5C]">Home-Based</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 pointer-events-none">
        <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8B6F5C]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9B59C] to-transparent animate-pulse" />
      </div>
    </section>
  )
}

