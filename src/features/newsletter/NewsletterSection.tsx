import { useState } from 'react'

export function NewsletterSection() {
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSent(true)
  }

  return (
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
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 rounded-sm bg-[#F9F8F6] border border-[#D9CFC7] px-4 py-3 text-sm text-[#2C1A0E] placeholder-[#C9B59C]/50 outline-none focus:border-[#C9B59C] transition-colors"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#2C1A0E] text-[#F9F8F6] px-6 py-3 text-[0.75rem] tracking-widest uppercase hover:bg-[#C9B59C] hover:text-[#2C1A0E] transition-all duration-300 shrink-0 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
