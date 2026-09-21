export function Footer() {
  return (
    <footer id="find-us" className="bg-[#22140B] border-t border-[#3D2616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-display text-[1.8rem] sm:text-[2rem] font-light text-[#F9F8F6] leading-none mb-3">
            S.O<span className="text-[#C9B59C]"> Co.</span>
          </p>
          <p className="text-xs sm:text-sm text-[#D9CFC7]/70 leading-relaxed max-w-[260px] mb-4">
            Small batch cookies made with intention. Baked at dawn, finished with care.
          </p>
          {/* Live Kitchen Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C1A0E] border border-[#8B6F5C]/30 text-[0.65rem] text-[#C9B59C]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Kitchen Active · Daily Batches</span>
          </div>
          <div className="flex gap-4 mt-5">
            {['Instagram', 'TikTok'].map(s => (
              <a
                key={s}
                href="https://www.instagram.com/s.ocookieco/"
                target="_blank"
                rel="noreferrer"
                className="text-[0.68rem] tracking-widest uppercase text-[#8B6F5C] hover:text-[#C9B59C] border-b border-transparent hover:border-[#C9B59C] pb-0.5 transition-all"
              >
                {s} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C9B59C] mb-3 font-semibold">
            Explore
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#D9CFC7]/80">
            <li>
              <a href="#menu" className="hover:text-[#F9F8F6] transition-colors">Artisan Menu</a>
            </li>
            <li>
              <a href="#process" className="hover:text-[#F9F8F6] transition-colors">The 4-Step Process</a>
            </li>
            <li>
              <a href="#our-story" className="hover:text-[#F9F8F6] transition-colors">Our Kitchen Story</a>
            </li>
            <li>
              <a href="#order" className="hover:text-[#F9F8F6] transition-colors">Curate a Custom Box</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C9B59C] mb-3 font-semibold">
            Bakehouse Hours
          </p>
          <div className="space-y-1.5 text-xs sm:text-sm text-[#D9CFC7]/80">
            <p>Tue – Fri · 8:00 AM – 2:00 PM</p>
            <p>Sat – Sun · 9:00 AM – 3:00 PM</p>
            <p className="text-[#8B6F5C] text-xs pt-1">Closed on Mondays</p>
            <p className="text-[0.68rem] text-[#C9B59C]/80 italic pt-1">Pre-orders guarantee your box</p>
          </div>
        </div>

        {/* Find us */}
        <div>
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C9B59C] mb-3 font-semibold">
            Visit Us
          </p>
          <div className="text-xs sm:text-sm text-[#D9CFC7]/80 space-y-1">
            <p className="text-[#F9F8F6] font-medium">12 Bellfield Lane</p>
            <p>Brooklyn, NY 11201</p>
            <a
              href="mailto:hello@socookieco.com"
              className="block pt-2 text-xs text-[#C9B59C] hover:underline"
            >
              hello@socookieco.com
            </a>
            <p className="text-[0.68rem] text-[#8B6F5C] pt-1">
              Curbside pickup &amp; courier delivery available
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#8B6F5C]/15 px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[0.68rem] text-[#8B6F5C]/80 text-center sm:text-left">
            © 2026 S.O Co. Handcrafted Small Batch Bakery. All rights reserved.
          </p>
          <p className="font-display italic text-[#8B6F5C]/70 text-xs sm:text-sm text-center sm:text-right">
            Made with love, browned butter &amp; fleur de sel.
          </p>
        </div>
      </div>
    </footer>
  )
}
