import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectAllSuggestions } from '../SelectAllSuggestions';

describe('SelectAllSuggestions', () => {
    it('should render correctly', () => {
        const view = render(
            <SelectAllSuggestions value="select_all" onChange={jest.fn()}>
                Select all
            </SelectAllSuggestions>
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should call onChange callback correctly with keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const value = 'select_all';
        render(
            <SelectAllSuggestions value={value} onChange={handleChange}>
                Select all
            </SelectAllSuggestions>
        );

        await user.keyboard('[Tab]');
        await user.keyboard(' ');

        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), value);
    });

    it('should call onChange callback correctly with value when checkbox is clicked', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const value = 'select_all';
        render(
            <SelectAllSuggestions value={value} onChange={handleChange}>
                Select all
            </SelectAllSuggestions>
        );

        await user.click(screen.getByRole('checkbox'));

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), value);
    });
});
