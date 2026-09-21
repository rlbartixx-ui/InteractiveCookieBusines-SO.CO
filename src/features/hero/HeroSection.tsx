import { useState, useRef, useCallback } from 'react'
import { CookieScene } from '../../components/3d/CookieScene'

export function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const mouse3d = useRef<[number, number]>([0, 0])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    mouse3d.current = [
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    ]
  }, [])

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Ambient glow following mouse */}
      <div
        className="absolute pointer-events-none rounded-full opacity-35 blur-[140px] transition-[left,top] duration-75 ease-out"
        style={{
          width: 640,
          height: 640,
          background: 'radial-gradient(circle, #C9B59C 0%, transparent 65%)',
          left: mouse.x - 320,
          top: mouse.y - 320,
        }}
      />

      {/* Static warm decorative blobs */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-[#EFE9E3] opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#EFE9E3] opacity-40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full relative z-10">
        {/* Copy */}
        <div style={{ animation: 'fadeUp 0.95s cubic-bezier(0.22,1,0.36,1) both' }}>
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C9B59C]" />
            Small Batch · Hand Crafted
          </p>
          <h1 className="font-display text-[clamp(3.2rem,8.5vw,7.5rem)] font-light leading-[0.92] tracking-tight mb-8">
            Baked with<br />
            <em className="italic text-[#C9B59C]">intention.</em>
          </h1>
          <p className="text-[#8B6F5C] text-[1.05rem] leading-relaxed max-w-[420px] mb-10">
            Every S.O Co. cookie is mixed by hand, baked in small batches, and finished the same morning you receive it. No shortcuts. No compromises.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-8 py-4 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300"
            >
              Explore the Menu
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
            </a>
            <a
              href="#our-story"
              className="text-[0.75rem] tracking-widest uppercase text-[#8B6F5C] border-b border-[#D9CFC7] hover:border-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-200 pb-0.5"
            >
              Our Story
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 opacity-50">
            <span className="inline-block w-8 h-px bg-[#C9B59C]" />
            <p className="font-display italic text-[#8B6F5C] text-sm">Est. 2026</p>
          </div>
        </div>

        {/* 3D Hero Cookie */}
        <div
          className="relative flex justify-center items-center"
          style={{ animation: 'scaleIn 1.1s cubic-bezier(0.22,1,0.36,1) both 0.15s' }}
        >
          {/* Spinning decorative ring */}
          <svg
            viewBox="0 0 320 320"
            className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] spin-slow opacity-20 pointer-events-none"
          >
            <circle cx="160" cy="160" r="154" fill="none" stroke="#C9B59C" strokeWidth="0.6" strokeDasharray="4 12" />
          </svg>

          <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px]">
            <CookieScene mouse={mouse3d} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#8B6F5C]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9B59C] to-transparent" />
      </div>
    </section>
  )
}
