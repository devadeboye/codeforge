export type DomainEventType =
  | 'project:created'
  | 'project:updated'
  | 'project:deleted'
  | 'file:saved'
  | 'member:joined'
  | 'member:left'
  | 'execution:completed';

export interface DomainEvent<T = unknown> {
  id: string;
  type: DomainEventType;
  projectId: string;
  actorId: string;
  timestamp: number;
  payload: T;
}

export interface FileSavedEventPayload {
  fileId: string;
  filePath: string;
  version: number;
  sizeBytes: number;
}

export interface MemberJoinedEventPayload {
  userId: string;
  username: string;
  role: 'owner' | 'editor' | 'viewer';
}

export interface ExecutionCompletedEventPayload {
  executionId: string;
  language: string;
  exitCode: number;
  durationMs: number;
  success: boolean;
}

