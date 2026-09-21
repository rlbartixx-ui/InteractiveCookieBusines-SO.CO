import { PROCESS_STEPS } from '../../data/process'
import { SectionHeading } from '../../components/common/SectionHeading'

export function ProcessSection() {
  return (
    <section className="bg-[#2C1A0E] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="The Process">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-[#F9F8F6] mb-16 leading-tight">
            Nothing skipped.<br />
            <em className="italic text-[#C9B59C]">Nothing rushed.</em>
          </h2>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
          {PROCESS_STEPS.map(item => (
            <div
              key={item.step}
              className="group relative md:border-l border-[#8B6F5C]/25 md:pl-6 transition-all duration-300 hover:md:border-[#C9B59C]/60"
            >
              <p className="font-display text-[4.5rem] font-light text-[#8B6F5C]/15 leading-none mb-1 group-hover:text-[#C9B59C]/25 transition-colors duration-300">
                {item.step}
              </p>
              <h3 className="font-display text-[1.5rem] font-light text-[#F9F8F6] mb-3">
                {item.title}
              </h3>
              <p className="text-[0.82rem] text-[#D9CFC7]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
