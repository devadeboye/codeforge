import { FileNode } from '../types/file';

export function findPathNodes(
  nodes: FileNode[],
  targetId: string,
): FileNode[] | null {
  for (const node of nodes) {
    if (node.id === targetId) {
      return [node];
    }

    if (node.children) {
      const path = findPathNodes(node.children, targetId);
      if (path) {
        return [node, ...path]; // Prepend current node to the found path
      }
    }
  }
  return null;
}
