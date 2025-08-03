import { ColumnType } from '../../types/tasks';

export const COLUMN_OPTIONS: { value: ColumnType; label: string }[] = [
  { value: 'refinamento', label: 'Refinamento' },
  { value: 'todo', label: 'To Do' },
  { value: 'doing', label: 'Doing' },
  { value: 'test', label: 'Test' },
  { value: 'done', label: 'Done' }
];

export const getModalTitle = (mode: 'view' | 'edit' | 'create') => {
  switch (mode) {
    case 'create': return 'Criar Nova Tarefa';
    case 'edit': return 'Editar Tarefa';
    case 'view': return 'Detalhes da Tarefa';
    default: return 'Tarefa';
  }
};