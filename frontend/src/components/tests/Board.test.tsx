import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import Board from '../Board/Board';
import { Task } from '../../types/tasks';

const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Task em Todo',
    description: 'Descrição da task 1',
    size: 'M',
    column: 'todo',
    createdAt: new Date('2024-01-01T10:00:00.000Z'),
    updatedAt: new Date('2024-01-01T10:00:00.000Z')
  },
  {
    id: 'task-2',
    title: 'Task em Doing',
    description: 'Descrição da task 2',
    size: 'G',
    column: 'doing',
    createdAt: new Date('2024-01-01T11:00:00.000Z'),
    updatedAt: new Date('2024-01-01T11:00:00.000Z')
  },
  {
    id: 'task-3',
    title: 'Task em Done',
    description: 'Descrição da task 3',
    size: 'P',
    column: 'done',
    createdAt: new Date('2024-01-01T12:00:00.000Z'),
    updatedAt: new Date('2024-01-01T12:00:00.000Z')
  }
];

describe('Board Component', () => {
  const defaultProps = {
    tasks: mockTasks,
    onTaskClick: vi.fn(),
    onTaskMove: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    test('deve renderizar o board com título padrão', () => {
      render(<Board {...defaultProps} />);
      
      expect(screen.getByText('Kanban Board')).toBeInTheDocument();
    });

    test('deve renderizar board com título customizado', () => {
      render(<Board {...defaultProps} title="Meu Board Customizado" />);
      
      expect(screen.getByText('Meu Board Customizado')).toBeInTheDocument();
    });

    test('deve renderizar todas as colunas padrão', () => {
      render(<Board {...defaultProps} />);
      
      expect(screen.getByText('Refinamento')).toBeInTheDocument();
      expect(screen.getByText('To Do')).toBeInTheDocument();
      expect(screen.getByText('Doing')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    test('deve renderizar tasks nas colunas corretas', () => {
      render(<Board {...defaultProps} />);
      
      expect(screen.getByText('Task em Todo')).toBeInTheDocument();
      expect(screen.getByText('Task em Doing')).toBeInTheDocument();
      expect(screen.getByText('Task em Done')).toBeInTheDocument();
    });
  });

  describe('Contagem de Tasks', () => {
    test('deve exibir contagem correta de tasks nas colunas', () => {
      render(<Board {...defaultProps} />);
      
      const todoSection = screen.getByText('To Do').closest('div');
      const doingSection = screen.getByText('Doing').closest('div');
      const doneSection = screen.getByText('Done').closest('div');
      const refinamentoSection = screen.getByText('Refinamento').closest('div');
      const testSection = screen.getByText('Test').closest('div');
      
      expect(todoSection).toHaveTextContent('1');
      expect(doingSection).toHaveTextContent('1');
      expect(doneSection).toHaveTextContent('1');
      expect(refinamentoSection).toHaveTextContent('0');
      expect(testSection).toHaveTextContent('0');
    });
  });

  describe('Interações com Tasks', () => {
    test('deve chamar onTaskClick quando uma task é clicada', () => {
      const mockOnTaskClick = vi.fn();
      render(<Board {...defaultProps} onTaskClick={mockOnTaskClick} />);
      
      fireEvent.click(screen.getByText('Task em Todo'));
      
      expect(mockOnTaskClick).toHaveBeenCalledTimes(1);
      expect(mockOnTaskClick).toHaveBeenCalledWith('task-1');
    });
  });

  describe('Drag and Drop', () => {
    test('deve lidar com interações de drag and drop', () => {
      const mockOnTaskMove = vi.fn();
      render(<Board {...defaultProps} onTaskMove={mockOnTaskMove} />);
      
      const task = screen.getByText('Task em Todo').closest('div');
      const doingColumn = screen.getByText('Doing').closest('div');
      
      const mockDataTransfer = {
        setData: vi.fn(),
        getData: vi.fn().mockReturnValue(JSON.stringify({
          taskId: 'task-1',
          sourceColumn: 'todo'
        })),
        clearData: vi.fn(),
        dropEffect: 'move',
        effectAllowed: 'move',
        files: [] as any,
        items: [] as any,
        types: ['application/json']
      };
      
      if (task) {
        fireEvent.dragStart(task, {
          dataTransfer: mockDataTransfer
        });
      }
      
      if (doingColumn) {
        fireEvent.dragOver(doingColumn);
        fireEvent.drop(doingColumn, {
          dataTransfer: mockDataTransfer
        });
      }
      
      expect(mockOnTaskMove).toHaveBeenCalledWith('task-1', 'doing');
    });
  });

  describe('Tratamento de Erros', () => {
    test('deve lidar graciosamente com tasks com coluna inválida', () => {
      const taskComColunaInvalida = [
        {
          ...mockTasks[0],
          column: 'coluna-inexistente' as any
        }
      ];
      
      expect(() => {
        render(<Board {...defaultProps} tasks={taskComColunaInvalida} />);
      }).not.toThrow();
    });

    test('deve lidar com array de tasks indefinido', () => {
      expect(() => {
        render(<Board {...defaultProps} tasks={undefined as any} />);
      }).not.toThrow();
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter estrutura ARIA adequada', () => {
      render(<Board {...defaultProps} />);
      
      const title = screen.getByText('Kanban Board');
      expect(title.tagName).toBe('H1');
    });

    test('tasks devem ser arrastáveis', () => {
      render(<Board {...defaultProps} />);
          
      const allDraggableElements = document.querySelectorAll('[draggable="true"]');
      
      expect(allDraggableElements.length).toBeGreaterThan(0);
      
      const taskCard = Array.from(allDraggableElements).find(element => 
        element.textContent?.includes('Task em Todo')
      );
      
      expect(taskCard).toBeTruthy();
      expect(taskCard).toHaveAttribute('draggable', 'true');
    });
  });
});