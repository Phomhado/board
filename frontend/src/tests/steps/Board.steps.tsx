import { loadFeature, defineFeature } from 'jest-cucumber'
import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { Board } from '@/components/Board'

const feature = loadFeature('src/tests/features/board.feature')

type StepFns = {
  given: (stepTitle: string, fn: () => void) => void
  when:  (stepTitle: string, fn: () => void) => void
  then:  (stepTitle: string, fn: () => void) => void
}

type TestFn = (
  scenarioTitle: string,
  impl: (steps: StepFns) => void
) => void

defineFeature(feature, (test: TestFn) => {
  test('Rendering Board with children', ({ given, when, then }: StepFns) => {
    let rendered: RenderResult

    given('a Board component', () => {
      
    })

    when('the Board is rendered with test children', () => {
      rendered = render(
        <ThemeProvider theme={theme}>
          <Board>
            <div data-testid="child">child content</div>
          </Board>
        </ThemeProvider>
      )
    })

    then('it should display the children inside a grid container', () => {
      const { getByTestId } = rendered!
      const board = getByTestId('board-container')
      expect(board).toHaveStyle('display: grid')
      expect(getByTestId('child')).toBeInTheDocument()
    })
  })
})
