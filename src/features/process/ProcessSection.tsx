import { PROCESS_STEPS } from '../../data/process'
import { SectionHeading } from '../../components/common/SectionHeading'

function ProcessIcon({ step }: { step: string }) {
  if (step === '01') {
    // Sourcing / Wheat
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#C9B59C]">
        <path d="M2 22l10-10" />
        <path d="M16 8a4 4 0 00-6-6 4 4 0 006 6z" />
        <path d="M17.5 15a3.5 3.5 0 00-5-5 3.5 3.5 0 005 5z" />
        <path d="M9 13.5a3.5 3.5 0 00-5-5 3.5 3.5 0 005 5z" />
      </svg>
    )
  }
  if (step === '02') {
    // Mixing / Bowl
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#C9B59C]">
        <path d="M4 11a8 8 0 0016 0H4z" />
        <path d="M12 3v5" />
        <path d="M9 4l6 4" />
        <path d="M6 18h12" />
      </svg>
    )
  }
  if (step === '03') {
    // Rest / Slow Ferment Clock
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#C9B59C]">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    )
  }
  // Bake / Hearth Flame
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#C9B59C]">
      <path d="M8.5 14.5A3.5 3.5 0 0012 18a3.5 3.5 0 003.5-3.5c0-2-1.5-3.5-3.5-6.5-2 3-3.5 4.5-3.5 6.5z" />
      <path d="M12 2v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-[#2C1A0E] py-20 sm:py-28 md:py-36 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9B59C]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <SectionHeading eyebrow="The Artisan Process">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light text-[#F9F8F6] mb-12 sm:mb-16 leading-tight">
            Nothing skipped.<br />
            <em className="italic text-[#C9B59C]">Nothing rushed.</em>
          </h2>
        </SectionHeading>

        {/* Responsive Process Steps Grid / Connected Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {PROCESS_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="group relative bg-[#3D2616]/40 p-6 sm:p-7 rounded-sm border border-[#8B6F5C]/25 hover:border-[#C9B59C]/60 hover:bg-[#3D2616]/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-full bg-[#2C1A0E] border border-[#8B6F5C]/40 flex items-center justify-center">
                    <ProcessIcon step={item.step} />
                  </span>
                  <span className="font-mono text-xs text-[#C9B59C] tracking-widest font-medium">
                    STEP {item.step}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-light text-[#F9F8F6] mb-3 group-hover:text-[#C9B59C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[0.85rem] text-[#D9CFC7]/80 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Progress connection indicator */}
              <div className="mt-6 pt-4 border-t border-[#8B6F5C]/20 flex items-center justify-between text-[0.68rem] text-[#8B6F5C]">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-[#C9B59C] opacity-80 font-mono">100% Craft</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
