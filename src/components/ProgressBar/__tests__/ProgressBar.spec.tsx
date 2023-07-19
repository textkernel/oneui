import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '../ProgressBar';

describe('<ProgressBar> that renders a horizontal progress bar', () => {
    let view: RenderResult;

    it('should render a default progress bar correctly', () => {
        view = render(<ProgressBar percentage={25} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it.skip('should render a progress bar with label', () => {
        view.rerender(<ProgressBar percentage={25}>Loading...</ProgressBar>);
        // Check that label is shown
        expect(view.container).toHaveTextContent('Loading...');
    });

    it('should add classes when props are changed', () => {
        view = render(<ProgressBar percentage={25} animated hidden small />);

        const progressbar = screen.getByRole('progressbar', { hidden: true });

        expect(view.container).toMatchSnapshot();
        expect(progressbar).toBeInTheDocument();
        expect(progressbar).toHaveClass('ProgressBar ProgressBar--hidden ProgressBar--small');
    });
});
