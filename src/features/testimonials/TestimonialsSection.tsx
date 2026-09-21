import { useState, useEffect, useCallback } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { TESTIMONIALS } from '../../data/testimonials'
import { SectionHeading } from '../../components/common/SectionHeading'

export function TestimonialsSection() {
  const { ref, visible } = useReveal()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(handleNext, 5500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  return (
    <section
      className="bg-[#EFE9E3]/70 py-20 sm:py-28 md:py-36 overflow-hidden border-y border-[#D9CFC7]/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <SectionHeading eyebrow="What People Say" centered className="mb-10 sm:mb-14" />

        {/* 5-Star Rating Ribbon */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-[#C48B44]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-xs font-mono text-[#8B6F5C] font-semibold">5.0 / 5.0 Rating</span>
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[230px] sm:min-h-[180px] md:min-h-[160px] flex items-center justify-center">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out px-2 ${i === activeIdx
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 translate-x-10 scale-95 pointer-events-none'
                }`}
            >
              <blockquote className="font-display text-[clamp(1.25rem,3.2vw,2rem)] font-light italic leading-snug text-[#2C1A0E] mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <p className="font-medium text-[0.85rem] tracking-wide text-[#2C1A0E]">{t.name}</p>
                <span className="text-[#D9CFC7]">·</span>
                <p className="text-[0.68rem] tracking-widest uppercase text-[#8B6F5C]">
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows & Dots */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-[#D9CFC7] bg-[#F9F8F6] text-[#2C1A0E] flex items-center justify-center hover:bg-[#2C1A0E] hover:text-[#F9F8F6] transition-colors cursor-pointer text-xs"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-300 cursor-pointer ${i === activeIdx
                  ? 'w-7 h-1.5 rounded-xs bg-[#2C1A0E]'
                  : 'w-2 h-1.5 rounded-xs bg-[#D9CFC7] hover:bg-[#C9B59C]'
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-[#D9CFC7] bg-[#F9F8F6] text-[#2C1A0E] flex items-center justify-center hover:bg-[#2C1A0E] hover:text-[#F9F8F6] transition-colors cursor-pointer text-xs"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
