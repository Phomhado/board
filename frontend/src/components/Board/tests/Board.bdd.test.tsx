import { render, screen } from '../../test-utils';
import Board from '../Board';
import { BoardColumn } from '../types';

const DEFAULT_COLUMNS: BoardColumn[] = [
  { id: 'refinamento', title: 'Refinamento' },
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'Doing' },
  { id: 'test', title: 'Test' },
  { id: 'done', title: 'Done' }
];

describe('Feature: Display the Kanban Board', () => {
  describe('Scenario: Render title and all columns correctly', () => {
    beforeAll(() => {
      render(<Board title="IgmaBoard - Kanban" tasks={[]} columns={DEFAULT_COLUMNS} />);
    });

    it('Then the title "IgmaBoard - Kanban" should be displayed', () => {
      expect(screen.getByText((content) => content.includes('IgmaBoard'))).toBeInTheDocument();
    });

    it('And all columns should be displayed', () => {
      DEFAULT_COLUMNS.forEach(col => {
        expect(screen.getByText((content) => content.includes(col.title))).toBeInTheDocument();
      });
    });
  });
});
