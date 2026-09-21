import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../../components/common/SectionHeading'

export function OrderCtaSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="order" className="relative py-28 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -right-36 w-[480px] h-[480px] rounded-full bg-[#EFE9E3] opacity-55" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#EFE9E3] opacity-40" />
      </div>

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center relative z-10 reveal ${visible ? 'visible' : ''
          }`}
      >
        <img
          src="https://images.unsplash.com/photo-1649634437193-d3a5c51e5981?w=160&h=160&fit=crop&auto=format"
          alt="S.O Co. cookie"
          className="w-16 h-16 rounded-full object-cover mx-auto mb-8 ring-4 ring-[#EFE9E3]"
        />

        <SectionHeading eyebrow="Ready to order?" centered>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] mb-6">
            Your next favourite<br />
            <em className="italic text-[#C9B59C]">cookie awaits.</em>
          </h2>
        </SectionHeading>

        <p className="text-[#8B6F5C] text-[1rem] mb-12 max-w-md mx-auto leading-relaxed">
          Pick-up available Tuesday–Sunday. Pre-orders recommended — we sell out most mornings.
        </p>

        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/s.ocookieco/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-sm border border-[#D9CFC7] text-[#8B6F5C] px-10 py-4 text-[0.75rem] tracking-widest uppercase hover:border-[#2C1A0E] hover:text-[#2C1A0E] transition-all duration-300"
          >
            Follow Along
          </a>
        </div>
      </div>
    </section>
  )
}
