import { create } from 'zustand';

export interface Collaborator {
  id: string;
  name: string;
  color: string; // Dracula / Neon hex color
  glowColor: string; // rgba string for shadow glow
  avatarUrl: string;
  cursor?: {
    line: number; // 1-indexed line
    ch: number;   // 0-indexed column
  };
  selection?: {
    from: { line: number; ch: number };
    to: { line: number; ch: number };
  };
  activeFileId: string;
  status: 'active' | 'idle';
}

interface PresenceState {
  collaborators: Collaborator[];
  isLive: boolean;
  setCollaborators: (collaborators: Collaborator[]) => void;
  updateCursor: (id: string, cursor: { line: number; ch: number }) => void;
  toggleLive: () => void;
}

// Initial mock collaborators matching the cyberpunk mockup
const INITIAL_COLLABORATORS: Collaborator[] = [
  {
    id: 'user-alex',
    name: 'Alex',
    color: '#8be9fd', // Dracula cyan
    glowColor: 'rgba(139, 233, 253, 0.6)',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    cursor: {
      line: 6,
      ch: 44,
    },
    activeFileId: 'api_handler.py',
    status: 'active',
  },
  {
    id: 'user-neo',
    name: 'Neo',
    color: '#ff79c6', // Dracula pink/magenta
    glowColor: 'rgba(255, 121, 198, 0.6)',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    cursor: {
      line: 10,
      ch: 34,
    },
    activeFileId: 'api_handler.py',
    status: 'active',
  },
  {
    id: 'user-trinity',
    name: 'Trinity',
    color: '#50fa7b', // Dracula green
    glowColor: 'rgba(80, 250, 123, 0.6)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    cursor: {
      line: 14,
      ch: 20,
    },
    activeFileId: 'api_handler.py',
    status: 'active',
  },
];

export const usePresenceStore = create<PresenceState>((set) => ({
  collaborators: INITIAL_COLLABORATORS,
  isLive: true,

  setCollaborators: (collaborators) => set({ collaborators }),

  updateCursor: (id, cursor) =>
    set((state) => ({
      collaborators: state.collaborators.map((c) =>
        c.id === id ? { ...c, cursor } : c
      ),
    })),

  toggleLive: () => set((state) => ({ isLive: !state.isLive })),
}));

