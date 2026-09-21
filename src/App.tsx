import { useState, useEffect, useRef, useCallback } from 'react'
import CookieScene from './CookieScene'

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Animated counter hook ── */
function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return count
}

/* ── Data ── */
const NAV = ['Menu', 'Our Story', 'Order', 'Find Us']

const PRODUCTS = [
  {
    id: 1,
    name: 'Chocolate Chip',
    desc: 'The one that started it all. Pools of melted chocolate, browned butter, a pinch of fleur de sel.',
    price: '₱20',
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1649634437193-d3a5c51e5981?w=600&h=600&fit=crop&auto=format',
    bg: '#EFE9E3',
  },
  {
    id: 2,
    name: 'Velvet Crush',
    desc: 'Red velvet meets white chocolate chunks. Deep, velvety, with a cream cheese kiss.',
    price: '₱25',
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1760447528817-196389176e4e?w=600&h=600&fit=crop&auto=format',
    bg: '#D9CFC7',
  },
  {
    id: 3,
    name: 'Midnight Bite',
    desc: 'Double dark chocolate, espresso dust, black cocoa. Bold enough to keep you up.',
    price: '₱25',
    tag: "Chef's Pick",
    img: 'https://images.unsplash.com/photo-1597905733802-7bec89b471b6?w=600&h=600&fit=crop&auto=format',
    bg: '#F9F8F6',
  },
  {
    id: 4,
    name: 'Matcha Muse',
    desc: 'Ceremonial grade matcha, white chocolate swirl, toasted sesame top. Earthy and elegant.',
    price: '₱30',
    tag: 'Seasonal',
    img: 'https://images.unsplash.com/photo-1649634437312-c005a922d448?w=600&h=600&fit=crop&auto=format',
    bg: '#C9B59C',
  },
  {
    id: 5,
    name: 'Golden Drip',
    desc: 'Honey caramel drizzle, toasted oats, Maldon salt finish. Slow, warm, unforgettable.',
    price: '₱35',
    tag: 'Seasonal',
    img: 'https://images.unsplash.com/photo-1761222191596-e59a4903f3d3?w=600&h=600&fit=crop&auto=format',
    bg: '#EFE9E3',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Source',
    desc: 'Single-origin chocolate, raw local honey, heritage-grain flours. Every ingredient has a name and a story.',
  },
  {
    step: '02',
    title: 'Mix',
    desc: 'Dough mixed by hand, in small batches. Consistency comes from attention, not machines.',
  },
  {
    step: '03',
    title: 'Rest',
    desc: "Dough rests overnight. Patience is the ingredient most recipes skip. We don't.",
  },
  {
    step: '04',
    title: 'Bake',
    desc: 'Baked at dawn, finished with fleur de sel or a specialty topping, boxed while still warm.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The brown butter cookie ruined all other cookies for me. I\'m not even sorry.',
    name: 'James K.',
    title: 'Regular since 2022',
  },
  {
    quote: 'Ordered a dozen for a wedding shower. Every guest asked for the name. They sold out before the cake.',
    name: 'Priya L.',
    title: 'Event host',
  },
  {
    quote: 'I drove forty minutes for these. Twice. The Noir Tahini is worth every mile.',
    name: 'Maren O.',
    title: 'Cookie devotee',
  },
]

const STATS = [
  { value: 5,   suffix: '',   label: 'Flavors rotating weekly' },
  { value: 500, suffix: '',   label: 'Cookies baked monthly'   },
  { value: 1,   suffix: ' mo', label: 'Month in the kitchen'  },
]

const TICKER = ['Small Batch', 'Baked Fresh Daily', 'Hand Crafted', 'Made with Love', 'No Shortcuts', 'S.O Co.', 'Seasonal Flavors']

/* ── Main component ── */
export default function App() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)

  const [tIdx, setTIdx]             = useState(0)
  const [emailSent, setEmailSent]   = useState(false)
  const [mouse, setMouse]           = useState({ x: 0, y: 0 })
  const heroRef  = useRef<HTMLElement>(null)
  const mouse3d  = useRef<[number, number]>([0, 0])

  /* Scroll state for header */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  /* Auto-rotate testimonials */
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5200)
    return () => clearInterval(t)
  }, [])

  /* Mouse glow */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
    mouse3d.current = [
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -(((e.clientY - r.top) / r.height) * 2 - 1),
    ]
  }, [])

  /* Reveal sections */
  const statsR    = useReveal()
  const productsR = useReveal()
  const storyR    = useReveal()
  const testiR    = useReveal()
  const ctaR      = useReveal()

  const c0 = useCounter(STATS[0].value, statsR.visible, 800)
  const c1 = useCounter(STATS[1].value, statsR.visible, 1600)
  const c2 = useCounter(STATS[2].value, statsR.visible, 600)
  const counts = [c0, c1, c2]

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C1A0E] font-body overflow-x-hidden">

      {/* ════ HEADER ════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F8F6]/96 backdrop-blur-md shadow-[0_1px_0_0_#D9CFC7]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-display text-[1.6rem] font-light tracking-tight leading-none">
            S.O<span className="text-[#C9B59C]"> Co.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[0.8rem] tracking-widest uppercase">
            {NAV.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#8B6F5C] hover:text-[#2C1A0E] transition-colors duration-200 pb-px border-b border-transparent hover:border-[#C9B59C]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#order"
            className="hidden md:inline-flex items-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-5 py-2.5 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300"
          >
            Order Now
          </a>

          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            menuOpen ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <div className="bg-[#F9F8F6]/98 backdrop-blur-sm border-t border-[#D9CFC7] px-6 py-5 flex flex-col gap-5">
            {NAV.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[0.8rem] tracking-widest uppercase text-[#8B6F5C] hover:text-[#2C1A0E] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ════ HERO ════ */}
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

        {/* Static warm blobs */}
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

          {/* 3D Cookie */}
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

      {/* ════ MARQUEE TICKER ════ */}
      <div className="bg-[#2C1A0E] py-4 overflow-hidden select-none">
        <div className="marquee-track">
          {Array(6)
            .fill(TICKER)
            .flat()
            .map((text, i) => (
              <span key={i} className="font-display italic text-[#C9B59C] text-lg px-6 shrink-0">
                {text}
                <span className="text-[#8B6F5C]/60 mx-5">·</span>
              </span>
            ))}
        </div>
      </div>

      {/* ════ STATS ════ */}
      <div
        ref={statsR.ref}
        className="bg-[#EFE9E3] border-b border-[#D9CFC7]"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9CFC7]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`py-10 md:py-0 text-center reveal reveal-delay-${i + 1} ${statsR.visible ? 'visible' : ''}`}
            >
              <p className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-light leading-none text-[#2C1A0E]">
                {counts[i]}{stat.suffix}
              </p>
              <p className="text-[0.75rem] tracking-widest uppercase text-[#8B6F5C] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════ MENU ════ */}
      <section id="menu" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div
            ref={productsR.ref}
            className={`reveal mb-14 ${productsR.visible ? 'visible' : ''}`}
          >
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C9B59C]" />
              The Menu
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-tight">
                Each one a <em className="italic">story.</em>
              </h2>
              <a
                href="#order"
                className="text-[0.75rem] tracking-widest uppercase text-[#8B6F5C] border-b border-[#D9CFC7] hover:border-[#C9B59C] hover:text-[#2C1A0E] transition-all pb-0.5"
              >
                Order All →
              </a>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                className={`group relative cursor-pointer reveal reveal-delay-${i + 1} ${productsR.visible ? 'visible' : ''}`}
                style={{ backgroundColor: p.bg }}
              >
                {p.tag && (
                  <div className="absolute top-4 left-4 z-10 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3 py-1 text-[0.65rem] tracking-widest uppercase">
                    {p.tag}
                  </div>
                )}

                <div className="overflow-hidden aspect-square">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-display text-xl font-light leading-snug">{p.name}</h3>
                    <span className="font-display text-lg text-[#C9B59C] shrink-0">{p.price}</span>
                  </div>
                  <p className="text-[0.82rem] text-[#8B6F5C] leading-relaxed">{p.desc}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section className="bg-[#2C1A0E] py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C9B59C]" />
            The Process
          </p>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-[#F9F8F6] mb-16 leading-tight">
            Nothing skipped.<br />
            <em className="italic text-[#C9B59C]">Nothing rushed.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {PROCESS.map((item, i) => (
              <div
                key={i}
                className="group relative md:border-l border-[#8B6F5C]/25 md:pl-6 transition-all duration-300 hover:md:border-[#C9B59C]/60"
              >
                <p className="font-display text-[4.5rem] font-light text-[#8B6F5C]/15 leading-none mb-1 group-hover:text-[#C9B59C]/25 transition-colors duration-300">
                  {item.step}
                </p>
                <h3 className="font-display text-[1.5rem] font-light text-[#F9F8F6] mb-3">{item.title}</h3>
                <p className="text-[0.82rem] text-[#D9CFC7]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ OUR STORY ════ */}
      <section id="our-story" className="py-24 md:py-32">
        <div
          ref={storyR.ref}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-24 items-center"
        >
          {/* Image block */}
          <div className={`reveal ${storyR.visible ? 'visible' : ''}`}>
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
          <div className={`reveal reveal-delay-2 ${storyR.visible ? 'visible' : ''}`}>
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C9B59C]" />
              Our Story
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] mb-8">
              Born from a Sunday<br />afternoon and a very<br />
              <em className="italic text-[#C9B59C]">specific craving.</em>
            </h2>
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
              <p className="text-[0.7rem] tracking-[0.25em] uppercase text-[#8B6F5C]/60 mb-4">As seen in</p>
              <div className="flex items-center gap-7">
                {['Bon Appétit', 'The Local', 'Eater'].map(pub => (
                  <span key={pub} className="font-display italic text-[1.2rem] text-[#D9CFC7]">
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="bg-[#EFE9E3] py-24 md:py-32 overflow-hidden">
        <div
          ref={testiR.ref}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-16 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C9B59C]" />
            What People Say
            <span className="inline-block w-8 h-px bg-[#C9B59C]" />
          </p>

          <div className="relative min-h-[220px] flex items-center justify-center">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  i === tIdx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <blockquote className="font-display text-[clamp(1.4rem,3.2vw,2.2rem)] font-light italic leading-tight text-[#2C1A0E] mb-8">
                  "{t.quote}"
                </blockquote>
                <p className="font-medium text-[0.85rem] tracking-wide text-[#2C1A0E]">{t.name}</p>
                <p className="text-[0.7rem] tracking-widest uppercase text-[#8B6F5C] mt-1">{t.title}</p>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center items-center gap-3 mt-14">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIdx(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === tIdx
                    ? 'w-8 h-1.5 rounded-sm bg-[#2C1A0E]'
                    : 'w-1.5 h-1.5 bg-[#D9CFC7] hover:bg-[#C9B59C]'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA / ORDER ════ */}
      <section id="order" className="relative py-28 md:py-40 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-36 -right-36 w-[480px] h-[480px] rounded-full bg-[#EFE9E3] opacity-55" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#EFE9E3] opacity-40" />
        </div>

        <div
          ref={ctaR.ref}
          className={`max-w-3xl mx-auto px-6 text-center relative z-10 reveal ${ctaR.visible ? 'visible' : ''}`}
        >
          <img
            src="https://images.unsplash.com/photo-1649634437193-d3a5c51e5981?w=160&h=160&fit=crop&auto=format"
            alt="S.O Co. cookie"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-8 ring-4 ring-[#EFE9E3]"
          />
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-[#C9B59C] mb-4 flex items-center justify-center gap-3">
            <span className="inline-block w-6 h-px bg-[#C9B59C]" />
            Ready to order?
            <span className="inline-block w-6 h-px bg-[#C9B59C]" />
          </p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] mb-6">
            Your next favourite<br />
            <em className="italic text-[#C9B59C]">cookie awaits.</em>
          </h2>
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

      {/* ════ NEWSLETTER ════ */}
      <div className="bg-[#EFE9E3] border-t border-[#D9CFC7] py-16">
        <div className="max-w-lg mx-auto px-6 text-center">
          <h3 className="font-display text-[1.8rem] font-light mb-2">Stay in the loop.</h3>
          <p className="text-[#8B6F5C] text-sm mb-7">
            New flavors, limited drops, and the occasional baking note.
          </p>
          {emailSent ? (
            <p className="font-display italic text-lg text-[#C9B59C]">
              Welcome to S.O Co. We'll be in touch. ✦
            </p>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={e => {
                e.preventDefault()
                setEmailSent(true)
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 rounded-sm bg-[#F9F8F6] border border-[#D9CFC7] px-4 py-3 text-sm text-[#2C1A0E] placeholder-[#C9B59C]/50 outline-none focus:border-[#C9B59C] transition-colors"
              />
              <button
                type="submit"
                className="rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-6 py-3 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ════ FOOTER ════ */}
      <footer id="find-us" className="bg-[#2C1A0E]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-[2rem] font-light text-[#F9F8F6] leading-none mb-4">
              S.O<span className="text-[#C9B59C]"> Co.</span>
            </p>
            <p className="text-sm text-[#8B6F5C] leading-relaxed max-w-[260px]">
              Small batch cookies made with intention. Baked at dawn, finished with care.
            </p>
            <div className="flex gap-5 mt-6">
              {['Instagram', 'TikTok'].map(s => (
                <a
                  key={s}
                  href="https://www.instagram.com/s.ocookieco/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.7rem] tracking-widest uppercase text-[#8B6F5C] hover:text-[#C9B59C] border-b border-transparent hover:border-[#C9B59C] pb-0.5 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C9B59C] mb-4">Hours</p>
            <div className="space-y-1.5 text-sm text-[#8B6F5C]">
              <p>Tue – Fri · 8am – 2pm</p>
              <p>Sat – Sun · 9am – 3pm</p>
              <p className="mt-3 text-[#8B6F5C]/35 text-xs">Closed Monday</p>
            </div>
          </div>

          {/* Find us */}
          <div>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C9B59C] mb-4">Find Us</p>
            <div className="text-sm text-[#8B6F5C] space-y-1">
              <p>12 Bellfield Lane</p>
              <p>Brooklyn, NY 11201</p>
              <a
                href="mailto:hello@socookieco.com"
                className="block mt-3 hover:text-[#C9B59C] transition-colors"
              >
                hello@socookieco.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#8B6F5C]/15 px-6 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[0.7rem] text-[#8B6F5C]/50">
              © 2026 S.O Co. All rights reserved.
            </p>
            <p className="font-display italic text-[#8B6F5C]/35 text-sm">
              Made with love &amp; butter.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
