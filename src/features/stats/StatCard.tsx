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
      className={`py-10 md:py-0 text-center reveal reveal-delay-${index + 1} ${active ? 'visible' : ''
        }`}
    >
      <p className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-light leading-none text-[#2C1A0E]">
        {count}
        {stat.suffix}
      </p>
      <p className="text-[0.75rem] tracking-widest uppercase text-[#8B6F5C] mt-2">
        {stat.label}
      </p>
    </div>
  )
}
