import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../Footer';

describe('Footer component that renders a copyright text on the left and optional children on the right side', () => {
    it('should render correctly with TK copyright', () => {
        const view = render(<Footer year={2019}>This is a placeholder for children</Footer>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
    it('should render correctly with custom copyright', () => {
        const view = render(
            <Footer copyright="my special copyright">This is a placeholder for children</Footer>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByText('my special copyright')).toBeInTheDocument();
    });
});
