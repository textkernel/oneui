import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaPlus } from 'react-icons/fa';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
    it('should render icon button correctly', () => {
        const view = render(
            <IconButton>
                <FaPlus aria-label="plus" />
            </IconButton>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByLabelText('plus')).toBeInTheDocument();
    });

    it('should add classes when props are changed', () => {
        const view = render(
            <IconButton size="large">
                <FaPlus aria-label="plus" />
            </IconButton>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass('IconButton--size_large');
        expect(view.container).toMatchSnapshot();
    });

    it('should call click callback correctly', async () => {
        const onClickMock = jest.fn();
        const user = userEvent.setup();

        render(
            <IconButton onClick={onClickMock}>
                <FaPlus aria-label="plus" />
            </IconButton>
        );

        await user.click(screen.getByLabelText('plus'));

        expect(onClickMock).toHaveBeenCalled();
    });
});
