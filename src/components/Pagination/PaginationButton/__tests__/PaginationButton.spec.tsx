import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationButton } from '../PaginationButton';

describe('<PaginationButton> that renders a page button', () => {
    it('should render correctly with default props', () => {
        const view = render(<PaginationButton data-page={1}>{1}</PaginationButton>);
        const button = screen.getByRole('button');

        expect(view.container).toMatchSnapshot();
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveAttribute('aria-current');
    });

    it('should add correct classes for active state', () => {
        const view = render(
            <PaginationButton data-page={1} isActive>
                {1}
            </PaginationButton>
        );
        const button = screen.getByRole('button');

        expect(view.container).toMatchSnapshot();
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-current');
    });
});
