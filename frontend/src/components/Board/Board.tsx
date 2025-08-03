import { Task, ColumnType } from '../../types/tasks';
import { BoardProps } from './types';
import { DEFAULT_COLUMNS } from './constants';
import { BoardContainer, BoardTitle } from './styles';
import { Column } from '..';

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