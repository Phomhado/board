import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import Board from '../Board/Board';
import { Task } from '../../types/tasks';

// Mock tasks para os testes
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
      
      // Procura por elementos que contenham os números de contagem
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

  describe('Estado Vazio', () => {
    test('deve renderizar board vazio quando não há tasks', () => {
      render(<Board {...defaultProps} tasks={[]} />);
      
      expect(screen.getByText('Kanban Board')).toBeInTheDocument();
      
      // Todas as colunas devem mostrar 0
      const zeroCounters = screen.getAllByText('0');
      expect(zeroCounters).toHaveLength(5);
    });

    test('deve mostrar mensagem de estado vazio nas colunas sem tasks', () => {
      render(<Board {...defaultProps} tasks={[]} />);
      
      const emptyMessages = screen.getAllByText('Nenhuma tarefa');
      expect(emptyMessages).toHaveLength(5);
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

    test('não deve quebrar quando onTaskClick não é fornecido', () => {
      render(<Board {...defaultProps} onTaskClick={undefined} />);
      
      expect(() => {
        fireEvent.click(screen.getByText('Task em Todo'));
      }).not.toThrow();
    });
  });

  describe('Drag and Drop', () => {
    test('deve lidar com interações de drag and drop', () => {
      const mockOnTaskMove = vi.fn();
      render(<Board {...defaultProps} onTaskMove={mockOnTaskMove} />);
      
      const task = screen.getByText('Task em Todo').closest('div');
      const doingColumn = screen.getByText('Doing').closest('div');
      
      // Mock do dataTransfer
      const mockDataTransfer = {
        setData: vi.fn(),
        getData: vi.fn().mockReturnValue(JSON.stringify({
          taskId: 'task-1',
          sourceColumn: 'todo'
        }))
      };
      
      // Simula drag start
      fireEvent.dragStart(task!, {
        dataTransfer: mockDataTransfer
      });
      
      // Simula drop na coluna doing
      fireEvent.dragOver(doingColumn!);
      fireEvent.drop(doingColumn!, {
        dataTransfer: mockDataTransfer
      });
      
      expect(mockOnTaskMove).toHaveBeenCalledWith('task-1', 'doing');
    });

    test('não deve quebrar quando onTaskMove não é fornecido', () => {
      render(<Board {...defaultProps} onTaskMove={undefined} />);
      
      const task = screen.getByText('Task em Todo').closest('div');
      const doingColumn = screen.getByText('Doing').closest('div');
      
      expect(() => {
        fireEvent.dragStart(task!);
        fireEvent.dragOver(doingColumn!);
        fireEvent.drop(doingColumn!);
      }).not.toThrow();
    });
  });

  describe('Colunas Customizadas', () => {
    test('deve renderizar com configuração de colunas customizadas', () => {
      const customColumns = [
        { id: 'todo' as const, title: 'Para Fazer' },
        { id: 'doing' as const, title: 'Em Progresso' },
        { id: 'done' as const, title: 'Finalizado' }
      ];
      
      render(<Board {...defaultProps} columns={customColumns} />);
      
      expect(screen.getByText('Para Fazer')).toBeInTheDocument();
      expect(screen.getByText('Em Progresso')).toBeInTheDocument();
      expect(screen.getByText('Finalizado')).toBeInTheDocument();
      
      // Não deve mostrar colunas padrão
      expect(screen.queryByText('Refinamento')).not.toBeInTheDocument();
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
  });

  describe('Distribuição de Tasks', () => {
    test('deve distribuir tasks corretamente entre as colunas', () => {
      const tasksVariadas: Task[] = [
        { ...mockTasks[0], column: 'refinamento' },
        { ...mockTasks[1], column: 'refinamento' },
        { ...mockTasks[2], column: 'test' }
      ];
      
      render(<Board {...defaultProps} tasks={tasksVariadas} />);
      
      const refinamentoSection = screen.getByText('Refinamento').closest('div');
      const testSection = screen.getByText('Test').closest('div');
      const todoSection = screen.getByText('To Do').closest('div');
      
      expect(refinamentoSection).toHaveTextContent('2');
      expect(testSection).toHaveTextContent('1');
      expect(todoSection).toHaveTextContent('0');
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

    test('deve lidar com tasks sem propriedades obrigatórias', () => {
      const taskIncompleta = [
        {
          id: 'task-incomplete',
          // Faltam outras propriedades
        } as any
      ];
      
      expect(() => {
        render(<Board {...defaultProps} tasks={taskIncompleta} />);
      }).not.toThrow();
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter estrutura ARIA adequada', () => {
      render(<Board {...defaultProps} />);
      
      const title = screen.getByText('Kanban Board');
      expect(title.tagName).toBe('H1');
    });

    test('tasks devem ser clicáveis e arrastáveis para usuários de teclado', () => {
      render(<Board {...defaultProps} />);
      
      const task = screen.getByText('Task em Todo');
      const taskCard = task.closest('div');
      
      expect(taskCard).toHaveAttribute('draggable', 'true');
    });
  });

  describe('Performance', () => {
    test('deve renderizar muitas tasks sem problemas', () => {
      const manyTasks: Task[] = Array.from({ length: 100 }, (_, index) => ({
        id: `task-${index}`,
        title: `Task ${index}`,
        description: `Descrição ${index}`,
        size: 'M' as const,
        column: ['todo', 'doing', 'done'][index % 3] as any,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      expect(() => {
        render(<Board {...defaultProps} tasks={manyTasks} />);
      }).not.toThrow();
      
      // Verifica se pelo menos algumas tasks foram renderizadas
      expect(screen.getByText('Task 0')).toBeInTheDocument();
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });
  });
});