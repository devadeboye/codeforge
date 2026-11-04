import { Files, Search, GitBranch, Blocks, Settings } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

export function IconRail() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <nav className="flex flex-col items-center w-12 py-3 gap-1.5 bg-bg-secondary border-r border-border-subtle shrink-0 h-full select-none z-10">
      {/* Top action icons */}
      <button
        className={[
          'relative flex items-center justify-center w-9 h-9 rounded-lg border-none bg-transparent cursor-pointer transition-colors duration-150',
          isSidebarOpen
            ? 'text-accent-purple before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-accent-purple before:rounded-r-sm before:shadow-glow-purple'
            : 'text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary',
        ].join(' ')}
        onClick={toggleSidebar}
        title="File Explorer"
        type="button"
      >
        <Files size={19} />
      </button>

      <button
        className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
        title="Search Workspace (Ctrl+Shift+F)"
        type="button"
      >
        <Search size={19} />
      </button>

      <button
        className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
        title="Source Control"
        type="button"
      >
        <GitBranch size={19} />
      </button>

      <button
        className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
        title="Extensions & Packages"
        type="button"
      >
        <Blocks size={19} />
      </button>

      {/* Bottom docked settings gear */}
      <div className="mt-auto flex flex-col items-center gap-2">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Preferences & Settings"
          type="button"
        >
          <Settings size={19} />
        </button>
      </div>
    </nav>
  );
}
