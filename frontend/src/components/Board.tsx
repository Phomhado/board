import styled from 'styled-components';
import { Task, ColumnType } from '../types/tasks';
import Column from './Column';

const BoardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  overflow-x: auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const BoardTitle = styled.h1`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(3)};
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
`;

interface Column {
  id: ColumnType;
  title: string;
}

interface BoardProps {
  title?: string;
  columns?: Column[];
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskMove?: (taskId: string, targetColumn: ColumnType) => void;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: 'refinamento', title: 'Refinamento' },
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'Doing' },
  { id: 'test', title: 'Test' },
  { id: 'done', title: 'Done' }
];

export default function Board({
  title = 'Kanban Board',
  columns = DEFAULT_COLUMNS,
  tasks = [],
  onTaskClick,
  onTaskMove
}: BoardProps) {
  // Agrupa tasks por coluna
  const getTasksByColumn = (columnId: ColumnType): Task[] => {
    return tasks.filter(task => task.column === columnId);
  };

  return (
    <>
      <BoardTitle>{title}</BoardTitle>
      <BoardContainer>
        {columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={getTasksByColumn(column.id)}
            onTaskClick={onTaskClick}
            onTaskMove={onTaskMove}
          />
        ))}
      </BoardContainer>
    </>
  );
}