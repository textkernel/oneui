import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeightedResultBar } from '../WeightedResultBar';

jest.useFakeTimers();

describe('WeightedResultBar', () => {
    let view: RenderResult;

    it('should render correctly', () => {
        view = render(
            <WeightedResultBar percentage={67} count={123}>
                Result
            </WeightedResultBar>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('Result');
        expect(view.container).toHaveTextContent('123');
    });

    it('should render correctly with a custom count', () => {
        view = render(
            <WeightedResultBar percentage={67} count={<p>456</p>}>
                Result
            </WeightedResultBar>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container.querySelector('p')).toBeInTheDocument();
        expect(view.container.querySelector('p')?.textContent).toBe('456');
    });

    it('should render correctly in loading state', () => {
        view = render(<WeightedResultBar percentage={67} count={<p>456</p>} isLoading />);

        expect(screen.getByRole('presentation')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have consistent width of ContentPlaceholder in loading state, even when the component re-renders', () => {
        view = render(<WeightedResultBar percentage={67} count={<p>456</p>} isLoading />);

        const { style } = screen.getByRole('presentation');

        view.rerender(<WeightedResultBar percentage={67} count={<p>45</p>} isLoading />);

        expect(screen.getByRole('presentation').style).toBe(style);
    });
});
