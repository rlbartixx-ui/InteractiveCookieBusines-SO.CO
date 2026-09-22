import { useState } from 'react'

export function NewsletterSection() {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setEmailSent(true)
  }

  return (
    <div className="bg-[#F6ECD4]/60 border-t border-[#E7D7BE] py-16 sm:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        {/* Perk Tag */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#FFF7E4] border border-[#E7D7BE] text-[0.65rem] tracking-widest uppercase text-[#7C604D] font-semibold mb-4 shadow-xs">
          Exclusive Baker's Club · 10% Off
        </span>

        <h3 className="font-display text-2xl sm:text-3xl font-light mb-2 text-[#3A2A20]">
          Stay in the morning loop.
        </h3>
        <p className="text-[#7C604D] text-xs sm:text-sm mb-7 max-w-md mx-auto leading-relaxed">
          Be the first to hear about secret seasonal drops, tasting events, and receive 10% off your first handcrafted box.
        </p>

        {emailSent ? (
          <div className="bg-[#FFF7E4] p-5 rounded-sm border border-[#E7D7BE] shadow-sm animate-fadeUp">
            <p className="font-display text-lg text-[#3A2A20] mb-1">
              Welcome to S.O Cookie Co.
            </p>
            <p className="text-xs text-[#7C604D] mb-3">
              Your code for 10% off your next box:
            </p>
            <span className="inline-block font-mono text-sm tracking-widest font-semibold bg-[#F6ECD4] text-[#3A2A20] px-4 py-1.5 rounded-xs border border-[#E7D7BE]">
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
              className="flex-1 rounded-sm bg-[#FFF7E4] border border-[#E7D7BE] px-4 py-3 text-sm text-[#3A2A20] placeholder-[#7C604D]/50 outline-none focus:border-[#E07A3C] transition-colors shadow-xs"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#E07A3C] text-[#FFF7E4] px-6 py-3 text-[0.72rem] tracking-widest uppercase font-semibold hover:bg-[#3A2A20] transition-all duration-300 shrink-0 cursor-pointer shadow-sm"
            >
              Get 10% Off
            </button>
          </form>
        )}

        <p className="text-[0.65rem] text-[#7C604D]/70 mt-3">
          Zero spam. Fresh updates only. Unsubscribe with 1-click anytime.
        </p>
      </div>
    </div>
  )
}
