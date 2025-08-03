import { useState } from 'react';
import { TaskModalProps } from './types';
import { getModalTitle } from './constants';
import { useTaskForm } from './useTaskForm';
import TaskForm from './TaskForm';
import ModalActions from './ModalActions';
import DeleteConfirmationComponent from './DeleteConfirmation';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton
} from './styles';

export default function TaskModal({
  task,
  mode,
  isOpen,
  onClose,
  onSave,
  onDelete,
  loading = false
}: TaskModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { formData, handleInputChange, handleSubmit } = useTaskForm({
    task,
    mode,
    isOpen,
    onSave,
    onClose
  });

  const handleDelete = async () => {
    if (!task || !onDelete) return;
    
    try {
      await onDelete(task.id);
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShowDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{getModalTitle(mode)}</ModalTitle>
          <CloseButton onClick={onClose} type="button">
            ×
          </CloseButton>
        </ModalHeader>

        <TaskForm
          formData={formData}
          isReadOnly={isReadOnly}
          loading={loading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          task={task}
        />

        <ModalActions
          mode={mode}
          loading={loading}
          hasTitle={!!formData.title.trim()}
          showDeleteConfirm={showDeleteConfirm}
          onClose={onClose}
          onDelete={onDelete ? handleShowDeleteConfirm : undefined}
          onSubmit={handleSubmit}
        />

        <DeleteConfirmationComponent
          show={showDeleteConfirm}
          loading={loading}
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      </ModalContent>
    </ModalOverlay>
  );
}