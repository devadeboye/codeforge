import { Files, Search, GitBranch } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

export function IconRail() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <nav className="flex flex-col items-center w-12 py-2 gap-1 bg-bg-secondary border-r border-border-subtle shrink-0 h-full">
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
  );
}
