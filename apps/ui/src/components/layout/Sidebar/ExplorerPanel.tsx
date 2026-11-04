import { MoreHorizontal } from 'lucide-react';
import { FileTree } from '../../explorer/FileTree';

export function ExplorerPanel() {
  return (
    <div className="flex flex-col h-full bg-bg-secondary border-r border-border-subtle overflow-hidden select-none">
      {/* Explorer Title Bar */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-fg-muted">
        <span>Explorer</span>
        <button
          className="flex items-center justify-center w-6 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
          title="More actions"
          type="button"
        >
          <MoreHorizontal size={15} />
        </button>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <FileTree />
      </div>
    </div>
  );
}
