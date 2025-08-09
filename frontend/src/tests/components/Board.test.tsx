import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { Board } from '@/components/Board'

describe('Board', () => {
  it('renders children and applies grid layout', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Board>
          <div>Teste</div>
        </Board>
      </ThemeProvider>
    )
    const board = getByTestId('board-container')
    expect(board).toBeInTheDocument()
    expect(board).toHaveTextContent('Teste')
    expect(board).toHaveStyleRule('display', 'grid')
  })
})
