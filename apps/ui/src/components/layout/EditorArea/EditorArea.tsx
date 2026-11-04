import { Zap, X } from 'lucide-react';
import { CodeEditor } from '../../editor/CodeEditor';
import { Breadcrumbs } from '../../editor/Breadcrumbs';
import { useFileStore } from '../../../store/useFileStore';

export function EditorArea() {
  const { openTabs, activeTabId, setActiveTab, closeTab, updateFileContent } = useFileStore();

  const activeFile = openTabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center h-9 bg-bg-secondary border-b border-border-subtle overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={[
              'group flex items-center h-full px-3 gap-2 text-[12px] border-r border-border-subtle cursor-pointer select-none transition-colors duration-150',
              tab.id === activeTabId 
                ? 'text-brand-purple bg-bg-primary border-b-2 border-b-accent-purple' 
                : 'text-fg-muted hover:bg-bg-tertiary/50 hover:text-fg-secondary'
            ].join(' ')}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="truncate max-w-30">{tab.name}</span>
            <button
              className="p-0.5 rounded-sm hover:bg-bg-elevated text-transparent group-hover:text-fg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Breadcrumbs */}
      {activeFile && <Breadcrumbs />}

      {/* Editor content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeFile ? (
          <CodeEditor 
            key={activeFile.id}
            fileId={activeFile.id}
            value={activeFile.content || ''} 
            onChange={(val) => updateFileContent(activeFile.id, val)}
            language={activeFile.language} 
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
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
        )}
      </div>
    </div>
  );
}
