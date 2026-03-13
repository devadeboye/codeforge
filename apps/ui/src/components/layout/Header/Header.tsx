import { Zap, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between h-12 px-4 bg-bg-secondary border-b border-border-subtle select-none shrink-0">
      {/* Left: logo + project name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-code text-[15px] font-semibold text-accent-purple tracking-wide">
          <Zap size={18} fill="currentColor" />
          <span>CodeForge</span>
        </div>
        <div className="w-px h-5 bg-border-subtle" />
        <span className="text-[13px] text-fg-secondary font-normal">
          Untitled Project
        </span>
      </div>

      {/* Right: status + settings */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] text-accent-green bg-accent-green/10 border border-accent-green/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-dot" />
          <span>Live</span>
        </div>
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
