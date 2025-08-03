import styled from 'styled-components';
import { Task, ColumnType } from '../types/tasks';
import TaskCard from './TaskCard';

const ColumnContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing(2)};
  min-width: 300px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
`;

const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TaskCount = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  flex: 1;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing(1)} 0;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${({ theme }) => theme.colors.gray};
  font-style: italic;
  text-align: center;
  border: 2px dashed ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

interface ColumnProps {
  id: ColumnType;
  title: string;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskMove?: (taskId: string, targetColumn: ColumnType) => void;
}

export default function Column({
  id,
  title,
  tasks,
  onTaskClick,
  onTaskMove
}: ColumnProps) {
  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId, sourceColumn: id }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      const { taskId, sourceColumn } = dragData;
      
      if (sourceColumn !== id && onTaskMove) {
        onTaskMove(taskId, id);
      }
    } catch (error) {
      console.warn('Error handling task drop:', error);
    }
  };

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