import { useState, useEffect, useRef, useCallback } from 'react'
import { PRODUCTS } from '../../data/products'
import type { Product } from '../../types'

interface CookieCarouselProps {
  selectedProduct: Product
  onSelectProduct: (product: Product) => void
}

export function CookieCarousel({ selectedProduct, onSelectProduct }: CookieCarouselProps) {
  const currentIndex = PRODUCTS.findIndex(p => p.id === selectedProduct.id)
  const activeIndex = currentIndex !== -1 ? currentIndex : 0

  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Drag & Swipe state
  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)
  const isDragging = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)

  const goToSlide = useCallback((index: number) => {
    const total = PRODUCTS.length
    const normalizedIndex = (index + total) % total
    onSelectProduct(PRODUCTS[normalizedIndex])
  }, [onSelectProduct])

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1)
  }, [activeIndex, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1)
  }, [activeIndex, goToSlide])

  // Autoplay timer (every 5 seconds when not hovered and autoplay enabled)
  useEffect(() => {
    if (!isAutoplay || isHovered) return

    const timer = setInterval(() => {
      goToSlide(activeIndex + 1)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoplay, isHovered, activeIndex, goToSlide])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    touchCurrentX.current = e.touches[0].clientX
    const diff = touchCurrentX.current - touchStartX.current
    setDragOffset(diff * 0.4)
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = touchCurrentX.current - touchStartX.current
    setDragOffset(0)

    if (diff > 50) {
      goPrev()
    } else if (diff < -50) {
      goNext()
    }
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX
    touchCurrentX.current = e.clientX
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    touchCurrentX.current = e.clientX
    const diff = touchCurrentX.current - touchStartX.current
    setDragOffset(diff * 0.4)
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = touchCurrentX.current - touchStartX.current
    setDragOffset(0)

    if (diff > 50) {
      goPrev()
    } else if (diff < -50) {
      goNext()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false
      setDragOffset(0)
    }
    setIsHovered(false)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full my-2 md:my-0 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative Rotating Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 320 320"
          className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] lg:w-[460px] lg:h-[460px] spin-slow opacity-30"
        >
          <circle
            cx="160"
            cy="160"
            r="154"
            fill="none"
            stroke="#F6C453"
            strokeWidth="0.8"
            strokeDasharray="4 10"
          />
        </svg>
      </div>

      {/* Warm Ambient Glow behind active cookie */}
      <div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedProduct.bg }}
      />

      {/* Carousel Container */}
      <div
        className="relative w-full max-w-[290px] min-[420px]:max-w-[320px] sm:max-w-[350px] md:max-w-[370px] lg:max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E7D7BE] bg-[#FFF7E4] cursor-grab active:cursor-grabbing transition-transform duration-300 hover:shadow-[0_25px_60px_-15px_rgba(58,42,32,0.22)]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Subtle 5-second slide progress bar */}
        {isAutoplay && !isHovered && (
          <div
            key={activeIndex}
            className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#F6C453] z-30 origin-left pointer-events-none"
            style={{
              animation: 'carouselProgress 5s linear forwards',
            }}
          />
        )}

        {/* Slides Track */}
        <div
          className="flex h-full w-full transition-transform ease-out"
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
            transitionDuration: isDragging.current ? '0ms' : '500ms',
          }}
        >
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              className="relative w-full h-full shrink-0 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFFDF9] to-[#F6ECD4]"
            >
              {/* Product Image */}
              <img
                src={product.handImg || product.img}
                alt={product.name}
                loading={idx === 0 ? 'eager' : 'lazy'}
                draggable={false}
                style={{ objectPosition: 'center 75%' }}
                className="w-full h-full object-cover transform -translate-y-2 sm:-translate-y-3 transition-transform duration-700 hover:scale-105 pointer-events-none"
              />

              {/* Gentle inner top and bottom gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Floating Badges */}
              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                {product.tag ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A2A20]/90 backdrop-blur-sm text-[#FFF7E4] text-[0.65rem] tracking-[0.16em] uppercase font-semibold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E07A3C]" />
                    {product.tag}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A2A20]/80 backdrop-blur-sm text-[#FFF7E4] text-[0.65rem] tracking-[0.16em] uppercase font-semibold shadow-sm">
                    Fresh Batch
                  </span>
                )}

                <span className="px-3 py-1 rounded-full bg-[#FFF7E4]/95 backdrop-blur-md text-[#3A2A20] text-xs font-bold tracking-tight shadow-md border border-white/60">
                  {product.price}
                </span>
              </div>

              {/* Bottom Frosted Card Details */}
              <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 p-3 sm:p-3.5 rounded-xl bg-[#3A2A20]/90 backdrop-blur-md text-[#FFF7E4] border border-white/15 shadow-xl transition-all pointer-events-none z-10">
                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                  <h3 className="font-display text-base sm:text-lg font-light text-[#FFF7E4]">
                    {product.name}
                  </h3>
                  <span className="text-[0.65rem] tracking-wider uppercase text-[#F6C453] font-mono">
                    0{idx + 1} / 0{PRODUCTS.length}
                  </span>
                </div>
                <p className="text-[0.72rem] sm:text-[0.78rem] text-[#F6ECD4]/90 line-clamp-2 leading-relaxed font-light">
                  {product.desc}
                </p>
                {product.pairing && (
                  <div className="mt-1.5 pt-1.5 border-t border-white/10 flex items-center gap-1.5 text-[0.62rem] text-[#F6C453]">
                    <span className="font-medium uppercase tracking-wider">Pair with:</span>
                    <span className="text-[#F6ECD4]/85 truncate">{product.pairing.beverage}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Side Arrow Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="Previous cookie"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFF7E4]/90 hover:bg-[#E07A3C] text-[#3A2A20] hover:text-[#FFF7E4] border border-[#E7D7BE] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer z-20 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="Next cookie"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFF7E4]/90 hover:bg-[#E07A3C] text-[#3A2A20] hover:text-[#FFF7E4] border border-[#E7D7BE] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer z-20 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Carousel Controls: Dots & Autoplay Toggle */}
      <div className="mt-3.5 flex items-center gap-3 z-20">
        {/* Slide Counter & Dots */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6ECD4] border border-[#E7D7BE] shadow-xs">
          {PRODUCTS.map((p, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${p.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${isActive
                  ? 'w-6 h-2 bg-[#3A2A20]'
                  : 'w-2 h-2 bg-[#F6C453]/60 hover:bg-[#E07A3C]'
                  }`}
              />
            )
          })}
        </div>

        {/* Autoplay Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsAutoplay(prev => !prev)}
          title={isAutoplay ? 'Pause auto-sliding' : 'Play auto-sliding'}
          aria-label={isAutoplay ? 'Pause auto-sliding' : 'Play auto-sliding'}
          className="w-7 h-7 rounded-full bg-[#F6ECD4] hover:bg-[#3A2A20] text-[#7C604D] hover:text-[#FFF7E4] border border-[#E7D7BE] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
        >
          {isAutoplay ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-3 h-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <span className="text-[0.65rem] text-[#7C604D] tracking-wide text-center mt-1">
        Swipe or click arrows to explore all 5 cookies
      </span>
    </div>
  )
}
