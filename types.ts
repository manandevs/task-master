
export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  assignees?: { id: string; name: string; avatar: string; isOnline: boolean }[];
}

export interface Memo {
  id: string;
  content: string;
  color: string;
}
