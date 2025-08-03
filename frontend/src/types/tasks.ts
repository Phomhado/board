export type TaskSize = 'P' | 'M' | 'G' | 'GG' | 'EXGG';

export type ColumnType = 'refinamento' | 'todo' | 'doing' | 'test' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  size: TaskSize;
  column: ColumnType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  size: TaskSize;
  column: ColumnType;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  size?: TaskSize;
  column?: ColumnType;
}

export interface TaskCardData {
  id: string;
  title: string;
  size: TaskSize;
}