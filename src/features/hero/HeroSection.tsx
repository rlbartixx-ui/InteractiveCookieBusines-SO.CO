import { useState, useRef, useCallback, useEffect } from 'react'
import { CookieCarousel } from './CookieCarousel'
import { PRODUCTS } from '../../data/products'
import type { Product } from '../../types'

interface HeroSectionProps {
  selectedProduct: Product
  onSelectProduct: (product: Product) => void
}

export function HeroSection({ selectedProduct, onSelectProduct }: HeroSectionProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Liquid sliding indicator refs & state
  const tabRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({})
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  // Mouse drag side-scroll state & refs
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasMoved = useRef(false)

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current[selectedProduct.id]
      if (activeEl && sliderRef.current) {
        const left = activeEl.offsetLeft
        const width = activeEl.offsetWidth

        setIndicatorStyle({
          left,
          width,
          opacity: 1,
        })

        // Auto-scroll slider if active tab is partly hidden
        const scrollLeft = sliderRef.current.scrollLeft
        const clientWidth = sliderRef.current.clientWidth
        if (left < scrollLeft + 10) {
          sliderRef.current.scrollTo({ left: Math.max(0, left - 16), behavior: 'smooth' })
        } else if (left + width > scrollLeft + clientWidth - 10) {
          sliderRef.current.scrollTo({ left: left + width - clientWidth + 24, behavior: 'smooth' })
        }
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [selectedProduct.id])

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
          background: 'radial-gradient(circle, #F6C453 0%, transparent 65%)',
          left: mouse.x - 320,
          top: mouse.y - 320,
        }}
      />

      {/* Decorative warm background glow blobs */}
      <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-[#F6ECD4] opacity-50 translate-x-1/4 -translate-y-1/4 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#F6ECD4] opacity-45 -translate-x-1/3 translate-y-1/3 pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-5 md:gap-y-6 items-center w-full relative z-10">
        {/* Editorial Headline & Copy */}
        <div className="order-1 md:col-start-1 md:row-start-1" style={{ animation: 'fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both' }}>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#F6ECD4] border border-[#E7D7BE] text-[#7C604D] mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E07A3C]" />
            <span className="text-[0.65rem] tracking-[0.22em] uppercase font-semibold">
              Home-Based · Naga City
            </span>
          </div>

          {/* Fluid Typography Heading */}
          <h1 className="font-display text-[clamp(2.4rem,6vw,5.8rem)] font-light leading-[0.96] tracking-tight mb-4 sm:mb-6 text-[#3A2A20]">
            Baked with<br />
            <span className="italic text-[#E07A3C] relative inline-block font-normal">
              real butter.
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-[#F6C453]"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </span>
          </h1>

          <p className="text-[#7C604D] text-[0.9rem] sm:text-[1rem] md:text-[1.05rem] leading-relaxed max-w-[460px] font-normal">
            Every S.O Cookie Co. cookie is mixed in small batches with real butter, rested to develop flavor, and baked fresh in Naga City. Quality cookies at an accessible local price.
          </p>
        </div>

        {/* Interactive Cookie Showcase Carousel */}
        <div
          className="order-2 md:col-start-2 md:row-start-1 md:row-span-4 relative flex flex-col justify-center items-center w-full my-1 md:my-0 -translate-y-3 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-9 overflow-hidden sm:overflow-visible"
          style={{ animation: 'scaleIn 1s cubic-bezier(0.22,1,0.36,1) both 0.15s' }}
        >
          <CookieCarousel
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
          />
        </div>

        {/* Interactive Flavor Switcher with mouse drag & touch side-scroll */}
        <div className="order-3 md:col-start-1 md:row-start-2 bg-[#F6ECD4]/60 p-3 sm:p-4 rounded-md border border-[#E7D7BE]">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#7C604D] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A3C] animate-pulse" />
              Freshly Baked Flavors:
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-xs font-display italic text-[#3A2A20]">
                {selectedProduct.name} · <span className="font-semibold text-[#7C604D]">{selectedProduct.price}</span>
              </span>
              {/* Arrow navigation shortcuts */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollSlider(-160)}
                  aria-label="Scroll flavors left"
                  className="w-5 h-5 rounded-full bg-[#FFF7E4] border border-[#E7D7BE] flex items-center justify-center text-[0.65rem] text-[#7C604D] hover:text-[#3A2A20] hover:border-[#3A2A20] transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(160)}
                  aria-label="Scroll flavors right"
                  className="w-5 h-5 rounded-full bg-[#FFF7E4] border border-[#E7D7BE] flex items-center justify-center text-[0.65rem] text-[#7C604D] hover:text-[#3A2A20] hover:border-[#3A2A20] transition-colors cursor-pointer"
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
            className={`relative flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar touch-scroll py-1.5 -mx-1 px-1 pr-10 select-none items-center ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
              }`}
          >
            {/* Smooth Sliding Liquid Indicator */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#3A2A20] shadow-sm pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            {PRODUCTS.map(product => {
              const isActive = product.id === selectedProduct.id
              return (
                <button
                  key={product.id}
                  ref={el => {
                    tabRefs.current[product.id] = el
                  }}
                  type="button"
                  onClick={() => handleFlavorClick(product)}
                  className={`relative z-10 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors duration-300 border ${isActive
                    ? 'text-[#FFF7E4] border-transparent'
                    : 'text-[#7C604D] hover:text-[#3A2A20] bg-[#FFF7E4]/80 hover:bg-[#FFF7E4] border-[#E7D7BE]'
                    } ${isGrabbing ? 'cursor-grabbing' : 'cursor-pointer'}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ring-1 ring-black/10 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 ring-white/50' : ''
                      }`}
                    style={{ backgroundColor: product.visuals.topColor }}
                  />
                  <span className="whitespace-nowrap">{product.name}</span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-1 text-[0.65rem] text-[#7C604D]/80 mt-2">
            <span>Hold &amp; drag left/right to browse all flavors</span>
            <span className="text-[0.62rem] opacity-75">All 5 flavors</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="order-4 md:col-start-1 md:row-start-3 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-3 sm:gap-4">
          <a
            href="#order"
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#3A2A20] text-[#FFF7E4] px-6 lg:px-7 py-3.5 lg:py-4 text-[0.72rem] lg:text-[0.75rem] tracking-[0.14em] uppercase hover:bg-[#E07A3C] hover:text-[#FFF7E4] transition-all duration-300 shadow-md font-medium text-center"
          >
            <span>Build Your Custom Box</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-sm border border-[#E7D7BE] bg-[#FFF7E4]/80 text-[#3A2A20] px-5 lg:px-6 py-3.5 lg:py-4 text-[0.72rem] lg:text-[0.75rem] tracking-[0.14em] uppercase hover:border-[#3A2A20] hover:bg-[#F6ECD4] transition-all duration-200 text-center font-medium"
          >
            Explore 5 Flavors
          </a>
        </div>

        {/* Artisanal Trust Chips */}
        <div className="order-5 md:col-start-1 md:row-start-4 pt-5 md:pt-6 border-t border-[#E7D7BE] grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#3A2A20]">Real Butter</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#7C604D]">Baked With Care</p>
          </div>
          <div className="border-x border-[#E7D7BE] px-1 sm:px-2">
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#3A2A20]">Small Batch</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#7C604D]">Dough Rested</p>
          </div>
          <div>
            <p className="font-display text-xs min-[360px]:text-sm sm:text-base font-medium text-[#3A2A20]">Naga City</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-[#7C604D]">Home-Based</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 pointer-events-none">
        <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#7C604D]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#F6C453] to-transparent animate-pulse" />
      </div>
    </section>
  )
}

