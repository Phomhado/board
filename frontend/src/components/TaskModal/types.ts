import { Task, CreateTaskDTO, UpdateTaskDTO, ColumnType, TaskSize } from '../../types/tasks';

export type ModalMode = 'view' | 'edit' | 'create';

export interface TaskModalProps {
  task?: Task;
  mode: ModalMode;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: CreateTaskDTO | UpdateTaskDTO) => Promise<void>;
  onDelete?: (taskId: string) => Promise<void>;
  loading?: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
  size: TaskSize;
  column: ColumnType;
}

export interface TaskFormProps {
  formData: TaskFormData;
  isReadOnly: boolean;
  loading: boolean;
  onInputChange: (field: keyof TaskFormData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  task?: Task;
}

export interface DeleteConfirmationProps {
  show: boolean;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ModalActionsProps {
  mode: ModalMode;
  loading: boolean;
  hasTitle: boolean;
  showDeleteConfirm: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit?: (e?: React.FormEvent) => void;
}