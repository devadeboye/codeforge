import { X } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

export function TerminalPanel() {
  const { toggleTerminal } = useUIStore();

  return (
    <div className="flex flex-col h-full bg-bg-secondary overflow-hidden">
      {/* Header with tabs */}
      <div className="flex items-center justify-between h-8 px-3 border-t border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-0.5">
          {['Terminal', 'Output', 'Problems'].map((tab, i) => (
            <button
              key={tab}
              className={[
                'flex items-center gap-1 px-2.5 py-1 text-[12px] border-none bg-transparent rounded cursor-pointer transition-colors duration-150',
                i === 0
                  ? 'text-fg-primary'
                  : 'text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary',
              ].join(' ')}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="flex items-center justify-center w-6 h-6 text-fg-muted border-none bg-transparent rounded cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Close Terminal"
          onClick={toggleTerminal}
          type="button"
        >
          <X size={14} />
        </button>
      </div>

      {/* Terminal content — Xterm.js will mount here */}
      <div className="flex-1 flex items-start p-2 overflow-auto font-code text-[13px]">
        <span>
          <span className="text-accent-green">~/codeforge $</span>{' '}
          <span className="text-fg-muted">Terminal ready. Run your code here.</span>
        </span>
      </div>
    </div>
  );
}
