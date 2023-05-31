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
        const { children } = view.container;

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(children).toHaveLength(1);
        expect(view.container).toHaveTextContent('');
    });

    it('should render a spinner with label', () => {
        view.rerender(<LoadingSpinner>Loading...</LoadingSpinner>);

        const { children } = view.container;

        expect(view.container).toMatchSnapshot();
        expect(children).toHaveLength(1);
        expect(children[0].textContent).toBe('Loading...');
    });

    it('should add classes when props are changed', () => {
        view.rerender(<LoadingSpinner centerIn="viewport" size={12} hidden />);

        const { children } = view.container;

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status', { hidden: true })).toHaveClass(
            'LoadingSpinner LoadingSpinner--hidden LoadingSpinner--centerIn_viewport'
        );
        expect(children).toHaveLength(1);
        expect(children[0].textContent).toBe('');
    });
});
