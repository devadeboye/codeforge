import { useFileStore } from '../../../store/useFileStore';
import { TreeNode } from '../TreeNode';

export function FileTree() {
  const { tree } = useFileStore();

  return (
    <div className="flex flex-col py-1 h-full overflow-y-auto overflow-x-hidden scrollbar-thin">
      {tree.map(node => (
        <TreeNode key={node.id} node={node} depth={0} />
      ))}
    </div>
  );
}
