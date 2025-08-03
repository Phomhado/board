import { ModalActionsProps } from './types';
import { ButtonGroup, Button } from './styles';

export default function ModalActions({
  mode,
  loading,
  hasTitle,
  showDeleteConfirm,
  onClose,
  onDelete,
  onSubmit
}: ModalActionsProps) {
  if (showDeleteConfirm) return null;

  if (mode === 'view') {
    return (
      <ButtonGroup>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose}
        >
          Fechar
        </Button>
        {onDelete && (
          <Button 
            type="button" 
            variant="danger"
            onClick={onDelete}
          >
            Deletar
          </Button>
        )}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <Button 
        type="button" 
        variant="secondary" 
        onClick={onClose}
        disabled={loading}
      >
        Cancelar
      </Button>
      <Button 
        type="button"
        onClick={onSubmit}
        disabled={loading || !hasTitle}
      >
        {loading ? 'Salvando...' : (mode === 'create' ? 'Criar' : 'Salvar')}
      </Button>
    </ButtonGroup>
  );
}