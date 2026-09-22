import { TICKER_ITEMS } from '../../data/navigation'

interface MarqueeTickerProps {
  items?: string[]
}

export function MarqueeTicker({ items = TICKER_ITEMS }: MarqueeTickerProps) {
  return (
    <div className="bg-[#3A2A20] py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {Array(6)
          .fill(items)
          .flat()
          .map((text, i) => (
            <span key={i} className="font-display italic text-[#F6C453] text-lg px-6 shrink-0">
              {text}
              <span className="text-[#E07A3C]/70 mx-5">·</span>
            </span>
          ))}
      </div>
    </div>
  )
}
