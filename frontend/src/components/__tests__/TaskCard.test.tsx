import { render, screen, fireEvent } from '../test-utils';
import TaskCard from '../TaskCard';

describe('TaskCard', () => {
  test('renders task card with title', () => {
    render(<TaskCard title="Test Task" />);
    
    const taskCard = screen.getByText('Test Task');
    expect(taskCard).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<TaskCard title="Test Task" onClick={mockOnClick} />);
    
    const taskCard = screen.getByText('Test Task');
    fireEvent.click(taskCard);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});