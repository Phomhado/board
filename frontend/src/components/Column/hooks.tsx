import { ColumnType } from '../../types/tasks';
import { DragData } from './types';

export function useColumnDragHandlers(
  columnId: ColumnType,
  onTaskMove?: (taskId: string, targetColumn: ColumnType) => void
) {
  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.setData('application/json', JSON.stringify({ 
      taskId, 
      sourceColumn: columnId 
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const dragData: DragData = JSON.parse(e.dataTransfer.getData('application/json'));
      const { taskId, sourceColumn } = dragData;
      
      if (sourceColumn !== columnId && onTaskMove) {
        onTaskMove(taskId, columnId);
      }
    } catch (error) {
      console.warn('Error handling task drop:', error);
    }
  };

  return {
    handleTaskDragStart,
    handleDragOver,
    handleDrop
  };
}