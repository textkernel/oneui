import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('<ProgressBar> that renders a horizontal progress bar', () => {
    it('should render a default progress bar correctly', () => {
        const { container } = render(<ProgressBar percentage={25} />);
        expect(container).toMatchSnapshot();
    });

    it('should render a progress bar with label', () => {
        const { container } = render(<ProgressBar percentage={25}>Loading...</ProgressBar>);
        // Check that label is shown
        expect(container.textContent).toBe('Loading...');
    });

    it('should add classes when props are changed', () => {
        const { container } = render(
            <ProgressBar percentage={25} context="primary" animated hidden small />
        );
        expect(container).toMatchSnapshot();
    });
});
