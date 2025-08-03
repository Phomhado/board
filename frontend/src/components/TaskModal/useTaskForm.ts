import { useState, useEffect } from 'react';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../types/tasks';
import { TaskFormData, ModalMode } from './types';

interface UseTaskFormProps {
  task?: Task;
  mode: ModalMode;
  isOpen: boolean;
  onSave: (taskData: CreateTaskDTO | UpdateTaskDTO) => Promise<void>;
  onClose: () => void;
}

export function useTaskForm({ task, mode, isOpen, onSave, onClose }: UseTaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    size: 'M',
    column: 'todo'
  });

  useEffect(() => {
    if (task && (mode === 'view' || mode === 'edit')) {
      setFormData({
        title: task.title,
        description: task.description || '',
        size: task.size,
        column: task.column
      });
    } else if (mode === 'create') {
      setFormData({
        title: '',
        description: '',
        size: 'M',
        column: 'todo'
      });
    }
  }, [task, mode, isOpen]);

  const handleInputChange = (field: keyof TaskFormData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!formData.title.trim()) {
      alert('Título é obrigatório');
      return;
    }

    console.log('Saving task with data:', formData); // Debug log

    try {
      await onSave({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        size: formData.size,
        column: formData.column
      });
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
}