import { useState, useEffect } from 'react'
import { NAV_ITEMS } from '../../data/navigation'

interface HeaderProps {
  navItems?: string[]
}

export function Header({ navItems = NAV_ITEMS }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#F9F8F6]/92 backdrop-blur-md shadow-[0_1px_0_0_#D9CFC7]/80 py-3 sm:py-3.5'
          : 'bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex flex-col items-start leading-none focus:outline-none"
            aria-label="S.O Cookie Co. Home"
          >
            <span className="font-display text-[1.45rem] sm:text-[1.7rem] font-light tracking-tight text-[#2C1A0E]">
              S.O<span className="text-[#C9B59C] font-normal group-hover:text-[#2C1A0E] transition-colors"> Cookie Co.</span>
            </span>
            <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#8B6F5C]/80 mt-0.5">
              Home-Based · Naga City
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-[0.7rem] lg:text-[0.8rem] tracking-[0.12em] lg:tracking-[0.18em] uppercase font-medium">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-[#8B6F5C] hover:text-[#2C1A0E] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9B59C] hover:after:w-full after:transition-all after:duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#order"
              className="inline-flex items-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3.5 lg:px-5 py-2 lg:py-2.5 text-[0.68rem] lg:text-[0.72rem] tracking-[0.12em] lg:tracking-[0.16em] uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer font-medium"
            >
              <span>Build Box</span>
              <span className="text-[0.8rem] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#order"
              className="inline-flex items-center rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-3.5 py-1.5 text-[0.65rem] tracking-wider uppercase font-medium hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-colors"
            >
              Order Box
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="w-10 h-10 rounded-sm flex flex-col items-center justify-center gap-[5px] bg-[#EFE9E3]/70 border border-[#D9CFC7]/80 text-[#2C1A0E] cursor-pointer touch-manipulation focus:outline-none"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-[1.5px] bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                  }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#2C1A0E] transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer & Backdrop */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-[#2C1A0E]/55 backdrop-blur-sm transition-opacity"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[360px] h-full bg-[#F9F8F6] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out border-l border-[#D9CFC7]/60 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#D9CFC7]/60">
              <div>
                <span className="font-display text-2xl font-light text-[#2C1A0E]">
                  S.O<span className="text-[#C9B59C]"> Cookie Co.</span>
                </span>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B6F5C]">Home-Based · Naga City</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#EFE9E3] border border-[#D9CFC7] flex items-center justify-center text-[#2C1A0E] cursor-pointer"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Fresh bake alert pill */}
            <div className="mt-4 px-3.5 py-2 rounded-sm bg-[#EFE9E3]/70 border border-[#D9CFC7]/50 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="text-[0.7rem] text-[#2C1A0E] font-medium">
                Fresh out of the oven · Baked today at 6:00 AM
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-2 mt-6">
              {navItems.map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center justify-between py-3 px-3 rounded-sm text-[0.95rem] font-display text-[#2C1A0E] hover:bg-[#EFE9E3] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#C9B59C]">0{idx + 1}</span>
                    <span>{item}</span>
                  </span>
                  <span className="text-xs text-[#8B6F5C]">→</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Footer & CTA */}
          <div className="pt-6 border-t border-[#D9CFC7]/60 space-y-3">
            <a
              href="#order"
              className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] py-3.5 text-[0.75rem] tracking-widest uppercase font-medium hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all shadow-md"
              onClick={() => setMenuOpen(false)}
            >
              <span>Build Custom Box</span>
              <span>→</span>
            </a>

            <div className="flex items-center justify-between text-xs text-[#8B6F5C] px-1 pt-1">
              <span>Tue–Sun · 8am–2pm</span>
              <a
                href="https://www.instagram.com/s.ocookieco/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#2C1A0E]"
              >
                @s.ocookieco
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
