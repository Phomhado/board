import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '../test-utils';


const feature = loadFeature(__dirname + '/TaskCard.feature');

defineFeature(feature, test => {
  test('Rendering a task card with title', ({ given, when, then }) => {
    given(/^a task card with the title "(.*)"$/, (title: string) => {
      render(<TaskCard title={title} />);
    });

    when('the task card is rendered', () => {
    });

    then(/^the title "(.*)" should be visible$/, (title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('Clicking on the task card', ({ given, and, when, then }) => {
    let mockOnClick: jest.Mock;
    let title: string;

    given(/^a task card with the title "(.*)"$/, (t: string) => {
      title = t;
    });

    and('a click handler is provided', () => {
      mockOnClick = jest.fn();
      render(<TaskCard title={title} onClick={mockOnClick} />);
    });

    when('the task card is clicked', () => {
      fireEvent.click(screen.getByText(title));
    });

    then('the click handler should be called once', () => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
