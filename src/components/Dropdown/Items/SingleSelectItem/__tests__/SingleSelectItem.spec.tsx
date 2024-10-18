import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DropdownContent, DropdownRoot, DropdownTrigger, SingleSelectItem } from '../../..';

describe('SingleSelectItem', () => {
    it('should render correctly', async () => {
        const user = userEvent.setup();
        const mockOnSelect = jest.fn();

        const { container } = render(
            <DropdownRoot>
                <DropdownTrigger>
                    <button>Click here</button>
                </DropdownTrigger>
                <DropdownContent>
                    <SingleSelectItem onSelect={mockOnSelect}>Item</SingleSelectItem>
                </DropdownContent>
            </DropdownRoot>
        );

        await user.click(screen.getByRole('button', { name: 'Click here' }));
        await user.click(screen.getByText('Item'));

        expect(mockOnSelect).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
});
