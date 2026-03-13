import { Group, Panel, Separator } from 'react-resizable-panels';
import { useUIStore } from '../../../store/useUIStore';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { EditorArea } from '../EditorArea';
import { TerminalPanel } from '../TerminalPanel';

export function MainLayout() {
  const { isSidebarOpen, isTerminalOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />

      {/* IDE body — takes remaining height */}
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal" className="h-full">
          {isSidebarOpen && (
            <>
              <Panel id="sidebar" defaultSize={48} minSize={35} maxSize={48}>
                <Sidebar />
              </Panel>
              {/* Separator styled via [data-separator] in index.css */}
              <Separator className="w-0.75 cursor-col-resize" />
            </>
          )}

          <Panel id="main-content">
            <Group orientation="vertical" className="h-full">
              <Panel id="editor" defaultSize={70} minSize={30}>
                <EditorArea />
              </Panel>

              {isTerminalOpen && (
                <>
                  <Separator className="h-0.75 cursor-row-resize" />
                  <Panel id="terminal" defaultSize={30} minSize={15} maxSize={60}>
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
