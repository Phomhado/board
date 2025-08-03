import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import TaskModal from './components/TaskModal';
import { useTasks } from './hooks/useTasks';
import { ColumnType, Task, CreateTaskDTO, UpdateTaskDTO } from './types/tasks';
import { Board } from './components';

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

type ModalState = {
  isOpen: boolean;
  mode: 'view' | 'edit' | 'create';
  task?: Task;
};

function App() {
  const { 
    tasks, 
    loading, 
    error, 
    createTask,
    updateTask,
    deleteTask,
    moveTask, 
    refreshTasks 
  } = useTasks();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'view'
  });
  const [modalLoading, setModalLoading] = useState(false);

  const openModal = (mode: 'view' | 'edit' | 'create', task?: Task) => {
    setModalState({
      isOpen: true,
      mode,
      task
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view'
    });
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      openModal('view', task);
    }
  };

  const handleTaskMove = async (taskId: string, targetColumn: ColumnType) => {
    try {
      await moveTask(taskId, targetColumn);
      console.log(`Task ${taskId} moved to ${targetColumn}`);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  const handleCreateTask = () => {
    openModal('create');
  };



  const handleModalSave = async (taskData: CreateTaskDTO | UpdateTaskDTO) => {
    try {
      setModalLoading(true);
      
      console.log('Modal save called with mode:', modalState.mode); // Debug log
      console.log('Task data:', taskData); // Debug log
      
      if (modalState.mode === 'create') {
        await createTask(taskData as CreateTaskDTO);
        console.log('Task created successfully'); // Debug log
      } else if (modalState.mode === 'edit' && modalState.task) {
        console.log('Updating task:', modalState.task.id); // Debug log
        await updateTask(modalState.task.id, taskData as UpdateTaskDTO);
        console.log('Task updated successfully'); // Debug log
      }
    } catch (error) {
      console.error('Error saving task:', error);
      throw error; // Re-throw para o modal lidar com o erro
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalDelete = async (taskId: string) => {
    try {
      setModalLoading(true);
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    } finally {
      setModalLoading(false);
    }
  };

  // Função para alternar entre visualizar e editar no modal
  const toggleEditMode = () => {
    if (modalState.mode === 'view' && modalState.task) {
      setModalState(prev => ({
        ...prev,
        mode: 'edit'
      }));
    } else if (modalState.mode === 'edit') {
      setModalState(prev => ({
        ...prev,
        mode: 'view'
      }));
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
      
      {/* Botão para criar nova task */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 100
      }}>
        <button
          onClick={handleCreateTask}
          style={{
            padding: '12px 24px',
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            boxShadow: theme.shadows.base,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.secondary;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primary;
          }}
        >
          + Nova Tarefa
        </button>
      </div>

      <Board
        title="IgmaBoard - Kanban"
        tasks={tasks}
        onTaskClick={handleTaskClick}
        onTaskMove={handleTaskMove}
      />

      {/* Modal de Task */}
      <TaskModal
        task={modalState.task}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
        loading={modalLoading}
      />

      {/* Botão de editar quando estiver visualizando */}
      {modalState.isOpen && modalState.mode === 'view' && modalState.task && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1001
        }}>
          <button
            onClick={toggleEditMode}
            style={{
              padding: '12px 24px',
              backgroundColor: theme.colors.igmaYellow,
              color: theme.colors.text,
              border: 'none',
              borderRadius: theme.borderRadius,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: theme.shadows.base
            }}
          >
            ✏️ Editar
          </button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;