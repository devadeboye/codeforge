import { useMemo } from 'react';
import { ChevronRight, FileCode, Folder } from 'lucide-react';
import { useFileStore } from '../../store/useFileStore';
import { findPathNodes } from '../../utils/file';

export function Breadcrumbs() {
  const { tree, activeTabId } = useFileStore();

  const pathNodes = useMemo(() => {
    if (!activeTabId) return [];
    return findPathNodes(tree, activeTabId) || [];
  }, [tree, activeTabId]);

  if (pathNodes.length === 0) return null;

  return (
    <div className="flex items-center h-8 px-4 bg-bg-primary border-b border-border-subtle overflow-x-auto no-scrollbar whitespace-nowrap">
      {pathNodes.map((node, index) => (
        <div key={node.id} className="flex items-center gap-1.5 shrink-0">
          {index > 0 && (
            <ChevronRight size={14} className="text-fg-muted mx-0.5" />
          )}
          
          <div className="flex items-center gap-1.5 group cursor-default">
            {node.type === 'folder' ? (
              <Folder size={14} className="text-accent-blue" />
            ) : (
              <FileCode size={14} className="text-accent-purple" />
            )}
            
            <span 
              className={`text-[11px] font-medium transition-colors duration-150 ${
                index === pathNodes.length - 1 
                  ? 'text-fg-primary' 
                  : 'text-fg-muted group-hover:text-fg-primary'
              }`}
            >
              {node.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
