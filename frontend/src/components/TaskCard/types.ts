import { TaskCardData, TaskSize } from '../../types/tasks';

export interface TaskCardProps extends TaskCardData {
  onClick?: (id: string) => void;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

export interface TaskCardStyleProps {
  size: TaskSize;
}