import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationButton } from '../PaginationButton';

let view: RenderResult;
describe('<PaginationButton> that renders a page button', () => {
    beforeEach(() => {
        view = render(<PaginationButton data-page={1}>{1}</PaginationButton>);
    });

    it('should render correctly with default props', () => {
        const button = screen.getByRole('button');

        expect(view.container).toMatchSnapshot();
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveAttribute('aria-current');
    });

    it('should add correct classes for active state', () => {
        view.rerender(
            <PaginationButton data-page={1} isActive>
                {1}
            </PaginationButton>
        );
        const button = screen.getByRole('button', { hidden: false });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-current');
    });
});
