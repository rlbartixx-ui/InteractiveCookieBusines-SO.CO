import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../../components/common/SectionHeading'

const PRESS = ['Bon Appétit', 'The Local', 'Eater']

export function StorySection() {
  const { ref, visible } = useReveal()

  return (
    <section id="our-story" className="py-20 sm:py-28 md:py-36 bg-[#F9F8F6]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center"
      >
        {/* Image block */}
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="relative rounded-sm overflow-hidden shadow-xl border border-[#D9CFC7]">
            <img
              src="https://images.unsplash.com/photo-1649634437312-c005a922d448?w=860&h=1040&fit=crop&auto=format"
              alt="Freshly baked S.O Co. cookies on a tray"
              className="w-full aspect-[4/3] sm:aspect-[5/6] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 via-transparent to-transparent" />

            {/* Stamp Badge */}
            <div className="absolute top-4 right-4 bg-[#F9F8F6]/90 backdrop-blur-md px-3 py-1.5 rounded-xs border border-[#D9CFC7] text-[0.62rem] tracking-widest uppercase text-[#2C1A0E] font-medium shadow-sm">
              Certified Small Batch
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="font-display italic text-xl sm:text-2xl md:text-[1.7rem] text-[#F9F8F6] leading-tight drop-shadow-sm">
                "Started in a kitchen.<br />Stayed in the kitchen."
              </p>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="Our Story">
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.02] mb-6 text-[#2C1A0E]">
              Born from a Sunday<br />afternoon and a very<br />
              <em className="italic text-[#C9B59C]">specific craving.</em>
            </h2>
          </SectionHeading>

          <div className="space-y-4 text-[#8B6F5C] leading-relaxed text-[0.95rem] font-normal">
            <p>
              S.O Co. began in 2026 when founder Shierdon couldn't find the cookie she actually wanted — one that tasted like someone cared. Brown butter, real vanilla, a heavy-handed pinch of salt.
            </p>
            <p>
              What started as a Sunday project became a Tuesday obsession, then a Thursday business. The kitchen hasn't quieted since.
            </p>
            <p className="font-medium text-[#2C1A0E]">
              We operate on one principle: if we wouldn't drive forty minutes for it, we don't sell it.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[#D9CFC7]">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#8B6F5C]/70 mb-3 font-semibold">
              As seen in
            </p>
            <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
              {PRESS.map(pub => (
                <span key={pub} className="font-display italic text-lg sm:text-xl text-[#8B6F5C]/60 hover:text-[#2C1A0E] transition-colors">
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
