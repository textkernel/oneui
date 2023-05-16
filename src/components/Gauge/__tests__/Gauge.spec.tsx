import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Gauge } from '../Gauge';

describe('Gauge', () => {
    const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.42);

    it('should render nothing if no children are provided', () => {
        const view = render(<Gauge />);

        expect(view.container).toMatchSnapshot();
    });
    it('should render children 0', () => {
        const view = render(<Gauge>0</Gauge>);

        expect(view.container).toMatchSnapshot();
    });
    it('should render correctly', () => {
        const view = render(
            <Gauge percentage={33} note="Value" metric="Metric">
                Some content
            </Gauge>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should render with loading state correctly', () => {
        const view = render(
            <Gauge metric="Metric" isContentLoading isProgressLoading>
                Some content
            </Gauge>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });
});
