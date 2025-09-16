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
  limit?: number;
}

export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export interface taskType {
  _id: string;
  taskCode: string;
  title: string;
  description: string;
  project: string;
  workspace: string;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  assignedTo: string | null;
  createdBy: string;
  dueDate: Date | null;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
