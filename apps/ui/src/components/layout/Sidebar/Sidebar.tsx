import { Files, Search, GitBranch } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-full overflow-hidden">
      {/* Icon rail — always visible */}
      <nav className="flex flex-col items-center w-12 py-2 gap-1 bg-bg-secondary border-r border-border-subtle shrink-0">
        <button
          className={[
            'relative flex items-center justify-center w-9 h-9 rounded-lg border-none bg-transparent cursor-pointer transition-colors duration-150',
            isSidebarOpen
              ? 'text-fg-primary before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-accent-purple before:rounded-r-sm before:shadow-glow-purple'
              : 'text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary',
          ].join(' ')}
          onClick={toggleSidebar}
          title="File Explorer"
          type="button"
        >
          <Files size={20} />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Search"
          type="button"
        >
          <Search size={20} />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted border-none bg-transparent cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Source Control"
          type="button"
        >
          <GitBranch size={20} />
        </button>
      </nav>

      {/* Collapsible file tree panel */}
      {isSidebarOpen && (
        <div className="flex flex-col flex-1 bg-bg-secondary border-r border-border-subtle overflow-hidden">
          <div className="flex items-center justify-between px-3 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-fg-muted">
            <span>Explorer</span>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-1">
            <div className="flex flex-col items-center justify-center h-full gap-2 text-fg-muted text-[13px]">
              <Files size={32} className="opacity-20" />
              <span>No project open</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
