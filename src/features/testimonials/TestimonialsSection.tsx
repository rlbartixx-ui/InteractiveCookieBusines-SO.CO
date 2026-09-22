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
      className="bg-[#F6ECD4]/60 py-20 sm:py-28 md:py-36 overflow-hidden border-y border-[#E7D7BE]/80 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F6C453]/20 blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <SectionHeading
          eyebrow="Voices & Praise"
          centered
          className="mb-3 sm:mb-5"
          eyebrowClassName="text-[0.62rem] sm:text-[0.66rem] tracking-[0.2em] sm:tracking-[0.28em]"
        >
          <h2 className="font-display text-[clamp(1.75rem,3.8vw,2.5rem)] font-light text-[#3A2A20] leading-tight tracking-tight">
            What People <em className="italic text-[#E07A3C]">Say</em>
          </h2>
        </SectionHeading>

        {/* 5-Star Rating Ribbon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7E4]/90 border border-[#E7D7BE]/70 shadow-xs mb-8 sm:mb-10">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-[#E07A3C]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-mono text-[#7C604D] font-semibold tracking-wide">5.0 / 5.0 Rating</span>
        </div>

        {/* Decorative Editorial Quote Mark */}
        <div className="font-serif select-none text-[5rem] sm:text-[7rem] md:text-[8rem] leading-none text-[#F6C453]/40 -mb-8 sm:-mb-12 pointer-events-none">
          “
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[260px] sm:min-h-[200px] md:min-h-[190px] flex items-center justify-center">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out px-4 sm:px-8 ${i === activeIdx
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                }`}
            >
              <blockquote className="font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-light italic leading-[1.2] text-[#3A2A20] mb-6 sm:mb-8 max-w-4xl mx-auto">
                "{t.quote}"
              </blockquote>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600/90 shadow-xs ring-2 ring-emerald-600/20" />
                <p className="font-medium text-[0.95rem] sm:text-base tracking-wide text-[#3A2A20]">{t.name}</p>
                <span className="text-[#F6C453]">·</span>
                <p className="text-[0.72rem] sm:text-[0.78rem] tracking-widest uppercase text-[#7C604D] font-mono">
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows & Dots */}
        <div className="flex justify-center items-center gap-4 sm:gap-5 mt-10 sm:mt-12">
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E7D7BE] bg-[#FFF7E4] text-[#3A2A20] flex items-center justify-center hover:bg-[#3A2A20] hover:text-[#FFF7E4] hover:border-[#3A2A20] transition-all duration-200 cursor-pointer text-sm shadow-xs"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-300 cursor-pointer ${i === activeIdx
                    ? 'w-8 h-2 rounded-full bg-[#3A2A20]'
                    : 'w-2.5 h-2 rounded-full bg-[#E7D7BE] hover:bg-[#F6C453]'
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E7D7BE] bg-[#FFF7E4] text-[#3A2A20] flex items-center justify-center hover:bg-[#3A2A20] hover:text-[#FFF7E4] hover:border-[#3A2A20] transition-all duration-200 cursor-pointer text-sm shadow-xs"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
