import { Task, ColumnType } from '../../types/tasks';

export interface ColumnProps {
  id: ColumnType;
  title: string;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskMove?: (taskId: string, targetColumn: ColumnType) => void;
}

export interface DragData {
  taskId: string;
  sourceColumn: ColumnType;
}