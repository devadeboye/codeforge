import React from 'react';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { FileNode, useFileStore } from '../../../store/useFileStore';
import { FileIcon } from '../FileIcon';

interface TreeNodeProps {
  node: FileNode;
  depth: number;
}

export function TreeNode({ node, depth }: TreeNodeProps) {
  const { toggleFolder, openFile, expandedFolders, activeTabId } = useFileStore();
  
  const isFolder = node.type === 'folder';
  const isExpanded = expandedFolders.has(node.id);
  const isActive = activeTabId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      toggleFolder(node.id);
    } else {
      openFile(node);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Row */}
      <div 
        className={[
          'group flex items-center h-7 px-2 gap-1.5 cursor-pointer select-none transition-colors duration-150',
          isActive ? 'bg-bg-tertiary text-fg-primary' : 'text-fg-secondary hover:bg-bg-secondary/50 hover:text-fg-primary'
        ].join(' ')}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {/* Chevron */}
        <div className="w-4 h-4 flex items-center justify-center">
          {isFolder && (
            <ChevronRight 
              size={14} 
              className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
            />
          )}
        </div>

        {/* Folder/File Icon */}
        {isFolder ? (
          isExpanded ? (
            <FolderOpen size={16} className="text-accent-purple" />
          ) : (
            <Folder size={16} className="text-accent-purple" />
          )
        ) : (
          <FileIcon name={node.name} />
        )}

        {/* Name */}
        <span className="text-[13px] truncate">
          {node.name}
        </span>
      </div>

      {/* Children */}
      {isFolder && isExpanded && node.children && (
        <div className="flex flex-col">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
