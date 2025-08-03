import { api } from './api';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/tasks';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export class TaskApiService {
  private static readonly BASE_PATH = '/tasks';

  static async getAllTasks(): Promise<Task[]> {
    try {
      const response = await api.get<ApiResponse<Task[]>>(this.BASE_PATH);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Falha ao carregar tasks');
    }
  }

  static async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<ApiResponse<Task>>(`${this.BASE_PATH}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Falha ao carregar task');
    }
  }

  static async createTask(taskData: CreateTaskDTO): Promise<Task> {
    try {
      const response = await api.post<ApiResponse<Task>>(this.BASE_PATH, taskData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Falha ao criar task');
    }
  }

  static async updateTask(id: string, taskData: UpdateTaskDTO): Promise<Task> {
    try {
      const response = await api.put<ApiResponse<Task>>(`${this.BASE_PATH}/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Falha ao atualizar task');
    }
  }


  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`${this.BASE_PATH}/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Falha ao deletar task');
    }
  }

  
  static async moveTask(id: string, targetColumn: string): Promise<Task> {
    try {
      const response = await api.put<ApiResponse<Task>>(`${this.BASE_PATH}/${id}/move`, {
        column: targetColumn
      });
      return response.data.data;
    } catch (error) {
      console.error('Error moving task:', error);
      throw new Error('Falha ao mover task');
    }
  }
}