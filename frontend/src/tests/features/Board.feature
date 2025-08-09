Feature: Board component layout

  Scenario: Rendering Board with children
    Given a Board component
    When the Board is rendered with test children
    Then it should display the children inside a grid container
