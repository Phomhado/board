import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import TaskCard from './components/TaskCard';

function App() {
  // Exemplo usando os tipos corretos
  const sampleTask = {
    id: 'task-1',
    title: 'Implementar autenticação de usuário',
    size: 'G' as const
  };

  const handleTaskClick = (id: string) => {
    console.log('Task clicked:', id);
  };

  const handleTaskDragStart = (e: React.DragEvent, id: string) => {
    console.log('Task drag started:', id);
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ padding: '20px' }}>
        <h1>Kanban Todo App</h1>
        <TaskCard 
          {...sampleTask}
          onClick={handleTaskClick}
          onDragStart={handleTaskDragStart}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;