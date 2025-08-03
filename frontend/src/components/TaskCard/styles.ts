import styled from 'styled-components';
import { getTaskSizeColor } from '../../utils/taskSizeUtils';
import { TaskSize } from '../../types/tasks';

export const Card = styled.div`
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

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

export const SizeBadge = styled.span<{ size: TaskSize }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  background-color: ${({ size, theme }) => getTaskSizeColor(size, theme)};
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;