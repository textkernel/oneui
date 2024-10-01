import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SingleSelectItem } from '../SingleSelectItem';

describe('SingleSelectItem', () => {
    it('should render correctly', async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();

        const { container } = render(
            <SingleSelectItem onClick={mockOnClick}>Item 1</SingleSelectItem>
        );

        await user.click(screen.getByRole('option', { name: 'Item 1' }));

        expect(mockOnClick).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
});
