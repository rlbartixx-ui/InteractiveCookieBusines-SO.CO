import { useState, useEffect, useCallback } from 'react'
import { pianoEngine } from './audioEngine'

export function useBakerySound() {
  const [isPlaying, setIsPlaying] = useState(pianoEngine.isMusicPlaying())

  useEffect(() => {
    return pianoEngine.subscribe(playing => setIsPlaying(playing))
  }, [])

  const toggleMusic = useCallback(() => {
    return pianoEngine.toggleMusic()
  }, [])

  return {
    isMusicPlaying: isPlaying,
    toggleMusic,
  }
}
