import { useState, useEffect } from 'react'
import { NAV_ITEMS } from '../../data/navigation'

interface HeaderProps {
  navItems?: string[]
}

export function Header({ navItems = NAV_ITEMS }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#F9F8F6]/96 backdrop-blur-md shadow-[0_1px_0_0_#D9CFC7]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-[1.6rem] font-light tracking-tight leading-none">
          S.O<span className="text-[#C9B59C]"> Co.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[0.8rem] tracking-widest uppercase">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[#8B6F5C] hover:text-[#2C1A0E] transition-colors duration-200 pb-px border-b border-transparent hover:border-[#C9B59C]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <a
          href="#order"
          className="hidden md:inline-flex items-center gap-2 rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-5 py-2.5 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300"
        >
          Order Now
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
          />
          <span
            className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
          />
          <span
            className={`block w-5 h-px bg-[#2C1A0E] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? 'max-h-60' : 'max-h-0'
          }`}
      >
        <div className="bg-[#F9F8F6]/98 backdrop-blur-sm border-t border-[#D9CFC7] px-6 py-5 flex flex-col gap-5">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[0.8rem] tracking-widest uppercase text-[#8B6F5C] hover:text-[#2C1A0E] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            className="inline-flex items-center justify-center rounded-sm bg-[#2C1A0E] text-[#F9F8F6] py-2.5 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      </div>
    </header>
  )
}
