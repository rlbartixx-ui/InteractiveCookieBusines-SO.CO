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
      className={`p-4 sm:p-6 text-center rounded-sm bg-[#FFF7E4]/80 border border-[#E7D7BE]/60 reveal reveal-delay-${index + 1
        } ${active ? 'visible' : ''}`}
    >
      <p className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-none text-[#3A2A20]">
        {stat.prefix && <span className="text-[#E07A3C] font-normal">{stat.prefix}</span>}
        {count}
        <span className="text-[#E07A3C] font-normal">{stat.suffix}</span>
      </p>
      <p className="text-[0.68rem] sm:text-[0.72rem] tracking-[0.16em] uppercase text-[#7C604D] mt-2 font-medium">
        {stat.label}
      </p>
    </div>
  )
}
