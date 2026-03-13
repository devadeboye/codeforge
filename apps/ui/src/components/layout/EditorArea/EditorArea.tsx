import { Zap } from 'lucide-react';

export function EditorArea() {
  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center h-9 bg-bg-secondary border-b border-border-subtle overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
        <button
          className="flex items-center gap-1.5 h-full px-3.5 text-[12px] text-fg-primary bg-bg-primary border-r border-border-subtle border-b-2 border-b-accent-purple whitespace-nowrap cursor-pointer"
          type="button"
        >
          welcome.md
        </button>
      </div>

      {/* Editor content — CodeMirror will mount here */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-4 text-fg-muted">
          <Zap size={48} className="opacity-10" fill="currentColor" />
          <span className="font-code text-xl font-semibold text-accent-purple tracking-wide">
            CodeForge
          </span>
          <span className="text-[13px] text-fg-muted">
            Open a file from the explorer to start editing
          </span>
          <div className="flex flex-col gap-1.5 mt-2 text-[12px] font-code text-fg-muted">
            <span>
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary border border-border-subtle rounded text-[11px] text-fg-secondary">
                Ctrl+P
              </kbd>{' '}
              Quick open file
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary border border-border-subtle rounded text-[11px] text-fg-secondary">
                Ctrl+Shift+P
              </kbd>{' '}
              Command palette
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
