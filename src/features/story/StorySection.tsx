import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../../components/common/SectionHeading'

export function StorySection() {
  const { ref, visible } = useReveal()

  return (
    <section id="our-story" className="py-20 sm:py-28 md:py-36 bg-[#FFF7E4]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center"
      >
        {/* Image block */}
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="relative rounded-sm overflow-hidden shadow-xl border border-[#E7D7BE]">
            <img
              src="https://images.unsplash.com/photo-1649634437312-c005a922d448?w=860&h=1040&fit=crop&auto=format"
              alt="Freshly baked S.O Cookie Co. cookies on a tray"
              className="w-full aspect-[4/3] sm:aspect-[5/6] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A2A20]/75 via-transparent to-transparent" />

            {/* Stamp Badge */}
            <div className="absolute top-4 right-4 bg-[#FFF7E4]/90 backdrop-blur-md px-3 py-1.5 rounded-xs border border-[#E7D7BE] text-[0.62rem] tracking-widest uppercase text-[#3A2A20] font-medium shadow-sm">
              Home-Based Small Batch
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="font-display italic text-xl sm:text-2xl md:text-[1.7rem] text-[#FFF7E4] leading-tight drop-shadow-sm">
                "Started in a kitchen.<br />Stayed in the kitchen."
              </p>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <SectionHeading eyebrow="Our Story">
            <h2 className="font-display text-[clamp(2.0rem,4.5vw,3.2rem)] font-light leading-[1.06] mb-6 text-[#3A2A20]">
              Started from a simple<br />
              <em className="italic text-[#E07A3C]">love for baking.</em>
            </h2>
          </SectionHeading>

          <div className="space-y-4 text-[#7C604D] leading-relaxed text-[0.95rem] font-normal">
            <p className="text-base text-[#3A2A20] font-medium leading-snug">
              S.O Cookie Co. started from a simple love for baking.
            </p>
            <p>
              Don first became interested in baking during senior high school at Arellano University, where baking classes eventually became something he genuinely enjoyed through college. Wanting to keep learning and improve his skills, he started experimenting with cookies—even with a small 9L oven and a less-than-ideal baking setup.
            </p>
            <p>
              Cookies became the focus because they are simple, comforting, challenging to perfect, and a natural partner to something many Filipinos love: coffee.
            </p>
            <p>
              The name S.O Cookie Co. comes from Don’s initials, Shierdon Operiano, with a small personal touch in the brand—the “C” is inspired by his cat, Caramel.
            </p>
            <p>
              The goal has always been simple: make cookies with a balanced taste and good-quality ingredients while keeping them affordable. Something that feels worth buying without making customers feel like quality cookies have to be expensive.
            </p>
            <p className="font-medium text-[#3A2A20]">
              Today, S.O Cookie Co. continues to grow one batch at a time in Naga City, with the hope of someday having its own shop—a place where people can enjoy cookies, coffee, and simply relax.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[#E7D7BE]">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#7C604D]/70 mb-4 font-semibold">
              Our Commitments
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-sm bg-[#F6ECD4]/70 border border-[#E7D7BE]/80">
                <p className="font-display text-xs text-[#3A2A20] font-medium mb-0.5">Real Butter</p>
                <p className="text-[0.7rem] text-[#7C604D]">Baked with real butter</p>
              </div>
              <div className="p-3 rounded-sm bg-[#F6ECD4]/70 border border-[#E7D7BE]/80">
                <p className="font-display text-xs text-[#3A2A20] font-medium mb-0.5">Accessible Price</p>
                <p className="text-[0.7rem] text-[#7C604D]">Quality within local reach</p>
              </div>
              <div className="p-3 rounded-sm bg-[#F6ECD4]/70 border border-[#E7D7BE]/80">
                <p className="font-display text-xs text-[#3A2A20] font-medium mb-0.5">Naga City</p>
                <p className="text-[0.7rem] text-[#7C604D]">Home-based in Camarines Sur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
