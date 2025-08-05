Feature: Display the Kanban Board

  Scenario: Renders the title and all columns correctly
    Given the Board component is rendered with the title "My Board"
    When the screen is visible
    Then the title "My Board" should be displayed
    And all columns should be displayed: "Refinement", "To Do", "Doing", "Test", and "Done"
