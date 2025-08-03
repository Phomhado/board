import { ColumnProps } from './types';
import { useColumnDragHandlers } from './hooks';
import {
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  TaskCount,
  TaskList,
  EmptyState
} from './styles';
import TaskCard from '../TaskCard';

export default function Column({
  id,
  title,
  tasks,
  onTaskClick,
  onTaskMove
}: ColumnProps) {
  const { handleTaskDragStart, handleDragOver, handleDrop } = useColumnDragHandlers(
    id,
    onTaskMove
  );

  return (
    <ColumnContainer
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <TaskCount>{tasks.length}</TaskCount>
      </ColumnHeader>
      
      <TaskList>
        {tasks.length === 0 ? (
          <EmptyState>
            Nenhuma tarefa
          </EmptyState>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              size={task.size}
              onClick={onTaskClick}
              onDragStart={handleTaskDragStart}
            />
          ))
        )}
      </TaskList>
    </ColumnContainer>
  );
}