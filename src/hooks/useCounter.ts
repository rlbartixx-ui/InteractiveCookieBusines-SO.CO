import { useState, useEffect } from 'react'

export function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return count
}
