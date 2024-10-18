import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MultiSelectItem } from '../MultiSelectItem';
import { DropdownContent, DropdownRoot, DropdownTrigger } from '../../..';

describe('MultiSelectItem', () => {
    it('should render correctly', async () => {
        const user = userEvent.setup();
        const mockOnCheckedChange = jest.fn();

        const { container } = render(
            <DropdownRoot>
                <DropdownTrigger>
                    <button>Click here</button>
                </DropdownTrigger>
                <DropdownContent>
                    <MultiSelectItem onCheckedChange={mockOnCheckedChange}>
                        Item with checkbox
                    </MultiSelectItem>
                </DropdownContent>
            </DropdownRoot>
        );

        await user.click(screen.getByRole('button', { name: 'Click here' }));
        await user.click(screen.getByText('Item with checkbox'));

        expect(mockOnCheckedChange).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
});
