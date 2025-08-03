import { Task, ColumnType } from '../../types/tasks';

export interface BoardColumn {
  id: ColumnType;
  title: string;
}

export interface BoardProps {
  title?: string;
  columns?: BoardColumn[];
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskMove?: (taskId: string, targetColumn: ColumnType) => void;
}