import { FileTree } from '../../explorer/FileTree';

export function ExplorerPanel() {
  return (
    <div className="flex flex-col h-full bg-bg-secondary border-r border-border-subtle overflow-hidden">
      <div className="flex items-center justify-between px-3 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-fg-muted">
        <span>Explorer</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <FileTree />
      </div>
    </div>
  );
}
