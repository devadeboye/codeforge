export interface CursorPosition {
  line: number; // 1-indexed
  ch: number;   // 0-indexed
}

export interface SelectionRange {
  from: CursorPosition;
  to: CursorPosition;
}

export interface UserPresence {
  userId: string;
  username: string;
  color: string;
  glowColor: string;
  avatarUrl: string;
  activeFileId?: string;
  cursor?: CursorPosition;
  selection?: SelectionRange;
  status: 'active' | 'idle';
  lastSeen: number;
}

