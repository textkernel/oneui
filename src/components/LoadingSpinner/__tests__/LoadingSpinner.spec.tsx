import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSpinner } from '../LoadingSpinner';

describe('<LoadingSpinner> that renders a circular loading spinner', () => {
    let view: RenderResult;

    beforeEach(() => {
        view = render(<LoadingSpinner />);
    });

    it('should render a default spinner correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(view.container).toHaveTextContent('');
    });

    it('should render a spinner with label', () => {
        view.rerender(<LoadingSpinner>Loading...</LoadingSpinner>);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('Loading...');
    });

    it('should add classes when props are changed', () => {
        view.rerender(<LoadingSpinner centerIn="viewport" size={12} hidden />);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('');
        expect(screen.getByRole('status', { hidden: true })).toHaveClass(
            'LoadingSpinner LoadingSpinner--hidden LoadingSpinner--centerIn_viewport'
        );
    });
});
