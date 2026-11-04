export type Role = 'ROLE_UNSPECIFIED' | 'ROLE_OWNER' | 'ROLE_EDITOR' | 'ROLE_VIEWER';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  cursorColor?: string;
  createdAt: number;
  updatedAt: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
  expiresIn: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  defaultBranch: string;
  createdAt: number;
  updatedAt: number;
}

export interface FileMetadata {
  id: string;
  projectId: string;
  name: string;
  path: string;
  parentId: string;
  language: string;
  sizeBytes: number;
  updatedAt: number;
}

export interface FolderMetadata {
  id: string;
  projectId: string;
  name: string;
  path: string;
  parentId: string;
  updatedAt: number;
}

export interface FileTreeNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  language?: string;
  children?: FileTreeNode[];
}

export interface ProjectMember {
  userId: string;
  projectId: string;
  role: Role;
  joinedAt: number;
  user?: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    cursorColor: string;
  };
}

