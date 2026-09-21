import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../../components/common/SectionHeading'

const PRESS = ['Bon Appétit', 'The Local', 'Eater']

export function StorySection() {
  const { ref, visible } = useReveal()

  return (
    <section id="our-story" className="py-24 md:py-32">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-24 items-center"
      >
        {/* Image block */}
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1649634437312-c005a922d448?w=860&h=1040&fit=crop&auto=format"
              alt="Freshly baked S.O Co. cookies on a tray"
              className="w-full aspect-[5/6] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display italic text-[1.7rem] text-[#F9F8F6] leading-tight">
                "Started in a kitchen.<br />Stayed in the kitchen."
              </p>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="Our Story">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] mb-8">
              Born from a Sunday<br />afternoon and a very<br />
              <em className="italic text-[#C9B59C]">specific craving.</em>
            </h2>
          </SectionHeading>

          <div className="space-y-4 text-[#8B6F5C] leading-relaxed text-[0.95rem]">
            <p>
              S.O Co. began in 2026 when founder Shierdon couldn't find the cookie she actually wanted — one that tasted like someone cared. Brown butter, real vanilla, a heavy-handed pinch of salt.
            </p>
            <p>
              What started as a Sunday project became a Tuesday obsession, then a Thursday business. The kitchen hasn't quieted since.
            </p>
            <p>
              We operate on one principle: if we wouldn't drive forty minutes for it, we don't sell it.
            </p>
          </div>

          <div className="mt-10 pt-10 border-t border-[#D9CFC7]">
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-[#8B6F5C]/60 mb-4">
              As seen in
            </p>
            <div className="flex items-center gap-7">
              {PRESS.map(pub => (
                <span key={pub} className="font-display italic text-[1.2rem] text-[#D9CFC7]">
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
