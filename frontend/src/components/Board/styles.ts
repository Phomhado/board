import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  overflow-x: auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BoardTitle = styled.h1`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(3)};
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
`;