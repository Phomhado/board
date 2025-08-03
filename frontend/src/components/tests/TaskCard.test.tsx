import { render, screen, fireEvent } from '../test-utils';
import TaskCard from '../TaskCard';
import { TASK_SIZES_ORDERED } from '../../utils/taskSizeUtils';
import { TaskSize } from '../../types/tasks';

describe('TaskCard', () => {
  const defaultProps = {
    id: 'task-1',
    title: 'Test Task',
    size: 'M' as TaskSize ,
    onClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders task card with title and size', () => {
      render(<TaskCard {...defaultProps} />);
      
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    test('renders all different sizes correctly', () => {
      TASK_SIZES_ORDERED.forEach(size => {
        const { rerender } = render(
          <TaskCard {...defaultProps} size={size} title={`Task ${size}`} />
        );
        
        expect(screen.getByText(size)).toBeInTheDocument();
        expect(screen.getByText(`Task ${size}`)).toBeInTheDocument();
        
        // Clean up for next iteration
        rerender(<div />);
      });
    });

    test('applies draggable attribute', () => {
      render(<TaskCard {...defaultProps} />);
      
      const card = screen.getByText('Test Task').parentElement;
      expect(card).toHaveAttribute('draggable', 'true');
    });

    test('includes size description in title attribute for tooltip', () => {
      render(<TaskCard {...defaultProps} size="P" />);
      
      const card = screen.getByText('Test Task').parentElement;
      expect(card).toHaveAttribute('title', 'Pequeno - Até 2 horas');
    });
  });

  describe('Click interactions', () => {
    test('calls onClick with correct id when clicked', () => {
      const mockOnClick = jest.fn();
      render(<TaskCard {...defaultProps} onClick={mockOnClick} />);
      
      fireEvent.click(screen.getByText('Test Task'));
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith('task-1');
    });

    test('does not crash when onClick is not provided', () => {
      render(<TaskCard {...defaultProps} onClick={undefined} />);
      
      expect(() => {
        fireEvent.click(screen.getByText('Test Task'));
      }).not.toThrow();
    });
  });

  describe('Drag and Drop', () => {
    test('calls onDragStart with correct parameters when drag starts', () => {
      const mockOnDragStart = jest.fn();
      render(<TaskCard {...defaultProps} onDragStart={mockOnDragStart} />);
      
      const card = screen.getByText('Test Task').parentElement;
      fireEvent.dragStart(card!);
      
      expect(mockOnDragStart).toHaveBeenCalledTimes(1);
      expect(mockOnDragStart).toHaveBeenCalledWith(
        expect.any(Object), // DragEvent
        'task-1'
      );
    });

    test('does not crash when onDragStart is not provided', () => {
      render(<TaskCard {...defaultProps} onDragStart={undefined} />);
      
      const card = screen.getByText('Test Task').parentElement;
      
      expect(() => {
        fireEvent.dragStart(card!);
      }).not.toThrow();
    });
  });

  describe('Size badge styling', () => {
    test('size badge has correct text content for each size', () => {
      const sizes = ['P', 'M', 'G', 'GG', 'EXGG'] as const;
      
      sizes.forEach(size => {
        render(<TaskCard {...defaultProps} size={size} />);
        const badge = screen.getByText(size);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveTextContent(size);
      });
    });

    test('size badge is properly positioned in header', () => {
      render(<TaskCard {...defaultProps} />);
      
      const title = screen.getByText('Test Task');
      const badge = screen.getByText('M');
      
      // Both should be in the same container (header)
      expect(title.parentElement).toContain(badge);
    });
  });

  describe('Accessibility', () => {
    test('card has draggable attribute for interaction', () => {
      render(<TaskCard {...defaultProps} />);
      
      const card = screen.getByText('Test Task').parentElement;
      expect(card).toHaveAttribute('draggable', 'true');
    });

    test('card is keyboard accessible through draggable attribute', () => {
      render(<TaskCard {...defaultProps} />);
      
      const card = screen.getByText('Test Task').parentElement;
      expect(card).toHaveAttribute('draggable');
    });
  });

  describe('Edge cases', () => {
    test('handles very long titles gracefully', () => {
      const longTitle = 'This is a very long task title that might cause layout issues if not handled properly';
      render(<TaskCard {...defaultProps} title={longTitle} />);
      
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    test('handles empty title', () => {
      render(<TaskCard {...defaultProps} title="" />);
      
      // Should still render the size badge
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    test('handles special characters in title', () => {
      const specialTitle = 'Task with émojis 🚀 and spëcial chars!';
      render(<TaskCard {...defaultProps} title={specialTitle} />);
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });
  });
});