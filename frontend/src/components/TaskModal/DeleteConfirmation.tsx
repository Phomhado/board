import { DeleteConfirmationProps } from './types';
import { DeleteConfirmation, ButtonGroup, Button } from './styles';

export default function DeleteConfirmationComponent({
  show,
  loading,
  onConfirm,
  onCancel
}: DeleteConfirmationProps) {
  if (!show) return null;

  return (
    <DeleteConfirmation>
      <p>⚠️ Tem certeza que deseja deletar esta tarefa?</p>
      <p>Esta ação não pode ser desfeita.</p>
      <ButtonGroup>
        <Button 
          type="button" 
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          type="button" 
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Deletando...' : 'Confirmar Exclusão'}
        </Button>
      </ButtonGroup>
    </DeleteConfirmation>
  );
}