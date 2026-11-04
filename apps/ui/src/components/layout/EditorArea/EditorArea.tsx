import { Zap, X, Split, MoreHorizontal, Layout } from 'lucide-react';
import { CodeEditor } from '../../editor/CodeEditor';
import { Breadcrumbs } from '../../editor/Breadcrumbs';
import { FileIcon } from '../../explorer/FileIcon';
import { useFileStore } from '../../../store/useFileStore';

export function EditorArea() {
  const { openTabs, activeTabId, setActiveTab, closeTab, updateFileContent } = useFileStore();

  const activeFile = openTabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center h-9 bg-bg-secondary border-b border-border-subtle shrink-0 select-none">
        {/* Open Tabs */}
        <div className="flex items-center h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {openTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                className={[
                  'group flex items-center h-full px-3 gap-2 text-[12px] border-r border-border-subtle cursor-pointer transition-colors duration-150',
                  isActive
                    ? 'text-accent-purple bg-bg-primary border-b-2 border-b-accent-purple font-medium shadow-[inset_0_-2px_6px_rgba(189,147,249,0.15)]'
                    : 'text-fg-muted hover:bg-bg-tertiary/40 hover:text-fg-secondary',
                ].join(' ')}
                onClick={() => setActiveTab(tab.id)}
              >
                <FileIcon name={tab.name} size={14} />
                <span className="truncate max-w-32">{tab.name}</span>
                {isActive && (
                  <span className="text-fg-muted font-mono text-[11px] font-bold">
                    *
                  </span>
                )}
                <button
                  className="p-0.5 rounded-sm hover:bg-bg-elevated text-transparent group-hover:text-fg-muted transition-colors border-none bg-transparent cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  title="Close tab"
                  type="button"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Tab Bar Controls */}
        <div className="ml-auto flex items-center pr-2 gap-1 text-fg-muted">
          <button
            className="flex items-center justify-center w-7 h-7 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Split Editor Right"
            type="button"
          >
            <Split size={14} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Toggle Panel Layout"
            type="button"
          >
            <Layout size={14} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="More Editor Actions"
            type="button"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      {activeFile && <Breadcrumbs />}

      {/* Editor content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
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
