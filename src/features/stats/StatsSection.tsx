import { useReveal } from '../../hooks/useReveal'
import { STATS } from '../../data/stats'
import { StatCard } from './StatCard'

const DURATIONS = [800, 1600, 600]

export function StatsSection() {
  const { ref, visible } = useReveal()

  return (
    <div ref={ref} className="bg-[#EFE9E3] border-b border-[#D9CFC7]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9CFC7]">
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={i}
            active={visible}
            duration={DURATIONS[i] ?? 1200}
          />
        ))}
      </div>
    </div>
  )
}
