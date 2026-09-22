import { useReveal } from '../../hooks/useReveal'
import { STATS } from '../../data/stats'
import { StatCard } from './StatCard'

const DURATIONS = [800, 1600, 1000, 1200]

export function StatsSection() {
  const { ref, visible } = useReveal()

  return (
    <div ref={ref} className="bg-[#F6ECD4]/70 border-b border-[#E7D7BE] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y-0">
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
    </div>
  )
}
