import { TICKER_ITEMS } from '../../data/navigation'

interface MarqueeTickerProps {
  items?: string[]
}

export function MarqueeTicker({ items = TICKER_ITEMS }: MarqueeTickerProps) {
  return (
    <div className="bg-[#2C1A0E] py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {Array(6)
          .fill(items)
          .flat()
          .map((text, i) => (
            <span key={i} className="font-display italic text-[#C9B59C] text-lg px-6 shrink-0">
              {text}
              <span className="text-[#8B6F5C]/60 mx-5">·</span>
            </span>
          ))}
      </div>
    </div>
  )
}
