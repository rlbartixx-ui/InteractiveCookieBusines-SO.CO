import { useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { TESTIMONIALS } from '../../data/testimonials'
import { SectionHeading } from '../../components/common/SectionHeading'

export function TestimonialsSection() {
  const { ref, visible } = useReveal()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[#EFE9E3] py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        <SectionHeading eyebrow="What People Say" centered className="mb-16" />

        <div className="relative min-h-[220px] flex items-center justify-center">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${i === activeIdx
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
            >
              <blockquote className="font-display text-[clamp(1.4rem,3.2vw,2.2rem)] font-light italic leading-tight text-[#2C1A0E] mb-8">
                "{t.quote}"
              </blockquote>
              <p className="font-medium text-[0.85rem] tracking-wide text-[#2C1A0E]">{t.name}</p>
              <p className="text-[0.7rem] tracking-widest uppercase text-[#8B6F5C] mt-1">
                {t.title}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center items-center gap-3 mt-14">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${i === activeIdx
                  ? 'w-8 h-1.5 rounded-sm bg-[#2C1A0E]'
                  : 'w-1.5 h-1.5 bg-[#D9CFC7] hover:bg-[#C9B59C]'
                }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
