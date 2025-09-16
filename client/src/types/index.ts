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
