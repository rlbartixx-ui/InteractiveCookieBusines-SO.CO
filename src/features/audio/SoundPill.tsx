import { useBakerySound } from './useBakerySound'

export function SoundPill() {
  const { isMusicPlaying, toggleMusic } = useBakerySound()

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-[0_4px_20px_rgba(44,26,14,0.10)] backdrop-blur-md transition-all duration-300 cursor-pointer ${isMusicPlaying
          ? 'bg-[#2C1A0E] text-[#F9F8F6] border-[#2C1A0E] ring-2 ring-[#C9B59C]/50 shadow-md scale-105'
          : 'bg-[#F9F8F6]/94 text-[#2C1A0E] border-[#D9CFC7] hover:border-[#2C1A0E]'
          }`}
        aria-label={isMusicPlaying ? 'Mute restaurant piano' : 'Play cozy restaurant piano music'}
        title="Toggle cozy restaurant piano music"
      >
        {/* Equalizer Waveform */}
        <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#C9B59C] animate-eq-1'
              : 'h-1.5 bg-[#8B6F5C]/60 group-hover:bg-[#2C1A0E]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#C9B59C] animate-eq-2'
              : 'h-3 bg-[#8B6F5C]/60 group-hover:bg-[#2C1A0E]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#C9B59C] animate-eq-3'
              : 'h-2 bg-[#8B6F5C]/60 group-hover:bg-[#2C1A0E]'
              }`}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all ${isMusicPlaying
              ? 'bg-[#C9B59C] animate-eq-4'
              : 'h-1 bg-[#8B6F5C]/60 group-hover:bg-[#2C1A0E]'
              }`}
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-[0.62rem] uppercase tracking-[0.2em] font-medium opacity-70">
            {isMusicPlaying ? 'Now Playing' : 'Cozy Music'}
          </span>
          <span className="font-display italic text-xs mt-0.5">
            {isMusicPlaying ? 'Cafe Piano ♬' : 'Tap for Piano ♬'}
          </span>
        </div>

        {/* Status indicator dot */}
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${isMusicPlaying
            ? 'bg-[#C9B59C] animate-pulse shadow-[0_0_8px_#C9B59C]'
            : 'bg-[#D9CFC7] group-hover:bg-[#8B6F5C]'
            }`}
        />
      </button>
    </div>
  )
}
