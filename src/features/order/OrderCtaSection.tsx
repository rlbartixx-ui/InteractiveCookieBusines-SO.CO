import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../../components/common/SectionHeading'
import { BoxBuilder } from './BoxBuilder'
import cookieAvatar from '../../images/ChocolateChip.jpg'

export function OrderCtaSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="order" className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-[#FAF7F2]">
      {/* Subtle background ambient circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -right-36 w-[480px] h-[480px] rounded-full bg-[#EFE9E3] opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#EFE9E3] opacity-50 blur-2xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 reveal ${visible ? 'visible' : ''
          }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <img
            src={cookieAvatar}
            alt="S.O Cookie Co. handcrafted cookie"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mx-auto mb-5 ring-4 ring-[#EFE9E3] shadow-md"
          />

          <SectionHeading eyebrow="Custom Cookie Boxes" centered>
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[0.96] mb-4 text-[#2C1A0E]">
              Curate your <em className="italic text-[#C9B59C]">perfect box.</em>
            </h2>
          </SectionHeading>

          <p className="text-[#8B6F5C] text-sm sm:text-base leading-relaxed">
            Quality cookies at an accessible local price. Pick up your freshly baked box at NCF Liboton Gate (Tuesday–Sunday).
          </p>
        </div>

        {/* Interactive Custom Box Configurator */}
        <BoxBuilder />

        {/* Ordering Policies & FAQs Ribbon */}
        <div className="mt-12 pt-8 border-t border-[#D9CFC7]/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-display text-base text-[#2C1A0E] mb-1 font-medium">Pickup Point</p>
            <p className="text-xs text-[#8B6F5C]">
              NCF Liboton Gate is our designated pickup point (Tue–Sun, 8am–2pm). Note: not a permanent store.
            </p>
          </div>
          <div>
            <p className="font-display text-base text-[#2C1A0E] mb-1 font-medium">Baked with Real Butter</p>
            <p className="text-xs text-[#8B6F5C]">
              Handcrafted in small batches with real butter. Best enjoyed fresh or warmed for 10s in the oven.
            </p>
          </div>
          <div>
            <p className="font-display text-base text-[#2C1A0E] mb-1 font-medium">Accessible Local Price</p>
            <p className="text-xs text-[#8B6F5C]">
              High-quality treats priced accessibly for Naga City. Pre-orders ensure your box is reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
