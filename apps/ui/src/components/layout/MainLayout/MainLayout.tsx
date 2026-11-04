import { Group, Panel, Separator } from 'react-resizable-panels';
import { useUIStore } from '../../../store/useUIStore';
import { Header } from '../Header';
import { IconRail, ExplorerPanel } from '../Sidebar';
import { EditorArea } from '../EditorArea';
import { TerminalPanel } from '../TerminalPanel';

export function MainLayout() {
  const { isSidebarOpen, isTerminalOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-bg-primary cyber-grid">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Icon Rail (48px) */}
        <IconRail />

        {/* Resizable area */}
        <Group orientation="horizontal" className="flex-1">
          {isSidebarOpen && (
            <>
              <Panel
                id="explorer-container"
                defaultSize={'15%'}
                minSize={'12%'}
                maxSize={'20%'}
              >
                <ExplorerPanel />
              </Panel>

              <Separator className="w-0.75 cursor-col-resize bg-border-subtle hover:bg-accent-purple transition-colors" />
            </>
          )}

          {/* Main content */}
          <Panel id="main-content">
            <Group orientation="vertical" className="h-full">
              <Panel id="editor" defaultSize={'70%'} minSize={'30%'}>
                <EditorArea />
              </Panel>

              {isTerminalOpen && (
                <>
                  <Separator className="h-0.75 cursor-row-resize bg-border-subtle hover:bg-accent-purple transition-colors" />
                  <Panel
                    id="terminal"
                    defaultSize={'30%'}
                    minSize={'15%'}
                    maxSize={'60%'}
                  >
                    <TerminalPanel />
                  </Panel>
                </>
              )}
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
