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
      className="group relative flex h-8 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-2.5 py-1 text-xs font-semibold transition-all shadow-2xs focus-visible:outline-blue-500"
      aria-label={isMuted ? 'Unmute Audio UI Effects' : 'Mute Audio UI Effects'}
      title={isMuted ? 'Sound: Muted (Click to turn ON)' : 'Sound: ON (Click to MUTE)'}
    >
      {/* Animated Sound Equalizer Bars (Electric Cobalt Accent) */}
      <div className="flex h-3 items-end gap-0.5">
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-slate-600'
              : 'h-3 animate-pulse bg-blue-500 shadow-[0_0_6px_#3b82f6]'
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-slate-600'
              : 'h-2 animate-pulse bg-blue-500 shadow-[0_0_6px_#3b82f6]'
          }`}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={`w-0.5 rounded-full transition-all ${
            isMuted
              ? 'h-1 bg-slate-600'
              : 'h-3 animate-pulse bg-blue-500 shadow-[0_0_6px_#3b82f6]'
          }`}
          style={{ animationDelay: '300ms' }}
        />
      </div>

      <span
        className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${
          isMuted ? 'text-slate-500' : 'text-slate-200 font-bold'
        }`}
      >
        {isMuted ? 'Muted' : 'Audio'}
      </span>
    </button>
  );
}

export default SoundToggle;