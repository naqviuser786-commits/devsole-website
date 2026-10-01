import { useEffect, useState } from 'react';
import { soundFX } from '@/lib/soundFx';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(soundFX.isMuted);

  useEffect(() => {
    soundFX.initGlobalListeners();
  }, []);

  const handleToggle = () => {
    const nextMute = soundFX.toggleMute();
    setIsMuted(nextMute);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group relative flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold transition-all hover:border-energy-bright/60 hover:bg-energy-bright/10"
      aria-label={isMuted ? 'Unmute Futuristic UI Sounds' : 'Mute Futuristic UI Sounds'}
      title={isMuted ? 'Sound: Muted (Click to turn ON)' : 'Sound: ON (Click to MUTE)'}
    >
      {/* Animated Sound Equalizer Bars */}
      <div className="flex h-3.5 items-end gap-0.5">
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-chrome-600'
              : 'h-3 animate-pulse bg-energy-bright shadow-[0_0_8px_#00f0ff]'
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-chrome-600'
              : 'h-2 animate-pulse bg-energy-bright shadow-[0_0_8px_#00f0ff]'
          }`}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-chrome-600'
              : 'h-3.5 animate-pulse bg-energy-bright shadow-[0_0_8px_#00f0ff]'
          }`}
          style={{ animationDelay: '300ms' }}
        />
      </div>

      <span
        className={`text-[10px] uppercase tracking-wider transition-colors ${
          isMuted ? 'text-chrome-500' : 'text-energy-bright'
        }`}
      >
        {isMuted ? 'Muted' : 'Sound'}
      </span>
    </button>
  );
}