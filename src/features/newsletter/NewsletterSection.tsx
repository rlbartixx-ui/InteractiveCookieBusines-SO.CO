import { useState } from 'react'

export function NewsletterSection() {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setEmailSent(true)
  }

  return (
    <div className="bg-[#EFE9E3]/70 border-t border-[#D9CFC7] py-16 sm:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        {/* Perk Tag */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#F9F8F6] border border-[#D9CFC7] text-[0.65rem] tracking-widest uppercase text-[#8B6F5C] font-semibold mb-4 shadow-xs">
          Exclusive Baker's Club · 10% Off
        </span>

        <h3 className="font-display text-2xl sm:text-3xl font-light mb-2 text-[#2C1A0E]">
          Stay in the morning loop.
        </h3>
        <p className="text-[#8B6F5C] text-xs sm:text-sm mb-7 max-w-md mx-auto leading-relaxed">
          Be the first to hear about secret seasonal drops, tasting events, and receive 10% off your first handcrafted box.
        </p>

        {emailSent ? (
          <div className="bg-[#F9F8F6] p-5 rounded-sm border border-[#D9CFC7] shadow-sm animate-fadeUp">
            <p className="font-display text-lg text-[#2C1A0E] mb-1">
              Welcome to the S.O Co. Table
            </p>
            <p className="text-xs text-[#8B6F5C] mb-3">
              Your code for 10% off your next box:
            </p>
            <span className="inline-block font-mono text-sm tracking-widest font-semibold bg-[#EFE9E3] text-[#2C1A0E] px-4 py-1.5 rounded-xs border border-[#D9CFC7]">
              SWEET10
            </span>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 rounded-sm bg-[#F9F8F6] border border-[#D9CFC7] px-4 py-3 text-sm text-[#2C1A0E] placeholder-[#8B6F5C]/50 outline-none focus:border-[#2C1A0E] transition-colors shadow-xs"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-6 py-3 text-[0.72rem] tracking-widest uppercase font-medium hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300 shrink-0 cursor-pointer shadow-sm"
            >
              Get 10% Off
            </button>
          </form>
        )}

        <p className="text-[0.65rem] text-[#8B6F5C]/70 mt-3">
          Zero spam. Fresh updates only. Unsubscribe with 1-click anytime.
        </p>
      </div>
    </div>
  )
}
