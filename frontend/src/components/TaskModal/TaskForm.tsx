import { TASK_SIZES_ORDERED, getTaskSizeDescription } from '../../utils/taskSizeUtils';
import { COLUMN_OPTIONS } from './constants';
import { TaskFormProps } from './types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  ReadOnlyField
} from './styles';

export default function TaskForm({
  formData,
  isReadOnly,
  loading,
  onInputChange,
  onSubmit,
  task
}: TaskFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="title">Título *</Label>
        {isReadOnly ? (
          <ReadOnlyField>{formData.title}</ReadOnlyField>
        ) : (
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={onInputChange('title')}
            placeholder="Digite o título da tarefa"
            required
            disabled={loading}
          />
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Descrição</Label>
        {isReadOnly ? (
          <ReadOnlyField>
            {formData.description || 'Nenhuma descrição fornecida'}
          </ReadOnlyField>
        ) : (
          <TextArea
            id="description"
            value={formData.description}
            onChange={onInputChange('description')}
            placeholder="Digite a descrição da tarefa (opcional)"
            disabled={loading}
          />
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="size">Tamanho</Label>
        {isReadOnly ? (
          <ReadOnlyField>
            {formData.size} - {getTaskSizeDescription(formData.size)}
          </ReadOnlyField>
        ) : (
          <Select
            id="size"
            value={formData.size}
            onChange={onInputChange('size')}
            disabled={loading}
          >
            {TASK_SIZES_ORDERED.map(size => (
              <option key={size} value={size}>
                {size} - {getTaskSizeDescription(size)}
              </option>
            ))}
          </Select>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="column">Coluna</Label>
        {isReadOnly ? (
          <ReadOnlyField>
            {COLUMN_OPTIONS.find(col => col.value === formData.column)?.label}
          </ReadOnlyField>
        ) : (
          <Select
            id="column"
            value={formData.column}
            onChange={onInputChange('column')}
            disabled={loading}
          >
            {COLUMN_OPTIONS.map(column => (
              <option key={column.value} value={column.value}>
                {column.label}
              </option>
            ))}
          </Select>
        )}
      </FormGroup>

      {task && isReadOnly && (
        <>
          <FormGroup>
            <Label>Criado em</Label>
            <ReadOnlyField>
              {new Date(task.createdAt).toLocaleString('pt-BR')}
            </ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>Última atualização</Label>
            <ReadOnlyField>
              {new Date(task.updatedAt).toLocaleString('pt-BR')}
            </ReadOnlyField>
          </FormGroup>
        </>
      )}
    </Form>
  );
}