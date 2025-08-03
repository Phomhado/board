import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.igmaYellow};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

interface TaskCardProps {
  title: string;
  onClick?: () => void;
}

export default function TaskCard({ title, onClick }: TaskCardProps) {
  return <Card onClick={onClick}>{title}</Card>;
}
