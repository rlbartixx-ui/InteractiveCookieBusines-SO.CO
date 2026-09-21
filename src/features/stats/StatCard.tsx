import { useCounter } from '../../hooks/useCounter'
import type { StatItem } from '../../types'

interface StatCardProps {
  stat: StatItem
  index: number
  active: boolean
  duration?: number
}

export function StatCard({ stat, index, active, duration = 1200 }: StatCardProps) {
  const count = useCounter(stat.value, active, duration)

  return (
    <div
      className={`p-4 sm:p-6 text-center rounded-sm bg-[#F9F8F6]/80 border border-[#D9CFC7]/60 reveal reveal-delay-${index + 1
        } ${active ? 'visible' : ''}`}
    >
      <p className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-none text-[#2C1A0E]">
        {count}
        <span className="text-[#C9B59C] font-normal">{stat.suffix}</span>
      </p>
      <p className="text-[0.68rem] sm:text-[0.72rem] tracking-[0.16em] uppercase text-[#8B6F5C] mt-2 font-medium">
        {stat.label}
      </p>
    </div>
  )
}
