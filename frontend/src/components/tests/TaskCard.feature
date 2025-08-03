Feature: Task Card display and interaction

  Scenario: Rendering a task card with title and size
    Given a task card with the title "Sample Task" and size "M"
    When the task card is rendered
    Then the title "Sample Task" should be visible
    And the size badge "M" should be visible

  Scenario Outline: Displaying different task sizes with correct colors
    Given a task card with the title "Test Task" and size "<size>"
    When the task card is rendered
    Then the size badge should display "<size>"
    And the badge should have the correct color for size "<size>"

    Examples:
      | size |
      | P    |
      | M    |
      | G    |
      | GG   |
      | EXGG |

  Scenario: Clicking on the task card
    Given a task card with id "task-1", title "Clickable Task" and size "G"
    And a click handler is provided
    When the task card is clicked
    Then the click handler should be called with id "task-1"

  Scenario: Task card is draggable
    Given a task card with id "task-1", title "Draggable Task" and size "P"
    When the task card is rendered
    Then the task card should have draggable attribute set to true

  Scenario: Drag start event
    Given a task card with id "task-1", title "Drag Task" and size "M"
    And a drag start handler is provided
    When the user starts dragging the task card
    Then the drag start handler should be called with the task id "task-1"

  Scenario: Task card structure and styling
    Given a task card with the title "Styled Task" and size "GG"
    When the task card is rendered
    Then the card should have proper styling
    And the header should contain both title and size badge
    And the card should be hoverable