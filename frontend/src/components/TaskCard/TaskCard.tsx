import { getTaskSizeDescription } from '../../utils/taskSizeUtils';
import { TaskCardProps } from './types';
import { useTaskCardHandlers } from './hooks';
import { Card, CardHeader, Title, SizeBadge } from './styles';

export default function TaskCard({
  id, 
  title, 
  size, 
  onClick, 
  onDragStart 
}: TaskCardProps) {
  const { handleClick, handleDragStart } = useTaskCardHandlers(
    id,
    onClick,
    onDragStart
  );

  return (
    <Card 
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      title={getTaskSizeDescription(size)} // Tooltip com descrição do tamanho
    >
      <CardHeader>
        <Title>{title}</Title>
        <SizeBadge size={size}>{size}</SizeBadge>
      </CardHeader>
    </Card>
  );
}