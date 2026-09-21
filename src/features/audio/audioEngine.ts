/**
 * Cozy Restaurant Piano Music Engine for S.O Co.
 * Generates continuous, soothing, warm acoustic cafe piano music
 * with room acoustic resonance and felt-hammer harmonics.
 * 100% procedural with zero network lag or broken audio links.
 */

interface PianoChord {
  bass: number
  harmony: number[]
  melodyPool: number[]
}

// Frequencies in Hz for warm jazz/cafe piano chords
const NOTE = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
}

const COZY_CAFE_CHORDS: PianoChord[] = [
  // 1. Cmaj9 (warm home chord)
  {
    bass: NOTE.C2,
    harmony: [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.E4],
    melodyPool: [NOTE.G4, NOTE.B4, NOTE.D5, NOTE.E5, NOTE.C5],
  },
  // 2. Am9 (introspective & soft)
  {
    bass: NOTE.A2,
    harmony: [NOTE.E3, NOTE.G3, NOTE.C4, NOTE.E4],
    melodyPool: [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.B4, NOTE.A4],
  },
  // 3. Dm9 (velvety jazz ballad)
  {
    bass: NOTE.D2,
    harmony: [NOTE.A3, NOTE.C4, NOTE.E4, NOTE.F4],
    melodyPool: [NOTE.F4, NOTE.A4, NOTE.C5, NOTE.E5, NOTE.D5],
  },
  // 4. G13 / G7b9 (smooth resolution)
  {
    bass: NOTE.G2,
    harmony: [NOTE.F3, NOTE.B3, NOTE.E4, NOTE.A4],
    melodyPool: [NOTE.D5, NOTE.B4, NOTE.G4, NOTE.E4, NOTE.A4],
  },
  // 5. Fmaj9 (tender Parisian bakery warmth)
  {
    bass: NOTE.F2,
    harmony: [NOTE.C3, NOTE.E3, NOTE.A3, NOTE.C4],
    melodyPool: [NOTE.E4, NOTE.G4, NOTE.A4, NOTE.C5, NOTE.E5],
  },
  // 6. Em7 (gentle morning calm)
  {
    bass: NOTE.E2,
    harmony: [NOTE.B2, NOTE.G3, NOTE.D4, NOTE.G4],
    melodyPool: [NOTE.G4, NOTE.B4, NOTE.D5, NOTE.E5, NOTE.G5],
  },
]

class RestaurantPianoEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private reverbDelay: DelayNode | null = null
  private isPlaying = false
  private timerId: number | null = null
  private listeners: Set<(playing: boolean) => void> = new Set()

  private currentChordIndex = 0
  private stepInBar = 0

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  /**
   * Synthesize an acoustic piano note with felt hammer overtones
   */
  private playPianoNote(frequency: number, velocity = 0.5, duration = 2.4) {
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime

    // Overtones simulating acoustic piano string vibration
    const partials = [
      { ratio: 1.0, gain: 1.0 },
      { ratio: 2.002, gain: 0.45 },
      { ratio: 3.006, gain: 0.22 },
      { ratio: 4.01, gain: 0.08 },
    ]

    const noteBus = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    // Warm felt piano lowpass filter (softens the harsh highs like a felt upright piano)
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(Math.min(frequency * 3.8, 4200), now)
    filter.frequency.exponentialRampToValueAtTime(Math.min(frequency * 1.6, 1200), now + 0.3)
    filter.Q.setValueAtTime(1.2, now)

    // Note amplitude envelope (percussive strike + warm singing sustain)
    noteBus.gain.setValueAtTime(0.0001, now)
    noteBus.gain.linearRampToValueAtTime(velocity * 0.38, now + 0.004) // Hammer strike
    noteBus.gain.exponentialRampToValueAtTime(velocity * 0.16, now + 0.12) // Decay to singing sustain
    noteBus.gain.exponentialRampToValueAtTime(0.0001, now + duration) // Fade out

    partials.forEach(p => {
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const pGain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(frequency * p.ratio, now)

      pGain.gain.setValueAtTime(p.gain, now)

      osc.connect(pGain)
      pGain.connect(filter)

      osc.start(now)
      osc.stop(now + duration + 0.05)
    })

    filter.connect(noteBus)
    noteBus.connect(this.masterGain)

    // Send part of signal to warm restaurant room acoustic delay
    if (this.reverbDelay) {
      const sendGain = this.ctx.createGain()
      sendGain.gain.setValueAtTime(0.35, now)
      noteBus.connect(sendGain)
      sendGain.connect(this.reverbDelay)
    }
  }

  /**
   * Generative restaurant pianist loop
   */
  private tick = () => {
    if (!this.isPlaying || !this.ctx) return

    const chord = COZY_CAFE_CHORDS[this.currentChordIndex]

    // Beat 0: Play warm deep bass note + first harmony notes
    if (this.stepInBar === 0) {
      this.playPianoNote(chord.bass, 0.45, 3.8)
      setTimeout(() => {
        if (!this.isPlaying) return
        this.playPianoNote(chord.harmony[0], 0.28, 2.5)
        this.playPianoNote(chord.harmony[1], 0.24, 2.5)
      }, 60)
    }

    // Beat 1: Gentle rolling harmony arpeggio
    if (this.stepInBar === 1) {
      if (chord.harmony[2]) {
        this.playPianoNote(chord.harmony[2], 0.22, 2.0)
      }
    }

    // Beat 2: Sweet singing right-hand melody note
    if (this.stepInBar === 2) {
      const melodyNote = chord.melodyPool[Math.floor(Math.random() * chord.melodyPool.length)]
      const humanDelay = Math.random() * 80
      setTimeout(() => {
        if (!this.isPlaying) return
        this.playPianoNote(melodyNote, 0.32, 2.6)
      }, humanDelay)
    }

    // Beat 3: Delicate upper harmony fill or second melody note
    if (this.stepInBar === 3) {
      if (Math.random() > 0.35 && chord.harmony[3]) {
        this.playPianoNote(chord.harmony[3], 0.2, 1.8)
      }
      if (Math.random() > 0.4) {
        const subMelody = chord.melodyPool[Math.floor(Math.random() * chord.melodyPool.length)]
        setTimeout(() => {
          if (!this.isPlaying) return
          this.playPianoNote(subMelody, 0.25, 2.0)
        }, 180)
      }
    }

    // Advance beat (tempo: ~76 BPM, ~780ms per beat)
    this.stepInBar = (this.stepInBar + 1) % 4
    if (this.stepInBar === 0) {
      this.currentChordIndex = (this.currentChordIndex + 1) % COZY_CAFE_CHORDS.length
    }

    // Subtle rubato tempo humanization
    const nextInterval = 780 + (Math.random() * 70 - 35)
    this.timerId = window.setTimeout(this.tick, nextInterval)
  }

  public startMusic() {
    this.initContext()
    if (!this.ctx || this.isPlaying) return

    const now = this.ctx.currentTime

    // Master Volume
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0.0001, now)
    this.masterGain.gain.exponentialRampToValueAtTime(0.42, now + 1.2) // Smooth fade in
    this.masterGain.connect(this.ctx.destination)

    // Warm Room Acoustic Reverb Delay (simulates boutique restaurant acoustics)
    this.reverbDelay = this.ctx.createDelay()
    this.reverbDelay.delayTime.setValueAtTime(0.28, now)

    const delayFeedback = this.ctx.createGain()
    delayFeedback.gain.setValueAtTime(0.38, now)

    const delayDampFilter = this.ctx.createBiquadFilter()
    delayDampFilter.type = 'lowpass'
    delayDampFilter.frequency.setValueAtTime(1600, now)

    this.reverbDelay.connect(delayDampFilter)
    delayDampFilter.connect(delayFeedback)
    delayFeedback.connect(this.reverbDelay)
    delayDampFilter.connect(this.masterGain)

    this.isPlaying = true
    this.currentChordIndex = 0
    this.stepInBar = 0
    this.notify()

    this.tick()
  }

  public stopMusic() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return

    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8) // Smooth fade out

    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }

    setTimeout(() => {
      this.isPlaying = false
      this.notify()
    }, 850)
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic()
      return false
    } else {
      this.startMusic()
      return true
    }
  }

  public isMusicPlaying(): boolean {
    return this.isPlaying
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener)
    listener(this.isPlaying)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying))
  }
}

export const pianoEngine = new RestaurantPianoEngine()
