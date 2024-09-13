import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuggestionItem } from '../SuggestionItem';

describe('SuggestionItem', () => {
    it('should render correctly', async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();

        const { container } = render(<SuggestionItem onClick={mockOnClick}>Item 1</SuggestionItem>);

        await user.click(screen.getByRole('option', { name: 'Item 1' }));

        expect(mockOnClick).toHaveBeenCalled();
        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should render correctly with checkbox', async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const mockOnChange = jest.fn();

        const { container } = render(
            <SuggestionItem onClick={mockOnClick} onChange={mockOnChange} hasCheckbox>
                Item 1
            </SuggestionItem>
        );

        expect(container).toMatchSnapshot();
        expect(mockOnChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('checkbox'));

        expect(mockOnChange).toHaveBeenCalled();
    });
});
