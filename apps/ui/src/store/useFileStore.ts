import { create } from 'zustand';
import { FileNode } from '../types/file';

interface FileState {
  tree: FileNode[];
  expandedFolders: Set<string>;
  openTabs: FileNode[];
  activeTabId: string | null;

  // Actions
  toggleFolder: (id: string) => void;
  openFile: (node: FileNode) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
}

const MOCK_TREE: FileNode[] = [
  {
    id: 'root-src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'App.tsx',
        name: 'App.tsx',
        type: 'file',
        language: 'typescript',
        content: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { EditorPage } from './pages/Editor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/editor/:projectId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
`,
      },
      {
        id: 'main.tsx',
        name: 'main.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
      },
      {
        id: 'index.css',
        name: 'index.css',
        type: 'file',
        language: 'css',
        content: `@import "tailwindcss";

@theme {
  --color-bg-primary: #282a36;
  --color-accent-purple: #bd93f9;
}
`,
      },
    ],
  },
  {
    id: 'root-components',
    name: 'components',
    type: 'folder',
    children: [
      {
        id: 'Header.tsx',
        name: 'Header.tsx',
        type: 'file',
        language: 'typescript',
        content: `export function Header() {
  return <header>Header</header>;
}
`,
      },
    ],
  },
  {
    id: 'README.md',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# CodeForge ⚡
A collaborative code editor with a cyberpunk edge.

## Implementation Progress
- [x] Tailwind v4
- [x] Lucide Icons
- [ ] Real-time Sync (WIP)
`,
  },
  {
    id: 'package.json',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "codeforge-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.1",
    "lucide-react": "^0.395.0"
  }
}
`,
  },
];

export const useFileStore = create<FileState>((set) => ({
  tree: MOCK_TREE,
  expandedFolders: new Set(['root-src']),
  openTabs: [],
  activeTabId: null,

  toggleFolder: (id: string) =>
    set((state) => {
      const newExpanded = new Set(state.expandedFolders);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return { expandedFolders: newExpanded };
    }),

  openFile: (node: FileNode) =>
    set((state) => {
      // Don't open if already open, just switch
      if (state.openTabs.some((tab) => tab.id === node.id)) {
        return { activeTabId: node.id };
      }
      return {
        openTabs: [...state.openTabs, node],
        activeTabId: node.id,
      };
    }),

  closeTab: (id: string) =>
    set((state) => {
      const newTabs = state.openTabs.filter((tab) => tab.id !== id);
      let newActiveId = state.activeTabId;

      if (state.activeTabId === id) {
        newActiveId =
          newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
      }

      return {
        openTabs: newTabs,
        activeTabId: newActiveId,
      };
    }),

  setActiveTab: (id: string) => set({ activeTabId: id }),

  updateFileContent: (id: string, content: string) =>
    set((state) => {
      // Update in tree (mock, simplified)
      const updateNode = (nodes: FileNode[]): FileNode[] =>
        nodes.map((node) => {
          if (node.id === id) return { ...node, content };
          if (node.children)
            return { ...node, children: updateNode(node.children) };
          return node;
        });

      // Update in open tabs
      const updateTabs = state.openTabs.map((tab) =>
        tab.id === id ? { ...tab, content } : tab,
      );

      return {
        tree: updateNode(state.tree),
        openTabs: updateTabs,
      };
    }),
}));
