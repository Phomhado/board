import styled from 'styled-components';
import { getTaskSizeColor, getTaskSizeDescription } from '../utils/taskSizeUtils';
import { TaskCardData, TaskSize } from '../types/tasks';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  transition: box-shadow 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const SizeBadge = styled.span<{ size: TaskSize }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  background-color: ${({ size, theme }) => getTaskSizeColor(size, theme)};
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;

interface TaskCardProps extends TaskCardData {
  onClick?: (id: string) => void;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

export default function TaskCard({
  id, 
  title, 
  size, 
  onClick, 
  onDragStart 
}: TaskCardProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e, id);
  };

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