import { Settings, Radio } from 'lucide-react';
import { usePresenceStore } from '../../../store/usePresenceStore';

export function Header() {
  const { collaborators, isLive, toggleLive } = usePresenceStore();

  return (
    <header className="relative flex items-center justify-between h-12 px-4 bg-bg-secondary border-b border-border-subtle select-none shrink-0 z-20">
      {/* Left: Cyberpunk Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          {/* Cyberpunk stylized [CF] icon */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-bg-tertiary/80 border border-accent-purple/50 shadow-glow-purple/40 text-accent-cyan font-code font-bold text-xs tracking-tighter">
            <span className="text-accent-pink font-mono">&lt;</span>
            <span className="text-accent-cyan">CF</span>
          </div>
          <span className="font-code text-[15px] font-bold tracking-widest text-fg-primary uppercase drop-shadow-[0_0_10px_rgba(189,147,249,0.35)]">
            Code<span className="text-accent-purple">Forge</span>
          </span>
        </div>
      </div>

      {/* Center: Live Broadcast Pill */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <button
          onClick={toggleLive}
          type="button"
          className={[
            'flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium font-code transition-all duration-200 cursor-pointer',
            isLive
              ? 'text-accent-red bg-accent-red/15 border border-accent-red/40 shadow-glow-red/30'
              : 'text-fg-muted bg-bg-tertiary border border-border-subtle opacity-70 hover:opacity-100',
          ].join(' ')}
          title={isLive ? 'Session is live' : 'Session offline - click to reconnect'}
        >
          <Radio
            size={13}
            className={isLive ? 'text-accent-red animate-pulse' : 'text-fg-muted'}
          />
          <span className="tracking-wide">{isLive ? 'Live' : 'Offline'}</span>
        </button>
      </div>

      {/* Right: Active Collaborator Avatars & Settings */}
      <div className="flex items-center gap-3">
        {/* Collaborators Stack */}
        <div className="flex items-center gap-2">
          {collaborators.map((user) => (
            <div
              key={user.id}
              className="group relative flex items-center justify-center"
              title={`${user.name} (${user.status})`}
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden p-0.5 transition-transform duration-200 hover:scale-110 cursor-pointer"
                style={{
                  border: `2px solid ${user.color}`,
                  boxShadow: `0 0 10px ${user.glowColor}`,
                }}
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full bg-bg-tertiary"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Fallback initials */}
                <div
                  className="w-full h-full hidden items-center justify-center text-[10px] font-bold text-bg-primary rounded-full"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Hover Name Tag */}
              <div
                className="absolute -bottom-8 px-2 py-0.5 rounded text-[11px] font-code font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-30 shadow-md"
                style={{
                  backgroundColor: '#21222c',
                  border: `1px solid ${user.color}`,
                  color: user.color,
                }}
              >
                {user.name}
              </div>
            </div>
          ))}
        </div>

        <div className="w-px h-5 bg-border-subtle ml-1" />

        <button
          className="flex items-center justify-center w-8 h-8 rounded-md text-fg-muted bg-transparent border-none cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Settings"
          type="button"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
