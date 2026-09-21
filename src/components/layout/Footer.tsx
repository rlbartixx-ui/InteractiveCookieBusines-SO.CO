export function Footer() {
  return (
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
  )
}
