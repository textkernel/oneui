import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SuggestionTag } from '../SuggestionTag';

describe('SuggestionTag', () => {
    it('should render nothing if no children are provided', () => {
        const view = render(<SuggestionTag />);

        expect(view.container).toMatchSnapshot();
    });

    it('should render if children is 0', () => {
        const view = render(<SuggestionTag>{0}</SuggestionTag>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should render correctly', () => {
        const view = render(<SuggestionTag>tag</SuggestionTag>);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render correctly with styles modifier', () => {
        const view = render(<SuggestionTag width="block">tag</SuggestionTag>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByText('tag')).toBeInTheDocument();
    });

    it('should add delete button if onClick is defined', () => {
        const onClickMock = jest.fn();
        render(<SuggestionTag onClick={onClickMock}>tag</SuggestionTag>);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('tag')).toBeInTheDocument();
    });

    it('should call onClick callback correctly', async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();
        render(<SuggestionTag onClick={onClickMock}>tag</SuggestionTag>);

        await user.click(screen.getByRole('button'));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
