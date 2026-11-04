export type WSMessageType =
  | 'DOCUMENT_UPDATE'
  | 'AWARENESS_UPDATE'
  | 'EXEC_RUN'
  | 'EXEC_STDIN'
  | 'EXEC_STDOUT'
  | 'EXEC_STDERR'
  | 'EXEC_STATUS'
  | 'NOTIFICATION'
  | 'PING'
  | 'PONG';

export interface WSMessage<T = unknown> {
  type: WSMessageType;
  roomId: string;
  senderId?: string;
  timestamp: number;
  payload: T;
}

export interface ExecRunPayload {
  language: 'python' | 'javascript' | 'typescript' | 'rust' | 'go';
  code: string;
  stdin?: string;
}

export interface ExecOutputPayload {
  data: string;
  stream: 'stdout' | 'stderr' | 'system';
}

export interface ExecStatusPayload {
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'ERROR' | 'TIMEOUT';
  exitCode?: number;
  durationMs?: number;
}

