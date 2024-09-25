import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelectItem } from '../MultiSelectItem';

describe('MultiSelectItem', () => {
    it('should render correctly', () => {
        const view = render(
            <MultiSelectItem value="select_all" onChange={jest.fn()}>
                Select all
            </MultiSelectItem>
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should call onChange callback correctly with keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const value = 'select_all';
        render(
            <MultiSelectItem value={value} onChange={handleChange}>
                Select all
            </MultiSelectItem>
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
            <MultiSelectItem value={value} onChange={handleChange}>
                Select all
            </MultiSelectItem>
        );

        await user.click(screen.getByRole('checkbox'));

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), value);
    });

    it('should call onChange callback correctly with keyboard interaction on <li>', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const value = 'select_all';
        render(
            <MultiSelectItem value={value} onChange={handleChange}>
                Select all
            </MultiSelectItem>
        );

        await user.type(screen.getByRole('option'), ' ');

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), value);
    });

    it('should call onChange callback correctly with keyboard interaction on <input>', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const value = 'select_all';
        render(
            <MultiSelectItem value={value} onChange={handleChange}>
                Select all
            </MultiSelectItem>
        );

        await user.type(screen.getByRole('checkbox'), ' ');

        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), value);
    });
});
