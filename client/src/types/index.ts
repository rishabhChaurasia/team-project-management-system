export interface authUserType {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  currentWorkspace: string | null;
}

export interface workspacesType {
  _id: string;
  name: string;
  description: string;
  owner: string;
  inviteCode: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface projectsType {
  _id: string;
  name: string;
  description: string;
  emoji: string;
  workspace: string;
  createdBy: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface paginationType {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  skip: number;
  limit: number;
}
