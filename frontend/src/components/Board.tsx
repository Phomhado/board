import { ReactNode } from 'react'
import styled from 'styled-components'

type BoardProps = {
  children: ReactNode
  'data-testid'?: string
}

const BoardContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

export function Board({ children, 'data-testid': dataTestId = 'board-container' }: BoardProps) {
  return <BoardContainer data-testid={dataTestId}>{children}</BoardContainer>
}
