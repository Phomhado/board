import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskDTO, UpdateTaskDTO, ColumnType } from '../types/tasks';
import { TaskApiService } from '../services/taskApi';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (taskData: CreateTaskDTO) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, targetColumn: ColumnType) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await TaskApiService.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData: CreateTaskDTO) => {
    try {
      setError(null);
      const newTask = await TaskApiService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar task');
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, taskData: UpdateTaskDTO) => {
    try {
      setError(null);
      const updatedTask = await TaskApiService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar task');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null);
      await TaskApiService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar task');
      throw err;
    }
  }, []);

  const moveTask = useCallback(async (taskId: string, targetColumn: ColumnType) => {
    try {
      setError(null);
      
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, column: targetColumn } : task
      ));

      await TaskApiService.moveTask(taskId, targetColumn);
    } catch (err) {
      await loadTasks();
      setError(err instanceof Error ? err.message : 'Erro ao mover task');
      throw err;
    }
  }, [loadTasks]);

  const refreshTasks = useCallback(async () => {
    await loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    refreshTasks
  };
}