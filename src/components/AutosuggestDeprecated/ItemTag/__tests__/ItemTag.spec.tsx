import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ItemTag } from '../ItemTag';

describe('ItemTag', () => {
    let view: RenderResult;

    it('should render correctly', () => {
        view = render(<ItemTag>tag</ItemTag>);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should add delete button if onClick is defined', () => {
        const onClickMock = jest.fn();
        view = render(<ItemTag onClick={onClickMock}>tag</ItemTag>);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call onClick callback correctly', async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();
        view = render(<ItemTag onClick={onClickMock}>tag</ItemTag>);

        await user.click(screen.getByRole('button'));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
