import { create } from 'zustand';
import { FileNode } from '../types/file';

export type { FileNode };

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

const API_HANDLER_CONTENT = `import dracul as Cson
import dayon import as Apt
import eraquiry, import as Neolai
import frequiry import as None

class Controllers(api_handler):
    coloreeadsents = api_handler.py

    def maintrate(nenudfir, ttags):
        if neo_con.get(overinded({
            colornt.bata.dtl = &TI[PILYOOT + context.farxsponf])
            return colorees.bar(seting())
        )

    def remwist(nesquelf, ttags):
        if containeaderpath == "tags":
            return responderoate.getUscesssoult)

    def get_loan(flag):
        if ari.namepath.getToken():
            return ari.action.sendHandler(*mepth)
`;

const SETTINGS_JSON_CONTENT = `{
  "editor.tabSize": 4,
  "editor.fontFamily": "Fira Code, monospace",
  "editor.theme": "dracula-cyberpunk",
  "collaboration.presence": true,
  "collaboration.neonGlow": true
}
`;

const INDEX_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeForge — Collaborative IDE</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

const API_HANDLER_NODE: FileNode = {
  id: 'api_handler.py',
  name: 'api_handler.py',
  type: 'file',
  language: 'python',
  content: API_HANDLER_CONTENT,
};

const SETTINGS_JSON_NODE: FileNode = {
  id: 'settings.json',
  name: 'settings.json',
  type: 'file',
  language: 'json',
  content: SETTINGS_JSON_CONTENT,
};

const INDEX_HTML_NODE: FileNode = {
  id: 'index.html',
  name: 'index.html',
  type: 'file',
  language: 'html',
  content: INDEX_HTML_CONTENT,
};

const MOCK_TREE: FileNode[] = [
  {
    id: '.gitignore-root',
    name: '.gitignore',
    type: 'file',
    language: 'markdown',
    content: 'node_modules/\ndist/\n.env\n',
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    children: [
      {
        id: 'favicon.ico',
        name: 'favicon.ico',
        type: 'file',
        language: 'markdown',
        content: '',
      },
    ],
  },
  {
    id: 'root-src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'controllers',
        name: 'controllers',
        type: 'folder',
        children: [
          API_HANDLER_NODE,
          {
            id: 'handler.py',
            name: 'handler.py',
            type: 'file',
            language: 'python',
            content: '# Generic handler module\n\ndef init():\n    pass\n',
          },
          {
            id: 'settings.py',
            name: 'settings.py',
            type: 'file',
            language: 'python',
            content: 'DEBUG = True\nPORT = 8080\n',
          },
        ],
      },
      {
        id: 'settings-folder',
        name: 'settings',
        type: 'folder',
        children: [
          {
            id: 'config.json',
            name: 'config.json',
            type: 'file',
            language: 'json',
            content: '{\n  "version": "1.0.0"\n}\n',
          },
        ],
      },
      INDEX_HTML_NODE,
    ],
  },
  SETTINGS_JSON_NODE,
  {
    id: 'package.json',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{\n  "name": "codeforge",\n  "version": "0.1.0",\n  "private": true\n}\n`,
  },
  {
    id: 'README.md',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# CodeForge ⚡\nA collaborative code editor with a cyberpunk edge.\n`,
  },
];

export const useFileStore = create<FileState>((set) => ({
  tree: MOCK_TREE,
  expandedFolders: new Set(['root-src', 'controllers']),
  openTabs: [API_HANDLER_NODE, SETTINGS_JSON_NODE, INDEX_HTML_NODE],
  activeTabId: 'api_handler.py',

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
      const updateNode = (nodes: FileNode[]): FileNode[] =>
        nodes.map((node) => {
          if (node.id === id) return { ...node, content };
          if (node.children)
            return { ...node, children: updateNode(node.children) };
          return node;
        });

      const updateTabs = state.openTabs.map((tab) =>
        tab.id === id ? { ...tab, content } : tab,
      );

      return {
        tree: updateNode(state.tree),
        openTabs: updateTabs,
      };
    }),
}));
