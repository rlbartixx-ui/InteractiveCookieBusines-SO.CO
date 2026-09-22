import { useBakerySound } from './useBakerySound'

export function SoundPill() {
  const { isMusicPlaying, toggleMusic } = useBakerySound()

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border shadow-[0_4px_20px_rgba(58,42,32,0.12)] backdrop-blur-md transition-all duration-300 cursor-pointer ${isMusicPlaying
          ? 'bg-[#3A2A20] text-[#FFF7E4] border-[#3A2A20] ring-2 ring-[#F6C453]/50 shadow-md scale-102'
          : 'bg-[#FFF7E4]/95 text-[#3A2A20] border-[#E7D7BE] hover:border-[#3A2A20]'
          }`}
        aria-label={isMusicPlaying ? 'Mute restaurant piano' : 'Play cozy restaurant piano music'}
        title="Toggle cozy restaurant piano music"
      >
        {/* Equalizer Waveform */}
        <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#F6C453] animate-eq-1'
              : 'h-1.5 bg-[#7C604D]/60 group-hover:bg-[#3A2A20]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#F6C453] animate-eq-2'
              : 'h-3 bg-[#7C604D]/60 group-hover:bg-[#3A2A20]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#F6C453] animate-eq-3'
              : 'h-2 bg-[#7C604D]/60 group-hover:bg-[#3A2A20]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#F6C453] animate-eq-4'
              : 'h-1 bg-[#7C604D]/60 group-hover:bg-[#3A2A20]'
              }`}
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-[0.62rem] uppercase tracking-[0.2em] font-medium opacity-70">
            {isMusicPlaying ? 'Now Playing' : 'Cozy Music'}
          </span>
          <span className="font-display italic text-xs mt-0.5">
            {isMusicPlaying ? 'Cafe Piano' : 'Tap for Piano'}
          </span>
        </div>

        {/* Status indicator dot */}
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${isMusicPlaying
            ? 'bg-[#F6C453] animate-pulse shadow-[0_0_8px_#F6C453]'
            : 'bg-[#E7D7BE] group-hover:bg-[#7C604D]'
            }`}
        />
      </button>
    </div>
  )
}
