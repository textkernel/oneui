import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Callout } from '../Callout';

describe('Callout', () => {
    it('should render correctly', () => {
        const view = render(<Callout>some text</Callout>);

        expect(view.container).toMatchSnapshot();
    });

    it('should apply correctly warning context', () => {
        const view = render(<Callout context="warning">some text</Callout>);

        expect(view.container.firstChild).toHaveClass('Callout--context_warning');
    });

    it('should apply correctly danger context', () => {
        const view = render(<Callout context="danger">some text</Callout>);

        expect(view.container.firstChild).toHaveClass('Callout--context_danger');
    });

    it('should call onRequestClose', async () => {
        const mockOnClick = jest.fn();
        const user = userEvent.setup();
        render(<Callout onRequestClose={mockOnClick}>some text</Callout>);

        await user.click(screen.getByRole('button'));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
