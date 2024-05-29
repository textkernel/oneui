import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Callout } from '../Callout';

describe('Callout', () => {
    it('should render nothing if no children are provided', () => {
        const view = render(<Callout>{}</Callout>);
        expect(view.container).toBeEmptyDOMElement();
    });
    it('should render children when it is 0', () => {
        const { container } = render(<Callout>{0}</Callout>);

        expect(container).not.toBeEmptyDOMElement();
    });
    it('should render correctly', () => {
        const view = render(<Callout>some text</Callout>);

        expect(view.container).toMatchSnapshot();
    });

    it('should apply correctly cautious context', () => {
        const view = render(<Callout context="cautious">some text</Callout>);

        expect(view.container.firstChild).toHaveClass('Callout--context_cautious');
    });

    it('should apply correctly critical context', () => {
        const view = render(<Callout context="critical">some text</Callout>);

        expect(view.container.firstChild).toHaveClass('Callout--context_critical');
    });

    it('should call onRequestClose', async () => {
        const mockOnClick = jest.fn();
        const user = userEvent.setup();
        render(<Callout onRequestClose={mockOnClick}>some text</Callout>);

        await user.click(screen.getByRole('button'));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
