import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isTerminalOpen: boolean;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isTerminalOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTerminal: () =>
    set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setTerminalOpen: (open) => set({ isTerminalOpen: open }),
}));
