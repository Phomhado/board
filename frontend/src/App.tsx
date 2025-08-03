import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import Board from './components/Board';
import { useTasks } from './hooks/useTasks';
import { ColumnType } from './types/tasks';

const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.2rem',
    color: theme.colors.primary
  }}>
    Carregando tasks...
  </div>
);

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gap: '16px'
  }}>
    <p style={{ color: theme.colors.danger, fontSize: '1.1rem' }}>
      ❌ {message}
    </p>
    <button
      onClick={onRetry}
      style={{
        padding: '8px 16px',
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: theme.borderRadius,
        cursor: 'pointer'
      }}
    >
      Tentar novamente
    </button>
  </div>
);

function App() {
  const { 
    tasks, 
    loading, 
    error, 
    moveTask, 
    refreshTasks 
  } = useTasks();

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
  };

  const handleTaskMove = async (taskId: string, targetColumn: ColumnType) => {
    try {
      await moveTask(taskId, targetColumn);
      console.log(`Task ${taskId} moved to ${targetColumn}`);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorMessage message={error} onRetry={refreshTasks} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Board
        title="IgmaBoard - Kanban"
        tasks={tasks}
        onTaskClick={handleTaskClick}
        onTaskMove={handleTaskMove}
      />
    </ThemeProvider>
  );
}

export default App;