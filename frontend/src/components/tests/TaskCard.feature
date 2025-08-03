Feature: Task Card display and interaction

  Scenario: Rendering a task card with title
    Given a task card with the title "Sample Task"
    When the task card is rendered
    Then the title "Sample Task" should be visible

  Scenario: Clicking on the task card
    Given a task card with the title "Clickable Task"
    And a click handler is provided
    When the task card is clicked
    Then the click handler should be called once
